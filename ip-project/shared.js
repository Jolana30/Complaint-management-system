(() => {
  const roleKey = 'userRole';
  const themeKey = 'themeMode';
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const root = document.documentElement;

  function getSavedTheme() {
    return localStorage.getItem(themeKey) || 'light';
  }

  function isLoginPage(name) {
    return name === '' || name === 'Login.html' || name === 'index.html';
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(themeKey, theme);
    const toggle = document.getElementById('themeToggleBtn');
    if (toggle) {
      const isDark = theme === 'dark';
      if (isLoginPage(currentPage)) {
        toggle.innerHTML = isDark ? '<span class="icon">☀️</span>' : '<span class="icon">🕒</span>';
      } else {
        toggle.innerHTML = isDark
          ? '<span class="icon">☀️</span><span class="label">Light mode</span>'
          : '<span class="icon">🕒</span><span class="label">Dark mode</span>';
      }
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      if (isLoginPage(currentPage)) toggle.classList.add('login-toggle');
      else toggle.classList.remove('login-toggle');
    }
  }

  function toggleTheme() {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  }

  function buildThemeToggle() {
    if (document.getElementById('themeToggleBtn')) return;
    const button = document.createElement('button');
    button.id = 'themeToggleBtn';
    button.type = 'button';
    button.className = 'theme-toggle';
    button.addEventListener('click', toggleTheme);
    const nav = document.querySelector('nav');
    if (nav) nav.appendChild(button);
    else document.body.appendChild(button);
  }

  function enhancePasswordInputs() {
    const pwds = document.querySelectorAll('input[type="password"]');
    pwds.forEach((input) => {
      if (input.dataset.hasToggle) return;
      input.dataset.hasToggle = '1';
      const wrapper = document.createElement('div');
      wrapper.className = 'input-with-toggle';
      wrapper.style.position = 'relative';
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pwd-toggle modern';
      btn.setAttribute('aria-label', 'Show password');
      const eyeSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      const eyeOffSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.36 20.36 0 0 1 5.06-6.06"></path><path d="M1 1l22 22"></path></svg>';
      btn.innerHTML = eyeSvg;
      Object.assign(btn.style, {
        position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(37,99,235,0.06)', border: 'none', cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center', width: '48px', height: '44px',
        borderRadius: '8px', color: '#2563EB', opacity: '0.6'
      });
      btn.addEventListener('click', () => {
        const isPwd = input.type === 'password';
        input.type = isPwd ? 'text' : 'password';
        btn.innerHTML = isPwd ? eyeOffSvg : eyeSvg;
        btn.setAttribute('aria-label', isPwd ? 'Hide password' : 'Show password');
        input.focus();
      });
      input.addEventListener('focus', () => (btn.style.opacity = '1'));
      input.addEventListener('blur', () => (btn.style.opacity = '0.6'));
      wrapper.appendChild(btn);
    });
  }

  function enforceRoleProtection() {
    const role = localStorage.getItem(roleKey);
    const adminPages = ['Admin_Dashboard1.html','Admin_All_Complaints.html','Admin_Complaint_Details.html','Admin_Confirm_Resolution.html','Admin_Update_Status.html','Assign_Complaint.html'];
    const teacherPages = ['Teacher_Dashboard.html','Teacher_Complaint_Details.html','Teacher_Resolved_Complaint.html','Teacher_Sent_To_Admin.html','Teachers_Assigned_Complaint.html'];
    const studentPages = ['Student_Dashboard.html','Submit_Complaint.html','My_Complaints.html','Submission_Guide.html'];

    function redirectToAllowed() {
      if (!role) window.location.href = '../index.html';
      else if (role === 'student') window.location.href = 'Student_Dashboard.html';
      else if (role === 'teacher') window.location.href = 'Teacher_Dashboard.html';
      else if (role === 'admin') window.location.href = 'Admin_Dashboard1.html';
      else window.location.href = '../index.html';
    }

    if (adminPages.includes(currentPage) && role !== 'admin') redirectToAllowed();
    if (teacherPages.includes(currentPage) && role !== 'teacher') redirectToAllowed();
    if (studentPages.includes(currentPage) && role !== 'student') redirectToAllowed();
  }

  function applyRoleNavigation() {
    const role = localStorage.getItem(roleKey);
    const links = document.querySelectorAll('nav a[href]');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      const text = link.textContent.trim().toLowerCase();
      const isLoginLink = /(?:^|\/)(?:index|Login)\.html$/.test(href) || href === '/';
      const isHomeLink = /(?:^|\/)Home\.html$/.test(href) || text === 'home';
      if (isLoginLink && !isHomeLink) link.textContent = role ? 'Logout' : 'Login';
      if (isLoginLink && !isHomeLink && role) {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          localStorage.removeItem(roleKey);
          localStorage.removeItem('username');
          createToast('Signed out', 'info');
          setTimeout(() => window.location.href = '../index.html', 200);
        });
      }
      const isAdminLink = /Admin_/.test(href) || href === 'Admin_Dashboard1.html';
      const isTeacherLink = /Teacher_/.test(href) || href === 'Teacher_Dashboard.html';
      const isStudentLink = /Student_/.test(href) || href === 'Student_Dashboard.html';
      if (!role) link.style.display = isHomeLink || isLoginLink ? 'inline-block' : 'none';
      else if (role === 'student') link.style.display = isAdminLink || isTeacherLink ? 'none' : 'inline-block';
      else if (role === 'teacher') link.style.display = isAdminLink || isStudentLink ? 'none' : 'inline-block';
      else if (role === 'admin') link.style.display = isTeacherLink || isStudentLink ? 'none' : 'inline-block';
      else link.style.display = 'inline-block';
    });
  }

  function renderUserBadge() {
    const role = localStorage.getItem(roleKey);
    const username = localStorage.getItem('username');
    const nav = document.querySelector('nav');
    if (!nav) return;
    let badge = document.getElementById('userBadge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'userBadge';
      Object.assign(badge.style, { marginLeft: '12px', fontSize: '14px', color: '#fff', alignSelf: 'center' });
      nav.appendChild(badge);
    }
    if (!role) {
      badge.textContent = '';
      badge.style.display = 'none';
      return;
    }
    const displayRole = role.charAt(0).toUpperCase() + role.slice(1);
    badge.textContent = username ? `${username} • ${displayRole}` : displayRole;
    badge.style.display = 'block';
  }

  function createToast(message, type = 'info', timeout = 3000) {
    const existing = document.getElementById('siteToast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.textContent = message;
    Object.assign(toast.style, {
      position: 'fixed', right: '16px', bottom: '16px', padding: '10px 14px', borderRadius: '8px',
      boxShadow: '0 6px 16px rgba(0,0,0,0.12)', zIndex: 9999, color: '#fff', fontWeight: 600,
      minWidth: '140px', textAlign: 'center',
      background: type === 'error' ? '#b91c1c' : type === 'success' ? '#047857' : '#2563EB'
    });
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.25s';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 250);
    }, timeout);
  }

  function initialize() {
    applyTheme(getSavedTheme());
    buildThemeToggle();
    applyRoleNavigation();
    renderUserBadge();
    enhancePasswordInputs();
    enforceRoleProtection();
  }

  initialize();
})();
