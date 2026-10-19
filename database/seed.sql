-- ==============================================================================
-- Ambo University - Student-to-Teacher Complaint Management System (Ambo CMS)
-- Demonstration Seed Data (Canonical Dataset for 25% Milestone)
-- ==============================================================================

-- 1. Departments
INSERT INTO `departments` (`id`, `code`, `name`, `college`, `head_name`) VALUES
(1, 'IT', 'Information Technology', 'Institute of Technology (IoT)', 'Dr. Tadesse'),
(2, 'CS', 'Computer Science', 'Institute of Technology (IoT)', 'Dr. Melaku'),
(3, 'ECE', 'Electrical and Computer Engineering', 'Institute of Technology (IoT)', 'Dr. Getachew'),
(4, 'CE', 'Civil Engineering', 'Institute of Technology (IoT)', 'Eng. Bekele'),
(5, 'ME', 'Mechanical Engineering', 'Institute of Technology (IoT)', 'Eng. Worku'),
(6, 'HWRE', 'Water Resources Engineering', 'Institute of Technology (IoT)', 'Dr. Alemayehu');

-- 2. Users (Passwords hashed using Argon2id for 'password123' / mock fallback)
INSERT INTO `users` (`id`, `username`, `password_hash`, `full_name`, `email`, `role`, `department_id`, `student_id`, `phone`, `status`) VALUES
(1, 'student', '$argon2id$v=19$m=65536,t=4,p=1$dmFsaWRTYWx0MTIzNDU2Nw$q3V2iT9V5wz6xQG5/J+g3pE9sU0aVbC1dEfGhIjKlMn', 'Abebe Kebede', 'student@ambo.edu.et', 'student', 1, 'ugr/12345/16', '+251 911 234 567', 'active'),
(2, 'seladin', '$argon2id$v=19$m=65536,t=4,p=1$dmFsaWRTYWx0MTIzNDU2Nw$q3V2iT9V5wz6xQG5/J+g3pE9sU0aVbC1dEfGhIjKlMn', 'Seladin Bergecho', 'seladin.b@ambo.edu.et', 'student', 1, 'ugr/14298/16', '+251 922 345 678', 'active'),
(3, 'adane', '$argon2id$v=19$m=65536,t=4,p=1$dmFsaWRTYWx0MTIzNDU2Nw$q3V2iT9V5wz6xQG5/J+g3pE9sU0aVbC1dEfGhIjKlMn', 'Adane Girma', 'adane.g@ambo.edu.et', 'student', 3, 'ugr/11054/16', '+251 933 456 789', 'active'),
(4, 'degu', '$argon2id$v=19$m=65536,t=4,p=1$dmFsaWRTYWx0MTIzNDU2Nw$q3V2iT9V5wz6xQG5/J+g3pE9sU0aVbC1dEfGhIjKlMn', 'Degu Debebe', 'degu.d@ambo.edu.et', 'student', 2, 'ugr/15670/16', '+251 944 567 890', 'active'),
(5, 'eyuel', '$argon2id$v=19$m=65536,t=4,p=1$dmFsaWRTYWx0MTIzNDU2Nw$q3V2iT9V5wz6xQG5/J+g3pE9sU0aVbC1dEfGhIjKlMn', 'Mr. Eyuel', 'eyuel.t@ambo.edu.et', 'teacher', 1, NULL, '+251 912 345 678', 'active'),
(6, 'bekele', '$argon2id$v=19$m=65536,t=4,p=1$dmFsaWRTYWx0MTIzNDU2Nw$q3V2iT9V5wz6xQG5/J+g3pE9sU0aVbC1dEfGhIjKlMn', 'Mr. Bekele', 'bekele.m@ambo.edu.et', 'teacher', 2, NULL, '+251 913 456 789', 'active'),
(7, 'admin', '$argon2id$v=19$m=65536,t=4,p=1$dmFsaWRTYWx0MTIzNDU2Nw$q3V2iT9V5wz6xQG5/J+g3pE9sU0aVbC1dEfGhIjKlMn', 'Dr. Tadesse', 'admin@ambo.edu.et', 'admin', 1, NULL, '+251 911 000 111', 'active'),
(8, 'committee', '$argon2id$v=19$m=65536,t=4,p=1$dmFsaWRTYWx0MTIzNDU2Nw$q3V2iT9V5wz6xQG5/J+g3pE9sU0aVbC1dEfGhIjKlMn', 'Dr. Daniel', 'committee@ambo.edu.et', 'committee', 2, NULL, '+251 911 888 999', 'active');

-- 3. Courses
INSERT INTO `courses` (`id`, `code`, `title`, `department_id`, `instructor_id`, `credit_hours`, `semester`, `academic_year`) VALUES
(1, 'IT-301', 'System Analysis & Design (SAD)', 1, 5, 4, 'Semester I', '2025/2026'),
(2, 'IT-303', 'Internet Programming (IP)', 1, 5, 4, 'Semester I', '2025/2026'),
(3, 'CS-205', 'Data Structures & Algorithms (DSA)', 3, 5, 4, 'Semester I', '2025/2026'),
(4, 'CS-307', 'Operating Systems (OS)', 2, 6, 3, 'Semester I', '2025/2026'),
(5, 'IT-202', 'Fundamentals of Database Systems (FDBS)', 1, 5, 3, 'Semester II', '2025/2026');

-- 4. Complaints (6 Canonical Cases Covering Every Lifecycle Branch)
INSERT INTO `complaints` (`id`, `public_code`, `student_id`, `department_id`, `course_id`, `category`, `severity`, `urgency`, `title`, `description`, `status`, `assigned_teacher_id`, `admin_remark`, `decline_reason`, `created_at`) VALUES
(1, 'CMP-101', 1, 1, 1, 'Assessment & Grading', 'normal', 'high', 'Unfair Grading on Mid-Exam Question 4', 'My final answer was mathematically correct according to the reference slides, but points were deducted without explanation. I request a re-evaluation.', 'pending', NULL, NULL, NULL, '2026-10-12 09:30:00'),
(2, 'CMP-102', 2, 1, 2, 'Communication', 'normal', 'medium', 'Lab Project Submission Schedule Not Communicated', 'The deadline for Project Milestone 2 was changed without prior notice in the lecture hall, affecting students commuting from distant campuses.', 'in_progress', 5, 'Assigned to Mr. Eyuel for clarification on project timeline.', NULL, '2026-10-08 14:15:00'),
(3, 'CMP-103', 3, 3, 3, 'Attendance Policy', 'normal', 'medium', 'Irregular Attendance Records During Field Trip', 'Students on an official university visit were marked absent for the Monday lab session.', 'needs_confirmation', 5, 'Please review official field permission slip.', NULL, '2026-10-05 11:00:00'),
(4, 'CMP-104', 4, 2, 4, 'Assessment & Grading', 'normal', 'high', 'Missing Lab Assessment Result in Portal', 'My Lab Exam score of 15% was not submitted to the central database.', 'resolved', 6, 'Admin confirmed and updated student portal ledger.', NULL, '2026-09-28 10:00:00'),
(5, 'CMP-105', 1, 2, 4, 'Severe Misconduct / Harassment', 'serious', 'critical', 'Intimidation and Retaliatory Grading Threat', 'Complainant reports direct threats of academic penalty after raising concerns regarding unauthorized textbook sales in class.', 'escalated', NULL, 'Escalated by Department Head to Disciplinary Committee for formal statutory hearing.', NULL, '2026-10-14 11:20:00'),
(6, 'CMP-106', 1, 1, 1, 'Other', 'normal', 'low', 'Library Study Space Insufficient Heating', 'Study cubicles in the engineering library branch lack functional power outlets and heating in the evening hours.', 'declined', NULL, NULL, 'Out of scope: Department grievance system handles teaching and learning processes. Routed to Campus Facilities Directorate.', '2026-10-15 08:45:00');

-- 5. Complaint Responses
INSERT INTO `complaint_responses` (`id`, `complaint_id`, `teacher_id`, `findings`, `proposed_resolution`, `routing_decision`, `submitted_at`) VALUES
(1, 3, 5, 'Verified official departmental permission slip signed by the department head.', 'Attendance records for the date in question have been adjusted from Absent to Excused.', 'resolve_and_confirm', '2026-10-10 16:20:00'),
(2, 4, 6, 'Exam sheet paper discrepancy confirmed due to student ID typo on the answer rubric.', 'Score of 15/15 submitted to department registrar on official mark change voucher.', 'resolve_and_confirm', '2026-10-03 14:30:00');

-- 6. Escalations Table
INSERT INTO `escalations` (`id`, `complaint_id`, `escalated_by`, `reason`, `escalated_at`) VALUES
(1, 5, 7, 'Case involves serious allegations of instructor intimidation and retaliatory threats, exceeding department level mediation scope.', '2026-10-14 14:00:00');

-- 7. Tamper-Evident Complaint History (Hash-Chain Log)
-- Each row SHA-256 hashes the previous row's hash + row payload
INSERT INTO `complaint_history` (`id`, `complaint_id`, `actor_id`, `action`, `from_status`, `to_status`, `note`, `prev_hash`, `row_hash`, `created_at`) VALUES
(1, 1, 1, 'submitted', NULL, 'pending', 'Grievance submitted by student Abebe Kebede', 'GENESIS_0000000000000000000000000000000000000000000000000000000000', 'a1f73b64c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5', '2026-10-12 09:30:00'),
(2, 2, 2, 'submitted', NULL, 'pending', 'Grievance submitted by student Seladin Bergecho', 'a1f73b64c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5', 'b2c84d75e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6', '2026-10-08 14:15:00'),
(3, 2, 7, 'assigned', 'pending', 'assigned', 'Admin assigned case to Mr. Eyuel', 'b2c84d75e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6', 'c3d95e86f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7', '2026-10-09 10:00:00'),
(4, 2, 5, 'in_progress', 'assigned', 'in_progress', 'Teacher initiated investigation into project logs', 'c3d95e86f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7', 'd4e06f97a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8', '2026-10-09 11:20:00'),
(5, 5, 1, 'submitted', NULL, 'pending', 'Serious complaint lodged regarding faculty conduct', 'd4e06f97a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8', 'e5f17a08b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9', '2026-10-14 11:20:00'),
(6, 5, 7, 'escalated', 'pending', 'escalated', 'Department Head escalated to Disciplinary Committee', 'e5f17a08b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9', 'f6a28b19c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0', '2026-10-14 14:00:00');

-- 8. Notifications
INSERT INTO `notifications` (`user_id`, `title`, `message`, `link_url`, `is_read`, `created_at`) VALUES
(1, 'Grievance Logged', 'CMP-101 has been registered and is pending departmental triage.', 'complaint_details.html?id=CMP-101', 0, '2026-10-12 09:30:00'),
(5, 'New Assignment', 'Admin assigned complaint CMP-102 to you for review.', 'teacher_respond.html?id=CMP-102', 0, '2026-10-09 10:00:00'),
(7, 'Resolution Pending Approval', 'Mr. Eyuel submitted response for CMP-103.', 'admin_confirm.html?id=CMP-103', 0, '2026-10-10 16:20:00'),
(8, 'Case Escalation Docket', 'Admin escalated CMP-105 for Disciplinary Committee investigation.', 'committee_complaint_details.html?id=CMP-105', 0, '2026-10-14 14:00:00');
