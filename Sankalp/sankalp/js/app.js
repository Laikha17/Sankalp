/* ================================================================
  SANKALP - Shared Application JS
  ================================================================ */

// ── Language Data ──────────────────────────────────────────────
const LANGUAGES = {
  en: { name: 'English', native: 'English', flag: '🇬🇧' },
  te: { name: 'Telugu', native: 'తెలుగు', flag: '🏳️' },
  hi: { name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  kn: { name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🏳️' },
};

// ── Farmer Data (mock) ─────────────────────────────────────────
const FARMER_DATA = {
  name: 'Mallaiah Goud',
  phone: '9876543210',
  location: 'Nalgonda, Telangana',
  crop: 'Paddy (Rice)',
  aadhaar: 'XXXX-XXXX-3456',
  dob: '15 March 1975',
  gender: 'Male',
  village: 'Chityala',
  mandal: 'Nalgonda',
  district: 'Nalgonda',
  state: 'Telangana',
  landArea: '4.5 acres',
  totalProduce: '12,450 kg',
  totalVisits: 18,
  token: '#27',
  bookingDate: '12 September 2026',
  slotTime: '10:00 AM – 11:00 AM',
  center: 'Nalgonda Grain Procurement Center',
};

// ── Authority Data (mock) ─────────────────────────────────────
const AUTHORITY_DATA = {
  name: 'R. Kumar',
  role: 'Procurement Officer',
  center: 'Nalgonda Procurement Center',
};

// ── Slot Data (mock) ─────────────────────────────────────────
const SLOTS = [
  { time: '08:00 AM – 09:00 AM', booked: 1, capacity: 3, status: 'available' },
  { time: '09:00 AM – 10:00 AM', booked: 2, capacity: 3, status: 'filling' },
  { time: '10:00 AM – 11:00 AM', booked: 3, capacity: 3, status: 'full' },
  { time: '11:00 AM – 12:00 PM', booked: 0, capacity: 3, status: 'available' },
  { time: '12:00 PM – 01:00 PM', booked: 1, capacity: 3, status: 'available' },
  { time: '01:00 PM – 02:00 PM', booked: 0, capacity: 3, status: 'available' },
  { time: '02:00 PM – 03:00 PM', booked: 0, capacity: 3, status: 'available' },
  { time: '03:00 PM – 04:00 PM', booked: 2, capacity: 3, status: 'filling' },
  { time: '04:00 PM – 05:00 PM', booked: 1, capacity: 3, status: 'available' },
];

// ── Notifications ─────────────────────────────────────────────
const NOTIFICATIONS = [
  { id: 1, type: 'queue', icon: '🔔', title: 'Your turn is approaching', body: 'Token #27 — Please reach Nalgonda center within 15 minutes.', time: 'Just now', unread: true },
  { id: 2, type: 'reminder', icon: '📅', title: 'Appointment Reminder', body: 'Your slot is tomorrow at 10:00 AM – 11:00 AM at Nalgonda Center.', time: '2 hours ago', unread: true },
  { id: 3, type: 'status', icon: '✅', title: 'Verification Complete', body: 'Your produce has been verified and weighed successfully.', time: 'Yesterday', unread: false },
  { id: 4, type: 'payment', icon: '💰', title: 'Payment Update', body: 'Payment for 12 quintals of Paddy has been processed.', time: '2 days ago', unread: false },
];

// ── Utility Functions ─────────────────────────────────────────
function $(selector, parent = document) { return parent.querySelector(selector); }
function $$(selector, parent = document) { return [...parent.querySelectorAll(selector)]; }

function showNotifPanel() {
  const overlay = document.getElementById('notifOverlay');
  if (overlay) overlay.classList.add('open');
}
function hideNotifPanel() {
  const overlay = document.getElementById('notifOverlay');
  if (overlay) overlay.classList.remove('open');
}

function initNotifPanel() {
  const overlay = document.getElementById('notifOverlay');
  if (!overlay) return;
  const list = overlay.querySelector('.notif-list');
  if (!list) return;
  list.innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}">
      <div class="notif-icon ${n.type === 'queue' ? 'stat-icon-amber' : n.type === 'reminder' ? 'stat-icon-blue' : 'stat-icon-green'}"
           style="font-size:18px">${n.icon}</div>
      <div>
        <p style="font-weight:600;margin-bottom:2px">${n.title}</p>
        <p>${n.body}</p>
        <small>${n.time}</small>
      </div>
    </div>
  `).join('');
  const closeBtn = overlay.querySelector('.notif-close');
  if (closeBtn) closeBtn.addEventListener('click', hideNotifPanel);
  overlay.addEventListener('click', e => { if (e.target === overlay) hideNotifPanel(); });
  document.querySelectorAll('[data-notif-btn]').forEach(btn => {
    btn.addEventListener('click', showNotifPanel);
  });
}

function initLangSelector() {
  document.querySelectorAll('.lang-selector select').forEach(sel => {
    sel.addEventListener('change', function () {
      localStorage.setItem('sankalp_lang', this.value);
    });
    const saved = localStorage.getItem('sankalp_lang') || 'en';
    sel.value = saved;
  });
}

function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) q.addEventListener('click', () => item.classList.toggle('open'));
  });
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = '../login.html';
  }
}
function logoutFromRoot() {
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = 'login.html';
  }
}

// ── Init on DOM ready ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNotifPanel();
  initLangSelector();
  initFAQ();

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    if (href && href.includes(currentPage)) {
      item.classList.add('active');
    }
  });

  // Slot selection
  document.querySelectorAll('.slot-card:not(.slot-full)').forEach(card => {
    card.addEventListener('click', function () {
      document.querySelectorAll('.slot-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      updateSelection(this);
    });
  });

  // Date buttons
  document.querySelectorAll('.date-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Login tabs
  document.querySelectorAll('.login-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      const target = this.dataset.tab;
      document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.login-section').forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      const sect = document.getElementById(target);
      if (sect) sect.classList.add('active');
    });
  });

  // OTP flow
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', () => {
      const phone = document.getElementById('phoneInput')?.value;
      if (!phone || phone.length < 10) { alert('Please enter a valid 10-digit mobile number.'); return; }
      document.getElementById('otpSection')?.classList.remove('hidden');
      document.getElementById('otpSection')?.classList.add('fade-in');
      sendOtpBtn.textContent = 'Resend OTP';
      sendOtpBtn.style.background = 'var(--green-600)';
    });
  }
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');
  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', () => {
      const tab = document.querySelector('.login-tab.active')?.dataset.tab;
      if (tab === 'authority') {
        window.location.href = 'authority/dashboard.html';
      } else {
        window.location.href = 'farmer/dashboard.html';
      }
    });
  }

  // Register farmer form
  const registerBtn = document.getElementById('registerBtn');
  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      alert('✅ Farmer registered successfully!\n\nA confirmation SMS has been sent to the farmer\'s mobile number.');
    });
  }

  // Fingerprint
  const fpBtn = document.getElementById('fpBtn');
  if (fpBtn) {
    fpBtn.addEventListener('click', () => {
      fpBtn.innerHTML = '<span class="spin">⏳</span> Scanning...';
      fpBtn.disabled = true;
      setTimeout(() => {
        fpBtn.innerHTML = '✅ Fingerprint Captured';
        fpBtn.style.background = 'var(--green-600)';
        document.getElementById('fpStatus')?.classList.remove('hidden');
      }, 2000);
    });
  }

  // Language options (settings page)
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', function () {
      document.querySelectorAll('.lang-option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
});

function updateSelection(card) {
  const time = card.querySelector('.slot-time span:first-child')?.textContent;
  const selSlot = document.getElementById('selSlot');
  if (selSlot && time) selSlot.textContent = time;
}

// ── Chart renderer (authority dashboard) ─────────────────────
function renderChart() {
  const data = [
    { label: '8 Sep', qty: 45, farmers: 20 },
    { label: '9 Sep', qty: 80, farmers: 35 },
    { label: '10 Sep', qty: 110, farmers: 50 },
    { label: '11 Sep', qty: 150, farmers: 65 },
    { label: '12 Sep', qty: 190, farmers: 80 },
  ];
  const wrap = document.getElementById('chartWrap');
  if (!wrap) return;
  const maxVal = 200;
  const html = data.map(d => `
    <div style="display:flex;flex-direction:column;align-items:center;flex:1;gap:4px">
      <div class="chart-bar-group" style="height:150px">
        <div class="chart-bar b1" style="height:${(d.qty / maxVal * 100)}%;min-height:4px"></div>
        <div class="chart-bar b2" style="height:${(d.farmers / maxVal * 100)}%;min-height:4px"></div>
      </div>
      <span style="font-size:10px;color:var(--text-muted)">${d.label}</span>
    </div>
  `).join('');
  wrap.innerHTML = `<div style="display:flex;align-items:flex-end;gap:8px;height:150px;padding:0 8px">${html}</div>`;
}
document.addEventListener('DOMContentLoaded', () => {
  renderChart();
  initFaqAccordion();
  initSlotCards();
  initFingerprintBtn();
});

// ── FAQ Accordion ─────────────────────────────────────────────
function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── Slot Card Selection ───────────────────────────────────────
function initSlotCards() {
  document.querySelectorAll('.slot-card:not(.slot-full)').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.slot-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const time = card.dataset.time;
      const selSlot = document.getElementById('selSlot');
      if (selSlot && time) selSlot.textContent = time;
    });
  });
}

// ── Fingerprint Simulation ────────────────────────────────────
function initFingerprintBtn() {
  const btn = document.getElementById('fpBtn');
  const status = document.getElementById('fpStatus');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.innerHTML = '<span style="font-size:22px">⏳</span> Scanning...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<span style="font-size:22px">✅</span> Fingerprint Captured!';
      btn.style.background = 'var(--green-600)';
      if (status) status.style.display = 'flex';
    }, 1800);
  });
}
