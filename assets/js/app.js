/**
 * Ambo University Complaint Management System (CMS)
 * Shared Application & Interactive Workflow Engine
 */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    THEME: 'ambo_cms_theme',
    USER: 'ambo_cms_user',
    COMPLAINTS: 'ambo_cms_complaints',
  };

  // 1. Initial Mock Dataset (Canonical 6-Record Dataset with Disciplinary Committee Escalation)
  const DEFAULT_COMPLAINTS = [
    {
      id: 'CMP-101',
      studentName: 'Abebe Kebede',
      studentId: 'ugr/12345/16',
      department: 'Information Technology',
      course: 'SAD',
      category: 'Assessment & Grading',
      severity: 'normal',
      urgency: 'high',
      title: 'Unfair Grading on Mid-Exam Question 4',
      message: 'My final answer was mathematically correct according to the reference slides, but points were deducted without explanation. I request a re-evaluation.',
      status: 'pending',
      assignedTeacher: null,
      adminRemark: null,
      teacherReply: null,
      declineReason: null,
      submittedDate: '2026-10-12',
      timeline: [
        { time: '2026-10-12 09:30', title: 'Submitted', text: 'Complaint filed by student Abebe Kebede.' },
        { time: '2026-10-12 09:31', title: 'Pending Triage', text: 'Awaiting admin triage and teacher assignment by academic affairs.' }
      ]
    },
    {
      id: 'CMP-102',
      studentName: 'Seladin Bergecho',
      studentId: 'ugr/14298/16',
      department: 'Information Technology',
      course: 'IP',
      category: 'Communication',
      severity: 'normal',
      urgency: 'medium',
      title: 'Lab Project Submission Schedule Not Communicated',
      message: 'The deadline for Project Milestone 2 was changed without prior notice in the lecture hall, affecting students commuting from distant campuses.',
      status: 'in_progress',
      assignedTeacher: 'Mr. Eyuel',
      adminRemark: 'Assigned to Mr. Eyuel for clarification on project timeline.',
      teacherReply: null,
      declineReason: null,
      submittedDate: '2026-10-08',
      timeline: [
        { time: '2026-10-08 14:15', title: 'Submitted', text: 'Complaint filed by student Seladin Bergecho.' },
        { time: '2026-10-09 10:00', title: 'Assigned', text: 'Assigned to Mr. Eyuel by Admin.' },
        { time: '2026-10-09 11:20', title: 'Under Review', text: 'Teacher marked complaint as In Progress.' }
      ]
    },
    {
      id: 'CMP-103',
      studentName: 'Adane Girma',
      studentId: 'ugr/11054/16',
      department: 'Electrical and Computer Engineering',
      course: 'DSA',
      category: 'Attendance Policy',
      severity: 'normal',
      urgency: 'medium',
      title: 'Irregular Attendance Records During Field Trip',
      message: 'Students on an official university visit were marked absent for the Monday lab session.',
      status: 'needs_confirmation',
      assignedTeacher: 'Mr. Eyuel',
      adminRemark: 'Please review official field permission slip.',
      teacherReply: 'I have verified the departmental permission letter. Attendance records have been adjusted to Excused for all attendees.',
      declineReason: null,
      submittedDate: '2026-10-05',
      timeline: [
        { time: '2026-10-05 11:00', title: 'Submitted', text: 'Complaint filed by Adane Girma.' },
        { time: '2026-10-06 09:40', title: 'Assigned', text: 'Assigned to course teacher Mr. Eyuel.' },
        { time: '2026-10-10 16:20', title: 'Response Submitted', text: 'Teacher drafted resolution; sent to Admin for final confirmation.' }
      ]
    },
    {
      id: 'CMP-104',
      studentName: 'Degu Debebe',
      studentId: 'ugr/15670/16',
      department: 'Computer Science',
      course: 'OS',
      category: 'Assessment & Grading',
      severity: 'normal',
      urgency: 'high',
      title: 'Missing Lab Assessment Result in Portal',
      message: 'My Lab Exam score of 15% was not submitted to the central database.',
      status: 'resolved',
      assignedTeacher: 'Mr. Bekele',
      adminRemark: 'Admin confirmed and updated student portal ledger.',
      teacherReply: 'Lab score sheet was corrected and submitted to department registrar on Oct 03.',
      declineReason: null,
      submittedDate: '2026-09-28',
      timeline: [
        { time: '2026-09-28 10:00', title: 'Submitted', text: 'Complaint filed.' },
        { time: '2026-09-29 11:30', title: 'Assigned', text: 'Assigned to Mr. Bekele.' },
        { time: '2026-10-03 14:00', title: 'Response Submitted', text: 'Teacher verified mark sheets.' },
        { time: '2026-10-04 09:15', title: 'Resolved', text: 'Admin confirmed resolution. Case closed.' }
      ]
    },
    {
      id: 'CMP-105',
      studentName: 'Kenenisa Tola',
      studentId: 'ugr/16789/16',
      department: 'Computer Science',
      course: 'OS',
      category: 'Severe Misconduct / Harassment',
      severity: 'serious',
      urgency: 'critical',
      title: 'Intimidation and Retaliatory Grading Threat',
      message: 'Complainant reports direct threats of academic penalty after raising concerns regarding unauthorized textbook sales in class.',
      status: 'escalated',
      assignedTeacher: null,
      adminRemark: 'Escalated by Department Head to Disciplinary Committee for formal statutory hearing.',
      teacherReply: null,
      declineReason: null,
      submittedDate: '2026-10-14',
      timeline: [
        { time: '2026-10-14 11:20', title: 'Submitted', text: 'Severe complaint filed by student Kenenisa Tola.' },
        { time: '2026-10-14 14:00', title: 'Escalated to Committee', text: 'Department Head escalated case to Disciplinary Committee for formal statutory hearing.' }
      ]
    },
    {
      id: 'CMP-106',
      studentName: 'Tigist Alemu',
      studentId: 'ugr/18901/16',
      department: 'Information Technology',
      course: 'SAD',
      category: 'Other',
      severity: 'normal',
      urgency: 'low',
      title: 'Library Study Space Insufficient Heating',
      message: 'Study cubicles in the engineering library branch lack functional power outlets and heating in the evening hours.',
      status: 'declined',
      assignedTeacher: null,
      adminRemark: null,
      teacherReply: null,
      declineReason: 'Out of scope: Department grievance system handles teaching and learning processes. Routed to Campus Facilities Directorate.',
      submittedDate: '2026-10-15',
      timeline: [
        { time: '2026-10-15 08:45', title: 'Submitted', text: 'Complaint filed.' },
        { time: '2026-10-15 11:30', title: 'Declined by Admin', text: 'Declined as out-of-scope non-teaching facility issue; routed to Campus Facilities Directorate.' }
      ]
    }
  ];

  // 2. Storage Helper Methods
  function getComplaints() {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(DEFAULT_COMPLAINTS));
      return DEFAULT_COMPLAINTS;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return DEFAULT_COMPLAINTS;
    }
  }

  function saveComplaints(complaints) {
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
  }

  function getComplaintById(id) {
    const list = getComplaints();
    return list.find(c => c.id === id) || null;
  }

  function addComplaint(data) {
    const list = getComplaints();
    const nextNumber = 100 + list.length + 1;
    const newId = `CMP-${nextNumber}`;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const newRecord = {
      id: newId,
      studentName: data.studentName || 'Student',
      studentId: data.studentId || 'ugr/00000/16',
      department: data.department || 'Information Technology',
      course: data.course || 'General',
      category: data.category || 'General',
      severity: data.severity || 'normal',
      urgency: data.urgency || 'medium',
      title: data.title || 'Untitled Complaint',
      message: data.message || '',
      status: 'pending',
      assignedTeacher: null,
      adminRemark: null,
      teacherReply: null,
      declineReason: null,
      submittedDate: dateStr,
      timeline: [
        { time: timeStr, title: 'Submitted', text: `Complaint registered by ${data.studentName || 'student'}.` },
        { time: timeStr, title: 'Pending Admin Review', text: 'Awaiting triage and assignment by department administrator.' }
      ]
    };

    list.unshift(newRecord);
    saveComplaints(list);
    return newRecord;
  }

  function updateComplaintStatus(id, updates) {
    const list = getComplaints();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return null;

    const item = list[idx];
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    if (updates.status) item.status = updates.status;
    if (updates.severity) item.severity = updates.severity;
    if (updates.assignedTeacher !== undefined) item.assignedTeacher = updates.assignedTeacher;
    if (updates.adminRemark !== undefined) item.adminRemark = updates.adminRemark;
    if (updates.teacherReply !== undefined) item.teacherReply = updates.teacherReply;
    if (updates.declineReason !== undefined) item.declineReason = updates.declineReason;
    if (updates.committeeDecision !== undefined) item.committeeDecision = updates.committeeDecision;

    if (updates.timelineEvent) {
      item.timeline.push({
        time: now,
        title: updates.timelineEvent.title,
        text: updates.timelineEvent.text
      });
    }

    list[idx] = item;
    saveComplaints(list);
    return item;
  }

  function escalateComplaint(id, reason) {
    return updateComplaintStatus(id, {
      status: 'escalated',
      severity: 'serious',
      adminRemark: `Escalated by Department Head to Disciplinary Committee. Reason: "${reason}"`,
      timelineEvent: {
        title: 'Escalated to Disciplinary Committee',
        text: `Department Head escalated case for statutory disciplinary review. Rationale: "${reason}"`
      }
    });
  }

  function submitCommitteeDecision(id, decisionData) {
    return updateComplaintStatus(id, {
      status: 'resolved',
      committeeDecision: decisionData.decisionText,
      adminRemark: `Disciplinary Committee Determination: ${decisionData.actionRecommended}`,
      timelineEvent: {
        title: 'Committee Decision Rendered',
        text: `Hearing completed on ${decisionData.hearingDate || 'scheduled date'}. Finding: "${decisionData.decisionText}". Recommendation: "${decisionData.actionRecommended}". Case officially closed.`
      }
    });
  }

  function declineComplaint(id, reason) {
    return updateComplaintStatus(id, {
      status: 'declined',
      declineReason: reason,
      timelineEvent: {
        title: 'Declined by Administrator',
        text: `Complaint declined as out-of-scope. Reason: "${reason}"`
      }
    });
  }

  function editComplaint(id, updates) {
    const list = getComplaints();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return null;
    const item = list[idx];
    if (item.status !== 'pending') {
      throw new Error('Complaints can only be edited while in Pending status.');
    }
    if (updates.title) item.title = updates.title;
    if (updates.message) item.message = updates.message;
    if (updates.course) item.course = updates.course;
    if (updates.department) item.department = updates.department;
    if (updates.category) item.category = updates.category;
    if (updates.severity) item.severity = updates.severity;
    if (updates.urgency) item.urgency = updates.urgency;

    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    item.timeline.push({
      time: now,
      title: 'Edited by Student',
      text: 'Student updated grievance details during pending triage window.'
    });

    list[idx] = item;
    saveComplaints(list);
    return item;
  }

  function getDisplayStatus(status, userRole) {
    if (userRole === 'student') {
      if (status === 'needs_confirmation' || status === 'assigned') return 'in_progress';
      if (status === 'escalated' || status === 'committee_review') return 'escalated';
    }
    return status;
  }

  function getStatusLabel(status, userRole) {
    if (userRole === 'student') {
      if (status === 'needs_confirmation' || status === 'assigned') return 'In Progress';
      if (status === 'escalated' || status === 'committee_review') return 'Escalated to Committee';
    }
    if (status === 'needs_confirmation') return 'Needs Confirmation';
    if (status === 'in_progress') return 'In Progress';
    if (status === 'committee_review') return 'Committee Review';
    if (status === 'escalated') return 'Escalated to Committee';
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  // 3. User Authentication State
  function getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  }

  function logout() {
    setCurrentUser(null);
    showToast('You have been logged out.', 'info');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 400);
  }

  // 4. Toast Notifications
  function showToast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 0.92rem;
      font-weight: 600;
      color: #ffffff;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      pointer-events: auto;
      transition: all 0.25s ease;
      opacity: 0;
      transform: translateY(10px);
      display: flex;
      align-items: center;
      gap: 10px;
    `;

    if (type === 'success') toast.style.backgroundColor = '#059669';
    else if (type === 'danger' || type === 'error') toast.style.backgroundColor = '#dc2626';
    else if (type === 'warning') toast.style.backgroundColor = '#d97706';
    else toast.style.backgroundColor = '#2563eb';

    toast.innerHTML = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  // 5. Theme Switcher
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    document.documentElement.dataset.theme = saved;
    updateThemeButtons(saved);
  }

  function toggleTheme() {
    const current = document.documentElement.dataset.theme || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem(STORAGE_KEYS.THEME, next);
    updateThemeButtons(next);
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }

  // 6. Navigation Renderer & Role Protection
  function renderNavigation() {
    const user = getCurrentUser();
    const navLinksContainer = document.getElementById('navLinks');
    const userBadgeContainer = document.getElementById('navUserBadge');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Update Theme Toggle Buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // Mobile Hamburger Handler
    const mobileToggle = document.getElementById('mobileNavToggle');
    if (mobileToggle && navLinksContainer) {
      mobileToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
      });
    }

    if (!navLinksContainer) return;

    let linksHtml = '';

    if (!user) {
      // Guest Links
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'submission_guide.html' ? 'active' : ''}" href="submission_guide.html">Guide</a></li>
        <li><a class="nav-link ${currentPage === 'login.html' ? 'active' : ''}" href="login.html">Login</a></li>
      `;
    } else if (user.role === 'student') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'student_dashboard.html' ? 'active' : ''}" href="student_dashboard.html">Dashboard</a></li>
        <li><a class="nav-link ${currentPage === 'my_complaints.html' ? 'active' : ''}" href="my_complaints.html">My Complaints</a></li>
      `;
    } else if (user.role === 'teacher') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'teacher_dashboard.html' ? 'active' : ''}" href="teacher_dashboard.html">Dashboard</a></li>
      `;
    } else if (user.role === 'admin') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'admin_dashboard.html' ? 'active' : ''}" href="admin_dashboard.html">Dashboard</a></li>
        <li><a class="nav-link ${currentPage === 'admin_all_complaints.html' ? 'active' : ''}" href="admin_all_complaints.html">All Complaints</a></li>
      `;
    } else if (user.role === 'committee') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'committee_dashboard.html' ? 'active' : ''}" href="committee_dashboard.html">Docket</a></li>
      `;
    }

    navLinksContainer.innerHTML = linksHtml;

    // Render Compact Profile & Role Switcher in Navbar
    if (userBadgeContainer) {
      if (user) {
        userBadgeContainer.innerHTML = `
          <select id="quickDemoSwitch" class="nav-user-select" title="Active Account & Role (Click to switch demo role)">
            <option value="student" ${user.role === 'student' ? 'selected' : ''}>Abebe (Student)</option>
            <option value="teacher" ${user.role === 'teacher' ? 'selected' : ''}>Mr. Eyuel (Teacher)</option>
            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Dr. Tadesse (Admin)</option>
            <option value="committee" ${user.role === 'committee' ? 'selected' : ''}>Dr. Daniel (UDC)</option>
          </select>
          <button class="nav-logout-btn" id="logoutBtn" title="Log out">Logout</button>
        `;
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', logout);
      } else {
        userBadgeContainer.innerHTML = `
          <select id="quickDemoSwitch" class="nav-user-select" title="Select demo profile">
            <option value="" disabled selected>Demo Profile ▾</option>
            <option value="student">Student (Abebe)</option>
            <option value="teacher">Teacher (Mr. Eyuel)</option>
            <option value="admin">Admin (Dr. Tadesse)</option>
            <option value="committee">Committee (Dr. Daniel)</option>
          </select>
          <a class="nav-login-btn" href="login.html">Login</a>
        `;
      }

      const demoSelect = document.getElementById('quickDemoSwitch');
      if (demoSelect) {
        demoSelect.addEventListener('change', (e) => {
          switchDemoRole(e.target.value);
        });
      }
    }
  }

  // 7. Demo Role Switcher Engine
  const DEMO_USERS = {
    student: { id: 1, name: 'Abebe Kebede', role: 'student', email: 'student@ambo.edu.et', studentId: 'ugr/12345/16', department: 'Information Technology' },
    teacher: { id: 5, name: 'Mr. Eyuel', role: 'teacher', email: 'eyuel.t@ambo.edu.et', department: 'Information Technology' },
    admin: { id: 7, name: 'Dr. Tadesse', role: 'admin', email: 'admin@ambo.edu.et', department: 'Information Technology' },
    committee: { id: 8, name: 'Dr. Daniel', role: 'committee', email: 'committee@ambo.edu.et', department: 'Computer Science' }
  };

  function switchDemoRole(role) {
    if (!DEMO_USERS[role]) return;
    setCurrentUser(DEMO_USERS[role]);
    showToast(`Switched to demo role: ${DEMO_USERS[role].name} (${role.toUpperCase()})`, 'success', 2000);
    setTimeout(() => {
      if (role === 'student') window.location.href = 'student_dashboard.html';
      else if (role === 'teacher') window.location.href = 'teacher_dashboard.html';
      else if (role === 'admin') window.location.href = 'admin_dashboard.html';
      else if (role === 'committee') window.location.href = 'committee_dashboard.html';
    }, 280);
  }

  // 8. Utility: Debounce Function for Real-Time Search & Inputs
  function debounce(fn, delay = 250) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // 9. Complaint Form Draft Auto-Save Engine
  const DRAFT_STORAGE_KEY = 'ambo_cms_draft_complaint';

  function initDraftAutoSave() {
    const form = document.getElementById('complaintForm');
    if (!form) return;

    const monitoredFields = ['department', 'courseName', 'complaintTitle', 'urgency', 'complaintMessage'];

    // Restore draft if exists
    try {
      const rawDraft = sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (rawDraft) {
        const draft = JSON.parse(rawDraft);
        let restoredCount = 0;
        monitoredFields.forEach(field => {
          const el = document.getElementById(field);
          if (el && draft[field] !== undefined && draft[field] !== '') {
            el.value = draft[field];
            restoredCount++;
          }
        });
        if (draft.category) {
          const radio = form.querySelector(`input[name="category"][value="${draft.category}"]`);
          if (radio) {
            radio.checked = true;
            restoredCount++;
          }
        }
        if (restoredCount > 0) {
          showToast('Draft restored from your current session.', 'info', 2500);
        }
      }
    } catch (e) {
      console.warn('[Ambo CMS] Draft restoration error:', e);
    }

    // Auto-save on input with debouncing
    const saveDraftDebounced = debounce(() => {
      const draft = {};
      monitoredFields.forEach(field => {
        const el = document.getElementById(field);
        if (el) draft[field] = el.value;
      });
      const selectedRadio = form.querySelector('input[name="category"]:checked');
      if (selectedRadio) draft.category = selectedRadio.value;
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }, 350);

    form.addEventListener('input', saveDraftDebounced);
    form.addEventListener('change', saveDraftDebounced);

    // Clear draft on submission
    form.addEventListener('submit', () => {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    });
  }

  // 10. Student ID Format Validator (Ethiopian University Format: ugr/xxxxx/xx)
  function initStudentIdValidator() {
    const studentIdInput = document.getElementById('studentId');
    if (!studentIdInput) return;

    const pattern = /^ugr\/\d{5}\/\d{2}$/i;
    studentIdInput.addEventListener('input', () => {
      const val = studentIdInput.value.trim();
      if (!val) {
        studentIdInput.style.borderColor = '';
        return;
      }
      if (pattern.test(val)) {
        studentIdInput.style.borderColor = 'var(--success)';
      } else {
        studentIdInput.style.borderColor = 'var(--warning)';
      }
    });
  }

  // 11. PWA Service Worker & Install Prompt
  let deferredInstallPrompt = null;

  function initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('[Ambo CMS PWA] Service Worker registered with scope:', reg.scope);
          })
          .catch((err) => {
            console.log('[Ambo CMS PWA] Service Worker registration failed:', err);
          });
      });
    }

    // Capture install prompt for PWA
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      showPwaInstallButton();
    });

    // Offline / Online Detection
    window.addEventListener('online', () => {
      showToast('🌐 Internet connection restored.', 'success');
    });

    window.addEventListener('offline', () => {
      showToast('⚠️ You are offline. CMS is running from local cache.', 'warning');
    });
  }

  function showPwaInstallButton() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions || document.getElementById('pwaInstallBtn')) return;

    const installBtn = document.createElement('button');
    installBtn.id = 'pwaInstallBtn';
    installBtn.className = 'btn btn-sm btn-secondary';
    installBtn.innerHTML = '📲 Install App';
    installBtn.style.padding = '6px 10px';
    installBtn.style.fontSize = '0.82rem';

    installBtn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        showToast('Thank you for installing Ambo CMS!', 'success');
      }
      deferredInstallPrompt = null;
      installBtn.remove();
    });

    navActions.prepend(installBtn);
  }

  // 12. Expose Global CMS API
  window.AmboCMS = {
    getComplaints,
    getComplaintById,
    addComplaint,
    updateComplaintStatus,
    escalateComplaint,
    submitCommitteeDecision,
    declineComplaint,
    editComplaint,
    getDisplayStatus,
    getStatusLabel,
    getCurrentUser,
    setCurrentUser,
    switchDemoRole,
    logout,
    showToast,
    toggleTheme,
    debounce,
    DEMO_USERS,
    DEFAULT_COMPLAINTS
  };

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderNavigation();
    initDraftAutoSave();
    initStudentIdValidator();
    initPWA();
  });

})();
