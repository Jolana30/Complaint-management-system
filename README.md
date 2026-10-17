# 🏛️ Ambo University - Student to Teacher Complaint Management System

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Ambo University](https://img.shields.io/badge/-Ambo%20University-10B981?style=for-the-badge)

A web-based **Student-to-Teacher Complaint Management System** designed for **Ambo University** to streamline, track, and resolve academic and administrative complaints through a structured 3-tier user workflow (Student, Teacher, Admin).

---

## 🚀 Key Features & User Roles

### 🎓 1. Student Portal
* **Submit Complaints**: User-friendly form to log academic or departmental grievances.
* **My Complaints Dashboard**: View real-time complaint status (*Pending*, *In-Progress*, *Resolved*, or *Declined*).
* **Edit & Update**: Modify active complaints before resolution.
* **Submission Guide**: Clear instructions on university grievance procedures.

### 👨‍🏫 2. Teacher Portal
* **Teacher Dashboard**: Overview of complaints assigned by students or departmental admins.
* **Resolution Center**: Directly reply to student complaints and post resolution reports.
* **Escalation Management**: Escalate unresolved complex issues directly to the Department Admin.

### 🏛️ 3. Department Admin Portal
* **Admin Dashboard**: Comprehensive dashboard of all university complaints across departments.
* **Complaint Assignment**: Delegate incoming complaints to specific course instructors/teachers.
* **Status Oversight & Confirmation**: Final approval and closure of resolved complaints.

---

## 📂 Project Structure

```text
CMS_PHP/
├── assets/
│   ├── css/
│   │   ├── style.css                # Core design system & responsive layout
│   │   └── nav.css                  # Unified responsive navigation & theme styles
│   ├── js/
│   │   └── app.js                   # State engine, localStorage store, workflow logic
│   └── images/
│       ├── logo.jpg                 # Official Ambo University emblem
│       └── ...                      # PWA icons & favicons
├── index.html                       # University CMS portal landing page
├── login.html                       # Multi-role authentication portal (Student/Teacher/Admin)
├── student_dashboard.html           # Student tracking & metrics overview
├── submit_complaint.html            # Grievance submission form
├── my_complaints.html               # Student's filed complaints ledger
├── complaint_details.html           # Complaint audit trail & resolution timeline
├── submission_guide.html            # Official grievance submission policy
├── teacher_dashboard.html           # Faculty assigned grievance queue
├── teacher_respond.html             # Faculty response & resolution submission
├── admin_dashboard.html             # Department administrator overview & metrics
├── admin_all_complaints.html        # Comprehensive complaints registry
├── admin_assign.html                # Task delegation to departmental faculty
├── admin_confirm.html               # Final closure & resolution confirmation
├── manifest.json                    # PWA installation manifest
├── sw.js                            # Offline caching service worker
├── AGENTS.md / GEMINI.md            # Workspace isolation & engineering guidelines
└── README.md                        # Documentation
```

---

## 💻 Quick Start & Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Jolana30/Complaint-management-system.git
   ```
2. Open `index.html` in your web browser, or serve locally with any static web server:
   ```bash
   # Using Python 3:
   python -m http.server 3000
   ```
3. Navigate to `http://localhost:3000/` in your browser.

---

## 🛡️ License & Acknowledgments
Developed for **Ambo University** academic coursework & project implementation.
