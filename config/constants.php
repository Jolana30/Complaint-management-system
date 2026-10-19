<?php
/**
 * Ambo University - Complaint Management System (Ambo CMS)
 * Global Application Constants & Institutional Policy Configurations
 */

declare(strict_types=1);

// Application Metadata
define('APP_NAME', 'Ambo University Complaint Management System');
define('APP_SHORT_NAME', 'Ambo CMS');
define('APP_VERSION', '1.0.0-alpha');
define('APP_MILESTONE', '25% Architectural Deliverable');

// User Roles
define('ROLE_STUDENT', 'student');
define('ROLE_TEACHER', 'teacher');
define('ROLE_ADMIN', 'admin');

// Complaint Lifecycle Statuses
define('STATUS_PENDING', 'pending');
define('STATUS_IN_PROGRESS', 'in_progress');
define('STATUS_NEEDS_CONFIRMATION', 'needs_confirmation');
define('STATUS_RESOLVED', 'resolved');
define('STATUS_DECLINED', 'declined');

// Urgency Levels & Target Resolution SLAs (in hours)
define('SLA_HOURS', [
    'critical' => 36,  // 24 - 36 hours
    'high'     => 72,  // 2 - 3 business days
    'medium'   => 120, // 5 business days
    'low'      => 240  // 7 - 10 business days
]);

// Grievance Categories
define('COMPLAINT_CATEGORIES', [
    'Assessment & Grading',
    'Attendance Policy',
    'Communication',
    'Teaching Quality',
    'Lab Resources',
    'Other'
]);

// Upload Constraints
define('MAX_UPLOAD_BYTES', 5 * 1024 * 1024); // 5MB
define('ALLOWED_UPLOAD_MIME', [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);
