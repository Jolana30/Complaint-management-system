# 🏛️ Ambo University - Student to Teacher Complaint Management System

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
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
Complaint-management-system/
├── ip-project/                      # Core Web Application Prototype
│   ├── Home.html                    # System Landing Page
│   ├── Student_Dashboard.html       # Student Portal View
│   ├── Submit_Complaint.html        # Complaint Submission Form
│   ├── My_Complaints.html           # Student Complaint History
│   ├── Teacher_Dashboard.html       # Teacher Portal View
│   ├── Teacher_Complaint_Details.html # Teacher Complaint Processing
│   ├── Admin_Dashboard1.html        # Department Admin Control Center
│   ├── Assign_Complaint.html        # Admin Task Delegation
│   ├── shared.js                    # Core Application Logic & State
│   └── Nav.css                      # Unified Navigation Styling
├── react-app/                       # React Web Application Architecture
├── .gitignore                       # Repository Ignore Configuration
└── README.md                        # Documentation
```

---

## 💻 Quick Start & Running Locally

### Option A: Web Prototype (HTML/JS)
1. Clone the repository:
   ```bash
   git clone https://github.com/Jolana30/Complaint-management-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Complaint-management-system/ip-project
   ```
3. Open `Home.html` or `index.html` in your web browser.

### Option B: React Application
1. Navigate to the `react-app` folder:
   ```bash
   cd react-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## 🛡️ License & Acknowledgments
Developed for **Ambo University** academic coursework & project implementation.
