-- ==============================================================================
-- Ambo University - Student-to-Teacher Complaint Management System (Ambo CMS)
-- Relational Database Schema Definition (MySQL 8.0+ / MariaDB 10.4+)
-- Milestone 25% Deliverable - Updated with Disciplinary Committee & Hash Chain
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `attachments`;
DROP TABLE IF EXISTS `committee_decisions`;
DROP TABLE IF EXISTS `escalations`;
DROP TABLE IF EXISTS `complaint_history`;
DROP TABLE IF EXISTS `complaint_responses`;
DROP TABLE IF EXISTS `complaints`;
DROP TABLE IF EXISTS `courses`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `departments`;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------------------------
-- 1. Departments Table
-- ------------------------------------------------------------------------------
CREATE TABLE `departments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(20) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `college` VARCHAR(150) NOT NULL DEFAULT 'Institute of Technology (IoT)',
  `head_name` VARCHAR(120) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. Users Table (Role-Based Access Control: student, teacher, admin, committee)
-- ------------------------------------------------------------------------------
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(60) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `role` ENUM('student', 'teacher', 'admin', 'committee') NOT NULL,
  `department_id` INT UNSIGNED DEFAULT NULL,
  `student_id` VARCHAR(30) DEFAULT NULL UNIQUE,
  `phone` VARCHAR(25) DEFAULT NULL,
  `status` ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_role` (`role`),
  KEY `idx_user_department` (`department_id`),
  CONSTRAINT `fk_users_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. Courses Table
-- ------------------------------------------------------------------------------
CREATE TABLE `courses` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NOT NULL UNIQUE,
  `title` VARCHAR(150) NOT NULL,
  `department_id` INT UNSIGNED NOT NULL,
  `instructor_id` INT UNSIGNED DEFAULT NULL,
  `credit_hours` TINYINT UNSIGNED NOT NULL DEFAULT 3,
  `semester` ENUM('Semester I', 'Semester II', 'Summer') NOT NULL DEFAULT 'Semester I',
  `academic_year` VARCHAR(15) NOT NULL DEFAULT '2025/2026',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_courses_department` (`department_id`),
  KEY `idx_courses_instructor` (`instructor_id`),
  CONSTRAINT `fk_courses_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_courses_instructor` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. Complaints Primary Table (With Severity Flag & Committee Escalation)
-- ------------------------------------------------------------------------------
CREATE TABLE `complaints` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `public_code` VARCHAR(30) NOT NULL UNIQUE, -- e.g. CMP-101
  `student_id` INT UNSIGNED NOT NULL,
  `department_id` INT UNSIGNED NOT NULL,
  `course_id` INT UNSIGNED DEFAULT NULL, -- Nullable for severe conduct/harassment not tied to a single course
  `category` ENUM(
    'Assessment & Grading',
    'Attendance Policy',
    'Communication',
    'Teaching Quality',
    'Lab Resources',
    'Severe Misconduct / Harassment',
    'Other'
  ) NOT NULL,
  `severity` ENUM('normal', 'serious') NOT NULL DEFAULT 'normal',
  `urgency` ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `status` ENUM(
    'pending',
    'assigned',
    'in_progress',
    'needs_confirmation',
    'resolved',
    'declined',
    'escalated',
    'committee_review'
  ) NOT NULL DEFAULT 'pending',
  `assigned_teacher_id` INT UNSIGNED DEFAULT NULL,
  `admin_remark` TEXT DEFAULT NULL,
  `decline_reason` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_complaints_code` (`public_code`),
  KEY `idx_complaints_student` (`student_id`),
  KEY `idx_complaints_dept` (`department_id`),
  KEY `idx_complaints_course` (`course_id`),
  KEY `idx_complaints_status` (`status`),
  KEY `idx_complaints_severity` (`severity`),
  KEY `idx_complaints_teacher` (`assigned_teacher_id`),
  CONSTRAINT `fk_complaints_student` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_complaints_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_complaints_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_complaints_teacher` FOREIGN KEY (`assigned_teacher_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. Complaint Responses Table (Faculty Corrective Findings)
-- ------------------------------------------------------------------------------
CREATE TABLE `complaint_responses` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `complaint_id` INT UNSIGNED NOT NULL,
  `teacher_id` INT UNSIGNED NOT NULL,
  `findings` TEXT NOT NULL,
  `proposed_resolution` TEXT NOT NULL,
  `routing_decision` ENUM('resolve_and_confirm', 'escalate_dept_head', 'request_evidence') NOT NULL DEFAULT 'resolve_and_confirm',
  `submitted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_response_complaint` (`complaint_id`),
  KEY `idx_response_teacher` (`teacher_id`),
  CONSTRAINT `fk_responses_complaint` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_responses_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. Escalations Table (Severe cases routed to Disciplinary Committee)
-- ------------------------------------------------------------------------------
CREATE TABLE `escalations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `complaint_id` INT UNSIGNED NOT NULL,
  `escalated_by` INT UNSIGNED NOT NULL, -- Admin (Department Head's office)
  `reason` TEXT NOT NULL,
  `escalated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_escalation_complaint` (`complaint_id`),
  KEY `idx_escalation_user` (`escalated_by`),
  CONSTRAINT `fk_escalations_complaint` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_escalations_user` FOREIGN KEY (`escalated_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. Committee Decisions Table (Formal Disciplinary Committee Determinations)
-- ------------------------------------------------------------------------------
CREATE TABLE `committee_decisions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `complaint_id` INT UNSIGNED NOT NULL,
  `committee_user_id` INT UNSIGNED NOT NULL,
  `hearing_date` DATE DEFAULT NULL,
  `decision_text` TEXT NOT NULL,
  `action_recommended` TEXT NOT NULL,
  `decided_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_committee_complaint` (`complaint_id`),
  KEY `idx_committee_user` (`committee_user_id`),
  CONSTRAINT `fk_decisions_complaint` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_decisions_user` FOREIGN KEY (`committee_user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. Tamper-Evident Complaint History Audit Chain (Hash-Chain Log)
-- ------------------------------------------------------------------------------
CREATE TABLE `complaint_history` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `complaint_id` INT UNSIGNED NOT NULL,
  `actor_id` INT UNSIGNED DEFAULT NULL,
  `action` VARCHAR(60) NOT NULL, -- submitted, assigned, responded, confirmed, escalated, declined, decision
  `from_status` VARCHAR(30) DEFAULT NULL,
  `to_status` VARCHAR(30) NOT NULL,
  `note` TEXT DEFAULT NULL,
  `prev_hash` VARCHAR(64) DEFAULT NULL, -- SHA-256 hash of the previous history row
  `row_hash` VARCHAR(64) NOT NULL,     -- SHA-256 hash of this entry plus prev_hash
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_history_complaint` (`complaint_id`),
  KEY `idx_history_actor` (`actor_id`),
  CONSTRAINT `fk_history_complaint` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_history_actor` FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 9. Attachments Table (Stored securely outside web root)
-- ------------------------------------------------------------------------------
CREATE TABLE `attachments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `complaint_id` INT UNSIGNED NOT NULL,
  `stored_name` VARCHAR(100) NOT NULL UNIQUE, -- Random UUID or 32-char hex filename
  `original_name` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `file_size` INT UNSIGNED NOT NULL,
  `sha256_hash` VARCHAR(64) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_attachments_complaint` (`complaint_id`),
  CONSTRAINT `fk_attachments_complaint` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 10. Notifications Table
-- ------------------------------------------------------------------------------
CREATE TABLE `notifications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `link_url` VARCHAR(255) DEFAULT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_notif_user` (`user_id`),
  KEY `idx_notif_read` (`is_read`),
  CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
