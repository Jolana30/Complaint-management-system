(function () {
  'use strict';

  const STORAGE_KEYS = {
    THEME: 'ambo_cms_theme',
    USER: 'ambo_cms_user',
    COMPLAINTS: 'ambo_cms_complaints',
  };

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
      declineReason: 'Out of scope: Department complaint system handles teaching and learning processes. Routed to Campus Facilities Directorate.',
      submittedDate: '2026-10-15',
      timeline: [
        { time: '2026-10-15 08:45', title: 'Submitted', text: 'Complaint filed.' },
        { time: '2026-10-15 11:30', title: 'Declined by Admin', text: 'Declined as out-of-scope non-teaching facility issue; routed to Campus Facilities Directorate.' }
      ]
    }
  ];

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

    const isSerious = data.severity === 'serious';
    const initialStatus = isSerious ? 'committee_review' : 'pending';

    const timeline = [
      { time: timeStr, title: 'Submitted', text: `Complaint registered by ${data.studentName || 'student'}.` }
    ];

    if (isSerious) {
      timeline.push({
        time: timeStr,
        title: 'Referred to Disciplinary Committee',
        text: 'Due to serious severity classification, this complaint was routed for Administrative Screening and Disciplinary Committee referral.'
      });
    } else {
      timeline.push({
        time: timeStr,
        title: 'Pending Admin Review',
        text: 'Awaiting triage and assignment by department administrator.'
      });
    }

    const newRecord = {
      id: newId,
      studentName: data.studentName || 'Student',
      studentId: data.studentId || 'ugr/00000/16',
      department: data.department || 'Information Technology',
      course: data.course || 'General',
      category: data.category || 'General',
      severity: data.severity || 'normal',
      urgency: data.urgency || (isSerious ? 'critical' : 'medium'),
      title: data.title || 'Untitled Complaint',
      message: data.message || '',
      status: initialStatus,
      assignedTeacher: null,
      adminRemark: isSerious ? 'Automated Referral: Routed for Administrative Screening and Committee Review.' : null,
      teacherReply: null,
      teacherAttachment: null,
      declineReason: null,
      declineReasonType: null,
      submittedDate: dateStr,
      incidentDate: data.incidentDate || dateStr,
      attachmentName: data.attachmentName || null,
      timeline: timeline
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
    if (updates.teacherAttachment !== undefined) item.teacherAttachment = updates.teacherAttachment;
    if (updates.declineReason !== undefined) item.declineReason = updates.declineReason;
    if (updates.declineReasonType !== undefined) item.declineReasonType = updates.declineReasonType;
    if (updates.committeeDecision !== undefined) item.committeeDecision = updates.committeeDecision;
    if (updates.incidentDate !== undefined) item.incidentDate = updates.incidentDate;
    if (updates.attachmentName !== undefined) item.attachmentName = updates.attachmentName;

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
      text: 'Student updated complaint details during pending triage window.'
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
      if (status === 'flagged_investigation') return 'Under Investigation';
    }
    if (status === 'needs_confirmation') return 'Needs Confirmation';
    if (status === 'in_progress') return 'In Progress';
    if (status === 'committee_review') return 'Committee Review';
    if (status === 'escalated') return 'Escalated to Committee';
    if (status === 'flagged_investigation') return 'Under Investigation';
    if (status === 'declined') return 'Declined';
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

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

  function renderThemeSwitchSvg(theme) {
    if (theme === 'dark') {
      return `
        <svg class="theme-switch-svg dark" width="46" height="24" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <!-- Capsule Track (Dark Mode) -->
          <rect x="0.5" y="0.5" width="45" height="23" rx="11.5" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <!-- Subtle Sun Silhouette on Left -->
          <circle cx="12" cy="12" r="3" fill="#64748b" opacity="0.4"/>
          <path d="M12 6.5v1M12 16.5v1M6.5 12h1M16.5 12h1M8.1 8.1l.7.7M15.2 15.2l.7.7M8.1 15.9l.7-.7M15.2 8.8l.7-.7" stroke="#64748b" stroke-width="1" stroke-linecap="round" opacity="0.4"/>
          <!-- Sliding Thumb on Right (Moon) -->
          <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
            <circle cx="34" cy="12" r="9.5" fill="#0f172a" stroke="#475569" stroke-width="0.75" />
            <path d="M33 7.8a4.5 4.5 0 0 0 4.2 4.2 4.8 4.8 0 1 1-4.2-4.2z" fill="#60a5fa" />
            <circle cx="37" cy="8.5" r="0.8" fill="#93c5fd" />
            <circle cx="31" cy="15.5" r="0.6" fill="#93c5fd" opacity="0.8" />
          </g>
        </svg>
      `;
    } else {
      return `
        <svg class="theme-switch-svg light" width="46" height="24" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <!-- Capsule Track (Light Mode) -->
          <rect x="0.5" y="0.5" width="45" height="23" rx="11.5" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>
          <!-- Subtle Moon Silhouette on Right -->
          <path d="M34.5 7.5a4.5 4.5 0 0 0 4.2 4.2 5 5 0 1 1-4.2-4.2z" fill="#94a3b8" opacity="0.45"/>
          <circle cx="38" cy="8.5" r="0.8" fill="#94a3b8" opacity="0.45"/>
          <!-- Sliding Thumb on Left (Sun) -->
          <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.18))">
            <circle cx="12" cy="12" r="9.5" fill="#ffffff" />
            <circle cx="12" cy="12" r="4.2" fill="#f59e0b" />
            <path d="M12 4.8v1.4M12 17.8v1.4M4.8 12h1.4M17.8 12h1.4M6.9 6.9l1 1M16.1 16.1l1 1M6.9 17.1l1-1M16.1 7.9l1-1" stroke="#f59e0b" stroke-width="1.3" stroke-linecap="round"/>
          </g>
        </svg>
      `;
    }
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.innerHTML = renderThemeSwitchSvg(theme);
      btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }

  function setupTelegramPopover(user) {
    if (!user) {
      const existing = document.getElementById('telegramPopover');
      if (existing) existing.remove();
      return;
    }
    const active = user;
    const initial = (active.name || 'U').charAt(0).toUpperCase();

    let popover = document.getElementById('telegramPopover');
    if (!popover) {
      popover = document.createElement('aside');
      popover.id = 'telegramPopover';
      popover.className = 'telegram-popover';
      popover.setAttribute('role', 'dialog');
      popover.setAttribute('aria-label', 'Profile Information');
      document.body.appendChild(popover);
    }

    const isStudent = active.role === 'student';
    const isTeacher = active.role === 'teacher';
    const isAdmin = active.role === 'admin';
    const isCommittee = active.role === 'committee';

    let roleName = 'Undergraduate Student';
    let idLabel = 'Student ID';
    let idVal = active.studentId || 'ugr/12345/16';
    let deptLabel = 'Department';
    let deptName = active.department || 'Information Technology';

    if (isTeacher) {
      roleName = 'Course Instructor / Faculty';
      idLabel = 'Faculty ID';
      idVal = active.staffId || 'FAC/4891/08';
      deptLabel = 'Department';
      deptName = active.department || 'Information Technology';
    } else if (isAdmin) {
      roleName = 'Department Administrator';
      idLabel = 'Administrator ID';
      idVal = active.staffId || 'ADM/1022/02';
      deptLabel = 'Administrative Division';
      deptName = 'Office of Academic Affairs & Admissions';
    } else if (isCommittee) {
      roleName = 'Disciplinary Committee Member';
      idLabel = 'Committee ID';
      idVal = active.staffId || 'UDC/7710/05';
      deptLabel = 'Statutory Authority';
      deptName = 'University Disciplinary Committee (UDC)';
    }

    popover.innerHTML = `
      <div class="telegram-card-header">
        <div class="telegram-user-info">
          <div class="telegram-avatar-badge">${initial}</div>
          <div class="telegram-meta">
            <h3>${active.name}</h3>
            <p>${idVal}</p>
          </div>
        </div>
        <button type="button" id="teleCloseBtn" class="telegram-close-btn" aria-label="Close profile popover">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="telegram-card-body">
        <div class="telegram-detail-row">
          <span class="telegram-label">Full Name</span>
          <span class="telegram-value">${active.name}</span>
        </div>
        <div class="telegram-detail-row">
          <span class="telegram-label">${idLabel}</span>
          <span class="telegram-value" style="font-variant-numeric: tabular-nums;">${idVal}</span>
        </div>
        <div class="telegram-detail-row">
          <span class="telegram-label">Institutional Role</span>
          <span class="telegram-value">${roleName}</span>
        </div>
        <div class="telegram-detail-row">
          <span class="telegram-label">${deptLabel}</span>
          <span class="telegram-value">${deptName}</span>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById('teleCloseBtn');
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        closePopover();
      };
    }

    function togglePopover() {
      const isOpen = popover.classList.contains('open');
      if (isOpen) closePopover();
      else openPopover();
    }

    function openPopover() {
      popover.classList.add('open');
      const trig = document.getElementById('navProfileTrigger');
      if (trig) trig.classList.add('active');
    }

    function closePopover() {
      popover.classList.remove('open');
      const trig = document.getElementById('navProfileTrigger');
      if (trig) trig.classList.remove('active');
    }

    const trigger = document.getElementById('navProfileTrigger');
    if (trigger) {
      trigger.onclick = (e) => {
        e.stopPropagation();
        togglePopover();
      };
    }

    document.addEventListener('click', (e) => {
      if (popover && popover.classList.contains('open')) {
        const trig = document.getElementById('navProfileTrigger');
        if (!popover.contains(e.target) && (!trig || !trig.contains(e.target))) {
          closePopover();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePopover();
    });
  }

  function renderNavigation() {
    const user = getCurrentUser();
    const navLinksContainer = document.getElementById('navLinks');
    const userBadgeContainer = document.getElementById('navUserBadge');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    const mobileToggle = document.getElementById('mobileNavToggle');
    if (mobileToggle && navLinksContainer) {
      mobileToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
      });
    }

    if (!navLinksContainer) return;

    let linksHtml = '';

    if (!user) {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'submission_guide.html' ? 'active' : ''}" href="submission_guide.html">Workflow Guide</a></li>
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

    if (userBadgeContainer) {
      if (user && currentPage !== 'login.html') {
        const initial = (user.name || 'U').charAt(0).toUpperCase();
        const profilePillHtml = `
          <button type="button" id="navProfileTrigger" class="nav-profile-pill" aria-label="Open Profile Details" title="Click to view credentials">
            <span class="nav-profile-avatar">${initial}</span>
            <span>${user.name}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        `;

        userBadgeContainer.innerHTML = `
          ${profilePillHtml}
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
        setupTelegramPopover(user);
      } else {
        userBadgeContainer.innerHTML = `
          <select id="quickDemoSwitch" class="nav-user-select" title="Select demo profile">
            <option value="" disabled selected>Demo Profile ▾</option>
            <option value="student">Student (Abebe)</option>
            <option value="teacher">Teacher (Mr. Eyuel)</option>
            <option value="admin">Admin (Dr. Tadesse)</option>
            <option value="committee">Committee (Dr. Daniel)</option>
          </select>
          <a class="nav-login-btn ${currentPage === 'login.html' ? 'active' : ''}" href="login.html">Sign In</a>
        `;
        setupTelegramPopover(null);
      }

      const demoSelect = document.getElementById('quickDemoSwitch');
      if (demoSelect) {
        demoSelect.addEventListener('change', (e) => {
          switchDemoRole(e.target.value);
        });
      }
    }
  }

  const DEMO_USERS = {
    student: { id: 1, name: 'Abebe Kebede', role: 'student', email: 'student@ambo.edu.et', studentId: 'ugr/12345/16', department: 'Information Technology' },
    teacher: { id: 5, name: 'Mr. Eyuel', role: 'teacher', email: 'eyuel.t@ambo.edu.et', staffId: 'FAC/4891/08', department: 'Information Technology' },
    admin: { id: 7, name: 'Dr. Tadesse', role: 'admin', email: 'admin@ambo.edu.et', staffId: 'ADM/1022/02', department: 'Information Technology' },
    committee: { id: 8, name: 'Dr. Daniel', role: 'committee', email: 'committee@ambo.edu.et', staffId: 'UDC/7710/05', jurisdiction: 'University Disciplinary Committee (UDC)' }
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

  function debounce(fn, delay = 250) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  const DRAFT_STORAGE_KEY = 'ambo_cms_draft_complaint';

  function initDraftAutoSave() {
    const form = document.getElementById('complaintForm');
    if (!form) return;

    const monitoredFields = ['department', 'courseName', 'complaintTitle', 'urgency', 'complaintMessage'];

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

    form.addEventListener('submit', () => {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    });
  }

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

  let deferredInstallPrompt = null;

  function initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            reg.update();
            console.log('[Ambo CMS PWA] Service Worker registered and updated with scope:', reg.scope);
          })
          .catch((err) => {
            console.log('[Ambo CMS PWA] Service Worker registration failed:', err);
          });
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      showPwaInstallPopup();
    });

    window.addEventListener('online', () => {
      showToast('Internet connection restored.', 'success');
    });

    window.addEventListener('offline', () => {
      showToast('You are offline. CMS is running from local cache.', 'warning');
    });
  }

  function showPwaInstallPopup() {
    if (sessionStorage.getItem('ambo_pwa_prompt_dismissed') === 'true') return;
    if (document.getElementById('pwaInstallPopup')) return;

    const popup = document.createElement('div');
    popup.id = 'pwaInstallPopup';
    popup.className = 'pwa-install-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-labelledby', 'pwaInstallTitle');
    popup.setAttribute('aria-describedby', 'pwaInstallDesc');

    popup.innerHTML = `
      <div class="pwa-popup-header">
        <img src="assets/images/logo.png" alt="Ambo University Logo" class="pwa-popup-logo">
        <div class="pwa-popup-titles">
          <h4 id="pwaInstallTitle">Install Ambo CMS App</h4>
          <p id="pwaInstallDesc">Fast offline access & instant complaint tracking on your device.</p>
        </div>
        <button type="button" class="pwa-popup-close" id="pwaDismissIconBtn" aria-label="Dismiss installation prompt">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="pwa-popup-actions">
        <button type="button" class="btn btn-secondary btn-sm" id="pwaNotNowBtn">Not Now</button>
        <button type="button" class="btn btn-primary btn-sm pwa-install-action" id="pwaInstallActionBtn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Install App</span>
        </button>
      </div>
    `;

    document.body.appendChild(popup);

    requestAnimationFrame(() => {
      popup.classList.add('show');
    });

    function dismissPopup() {
      popup.classList.remove('show');
      sessionStorage.setItem('ambo_pwa_prompt_dismissed', 'true');
      setTimeout(() => popup.remove(), 260);
    }

    const dismissIconBtn = document.getElementById('pwaDismissIconBtn');
    const notNowBtn = document.getElementById('pwaNotNowBtn');
    const installBtn = document.getElementById('pwaInstallActionBtn');

    if (dismissIconBtn) dismissIconBtn.addEventListener('click', dismissPopup);
    if (notNowBtn) notNowBtn.addEventListener('click', dismissPopup);

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (!deferredInstallPrompt) {
          dismissPopup();
          return;
        }
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          showToast('Ambo CMS App installed successfully!', 'success');
        }
        deferredInstallPrompt = null;
        dismissPopup();
      });
    }
  }

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

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderNavigation();
    initDraftAutoSave();
    initStudentIdValidator();
    initPWA();
  });

})();
