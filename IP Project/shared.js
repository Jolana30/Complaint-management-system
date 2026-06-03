(() => {
  const roleKey = 'userRole';
  const themeKey = 'themeMode';
  const currentPage = window.location.pathname.split('/').pop();
  const root = document.documentElement;

  function getSavedTheme() {
    // Default to light unless the user explicitly selected a theme
    return localStorage.getItem(themeKey) || 'light';
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(themeKey, theme);
    const toggle = document.getElementById('themeToggleBtn');
    if (toggle) {
      const isDark = theme === 'dark';
      if (currentPage === 'Login.html') {
        toggle.innerHTML = isDark ? '<span class="icon">☀️</span>' : '<span class="icon">🕒</span>';
      } else {
        toggle.innerHTML = isDark
          ? '<span class="icon">☀️</span><span class="label">Light mode</span>'
          : '<span class="icon">🕒</span><span class="label">Dark mode</span>';
      }
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      if (currentPage === 'Login.html') {
        toggle.classList.add('login-toggle');
      } else {
        toggle.classList.remove('login-toggle');
      }
    }
  }

  function toggleTheme() {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  function buildThemeToggle() {
    if (document.getElementById('themeToggleBtn')) return;
    const button = document.createElement('button');
    button.id = 'themeToggleBtn';
    button.type = 'button';
    button.className = 'theme-toggle';
    button.addEventListener('click', toggleTheme);
    // Prefer placing the toggle in the nav bar when present
    const nav = document.querySelector('nav');
    if (nav) nav.appendChild(button);
    else document.body.appendChild(button);
  }

  // Add password show/hide toggles to any password inputs on static pages
  function enhancePasswordInputs() {
    const pwds = document.querySelectorAll('input[type="password"]');
    pwds.forEach((input) => {
      // avoid duplicate toggles
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
      btn.style.position = 'absolute';
      btn.style.right = '10px';
      btn.style.top = '50%';
      btn.style.transform = 'translateY(-50%)';
      btn.style.background = 'transparent';
      btn.style.border = 'none';
      btn.style.cursor = 'pointer';
      btn.style.display = 'flex';
      btn.style.alignItems = 'center';
      btn.style.justifyContent = 'center';
      btn.style.width = '48px';
      btn.style.height = '44px';
      btn.style.borderRadius = '8px';
      btn.style.color = '#2563EB';
      btn.style.background = 'rgba(37,99,235,0.06)';

      // only show while focused or hovered
      btn.style.opacity = '0.6';

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

  // Role-based page protection: redirect users trying to access pages they shouldn't
  function enforceRoleProtection() {
    const role = localStorage.getItem(roleKey);
    const adminPages = [
      'Admin_Dashboard1.html',
      'Admin_All_Complaints.html',
      'Admin_Complaint_Details.html',
      'Admin_Confirm_Resolution.html',
      'Admin_Update_Status.html',
      'Assign_Complaint.html',
    ];
    const teacherPages = [
      'Teacher_Dashboard.html',
      'Teacher_Complaint_Details.html',
      'Teacher_Resolved_Complaint.html',
      'Teacher_Sent_To_Admin.html',
      'Teachers_Assigned_Complaint.html',
    ];
    const studentPages = [
      'Student_Dashboard.html',
      'Submit_Complaint.html',
      'My_Complaints.html',
      'Submission_Guide.html',
    ];

    function redirectToAllowed() {
      if (!role) window.location.href = 'Login.html';
      else if (role === 'student') window.location.href = 'Student_Dashboard.html';
      else if (role === 'teacher') window.location.href = 'Teacher_Dashboard.html';
      else if (role === 'admin') window.location.href = 'Admin_Dashboard1.html';
      else window.location.href = 'Home.html';
    }

    if (!currentPage) return;
    if (adminPages.includes(currentPage) && role !== 'admin') redirectToAllowed();
    if (teacherPages.includes(currentPage) && role !== 'teacher') redirectToAllowed();
    if (studentPages.includes(currentPage) && role !== 'student') redirectToAllowed();
  }

  function applyRoleNavigation() {
    const role = localStorage.getItem(roleKey);
    const links = document.querySelectorAll('nav a[href]');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === 'Login.html') {
        link.textContent = role ? 'Logout' : 'Login';
      }
      if (href === 'Login.html' && role) {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          localStorage.removeItem(roleKey);
          localStorage.removeItem('username');
          createToast('Signed out', 'info');
          // ensure UI updates immediately
          setTimeout(() => window.location.href = 'Login.html', 200);
        });
      }
      const isAdminLink = /Admin_/.test(href) || href === 'Admin_Dashboard1.html';
      const isTeacherLink = /Teacher_/.test(href) || href === 'Teacher_Dashboard.html';
      const isStudentLink = /Student_/.test(href) || href === 'Student_Dashboard.html';
      if (!role) {
        link.style.display = href === 'Home.html' || href === 'Login.html' ? 'inline-block' : 'none';
      } else if (role === 'student') {
        link.style.display = isAdminLink || isTeacherLink ? 'none' : 'inline-block';
      } else if (role === 'teacher') {
        link.style.display = isAdminLink || isStudentLink ? 'none' : 'inline-block';
      } else if (role === 'admin') {
        link.style.display = isTeacherLink || isStudentLink ? 'none' : 'inline-block';
      } else {
        link.style.display = 'inline-block';
      }
    });
  }

  function renderUserBadge() {
    const role = localStorage.getItem(roleKey);
    const username = localStorage.getItem('username');
    let nav = document.querySelector('nav');
    if (!nav) return;
    let badge = document.getElementById('userBadge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'userBadge';
      badge.style.marginLeft = '12px';
      badge.style.fontSize = '14px';
      badge.style.color = '#fff';
      badge.style.alignSelf = 'center';
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
    toast.style.position = 'fixed';
    toast.style.right = '16px';
    toast.style.bottom = '16px';
    toast.style.padding = '10px 14px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';
    toast.style.zIndex = 9999;
    toast.style.color = '#fff';
    toast.style.fontWeight = 600;
    toast.style.minWidth = '140px';
    toast.style.textAlign = 'center';
    toast.style.background = type === 'error' ? '#b91c1c' : type === 'success' ? '#047857' : '#2563EB';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.25s';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 250);
    }, timeout);
  }

  function clearRoleOnLoginPage() {
    // Do not clear the stored role automatically when visiting the login page.
    // Clearing on navigation should only happen when the user explicitly logs out.
  }

  function initialize() {
    // Apply saved theme and build UI helpers
    const initialTheme = getSavedTheme();
    applyTheme(initialTheme);
    buildThemeToggle();
    applyRoleNavigation();
    renderUserBadge();
    enhancePasswordInputs();
    enforceRoleProtection();
  }

  initialize();
})();
