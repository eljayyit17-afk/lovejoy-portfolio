'use strict';

// Portfolio customization: update PROJECTS and the GitHub links to reflect new work.
const PROJECTS = {
  ekalinga: {
    kicker: 'BSIT CAPSTONE · MANDALUYONG CITY',
    title: 'e-Kalinga',
    description: 'e-Kalinga is our BSIT capstone project developed for the Solo Parent Department of Mandaluyong City. Built with Laravel, Blade, Tailwind CSS, and MySQL, the platform supports solo-parent registration, applications, annual renewals, member management, appointments, announcements, and administrative reports. Our goal was to make local community services easier to access and manage.',
    tech: ['Laravel', 'PHP', 'Blade', 'Tailwind CSS', 'MySQL'],
    source: 'https://github.com/eljayyit17-afk/e-kalinga'
  },
  attendance: {
    kicker: 'PROJECT · MANAGEMENT SYSTEM',
    title: 'Attendance Monitoring System',
    description: 'A web-system project developed during my web development experience, focused on managing attendance information and supporting better organization of records and monitoring workflows.',
    tech: ['Web Development', 'Records Management'],
    source: null
  },
  visitor: {
    kicker: 'PROJECT · MANAGEMENT SYSTEM',
    title: 'Visitor Log System',
    description: 'A project designed to simplify visitor entries and record keeping through a digital logging workflow. It reflects my interest in replacing repetitive manual processes with helpful web tools.',
    tech: ['Web Development', 'Digital Logging'],
    source: null
  },
  bigfive: {
    kicker: 'PROJECT · ASSESSMENT',
    title: 'Big Five Personality Test',
    description: 'An interactive project centered on presenting a personality assessment through an approachable interface, balancing useful information with an easy-to-follow experience.',
    tech: ['User Experience', 'Interactive Assessment'],
    source: null
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

// Theme switcher: stores the choice when local storage is available.
const themeToggle = $('#theme-toggle');
const root = document.documentElement;
try {
  const savedTheme = localStorage.getItem('lj-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
} catch { /* Private browsing can disable storage. */ }
function syncThemeButton() {
  themeToggle.setAttribute('aria-label', `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} theme`);
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = root.dataset.theme === 'dark' ? '#0b0e19' : '#f8f7ff';
}
syncThemeButton();
themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('lj-theme', root.dataset.theme); } catch { /* Still works without persistence. */ }
  syncThemeButton();
});

// Mobile navigation.
const menuButton = $('#menu-toggle');
const nav = $('#primary-nav');
function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
}
menuButton.addEventListener('click', () => {
  const willOpen = !nav.classList.contains('is-open');
  nav.classList.toggle('is-open', willOpen);
  menuButton.classList.toggle('is-open', willOpen);
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Close navigation menu' : 'Open navigation menu');
});
$$('#primary-nav a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', (event) => {
  if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

// Scroll progress + gentle section entrance animation.
const progress = $('#scroll-progress');
let scrollTicking = false;
function updateProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) { requestAnimationFrame(updateProgress); scrollTicking = true; }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
const revealItems = $$('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -35px 0px', threshold: 0.07 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Interactive project filters.
const filters = $$('.filter-btn');
const cards = $$('.project-card');
filters.forEach((button) => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  cards.forEach((card) => { card.hidden = category !== 'all' && card.dataset.category !== category; });
}));

// Accessible native dialog for project details. No invented demo links.
const dialog = $('#project-dialog');
const dialogSource = $('#dialog-source');
$$('[data-project]').forEach((button) => button.addEventListener('click', () => {
  const item = PROJECTS[button.dataset.project];
  if (!item) return;
  $('#dialog-kicker').textContent = item.kicker;
  $('#dialog-title').textContent = item.title;
  $('#dialog-description').textContent = item.description;
  const chips = $('#dialog-tech');
  chips.replaceChildren(...item.tech.map((name) => {
    const span = document.createElement('span');
    span.textContent = name;
    return span;
  }));
  dialogSource.hidden = !item.source;
  if (item.source) dialogSource.href = item.source;
  if (typeof dialog.showModal === 'function') { dialog.showModal(); document.body.classList.add('modal-open'); }
}));
function closeDialog() { if (dialog.open) dialog.close(); }
$('#dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });

// Copy the known GitHub username, with fallback for non-secure file:// contexts.
let toastTimeout;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2600);
}
$('#copy-github').addEventListener('click', async () => {
  const username = 'eljayyit17-afk';
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(username);
    } else {
      const helper = document.createElement('textarea');
      helper.value = username;
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      if (!document.execCommand('copy')) throw new Error('Copy unavailable');
      helper.remove();
    }
    showToast('GitHub username copied!');
  } catch {
    showToast(`GitHub: ${username}`);
  }
});
