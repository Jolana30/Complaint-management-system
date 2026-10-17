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

  // 1. Initial Mock Dataset
  const DEFAULT_COMPLAINTS = [
    {
      id: 'CMP-101',
      studentName: 'John Doe',
      studentId: 'ugr/12345/16',
      department: 'Information Technology',
      course: 'SAD',
      category: 'Assessment & Grading',
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
        { time: '2026-10-12 09:30', title: 'Submitted', text: 'Complaint filed by student John Doe.' },
        { time: '2026-10-12 09:31', title: 'Pending Review', text: 'Awaiting admin assignment to department teacher.' }
      ]
    },
    {
      id: 'CMP-102',
      studentName: 'Seladin Bergecho',
      studentId: 'ugr/14298/16',
      department: 'Information Technology',
      course: 'IP',
      category: 'Communication',
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
      studentName: 'Mahlet Kebede',
      studentId: 'ugr/13441/16',
      department: 'Mechanical Engineering',
      course: 'FDBS',
      category: 'Other',
      urgency: 'low',
      title: 'Library Computer Terminal Network Outage',
      message: 'Computers in the 2nd floor lab lacked internet access during study week.',
      status: 'declined',
      assignedTeacher: null,
      adminRemark: null,
      teacherReply: null,
      declineReason: 'Non-academic facility complaint. Please submit directly to ICT Support or Library Maintenance Office.',
      submittedDate: '2026-10-01',
      timeline: [
        { time: '2026-10-01 16:45', title: 'Submitted', text: 'Complaint filed.' },
        { time: '2026-10-02 10:10', title: 'Declined by Admin', text: 'Re-routed to university ICT Services; closed on teacher portal.' }
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
        { time: timeStr, title: 'Pending Admin Review', text: 'Awaiting review and teacher assignment by university administrator.' }
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
    if (updates.assignedTeacher) item.assignedTeacher = updates.assignedTeacher;
    if (updates.adminRemark) item.adminRemark = updates.adminRemark;
    if (updates.teacherReply) item.teacherReply = updates.teacherReply;
    if (updates.declineReason) item.declineReason = updates.declineReason;

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
        <li><a class="nav-link ${currentPage === 'submission_guide.html' ? 'active' : ''}" href="submission_guide.html">Submission Guide</a></li>
        <li><a class="nav-link ${currentPage === 'login.html' ? 'active' : ''}" href="login.html">Login</a></li>
      `;
    } else if (user.role === 'student') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'student_dashboard.html' ? 'active' : ''}" href="student_dashboard.html">Dashboard</a></li>
        <li><a class="nav-link ${currentPage === 'submit_complaint.html' ? 'active' : ''}" href="submit_complaint.html">Submit Complaint</a></li>
        <li><a class="nav-link ${currentPage === 'my_complaints.html' ? 'active' : ''}" href="my_complaints.html">My Complaints</a></li>
        <li><a class="nav-link ${currentPage === 'submission_guide.html' ? 'active' : ''}" href="submission_guide.html">Guide</a></li>
      `;
    } else if (user.role === 'teacher') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'teacher_dashboard.html' ? 'active' : ''}" href="teacher_dashboard.html">Teacher Dashboard</a></li>
      `;
    } else if (user.role === 'admin') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'admin_dashboard.html' ? 'active' : ''}" href="admin_dashboard.html">Admin Dashboard</a></li>
        <li><a class="nav-link ${currentPage === 'admin_all_complaints.html' ? 'active' : ''}" href="admin_all_complaints.html">All Complaints</a></li>
      `;
    }

    navLinksContainer.innerHTML = linksHtml;

    // Render User Badge in Navbar
    if (userBadgeContainer) {
      if (user) {
        userBadgeContainer.innerHTML = `
          <div class="user-profile-badge">
            <span>${user.name}</span>
            <span class="user-role-pill">${user.role}</span>
          </div>
          <button class="btn btn-secondary btn-sm" id="logoutBtn" style="padding:5px 10px;">Logout</button>
        `;
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', logout);
      } else {
        userBadgeContainer.innerHTML = `
          <a class="btn btn-sm" href="login.html">Login</a>
        `;
      }
    }
  }

  // 7. PWA Service Worker & Install Prompt
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

  // 8. Expose Global CMS API
  window.AmboCMS = {
    getComplaints,
    getComplaintById,
    addComplaint,
    updateComplaintStatus,
    getCurrentUser,
    setCurrentUser,
    logout,
    showToast,
    toggleTheme
  };

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderNavigation();
    initPWA();
  });

})();
