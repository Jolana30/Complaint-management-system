# 🏛️ Ambo University - Student to Teacher Complaint Management System (Ambo CMS)

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/-PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Ambo University](https://img.shields.io/badge/-Ambo%20University-10B981?style=for-the-badge)

A web-based **Student-to-Teacher Complaint Management System** designed for **Ambo University** to streamline, track, and resolve academic and administrative complaints through a structured 4-tier institutional workflow (Student, Teacher, Department Admin, and Disciplinary Committee).

---

## 🚀 Key Features & User Roles

### 🎓 1. Student Portal
* **Submit Complaints**: User-friendly form to log academic or departmental complaints with draft auto-save and Ethiopian Student ID format validation.
* **My Complaints Dashboard**: View real-time complaint status (*Pending*, *In Progress*, *Resolved*, *Declined*, or *Escalated to Committee*).
* **Edit While Pending**: Modify complaint details before departmental triage begins.
* **Submission Guide**: Clear instructions on university complaint procedures and SLAs.

### 👨‍🏫 2. Teacher Portal
* **Teacher Dashboard**: Overview of complaints assigned to specific course lecturers.
* **Resolution Center**: Directly inspect student issues and submit formal corrective findings.
* **Department Routing**: Routes proposed solutions to the Department Head for institutional sign-off.

### 🏛️ 3. Department Admin Portal
* **Admin Dashboard**: Comprehensive dashboard tracking department triage queues and confirmation requests.
* **Complaint Assignment**: Delegate incoming complaints to specific course instructors.
* **Triage & Scope Enforcement**: Formally decline out-of-scope non-teaching matters with justification.
* **Statutory Escalation**: Refer severe misconduct, ethics violations, or retaliatory grading to the Disciplinary Committee.

### ⚖️ 4. Disciplinary Committee Portal (UDC)
* **Committee Docket**: Track escalated severe cases awaiting hearing and review.
* **Case Dossier**: Review confidential complaints, evidence, and tamper-evident audit history.
* **Hearing Adjudication**: Record formal committee rulings, corrective orders/sanctions, and institutional sign-off.

---

## 📂 Project Structure

```text
CMS_PHP/
├── assets/
│   ├── css/
│   │   ├── style.css                # Core design system & responsive layout
│   │   └── nav.css                  # Unified responsive navigation & role badges
│   ├── js/
│   │   └── app.js                   # State engine, demo switcher, and workflow logic
│   └── images/
│       ├── logo.jpg                 # Official Ambo University emblem
│       └── ...                      # PWA icons & favicons
├── config/
│   ├── constants.php                # System constants, roles, and SLA timeframes
│   ├── Crypto.php                   # Argon2id hashing & tamper-evident audit chain
│   └── db.php                       # Secure PDO database connection helper
├── database/
│   ├── schema.sql                   # 10 normalized relational MySQL tables
│   └── seed.sql                     # Canonical 6-record benchmark dataset
├── docs/
│   ├── MILESTONE_25_REPORT.md       # 25% technical submission & demo guide
│   └── INSTITUTIONAL_POLICY.md      # University complaint hierarchy & procedures
├── index.html                       # University CMS portal landing page
├── login.html                       # Multi-role authentication portal (Instant 1-click demos)
├── student_dashboard.html           # Student tracking & metrics overview
├── submit_complaint.html            # Complaint submission form with edit mode
├── my_complaints.html               # Student's filed complaints ledger
├── complaint_details.html           # Complaint audit trail & resolution timeline
├── submission_guide.html            # Official complaint submission policy
├── teacher_dashboard.html           # Faculty assigned complaint queue
├── teacher_respond.html             # Faculty response & resolution submission
├── admin_dashboard.html             # Department administrator overview & metrics
├── admin_all_complaints.html        # Comprehensive complaints registry
├── admin_assign.html                # Task delegation to departmental faculty
├── admin_confirm.html               # Final closure & resolution confirmation
├── admin_escalate.html              # Referral of severe cases to Disciplinary Committee
├── committee_dashboard.html         # Disciplinary Committee docket & review portal
├── committee_complaint_details.html # Confidential hearing dossier
├── committee_decision.html          # Formal hearing adjudication form
├── manifest.json                    # PWA installation manifest
├── sw.js                            # Offline caching service worker
└── README.md                        # Project documentation
```

---

## 💻 Quick Start & Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Jolana30/Complaint-management-system.git
   ```
2. Open `index.html` in your web browser, or serve locally with any static web server:
   ```bash
   # Using Python:
   python -m http.server 8055 --bind 127.0.0.1
   ```
3. Navigate to `http://127.0.0.1:8055/` in your browser.

---

## 🛡️ License & Acknowledgments
Developed for **Ambo University** Institute of Technology (IoT) academic coursework & project implementation.
