<?php
/**
 * Ambo University - Complaint Management System (Ambo CMS)
 * Database Connection Module (PDO)
 * 
 * Provides secure, reusable PDO database connectivity with prepared statement
 * enforcement, strict error exceptions, and utf8mb4 charset.
 */

declare(strict_types=1);

// Configuration parameters (Default XAMPP local environment)
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'ambo_cms');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');

/**
 * Returns a shared PDO instance configured with secure defaults.
 *
 * @return PDO
 * @throws PDOException
 */
function getDbConnection(): PDO
{
    static $pdo = null;

    if ($pdo === null) {
        $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_PORT, DB_NAME);

        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            // In production, log error securely without leaking credentials to client
            error_log('[Ambo CMS DB Error] Connection failed: ' . $e->getMessage());
            throw new PDOException('Database connection failed. Please ensure MySQL service is running.', (int)$e->getCode());
        }
    }

    return $pdo;
}
