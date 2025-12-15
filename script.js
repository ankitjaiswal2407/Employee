
// apaHR - EMPLOYEE LEAVE MANAGEMENT SYSTEM
// ============================================

// Storage configuration
const STORAGE_KEYS = { 
    USERS: 'demo_users_v1', 
    LEAVES: 'demo_leaves_v1', 
    SESSION: 'demo_session_v1',
    EVENTS: 'demo_events_v1'
};

// CONTACT FORM: options for sending messages
// 1) If you set CONTACT_FORM_ENDPOINT to a Formspree (or other) endpoint, the form will POST JSON to it.
// 2) Or, configure EmailJS below (client-side email delivery) by setting EMAILJS_USER_ID, SERVICE_ID, TEMPLATE_ID.
// 3) If neither is configured, the handler will open a mailto: link to the recipient below.
const CONTACT_FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/yourFormId'
const CONTACT_FALLBACK_RECIPIENT = 'aj8377260@gmail.com';

// EMAILJS (https://www.emailjs.com/) - client-side sending without your own server.
// Create an EmailJS account, add an email service, create a template and copy the values here.
const EMAILJS_USER_ID = ''; // e.g. 'user_xxx' (leave empty to disable EmailJS)
const EMAILJS_SERVICE_ID = ''; // e.g. 'service_xxx'
const EMAILJS_TEMPLATE_ID = ''; // e.g. 'template_xxx'

const landingSection = document.getElementById('landing-section');
const appSection = document.getElementById('app-section');
const navLoginBtn = document.getElementById('nav-login-btn');
const ctaLoginBtn = document.getElementById('cta-login');

function showApp() {
    landingSection.classList.add('hidden');
    appSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showLanding() {
    appSection.classList.add('hidden');
    landingSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLoginBtn.addEventListener('click', showApp);
ctaLoginBtn.addEventListener('click', showApp);

// ============================================
// VERTICAL BRAND PARALLAX EFFECT
// ============================================

const verticalBrand = document.getElementById('vertical-brand');

function updateVerticalBrandParallax() {
    if (!verticalBrand) return;
    
    const scrollY = window.scrollY;
    // Parallax offset: moves down as user scrolls up
    const offset = scrollY * 0.5;
    
    verticalBrand.style.setProperty('--parallax-offset', `${offset}px`);
    verticalBrand.classList.add('parallax-active');
}

window.addEventListener('scroll', updateVerticalBrandParallax, { passive: true });

// Initial call to activate parallax
if (window.scrollY > 0) {
    updateVerticalBrandParallax();
}

// ============================================
// HERO SLIDER (Landing page)
// ============================================

const heroSlides = [
    {
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop',
        title: 'Collaborative Scheduling',
        text: 'Coordinate team schedules and approvals effortlessly — no paperwork, no confusion.'
    },
    {
        src: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=1200&q=80&auto=format&fit=crop',
        title: 'Calendar & Notifications',
        text: 'Integrated calendars and timely notifications keep everyone aligned and informed.'
    },
    {
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&auto=format&fit=crop',
        title: 'Paperless Workflow',
        text: 'Apply and track leave digitally — faster processing and an eco-friendly workflow.'
    }
];

let heroIndex = 0;
let heroTimer = null;

function showHeroSlide(i) {
    heroIndex = (i + heroSlides.length) % heroSlides.length;
    const s = heroSlides[heroIndex];
    const img = document.getElementById('hero-slider-img');
    const title = document.getElementById('hero-slider-title');
    const subtitle = document.getElementById('hero-slider-subtitle');
    const desc = document.getElementById('hero-slider-text');
    if (img) img.src = s.src;
    if (title) title.textContent = s.title;
    if (desc) desc.textContent = s.text;
}

function startHeroAutoPlay() {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(() => { showHeroSlide(heroIndex + 1); }, 4500);
}

function initHeroSlider() {
    // safe init (defer script ensures DOM exists)
    if (!document.getElementById('hero-slider-img')) return;
    showHeroSlide(0);
    const prev = document.getElementById('hero-prev');
    const next = document.getElementById('hero-next');
    if (prev) prev.addEventListener('click', () => { showHeroSlide(heroIndex - 1); startHeroAutoPlay(); });
    if (next) next.addEventListener('click', () => { showHeroSlide(heroIndex + 1); startHeroAutoPlay(); });
    startHeroAutoPlay();
}

// initialize hero slider when the slider section scrolls into view
function observeHeroSlider() {
    const section = document.getElementById('hero-slider-section');
    if (!section) return;
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // reveal animation class
                section.classList.add('in-view');
                try { initHeroSlider(); } catch (e) {  }
                observer.disconnect();
            }
        });
    }, { threshold: 0.18 });
    io.observe(section);
}

try { observeHeroSlider(); } catch (e) {  }


const ctaLogin2 = document.getElementById('cta-login-2');
if (ctaLogin2) ctaLogin2.addEventListener('click', showApp);

function showNotification(message, type = 'info', duration = 4000) {
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.innerHTML = `<span>${message}</span><button onclick="this.parentElement.remove()">×</button>`;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 14px 18px;
        border-radius: 8px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    if (type === 'success') notif.style.background = '#10b981';
    else if (type === 'error') notif.style.background = '#ef4444';
    else if (type === 'warning') notif.style.background = '#f59e0b';
    else notif.style.background = '#3b82f6';
    
    notif.style.color = 'white';
    document.body.appendChild(notif);
    
    setTimeout(() => notif.remove(), duration);
}

if (!document.querySelector('style[data-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animations', 'true');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .notification button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 20px;
            padding: 0;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// CONTACT FORM SUBMISSION
// ============================================
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');

    // Validation
    if (!nameInput.value.trim()) {
        showNotification('Please enter your name', 'error');
        nameInput.focus();
        return;
    }

    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        showNotification('Please enter a valid email', 'error');
        emailInput.focus();
        return;
    }

    if (!messageInput.value.trim()) {
        showNotification('Please enter a message', 'error');
        messageInput.focus();
        return;
    }

    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        sentAt: new Date().toISOString()
    };

    // Priority: EmailJS (client-side send) -> CONTACT_FORM_ENDPOINT (server/form endpoint) -> mailto fallback
    if (EMAILJS_USER_ID && EMAILJS_USER_ID.trim() !== '' && window.emailjs) {
        // send via EmailJS
        try {
            // initialize once
            try { emailjs.init(EMAILJS_USER_ID); } catch (e) { /* already init */ }
            const templateParams = {
                from_name: payload.name,
                from_email: payload.email,
                message: payload.message,
                sent_at: payload.sentAt
            };
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            showNotification('✓ Message sent — thank you! I will receive this by email.', 'success', 5000);
            form.reset();
        } catch (err) {
            console.error('EmailJS send error', err);
            showNotification('Failed to send via EmailJS. Trying configured endpoint or fallback.', 'warning', 5000);
            // fall through to other attempts
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
        return;
    }

    // If a contact endpoint is configured (e.g. Formspree), POST to it.
    if (CONTACT_FORM_ENDPOINT && CONTACT_FORM_ENDPOINT.trim() !== '') {
        try {
            const res = await fetch(CONTACT_FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error(`Server returned ${res.status}`);

            showNotification('✓ Message sent — thank you! I will receive this by email.', 'success', 5000);
            form.reset();
        } catch (err) {
            console.error('Contact form send error', err);
            showNotification('Failed to send message via the configured endpoint. Opening your email client as fallback.', 'warning', 5000);
            // fallback to mailto below
            const mailto = `mailto:${encodeURIComponent(CONTACT_FALLBACK_RECIPIENT)}?subject=${encodeURIComponent('Contact from website: ' + payload.name)}&body=${encodeURIComponent(`From: ${payload.name} <${payload.email}>\n\n${payload.message}`)}`;
            window.location.href = mailto;
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }

    } else {
        // No endpoint configured -> open user's email client with a prefilled message to the recipient
        const mailto = `mailto:${encodeURIComponent(CONTACT_FALLBACK_RECIPIENT)}?subject=${encodeURIComponent('Contact from website: ' + payload.name)}&body=${encodeURIComponent(`From: ${payload.name} <${payload.email}>\n\n${payload.message}`)}`;
        // Use location.href to open mail client
        window.location.href = mailto;
        showNotification('Opening your email client to send the message. If nothing happens, copy the message and send manually to ' + CONTACT_FALLBACK_RECIPIENT, 'info', 7000);
        btn.textContent = originalText;
        btn.disabled = false;
        form.reset();
    }
});

// DEMO DATA SEEDING

function seedDemoData() {
    const users = [
        { id: 'emp', name: 'Raj', role: 'employee', dept: 'Engineering' },
        { id: 'emp1', name: 'Ankit Jaiswal', role: 'employee', dept: 'Finance' },
        { id: 'emp2', name: 'Rahul Kumar Singh', role: 'employee', dept: 'Marketing' },
        { id: 'emp3', name: 'Sharma Pallavi', role: 'employee', dept: 'Operations' },
        { id: 'hr', name: 'Himanshu Kumar Singh', role: 'hr', dept: 'Computer Science' },
        { id: 'admin', name: 'Anshul Chauhan', role: 'admin', dept: 'Administration' }
    ];
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify([]));
    
    renderTopInfo();
    try { generateCaptcha(); } catch (e) { }
    
    showNotification('✓ Demo users seeded successfully! All employees ready to login.', 'success', 5000);
    console.log('Demo users created:', users.map(u => `${u.id} (${u.name}) - ${u.role}`).join(', '));
}

function readUsers() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'); }
function saveUsers(u){ localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(u)); }
function readLeaves(){ return JSON.parse(localStorage.getItem(STORAGE_KEYS.LEAVES) || '[]'); }
function saveLeaves(l){ localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify(l)); }
function setSession(session){ localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session)); }
function getSession(){ return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSION) || 'null'); }
function clearSession(){ localStorage.removeItem(STORAGE_KEYS.SESSION); }

// ============================================
// UI ELEMENTS & SECTION MANAGEMENT
// ============================================

const loginSection = document.getElementById('login-section');
const employeeSection = document.getElementById('employee-section');
const hrSection = document.getElementById('hr-section');
const adminSection = document.getElementById('admin-section');
const topInfo = document.getElementById('top-info');

function renderTopInfo(){
    const s = getSession();
    topInfo.innerHTML = s ? `<div class="pill">Logged in: ${s.name} — <em>${s.role}</em> | <a href="#" id="quick-logout" style="color:#2b7be4;text-decoration:none">Logout</a></div>` : '';
    const qlogout = document.getElementById('quick-logout');
    if (qlogout) qlogout.addEventListener('click', (e) => { e.preventDefault(); clearSession(); showLanding(); });
}

function showOnly(section){
    [loginSection, employeeSection, hrSection, adminSection].forEach(s => s.classList.add('hidden'));
    section.classList.remove('hidden');
    renderTopInfo();
    // If the login section is shown, generate/refresh captcha
    if (section === loginSection) {
        try { generateCaptcha(); } catch (e) { /* noop */ }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// LOGIN HANDLING (PASSWORDLESS - CAPTCHA)
// ============================================

// Simple math captcha generator
function generateCaptcha(){
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const q = `What is ${a} + ${b}?`;
    const form = document.getElementById('login-form');
    if (form) {
        form.dataset.captcha = (a + b).toString();
        const qElem = document.getElementById('captcha-question');
        if (qElem) qElem.textContent = q;
        const ans = document.getElementById('captcha-answer');
        if (ans) ans.value = '';
    }
}

// Refresh captcha button
const refreshBtn = document.getElementById('refresh-captcha');
if (refreshBtn) refreshBtn.addEventListener('click', () => generateCaptcha());

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const role = document.getElementById('role').value;
    const captchaAnswer = document.getElementById('captcha-answer').value.trim();
    const expected = document.getElementById('login-form').dataset.captcha;

    if (!username) {
        showNotification('Please enter a username', 'error');
        document.getElementById('username').focus();
        return;
    }

    if (!captchaAnswer) {
        showNotification('Please answer the captcha', 'error');
        document.getElementById('captcha-answer').focus();
        return;
    }

    if (!expected || parseInt(captchaAnswer, 10) !== parseInt(expected, 10)) {
        showNotification('Captcha incorrect. Please try again.', 'error');
        generateCaptcha();
        document.getElementById('captcha-answer').focus();
        return;
    }

    const users = readUsers();
    if (users.length === 0) {
        showNotification('❌ No users found. Please seed demo data first.', 'error');
        return;
    }

    const user = users.find(u => u.id === username && u.role === role);

    if (!user) {
        showNotification('❌ Invalid username for the selected role', 'error');
        generateCaptcha();
        document.getElementById('captcha-answer').value = '';
        document.getElementById('captcha-answer').focus();
        return;
    }
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Logging in...';
    btn.disabled = true;
    setTimeout(() => {
        setSession({ id: user.id, name: user.name, role: user.role });
        showNotification(`✓ Welcome, ${user.name}!`, 'success');
        renderForRole(user.role);
        btn.textContent = originalText;
        btn.disabled = false;
        document.getElementById('login-form').reset();
        generateCaptcha();
    }, 600);
});

document.getElementById('seed-btn').addEventListener('click', seedDemoData);

const backMainBtn = document.getElementById('back-main-btn');
if (backMainBtn) {
    backMainBtn.addEventListener('click', () => {
        // reset form and captcha, then show landing
        const form = document.getElementById('login-form');
        if (form) form.reset();
        try { generateCaptcha(); } catch (e) { /* noop */ }
        showLanding();
    });
}

function renderForRole(role){
    if (role === 'employee') { renderEmployee(); showOnly(employeeSection); }
    else if (role === 'hr') { renderHR(); showOnly(hrSection); }
    else if (role === 'admin') { renderAdmin(); showOnly(adminSection); }
    else showOnly(loginSection);
}


function daysBetweenInclusive(fromStr, toStr){
    if(!fromStr || !toStr) return 0;
    const a = new Date(fromStr + 'T00:00:00');
    const b = new Date(toStr + 'T00:00:00');
    if (isNaN(a) || isNaN(b)) return 0;
    const msPerDay = 24*60*60*1000;
    return Math.round((b - a)/msPerDay) + 1;
}

function escapeHtml(s){ 
    return (s+'').replace(/[&<>"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); 
}

function toBase64(file){
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.onerror = rej;
        reader.readAsDataURL(file);
    });
}

// Draw holiday usage pie chart on a canvas
function drawHolidayChart(canvasId, usedDays, allowance) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(cx, cy) - 10;

    // compute slices
    const within = Math.min(usedDays, allowance);
    const remaining = Math.max(0, allowance - within);
    const extra = Math.max(0, usedDays - allowance);
    const total = within + remaining + extra || 1;

    // clear
    ctx.clearRect(0,0,width,height);

    // draw background circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI*2);
    ctx.fillStyle = '#f3f6fb';
    ctx.fill();

    let start = -Math.PI/2;
    function drawSlice(value, color){
        const angle = (value/total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, start, start + angle);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        start += angle;
    }

    // colors: within (green), remaining (light), extra (red)
    if (within > 0) drawSlice(within, '#10b981');
    if (remaining > 0) drawSlice(remaining, '#cfe8ff');
    if (extra > 0) drawSlice(extra, '#ef4444');

    // center text
    ctx.fillStyle = '#0b2447';
    ctx.font = '600 18px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${usedDays} day${usedDays!==1?'s':''}`, cx, cy - 8);
    ctx.fillStyle = '#51606a';
    ctx.font = '14px Inter, system-ui, sans-serif';
    ctx.fillText('taken', cx, cy + 14);
}

// -----------------------------
// Calendar: public holidays & events
// -----------------------------
const PUBLIC_HOLIDAYS = [
    // sample public holidays (YYYY-MM-DD)
    { date: '2025-12-25', name: 'Christmas Day' },
    { date: '2025-01-26', name: 'Republic Day' },
    { date: '2025-08-15', name: 'Independence Day' }
];

// Default company events (will be persisted to localStorage when modified)
const COMPANY_EVENTS = [
    { date: '2025-12-01', name: 'Year-end Townhall' },
    { date: '2025-11-15', name: 'Hackathon Day' }
];

function readEvents() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.EVENTS);
        if (!raw) return COMPANY_EVENTS.slice();
        return JSON.parse(raw || '[]');
    } catch (e) { console.warn('Failed to read events, using defaults', e); return COMPANY_EVENTS.slice(); }
}

function saveEvents(evts) {
    try { localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(evts || [])); }
    catch (e) { console.error('Failed to save events', e); }
}

function loadEvents() {
    const ev = readEvents();
    // ensure stored events are available; nothing else required for now
    return ev;
}

let _calendarDate = new Date(); // current month view
let _selStart = null; // ISO date string YYYY-MM-DD
let _selEnd = null;

function formatMonthYear(d) {
    return d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
}

function isSameDate(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function renderCalendar() {
    const container = document.getElementById('calendar');
    const monthLabel = document.getElementById('cal-month');
    if (!container || !monthLabel) return;
    const year = _calendarDate.getFullYear();
    const month = _calendarDate.getMonth();
    monthLabel.textContent = formatMonthYear(_calendarDate);

    // first day of month
    const first = new Date(year, month, 1);
    const startDay = first.getDay(); // 0..6 Sun..Sat
    const daysInMonth = new Date(year, month+1, 0).getDate();

    container.innerHTML = '';
    // fill blanks for first week
    for (let i=0;i<startDay;i++) {
        const blank = document.createElement('div');
        blank.className = 'cal-day blank';
        container.appendChild(blank);
    }

    for (let d=1; d<=daysInMonth; d++) {
        const day = new Date(year, month, d);
        const tile = document.createElement('div');
        tile.className = 'cal-day';
        const dateNum = document.createElement('div');
        dateNum.className = 'date-num';
        dateNum.textContent = d;
        tile.appendChild(dateNum);

        const iso = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const holiday = PUBLIC_HOLIDAYS.find(h => h.date === iso);
        const events = readEvents();
        const event = events.find(ev => ev.date === iso);
        if (holiday) { tile.classList.add('holiday'); const note = document.createElement('span'); note.className='note'; note.textContent = holiday.name; tile.appendChild(note); }
        if (event) { tile.classList.add('event'); const note2 = document.createElement('span'); note2.className='note'; note2.textContent = event.name; tile.appendChild(note2); }

        // Mark today and past days
        const today = new Date();
        const todayIso = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
        if (iso === todayIso) tile.classList.add('today');
        const thisDay = new Date(year, month, d);
        const truncateToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (thisDay < truncateToday) tile.classList.add('past');

        // selection highlighting: start, end, in-range
        if (_selStart && _selEnd) {
            if (iso === _selStart) tile.classList.add('selected-start');
            if (iso === _selEnd) tile.classList.add('selected-end');
            if (iso > _selStart && iso < _selEnd) tile.classList.add('in-range');
        } else if (_selStart && !_selEnd) {
            if (iso === _selStart) tile.classList.add('selected-start');
        }

        tile.addEventListener('click', () => {
            // prevent selecting past dates
            if (tile.classList.contains('past')) {
                showNotification('You cannot select past dates. Please choose today or a future date.', 'warning', 3000);
                return;
            }
            // range selection logic
            if (!_selStart) {
                _selStart = iso;
                _selEnd = null;
            } else if (_selStart && !_selEnd) {
                if (iso < _selStart) {
                    _selEnd = _selStart;
                    _selStart = iso;
                } else {
                    _selEnd = iso;
                }
            } else if (_selStart && _selEnd) {
                // reset selection to new start
                _selStart = iso;
                _selEnd = null;
            }

            // reflect selection in form inputs
            const fromInput = document.getElementById('from-date');
            const toInput = document.getElementById('to-date');
            if (fromInput) fromInput.value = _selStart || '';
            if (toInput) toInput.value = (_selEnd || _selStart) || '';

            // enable/disable half-day option: only enable when single date selected
            const portion = document.getElementById('leave-portion');
            if (portion) {
                if (_selStart && _selEnd && _selStart !== _selEnd) {
                    portion.value = 'full';
                    portion.disabled = true;
                } else {
                    portion.disabled = false;
                }
            }

            renderCalendar();
            const shownDate = _selEnd ? `${_selStart} to ${_selEnd}` : `${_selStart}`;
            showNotification(`Selected ${shownDate} — adjust duration if needed and submit leave.`, 'info', 3000);
        });

        container.appendChild(tile);
    }
}

    document.getElementById('cal-prev')?.addEventListener('click', () => { _calendarDate = new Date(_calendarDate.getFullYear(), _calendarDate.getMonth()-1, 1); renderCalendar(); });
document.getElementById('cal-next')?.addEventListener('click', () => { _calendarDate = new Date(_calendarDate.getFullYear(), _calendarDate.getMonth()+1, 1); renderCalendar(); });
    document.getElementById('cal-clear')?.addEventListener('click', () => { 
        _selStart = null; _selEnd = null; 
        const fromInput = document.getElementById('from-date');
        const toInput = document.getElementById('to-date');
        if (fromInput) fromInput.value = '';
        if (toInput) toInput.value = '';
        const portion = document.getElementById('leave-portion'); if (portion) { portion.disabled = false; }
        renderCalendar();
    });

function initCalendar() {
    // render once and attach handlers
    renderCalendar();
}

// Manage Events modal (add/edit/delete company events)
function openManageEventsModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'manage-events-modal';

    const events = readEvents();

    overlay.innerHTML = `
        <div class="modal" style="max-width:520px">
            <div class="modal-header"><h3>Manage Company Events</h3></div>
            <div class="modal-body">
                <div id="events-list" style="max-height:240px;overflow:auto;margin-bottom:12px"></div>
                <form id="event-form">
                    <label>Date <input type="date" id="event-date" required /></label>
                    <label>Title <input type="text" id="event-title" placeholder="Event name" required /></label>
                    <div style="display:flex;gap:8px;margin-top:8px"><button id="event-add" class="btn">Add Event</button><button id="event-cancel" class="btn">Close</button></div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const list = overlay.querySelector('#events-list');
    const dateInput = overlay.querySelector('#event-date');
    const titleInput = overlay.querySelector('#event-title');

    function renderList() {
        const evts = readEvents();
        list.innerHTML = evts.length ? evts.map((ev, idx) => `
            <div style="padding:8px;border-bottom:1px solid #eef2ff;display:flex;justify-content:space-between;align-items:center">
                <div><strong>${escapeHtml(ev.name)}</strong><div style="font-size:12px;color:#55606a">${escapeHtml(ev.date)}</div></div>
                <div style="display:flex;gap:8px">
                    <button data-action="edit" data-idx="${idx}" class="btn small">Edit</button>
                    <button data-action="delete" data-idx="${idx}" class="btn small">Delete</button>
                </div>
            </div>
        `).join('') : '<p class="muted">No events configured.</p>';
    }

    renderList();

    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    overlay.querySelector('#event-cancel').addEventListener('click', (e) => { e.preventDefault(); overlay.remove(); renderCalendar(); });

    overlay.querySelector('#event-add').addEventListener('click', (e) => {
        e.preventDefault();
        const d = dateInput.value;
        const t = titleInput.value.trim();
        if (!d || !t) { showNotification('Please enter date and title', 'error'); return; }
        const evts = readEvents();
        evts.push({ date: d, name: t });
        saveEvents(evts);
        dateInput.value = '';
        titleInput.value = '';
        renderList();
        renderCalendar();
        showNotification('Event added', 'success', 2000);
    });

    list.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const action = btn.getAttribute('data-action');
        const idx = Number(btn.getAttribute('data-idx'));
        const evts = readEvents();
        if (action === 'delete') {
            if (!confirm('Delete this event?')) return;
            evts.splice(idx,1);
            saveEvents(evts);
            renderList();
            renderCalendar();
            showNotification('Event removed', 'info', 2000);
            return;
        }
        if (action === 'edit') {
            const ev = evts[idx];
            dateInput.value = ev.date;
            titleInput.value = ev.name;
            // replace add handler with save
            const addBtn = overlay.querySelector('#event-add');
            addBtn.textContent = 'Save';
            const onSave = (evnt) => {
                evnt.preventDefault();
                const d2 = dateInput.value;
                const t2 = titleInput.value.trim();
                if (!d2 || !t2) { showNotification('Please enter date and title', 'error'); return; }
                evts[idx] = { date: d2, name: t2 };
                saveEvents(evts);
                addBtn.textContent = 'Add Event';
                addBtn.removeEventListener('click', onSave);
                dateInput.value = '';
                titleInput.value = '';
                renderList();
                renderCalendar();
                showNotification('Event updated', 'success', 2000);
            };
            addBtn.addEventListener('click', onSave);
        }
    });
}


function renderEmployee(){
    const s = getSession(); 
    if (!s) return showOnly(loginSection);
    const users = readUsers();
    const me = users.find(u => u.id === s.id) || { id: s.id, name: s.name };
    const approvedDays = readLeaves()
        .filter(l => l.employeeId === me.id && l.status === 'Approved')
        .reduce((sum, l) => {
            const base = daysBetweenInclusive(l.from, l.to);
            return sum + ((l.leavePortion === 'half') ? 0.5 * base : base);
        }, 0);

    const freeAllowance = 3;
    const freeRemaining = Math.max(0, freeAllowance - approvedDays);
    const extraDays = Math.max(0, approvedDays - freeAllowance);

        const initials = ((me.name || '').split(' ').map(p => p[0]).slice(0,2).join('') || me.id || 'U').toUpperCase();

        document.getElementById('profile').innerHTML = `
                <div class="profile-card">
                    <div class="profile-header">
                        <div class="avatar">${initials}</div>
                        <div class="profile-meta">
                            <p class="big"><strong>${escapeHtml(me.name || 'Unknown')}</strong></p>
                            <p class="muted">ID: ${escapeHtml(me.id || '—')} • ${escapeHtml(me.role || 'Employee')}</p>
                            <p class="muted">${me.position ? escapeHtml(me.position) + ' • ' : ''}${me.email ? escapeHtml(me.email) : ''}</p>
                        </div>
                    </div>
                    <div class="holiday-summary chart-wrap">
                        <div class="chart-canvas">
                            <canvas id="holiday-chart" width="220" height="220" aria-label="Holiday usage chart"></canvas>
                        </div>
                        <div class="chart-legend">
                            <div><strong>Approved leave days:</strong> ${approvedDays}</div>
                            <div><strong>Free allowance left:</strong> ${freeRemaining} / ${freeAllowance}</div>
                            ${extraDays>0 ? `<div class="warn">⚠️ Extra ${extraDays} day(s) — salary reduction applies</div>` : ''}
                        </div>
                    </div>
                                        <div style="margin-top:12px">
                                            <button id="view-profile-btn" class="btn small">My Profile</button>
                                            <button id="edit-profile" class="btn small">Edit Profile</button>
                                        </div>
                </div>
        `;
    // draw chart after DOM update
    try { drawHolidayChart('holiday-chart', approvedDays, freeAllowance); } catch (e) { console.warn('Chart draw error', e); }
    // initialize calendar for employee dashboard
    try { initCalendar(); } catch (e) { /* noop */ }
    // If HR or Admin, show 'Manage Events' button in calendar area
    try {
        const calSection = document.getElementById('calendar-section');
        if (calSection) {
            // remove existing manage button if any
            const existing = document.getElementById('manage-events-btn');
            if (existing) existing.remove();
            const sRole = s.role || '';
            if (sRole === 'hr' || sRole === 'admin') {
                const btn = document.createElement('button');
                btn.id = 'manage-events-btn';
                btn.className = 'btn small';
                btn.textContent = 'Manage Events';
                btn.style.marginTop = '8px';
                btn.addEventListener('click', (ev) => { ev.preventDefault(); openManageEventsModal(); });
                calSection.appendChild(btn);
            }
        }
    } catch (e) { /* noop */ }
    renderEmployeeLeaves(me.id);

            // Wire My Profile (table view) and Edit Profile buttons
            const viewBtn = document.getElementById('view-profile-btn');
            const editBtn = document.getElementById('edit-profile');
            if (viewBtn) {
                viewBtn.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    showProfileTable(me);
                });
            }
            if (editBtn) {
                editBtn.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    openInlineProfileEditor(me);
                });
            }
    }

        // open profile editor as a modal to edit dateOfBirth, city, gender for the logged in user
        function openInlineProfileEditor(me) {
                // create modal overlay
                const overlay = document.createElement('div');
                overlay.id = 'profile-modal';
                overlay.className = 'modal-overlay';

                const dob = me.dateOfBirth || '';
                const city = me.city || '';
                const gender = me.gender || '';

                overlay.innerHTML = `
                    <div class="modal">
                        <div class="modal-header"><h3>Edit Profile</h3></div>
                        <div class="modal-body">
                            <form id="profile-edit-form">
                                <label>Date of Birth <input id="profile-dob" type="date" value="${escapeHtml(dob)}" /></label>
                                <label>City <input id="profile-city" type="text" value="${escapeHtml(city)}" placeholder="City" /></label>
                                <label>Gender
                                    <select id="profile-gender">
                                        <option value="">Prefer not to say</option>
                                        <option value="Male" ${gender==='Male'?'selected':''}>Male</option>
                                        <option value="Female" ${gender==='Female'?'selected':''}>Female</option>
                                        <option value="Other" ${gender==='Other'?'selected':''}>Other</option>
                                    </select>
                                </label>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button id="profile-save" class="btn">Save</button>
                            <button id="profile-cancel" class="btn">Cancel</button>
                        </div>
                    </div>
                `;

                document.body.appendChild(overlay);

                function closeModal() {
                        overlay.remove();
                        window.removeEventListener('keydown', onKey);
                }

                function onKey(e) { if (e.key === 'Escape') closeModal(); }
                window.addEventListener('keydown', onKey, { passive: true });

                const saveBtn = overlay.querySelector('#profile-save');
                const cancelBtn = overlay.querySelector('#profile-cancel');

                cancelBtn && cancelBtn.addEventListener('click', (e) => { e.preventDefault(); closeModal(); });

                saveBtn && saveBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const newDob = overlay.querySelector('#profile-dob').value;
                        const newCity = overlay.querySelector('#profile-city').value.trim();
                        const newGender = overlay.querySelector('#profile-gender').value;

                        const users = readUsers();
                        const idx = users.findIndex(u => u.id === me.id);
                        if (idx === -1) {
                                showNotification('User not found', 'error');
                                closeModal();
                                return;
                        }
                        users[idx].dateOfBirth = newDob || undefined;
                        users[idx].city = newCity || undefined;
                        users[idx].gender = newGender || undefined;
                        saveUsers(users);

                        showNotification('Profile updated', 'success', 2000);
                        closeModal();
                        renderEmployee();
                });
        }

// Global profile table modal (so it can be opened from anywhere)
function showProfileTable(me) {
    const overlay = document.createElement('div');
    overlay.id = 'profile-view-modal';
    overlay.className = 'modal-overlay';

    const dept = me.dept || me.department || me.position || '—';
    const dob = me.dateOfBirth || '—';
    const city = me.city || '—';
    const gender = me.gender || '—';
    const email = me.email || '—';
    const role = me.role || 'Employee';

    overlay.innerHTML = `
        <div class="modal">
            <div class="modal-header"><h3>My Profile</h3></div>
            <div class="modal-body">
                <table style="width:100%;border-collapse:collapse;font-size:15px;">
                    <tbody>
                        <tr><td style="padding:8px;border-bottom:1px solid #f1f5fb;font-weight:600;width:38%">Name</td><td style="padding:8px;border-bottom:1px solid #f1f5fb">${escapeHtml(me.name||'—')}</td></tr>
                        <tr><td style="padding:8px;border-bottom:1px solid #f1f5fb;font-weight:600">ID</td><td style="padding:8px;border-bottom:1px solid #f1f5fb">${escapeHtml(me.id||'—')}</td></tr>
                        <tr><td style="padding:8px;border-bottom:1px solid #f1f5fb;font-weight:600">Date of Birth</td><td style="padding:8px;border-bottom:1px solid #f1f5fb">${escapeHtml(dob)}</td></tr>
                        <tr><td style="padding:8px;border-bottom:1px solid #f1f5fb;font-weight:600">City</td><td style="padding:8px;border-bottom:1px solid #f1f5fb">${escapeHtml(city)}</td></tr>
                        <tr><td style="padding:8px;border-bottom:1px solid #f1f5fb;font-weight:600">Department</td><td style="padding:8px;border-bottom:1px solid #f1f5fb">${escapeHtml(dept)}</td></tr>
                        <tr><td style="padding:8px;border-bottom:1px solid #f1f5fb;font-weight:600">Gender</td><td style="padding:8px;border-bottom:1px solid #f1f5fb">${escapeHtml(gender)}</td></tr>
                        <tr><td style="padding:8px;border-bottom:1px solid #f1f5fb;font-weight:600">Email</td><td style="padding:8px;border-bottom:1px solid #f1f5fb">${escapeHtml(email)}</td></tr>
                        <tr><td style="padding:8px;font-weight:600">Role</td><td style="padding:8px">${escapeHtml(role)}</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer"><button id="profile-close" class="btn">Close</button></div>
        </div>
    `;

    document.body.appendChild(overlay);
    const closeBtn = overlay.querySelector('#profile-close');
    function close() { overlay.remove(); }
    closeBtn && closeBtn.addEventListener('click', (e) => { e.preventDefault(); close(); });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
}

function renderEmployeeLeaves(empId){
    const container = document.getElementById('employee-leaves');
    const leaves = readLeaves().filter(l => l.employeeId === empId).sort((a,b)=>b.createdAt - a.createdAt);
    if (leaves.length === 0) { 
        container.innerHTML = '<p>No leave requests yet.</p>'; 
        return; 
    }
    container.innerHTML = leaves.map(l => `
        <div class="leave-card">
            <div><strong>${l.name}</strong> — ${l.from} to ${l.to}</div>
            <div>Type: <strong>${l.leaveType || 'N/A'}</strong> — <em>${(l.leavePortion === 'half') ? 'Half Day' : 'Full Day'}</em></div>
            <div>Status: <strong>${l.status}</strong>${l.hrComment ? ` — HR note: ${l.hrComment}` : ''}</div>
            <div>Reason: ${escapeHtml(l.reason)}</div>
            ${l.attachment ? `<div>Attachment: <a href="${l.attachment.data}" download="${l.attachment.name}">Download</a></div>` : ''}
        </div>
    `).join('');
}
document.getElementById('leave-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const s = getSession(); 
    if (!s) {
        showNotification('You are not logged in', 'error');
        return;
    }
    
    const from = document.getElementById('from-date').value;
    const to = document.getElementById('to-date').value;
    const leaveType = document.getElementById('leave-type').value;
    const leavePortion = document.getElementById('leave-portion') ? document.getElementById('leave-portion').value : 'full';
    const reason = document.getElementById('reason').value.trim();
    const fileInput = document.getElementById('attachment');
    
    // Validation
    if (!from) {
        showNotification('Please select a start date', 'error');
        document.getElementById('from-date').focus();
        return;
    }
    // Prevent selecting past start dates
    const today = new Date();
    const fromDateOnly = new Date(from + 'T00:00:00');
    const todayTrunc = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (fromDateOnly < todayTrunc) {
        showNotification('Start date cannot be in the past. Please select today or a future date.', 'error');
        document.getElementById('from-date').focus();
        return;
    }
    if (!to) {
        showNotification('Please select an end date', 'error');
        document.getElementById('to-date').focus();
        return;
    }

    if (!leaveType) {
        showNotification('Please select a leave type', 'error');
        document.getElementById('leave-type').focus();
        return;
    }
    
    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (toDate < fromDate) {
        showNotification('End date must be after start date', 'error');
        document.getElementById('to-date').focus();
        return;
    }
    
    if (!reason || reason.length < 3) {
        showNotification('Please provide a reason (min 3 characters)', 'error');
        document.getElementById('reason').focus();
        return;
    }
    
    if (reason.length > 500) {
        showNotification('Reason is too long (max 500 characters)', 'error');
        return;
    }
    
    // Compute requested days, honoring half-day selection
    let newDays = daysBetweenInclusive(from, to);
    if (leavePortion === 'half') {
        // half-day requests should be single-day
        if (newDays > 1) {
            showNotification('Half-day leave must be requested for a single date. Please select the same From and To date.', 'error');
            document.getElementById('to-date').focus();
            return;
        }
        newDays = 0.5;
    }
    const approvedDays = readLeaves()
        .filter(l => l.employeeId === s.id && l.status === 'Approved')
        .reduce((sum, l) => {
            const base = daysBetweenInclusive(l.from, l.to);
            return sum + ((l.leavePortion === 'half') ? 0.5 * base : base);
        }, 0);
    const freeAllowance = 3;
    const willBeTotal = approvedDays + newDays;
    
    if (willBeTotal > freeAllowance) {
        const extra = willBeTotal - freeAllowance;
        const proceedMessage = `⚠️ This request will exceed your ${freeAllowance} free day allowance by ${extra} day(s).\nSalary reduction will apply to extra days.\n\nDo you want to proceed?`;
        if (!confirm(proceedMessage)) {
            showNotification('Leave application cancelled', 'info');
            return;
        }
    }

    // Show profile data in a table modal (previously nested; now global function is used)
    
    // Process file attachment
    let attachment = null;
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('File size exceeds 5MB limit', 'error');
            return;
        }
        
        try {
            const data = await toBase64(file);
            attachment = { name: file.name, data };
            showNotification('✓ File attached successfully', 'success', 2000);
        } catch (err) {
            showNotification('Failed to process attachment', 'error');
            console.error(err);
            return;
        }
    }
    
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Submitting...';
    btn.disabled = true;
    
    setTimeout(() => {
        const leaves = readLeaves();
        const newLeave = {
            id: 'L' + Date.now(),
            employeeId: s.id,
            name: s.name,
            from, to, reason, leaveType,
            leavePortion: leavePortion || 'full',
            attachment,
            status: 'Pending',
            hrComment: '',
            createdAt: Date.now()
        };
        leaves.push(newLeave);
        saveLeaves(leaves);
        
        document.getElementById('leave-form').reset();
        renderEmployeeLeaves(s.id);
        
        showNotification(`✓ Leave request submitted for ${newDays} day(s)! Pending HR approval.`, 'success', 5000);
        
        btn.textContent = originalText;
        btn.disabled = false;
    }, 800);
});
function renderHR(){
    const leaves = readLeaves().slice().sort((a,b)=>b.createdAt - a.createdAt);
    const pending = leaves.filter(l => l.status === 'Pending');
    const pendingContainer = document.getElementById('pending-leaves');
    const allContainer = document.getElementById('all-leaves');
    pendingContainer.innerHTML = pending.length ? pending.map(l => hrCard(l)).join('') : '<p>No pending leaves.</p>';
    allContainer.innerHTML = leaves.length ? leaves.map(l => allLeaveCard(l)).join('') : '<p>No leaves yet.</p>';
}

function hrCard(l){
    return `
    <div class="leave-card" id="leave-${l.id}">
        <div><strong>${l.name}</strong> (${l.employeeId}) — ${l.from} to ${l.to}</div>
        <div>Type: <strong>${l.leaveType || 'N/A'}</strong> — <em>${(l.leavePortion === 'half') ? 'Half Day' : 'Full Day'}</em></div>
        <div>Reason: ${escapeHtml(l.reason)}</div>
        ${l.attachment ? `<div>Attachment: <a href="${l.attachment.data}" target="_blank">Open</a></div>` : ''}
        <div class="hr-actions">
            <button data-action="approve" data-id="${l.id}">Approve</button>
            <button data-action="reject" data-id="${l.id}">Reject</button>
            <input placeholder="HR note (optional)" data-note-for="${l.id}" />
        </div>
    </div>
    `;
}

function allLeaveCard(l){
    return `
    <div class="leave-card small">
        <div><strong>${l.name}</strong> — ${l.from} to ${l.to}</div>
        <div>Type: <strong>${l.leaveType || 'N/A'}</strong> — <em>${(l.leavePortion === 'half') ? 'Half Day' : 'Full Day'}</em></div>
        <div>Status: <strong>${l.status}</strong>${l.hrComment ? ` — ${escapeHtml(l.hrComment)}` : ''}</div>
    </div>
    `;
}

document.getElementById('pending-leaves').addEventListener('click', (e)=>{
    const btn = e.target.closest('button'); 
    if(!btn) return;
    
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');
    const noteInput = document.querySelector(`[data-note-for="${id}"]`);
    const hrComment = noteInput ? noteInput.value.trim() : '';
    
    // Validation
    if (action === 'reject' && !hrComment) {
        showNotification('Please add a note explaining the rejection', 'warning');
        noteInput.focus();
        return;
    }
    
    const leaves = readLeaves();
    const idx = leaves.findIndex(x=>x.id===id); 
    if(idx===-1) {
        showNotification('Leave record not found', 'error');
        return;
    }
    
    const leave = leaves[idx];
    const employeeName = leave.name;
    const action_text = action === 'approve' ? 'Approved' : 'Rejected';

    btn.disabled = true;
    btn.textContent = action_text + '...';
    
    setTimeout(() => {
        leaves[idx].status = action === 'approve' ? 'Approved' : 'Rejected';
        leaves[idx].hrComment = hrComment || (action === 'approve' ? 'Approved' : 'Please resubmit');
        saveLeaves(leaves);
        renderHR();
        
        const icon = action === 'approve' ? '✓' : '✗';
        showNotification(`${icon} ${employeeName}'s leave has been ${action_text.toLowerCase()}!`, action === 'approve' ? 'success' : 'warning', 5000);
    }, 600);
});
function renderAdmin(){
    const users = readUsers();
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = users.map(u=>`<div class="user-card"><strong>${u.name}</strong> (${u.id}) — ${u.role} — ${u.dept||''}</div>`).join('');
    const all = readLeaves().slice().sort((a,b)=>b.createdAt - a.createdAt);
    document.getElementById('admin-all-leaves').innerHTML = all.length ? all.map(allLeaveCard).join('') : '<p>No leaves yet.</p>';
}


document.getElementById('logout-emp').addEventListener('click', ()=>{ 
    const name = getSession().name;
    clearSession();
    showNotification(`👋 Goodbye, ${name}! You have been logged out.`, 'info', 3000);
    document.getElementById('login-form').reset();
    generateCaptcha();
    setTimeout(() => showLanding(), 500);
});

document.getElementById('logout-hr').addEventListener('click', ()=>{ 
    const name = getSession().name;
    clearSession();
    showNotification(`👋 Goodbye, ${name}! You have been logged out.`, 'info', 3000);
    document.getElementById('login-form').reset();
    generateCaptcha();
    setTimeout(() => showLanding(), 500);
});

document.getElementById('logout-admin').addEventListener('click', ()=>{ 
    const name = getSession().name;
    clearSession();
    showNotification(`👋 Goodbye, ${name}! You have been logged out.`, 'info', 3000);
    document.getElementById('login-form').reset();
    generateCaptcha();
    setTimeout(() => showLanding(), 500);
});

// Add enter key support for forms
document.getElementById('login-form').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.id !== 'role') {
        document.getElementById('login-form').dispatchEvent(new Event('submit'));
    }
});

// Real-time leave count validation
document.getElementById('leave-form').addEventListener('change', (e) => {
    if (e.target.id === 'from-date' || e.target.id === 'to-date') {
        const from = document.getElementById('from-date').value;
        const to = document.getElementById('to-date').value;
        if (from && to) {
            const days = daysBetweenInclusive(from, to);
            const submit = document.querySelector('#leave-form button[type="submit"]');
            submit.textContent = `Submit Leave (${days} day${days !== 1 ? 's' : ''})`;
        }
    }
});

// Vertical brand parallax effect
function updateVerticalBrandParallax() {
    const verticalBrand = document.getElementById('vertical-brand');
    if (!verticalBrand) return;
    
    const scrollY = window.scrollY;
    const offset = Math.min(window.innerHeight * 0.45, scrollY * 0.25);
    verticalBrand.style.setProperty('--parallax-offset', `${offset}px`);
    verticalBrand.classList.add('parallax');
}

window.addEventListener('scroll', updateVerticalBrandParallax, { passive: true });

// Animated counters for About section
function animateCounters() {
    const activeUsersSpan = document.getElementById('active-users-count');
    const companiesSpan = document.getElementById('companies-count');
    
    if (!activeUsersSpan || !companiesSpan) return;
    
    // Get or initialize visit count from localStorage
    const VISITS_KEY = 'apaHR_visits';
    let visitCount = parseInt(localStorage.getItem(VISITS_KEY) || '0', 10);
    visitCount++;
    localStorage.setItem(VISITS_KEY, visitCount);
    
    // Calculate targets based on visit count
    const activeUsersTarget = Math.min(1200, 200 + visitCount * 110);
    const companiesTarget = Math.min(300, 5 + visitCount * 12);
    
    // Animation duration (ms)
    const duration = 1400;
    const startTime = Date.now();
    
    function updateCounters() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutCubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        
        const currentUsers = Math.floor(activeUsersTarget * eased);
        const currentCompanies = Math.floor(companiesTarget * eased);
        
        activeUsersSpan.textContent = currentUsers;
        companiesSpan.textContent = currentCompanies;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounters);
        }
    }
    
    updateCounters();
}

// Setup IntersectionObserver for About section
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.countersAnimated) {
                entry.target.dataset.countersAnimated = 'true';
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(aboutSection);
}

(function(){
    try { generateCaptcha(); } catch (e) { console.warn('Captcha init warning:', e); }
    const hasData = localStorage.getItem(STORAGE_KEYS.USERS) && localStorage.getItem(STORAGE_KEYS.LEAVES);
    const s = getSession();
    
    if (s) { 
        showApp(); 
        renderForRole(s.role);
        showNotification(`✓ Welcome back, ${s.name}!`, 'info', 3000);
    } else {
        showLanding();
        if (!hasData) {
            setTimeout(() => {
                showNotification('💡 Click "Seed demo data" to get started', 'info', 5000);
            }, 1000);
        }
    }
    
    renderTopInfo();
    console.log('🚀 Unscripted Employee Leave Portal loaded');
    if (hasData) {
        const users = readUsers();
        const leaves = readLeaves();
        console.log(`📊 Stats: ${users.length} users, ${leaves.length} leave requests`);
    }
})();

// =========================
// NAVBAR: hide on scroll & mobile toggle
// =========================
(function(){
    const landingHeader = document.querySelector('.landing-header');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!landingHeader) return;

    // Smooth show/hide on scroll (throttled via rAF)
    let lastY = window.scrollY || 0;
    let ticking = false;
    function handleNavScroll(){
        const y = window.scrollY || 0;
        const delta = y - lastY;
        // require a small threshold to avoid jitter
        if (Math.abs(delta) > 8) {
            if (y > lastY && y > 64) {
                landingHeader.classList.add('nav-hidden');
            } else {
                landingHeader.classList.remove('nav-hidden');
            }
            lastY = y;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleNavScroll);
            ticking = true;
        }
    }, { passive: true });

    // Mobile nav toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const open = landingHeader.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    // Close nav when a link is clicked (mobile)
    if (navLinks) {
        navLinks.addEventListener('click', (ev) => {
            const target = ev.target;
            if (target && (target.tagName === 'A' || target.tagName === 'BUTTON')) {
                landingHeader.classList.remove('nav-open');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Close mobile nav when tapping outside the opened menu
    document.addEventListener('click', (ev) => {
        if (!landingHeader.classList.contains('nav-open')) return;
        const within = ev.target.closest && ev.target.closest('.landing-header');
        if (!within) {
            landingHeader.classList.remove('nav-open');
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
    }, { passive: true });

    // Remove nav-open on window resize to larger screens
    window.addEventListener('resize', () => {
        try {
            if (window.innerWidth > 880 && landingHeader.classList.contains('nav-open')) {
                landingHeader.classList.remove('nav-open');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            }
        } catch (e) { }
    });
})();
