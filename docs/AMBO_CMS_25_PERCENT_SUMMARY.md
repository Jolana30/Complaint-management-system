# Ambo University Student-to-Teacher Complaint Management System (Ambo CMS)
# 25% Project Milestone Executive Summary & Technical Defense Guide

**Institution:** Ambo University, Institute of Technology (IoT)  
**Department:** Computer Science & Information Technology  
**Course:** Senior Web Project / Software Engineering  
**Milestone:** 25% Architectural & Interactive Design Milestone  
**Submission Date:** October 2026  
**Repository:** https://github.com/Jolana30/Complaint-management-system  

---

## 1. Project Overview & Institutional Mandate
The **Ambo University Complaint Management System (Ambo CMS)** is a specialized academic web application designed to transition student grievance resolution from informal, undocumented methods into a transparent, role-governed digital system.

It provides verifiable audit logs, Service Level Agreement (SLA) tracking, and clear separation between routine departmental teaching mediation and statutory disciplinary review.

---

## 2. What Was Done & Why (Architectural Rationale)

| Feature / Module | What Was Done | Why It Was Done (Rationale) |
| :--- | :--- | :--- |
| **4 Institutional Roles** | Built 4 distinct authenticated portals: **Student**, **Teacher**, **Department Admin**, and **Disciplinary Committee (UDC)** across 16 responsive pages. | Based on Ambo University administrative reality: Department Heads handle routine teaching and learning processes. Allegations of severe harassment, bribery, or retaliatory grading exceed department authority and legally require the University Disciplinary Committee (UDC). |
| **3-Route Complaint Lifecycle** | Implemented three governed routes: <br>1. *Decline* (out-of-scope non-teaching issues)<br>2. *Department Mediation* (teaching issues assigned to lecturer)<br>3. *Statutory Escalation* (severe misconduct referred to committee). | Prevents departmental queues from being clogged with non-academic facility complaints (e.g. library heating), while ensuring severe ethics violations receive immediate statutory hearing review without faculty obstruction. |
| **Student-Facing Status Masking** | Masked internal administrative sub-states: <br>• `assigned` & `needs_confirmation` &rarr; *"In Progress"*<br>• `escalated` & `committee_review` &rarr; *"Escalated to Committee"*. | Exposing internal administrative deliberation sub-states creates confusion and anxiety for students. High-level milestone badges provide full transparency without compromising internal review workflows. |
| **Pending Edit Window** | Allowed students to edit grievance details only while the complaint is in `Pending` triage status. Once assigned or escalated, fields lock automatically. | Preserves evidence integrity. Once an instructor or committee begins evaluating an allegation, the complainant cannot retroactively modify claims or dates. |
| **Argon2id Hashing & Authenticated Encryption** ([`config/Crypto.php`](file:///c:/Users/hp/Desktop/CMS_PHP/config/Crypto.php)) | Implemented RFC-compliant Argon2id password hashing and Libsodium Secretbox / AES-256-GCM authenticated encryption at rest. | Protects student and faculty privacy. Sensitive grievance descriptions and evidence remain unreadable even in the event of an unauthorized database dump. |
| **Tamper-Evident Audit Chain** | Built a SHA-256 hash-chaining algorithm (`$prevHash . $rowData`) for every timeline event and administrative action. | Guarantees mathematical non-repudiation during disciplinary hearings. Neither administrators nor faculty can alter historical timestamps, remarks, or findings without breaking the chain. |
| **Normalized Relational Schema** ([`database/schema.sql`](file:///c:/Users/hp/Desktop/CMS_PHP/database/schema.sql)) | Designed 10 relational tables (`departments`, `users`, `courses`, `complaints`, `complaint_responses`, `escalations`, `committee_decisions`, `complaint_history`, `attachments`, `notifications`). | Provides data integrity with foreign keys and cascading rules. Accommodates future semester archiving and multi-campus scaling. |
| **Canonical Seed Dataset** ([`database/seed.sql`](file:///c:/Users/hp/Desktop/CMS_PHP/database/seed.sql)) | Created 6 consistent records (`CMP-101` to `CMP-106`) with zero count or status mismatches across pages. | Ensures reliable, repeatable demonstrations and verifiable baseline states for unit and user-acceptance testing. |
| **Clean Academic UI & Accessibility** | Implemented WCAG AA compliant headings, 44px touch targets, tabular figures (`font-tabular`) for ticket IDs, dark/light mode, and offline PWA caching. | Ensures full usability across mobile smartphones and desktop lab terminals commonly used by Ambo University students. |

---

## 3. Relational Schema Summary

```text
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   departments   │◄──────┤      users      │◄──────┤ complaint_resp. │
│─────────────────│1     *│─────────────────│1     *│─────────────────│
│ id (PK)         │       │ id (PK)         │       │ id (PK)         │
│ code, name      │       │ username, role  │       │ complaint_id(FK)│
└────────┬────────┘       │ department_id   │       │ teacher_id (FK) │
         │1               └────────┬────────┘       │ findings        │
         │                         │1               └─────────────────┘
         │*                        │
┌────────┴────────┐                │*
│     courses     │◄──────┌────────┴────────┐       ┌─────────────────┐
│─────────────────│1     *│   complaints    │◄──────┤ complaint_hist. │
│ id (PK)         │       │─────────────────│1     *│─────────────────│
│ code, title     │       │ id (PK)         │       │ id (PK)         │
│ department_id   │       │ public_code     │       │ prev_hash       │
│ teacher_id (FK) │       │ status, severity│       │ row_hash        │
└─────────────────┘       │ urgency         │       └─────────────────┘
                          └─────────────────┘
```

---

## 4. Next Steps (50% Milestone Roadmap)

1. **PHP PDO REST API:**
   - `api/auth.php`: Argon2id verification, session management, CSRF tokens.
   - `api/complaints.php`: Prepared statement CRUD operations.
   - `api/workflow.php`: Triage endpoints for assigning, declining, escalating, and confirming.
2. **Database Import & Connectivity:**
   - Import `database/schema.sql` and `database/seed.sql` into local MySQL / MariaDB via XAMPP.
   - Connect via `config/db.php` singleton.
3. **Encrypted File Upload Pipeline:**
   - Multi-file attachment handling with MIME verification (PDF, PNG, JPG, DOCX) and 5MB cap.
   - SHA-256 file checksums and randomized stored filenames outside the web root.
4. **Session Protection & Access Control (RBAC):**
   - Role-based middleware verifying session cookies on every API request.

---

## 5. Live Demonstration Script (3-Minute Presentation)

Follow these steps to demonstrate the prototype to your instructor or evaluator:

1. **Open the Portal:**
   - Visit `http://127.0.0.1:8055/index.html`.
   - Point out the institutional branding, theme toggle, and the **"Demo Role ▾"** switcher in the top navigation.
2. **Student Walkthrough (Abebe Kebede):**
   - Switch to **Student**.
   - Open **"Submit Complaint"**:
     - Demonstrate **Draft Auto-save** (type, refresh page &rarr; draft restores).
     - Demonstrate **Ethiopian Student ID validation** (`ugr/12345/16` turns green).
     - Point out the **Severity Assessment** dropdown (`Normal` vs `Serious`).
   - Open **"My Complaints"**:
     - Click **"Edit"** on `CMP-101` to show students can modify complaints while in `Pending` status.
     - View `CMP-103` to show that internal administrative sub-states are masked as *"In Progress"*.
     - View `CMP-105` to show the *"Escalated to Committee"* banner.
3. **Admin Triage Walkthrough (Dr. Tadesse):**
   - Switch to **Admin**.
   - Show the Admin Dashboard overview counts and the Action Required queue.
   - Demonstrate the **"Assign"** button and the **"Escalate"** button.
   - Click **"Escalate"** to show how severe cases are officially transferred to the Disciplinary Committee.
4. **Faculty Resolution Walkthrough (Mr. Eyuel):**
   - Switch to **Teacher**.
   - View assigned complaint `CMP-102` &rarr; click **"Respond"** &rarr; draft resolution &rarr; submit to Admin for confirmation.
5. **Disciplinary Committee Adjudication (Dr. Daniel):**
   - Switch to **Committee**.
   - Open `committee_dashboard.html` &rarr; click **"Dossier"** on `CMP-105`.
   - Show the **Tamper-Evident SHA-256 Audit Verification Badge**.
   - Click **"Render Decision"** &rarr; select finding (*Substantiated*), order sanction (*Grade Re-evaluation*), sign off, and seal the decision.
6. **Code Architecture Inspection:**
   - Show [`config/Crypto.php`](file:///c:/Users/hp/Desktop/CMS_PHP/config/Crypto.php) (Argon2id and hash-chaining implementation).
   - Show [`database/schema.sql`](file:///c:/Users/hp/Desktop/CMS_PHP/database/schema.sql) (10 normalized relational tables).

---
*Ambo University Student-to-Teacher Complaint Management System — 25% Project Milestone Submission.*
