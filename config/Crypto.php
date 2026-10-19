<?php
/**
 * Ambo University Complaint Management System (Ambo CMS)
 * Cryptographic & Security Engine (Crypto.php)
 * 
 * Provides production-grade cryptographic operations:
 * 1. Argon2id password hashing and constant-time verification
 * 2. Libsodium Secretbox / AES-256-GCM authenticated field encryption at rest
 * 3. Secure cryptographically random token generation and SHA-256 token hashing
 * 4. SHA-256 file checksums and secure file storage naming
 * 5. Tamper-evident hash-chain calculation for complaint audit history
 */

declare(strict_types=1);

namespace AmboCMS\Security;

class Crypto
{
    /**
     * Default key loaded from environment variable (outside web root).
     * Falls back to a deterministic development key if not set.
     */
    private static function getMasterKey(): string
    {
        $keyHex = getenv('AMBO_CMS_ENCRYPTION_KEY');
        if ($keyHex && strlen($keyHex) === 64) {
            return hex2bin($keyHex);
        }
        // Development fallback 256-bit key (DO NOT use in production)
        return hash('sha256', 'AmboUniversity_CMS_DevMasterKey_2026', true);
    }

    // =========================================================================
    // 1. Password Hashing (Argon2id)
    // =========================================================================

    /**
     * Hashes password using Argon2id with recommended parameters.
     */
    public static function hashPassword(string $password): string
    {
        // Use Argon2id if available, fallback to default bcrypt
        if (defined('PASSWORD_ARGON2ID')) {
            $options = [
                'memory_cost' => 65536, // 64 MB
                'time_cost'   => 4,     // 4 iterations
                'threads'     => 1
            ];
            return password_hash($password, PASSWORD_ARGON2ID, $options);
        }
        return password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
    }

    /**
     * Verifies password against stored hash in constant time.
     */
    public static function verifyPassword(string $password, string $hash): bool
    {
        return password_verify($password, $hash);
    }

    /**
     * Checks if stored password hash needs rehash.
     */
    public static function needsRehash(string $hash): bool
    {
        if (defined('PASSWORD_ARGON2ID')) {
            $options = [
                'memory_cost' => 65536,
                'time_cost'   => 4,
                'threads'     => 1
            ];
            return password_needs_rehash($hash, PASSWORD_ARGON2ID, $options);
        }
        return password_needs_rehash($hash, PASSWORD_DEFAULT, ['cost' => 12]);
    }

    // =========================================================================
    // 2. Authenticated Encryption at Rest (Libsodium / AES-256-GCM)
    // =========================================================================

    /**
     * Encrypts sensitive plaintext (e.g. complaint descriptions, evidence)
     * using authenticated encryption (libsodium secretbox or AES-256-GCM).
     * Format: version(1 byte) + nonce/IV + ciphertext + authentication tag
     *
     * @param string $plaintext
     * @return string Base64 encoded payload
     */
    public static function encrypt(string $plaintext): string
    {
        $key = self::getMasterKey();

        if (function_exists('sodium_crypto_secretbox')) {
            $nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
            $ciphertext = sodium_crypto_secretbox($plaintext, $nonce, $key);
            // Payload: 0x01 (version) + nonce + ciphertext (includes Poly1305 MAC)
            return base64_encode("\x01" . $nonce . $ciphertext);
        }

        // OpenSSL AES-256-GCM fallback
        $iv = random_bytes(12);
        $tag = '';
        $ciphertext = openssl_encrypt(
            $plaintext,
            'aes-256-gcm',
            $key,
            OPENSSL_RAW_DATA,
            $iv,
            $tag,
            'AmboCMS-AAD-v1',
            16
        );
        // Payload: 0x02 (version) + IV + tag + ciphertext
        return base64_encode("\x02" . $iv . $tag . $ciphertext);
    }

    /**
     * Decrypts an authenticated encrypted payload.
     * Returns null if ciphertext or authentication tag is tampered with.
     *
     * @param string $encodedPayload Base64 encoded string
     * @return string|null Plaintext on success, null on forgery/tampering
     */
    public static function decrypt(string $encodedPayload): ?string
    {
        $raw = base64_decode($encodedPayload, true);
        if ($raw === false || strlen($raw) < 2) {
            return null;
        }

        $version = ord($raw[0]);
        $key = self::getMasterKey();

        if ($version === 1 && function_exists('sodium_crypto_secretbox_open')) {
            $nonceLen = SODIUM_CRYPTO_SECRETBOX_NONCEBYTES;
            if (strlen($raw) < 1 + $nonceLen + SODIUM_CRYPTO_SECRETBOX_MACBYTES) {
                return null;
            }
            $nonce = substr($raw, 1, $nonceLen);
            $ciphertext = substr($raw, 1 + $nonceLen);
            $plaintext = sodium_crypto_secretbox_open($ciphertext, $nonce, $key);
            return $plaintext !== false ? $plaintext : null;
        }

        if ($version === 2 && function_exists('openssl_decrypt')) {
            $ivLen = 12;
            $tagLen = 16;
            if (strlen($raw) < 1 + $ivLen + $tagLen) {
                return null;
            }
            $iv = substr($raw, 1, $ivLen);
            $tag = substr($raw, 1 + $ivLen, $tagLen);
            $ciphertext = substr($raw, 1 + $ivLen + $tagLen);
            $plaintext = openssl_decrypt(
                $ciphertext,
                'aes-256-gcm',
                $key,
                OPENSSL_RAW_DATA,
                $iv,
                $tag,
                'AmboCMS-AAD-v1'
            );
            return $plaintext !== false ? $plaintext : null;
        }

        return null;
    }

    // =========================================================================
    // 3. Secure Tokens (Password Resets, API & Session Authentication)
    // =========================================================================

    /**
     * Generates a 256-bit cryptographically secure raw token and its storage SHA-256 hash.
     * The raw token is sent to the client; only the hash is persisted in the database.
     *
     * @return array{token: string, hash: string}
     */
    public static function generateSecureToken(): array
    {
        $rawBytes = random_bytes(32);
        $token = bin2hex($rawBytes);
        $hash = hash('sha256', $token);
        return [
            'token' => $token,
            'hash'  => $hash
        ];
    }

    /**
     * Computes the SHA-256 hash of a submitted token for comparison.
     */
    public static function hashToken(string $token): string
    {
        return hash('sha256', $token);
    }

    // =========================================================================
    // 4. File Checksums & Safe Storage Filenames
    // =========================================================================

    /**
     * Generates a collision-resistant random filename for storage outside web root.
     *
     * @param string $originalExtension (e.g. 'pdf', 'jpg')
     * @return string (e.g. 'attach_4f8e1a2b3c4d5e6f.pdf')
     */
    public static function generateStoredFilename(string $originalExtension): string
    {
        $cleanExt = preg_replace('/[^a-zA-Z0-9]/', '', strtolower($originalExtension));
        return 'doc_' . bin2hex(random_bytes(16)) . '.' . $cleanExt;
    }

    /**
     * Computes the SHA-256 checksum of an uploaded file.
     */
    public static function computeFileHash(string $filePath): string
    {
        if (!file_exists($filePath)) {
            throw new \InvalidArgumentException("File does not exist: {$filePath}");
        }
        return hash_file('sha256', $filePath);
    }

    // =========================================================================
    // 5. Tamper-Evident Hash Chain (Audit Trail)
    // =========================================================================

    /**
     * Computes the cryptographic row hash for complaint audit history.
     * Each row binds to the previous row's hash, forming an immutable chain.
     *
     * @param string|null $prevHash Previous row's hash (or GENESIS string if first row)
     * @param array $rowData Array of fields: [complaint_id, actor_id, action, from_status, to_status, note, created_at]
     * @return string 64-char SHA-256 hex string
     */
    public static function calculateAuditHash(?string $prevHash, array $rowData): string
    {
        $genesis = 'GENESIS_0000000000000000000000000000000000000000000000000000000000';
        $parent = $prevHash ?: $genesis;

        // Canonical JSON serialization with sorted keys
        ksort($rowData);
        $payload = json_encode($rowData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        return hash('sha256', $parent . '|' . $payload);
    }
}
