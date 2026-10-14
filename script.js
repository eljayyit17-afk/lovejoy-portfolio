
'use strict';

/* ==============================================
   LOVE JOY ITABLE — PORTFOLIO
   VIOLET / LAVENDER TERMINAL THEME

   Main JavaScript
   - Dark / Light Theme
   - Mobile Navigation
   - Scroll Progress
   - Section Reveal
   - Project Filters
   - Project Details Dialog
   - GitHub Username Copy
   - Toast Notifications
   ============================================== */


/* ==============================================
   PROJECT INFORMATION
   ============================================== */

const PROJECTS = {
  ekalinga: {
    kicker: 'BSIT CAPSTONE · MANDALUYONG CITY',

    title: 'e-Kalinga',

    description:
      'e-Kalinga is our BSIT capstone project developed for the Solo Parent Department of Mandaluyong City. Built with Laravel, Blade, Tailwind CSS, and MySQL, the platform supports solo-parent registration, applications, annual renewals, member management, appointments, announcements, and administrative reports. Our goal was to make local community services easier to access and manage.',

    tech: [
      'Laravel',
      'PHP',
      'Blade',
      'Tailwind CSS',
      'MySQL'
    ],

    source: 'https://github.com/eljayyit17-afk/e-kalinga'
  },

  attendance: {
  kicker: 'FULL-STACK WEB APPLICATION',
  title: 'Attendify — Attendance Monitoring System',
  description:
    'A full-stack employee attendance and workforce management system featuring employee account management, secure role-based authentication, real-time clock-in and clock-out, work schedules, vacation leave (VL), sick leave (SL), absence tracking, holiday management, and attendance reports.',

  tech: [
    'Laravel',
    'PHP',
    'Livewire',
    'Tailwind CSS',
    'MySQL'
  ],

  source: 'https://github.com/eljayyit17-afk/attendify',
  demo: null // Replace with actual hosted Attendify URL
},

  visitor: {
    kicker: 'PROJECT · MANAGEMENT SYSTEM',

    title: 'Visitor Log System',

    description:
      'A project designed to simplify visitor entries and record keeping through a digital logging workflow. It reflects my interest in replacing repetitive manual processes with helpful web tools.',

    tech: [
      'Web Development',
      'Digital Logging'
    ],

    source: null
  },

  bigfive: {
    kicker: 'PROJECT · ASSESSMENT',

    title: 'Big Five Personality Test',

    description:
      'An interactive project centered on presenting a personality assessment through an approachable interface, balancing useful information with an easy-to-follow experience.',

    tech: [
      'User Experience',
      'Interactive Assessment'
    ],

    source: null
  }
};


/* ==============================================
   DOM HELPERS
   ============================================== */

const $ = (selector) => {
  return document.querySelector(selector);
};

const $$ = (selector) => {
  return Array.from(
    document.querySelectorAll(selector)
  );
};


/* ==============================================
   DARK / LIGHT THEME SWITCHER
   ============================================== */

const root = document.documentElement;

const themeToggle = $('#theme-toggle');

const THEME_STORAGE_KEY = 'lj-theme';

const THEME_COLORS = {
  dark: '#100d1c',
  light: '#faf7ff'
};


// Load saved theme

function loadSavedTheme() {
  try {
    const savedTheme = localStorage.getItem(
      THEME_STORAGE_KEY
    );

    if (
      savedTheme === 'dark' ||
      savedTheme === 'light'
    ) {
      root.dataset.theme = savedTheme;
    }

  } catch (error) {
    // The website still works if storage is blocked.
    console.warn(
      'Theme preference could not be loaded.',
      error
    );
  }
}


// Update theme button and browser theme color

function syncThemeButton() {
  const currentTheme =
    root.dataset.theme === 'light'
      ? 'light'
      : 'dark';

  const nextTheme =
    currentTheme === 'dark'
      ? 'light'
      : 'dark';

  // Update accessible button label

  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      `Switch to ${nextTheme} theme`
    );

    themeToggle.setAttribute(
      'title',
      `Switch to ${nextTheme} theme`
    );

    themeToggle.setAttribute(
      'aria-pressed',
      String(currentTheme === 'light')
    );
  }

  // Update browser toolbar color

  const metaTheme = $(
    'meta[name="theme-color"]'
  );

  if (metaTheme) {
    metaTheme.setAttribute(
      'content',
      THEME_COLORS[currentTheme]
    );
  }
}


// Change theme

function toggleTheme() {
  const currentTheme =
    root.dataset.theme === 'light'
      ? 'light'
      : 'dark';

  const nextTheme =
    currentTheme === 'dark'
      ? 'light'
      : 'dark';

  root.dataset.theme = nextTheme;

  try {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      nextTheme
    );

  } catch (error) {
    console.warn(
      'Theme preference could not be saved.',
      error
    );
  }

  syncThemeButton();
}


// Initialize theme

loadSavedTheme();

syncThemeButton();

themeToggle?.addEventListener(
  'click',
  toggleTheme
);


/* ==============================================
   MOBILE NAVIGATION
   ============================================== */

const menuButton = $('#menu-toggle');

const nav = $('#primary-nav');


function closeMenu() {
  if (!nav || !menuButton) return;

  const returnFocus = nav.contains(document.activeElement);
  nav.classList.remove('is-open');
  if (returnFocus && !desktopMedia.matches) menuButton.focus();

  menuButton.classList.remove('is-open');

  menuButton.setAttribute(
    'aria-expanded',
    'false'
  );

  menuButton.setAttribute(
    'aria-label',
    'Open navigation menu'
  );
}


function toggleMenu() {
  if (!nav || !menuButton) return;

  const shouldOpen =
    !nav.classList.contains('is-open');

  nav.classList.toggle(
    'is-open',
    shouldOpen
  );

  menuButton.classList.toggle(
    'is-open',
    shouldOpen
  );

  menuButton.setAttribute(
    'aria-expanded',
    String(shouldOpen)
  );

  menuButton.setAttribute(
    'aria-label',
    shouldOpen
      ? 'Close navigation menu'
      : 'Open navigation menu'
  );
}


// Menu button click

menuButton?.addEventListener(
  'click',
  toggleMenu
);


// Close menu after clicking navigation link

$$('#primary-nav a').forEach((link) => {
  link.addEventListener(
    'click',
    closeMenu
  );
});


// Close menu when Escape is pressed

document.addEventListener(
  'keydown',
  (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  }
);


// Close menu when clicking outside

document.addEventListener(
  'click',
  (event) => {
    if (!nav || !menuButton) return;

    const clickedInsideMenu =
      nav.contains(event.target);

    const clickedMenuButton =
      menuButton.contains(event.target);

    if (
      !clickedInsideMenu &&
      !clickedMenuButton
    ) {
      closeMenu();
    }
  }
);


// Close menu when switching to desktop layout

const desktopMedia = window.matchMedia(
  '(min-width: 681px)'
);

function handleDesktopChange(event) {
  if (event.matches) {
    closeMenu();
  }
}

if (desktopMedia.addEventListener) {
  desktopMedia.addEventListener(
    'change',
    handleDesktopChange
  );
} else if (desktopMedia.addListener) {
  desktopMedia.addListener(
    handleDesktopChange
  );
}


/* ==============================================
   SCROLL PROGRESS INDICATOR
   ============================================== */

const progress = $('#scroll-progress');

let scrollTicking = false;


function updateProgress() {
  const documentHeight =
    document.documentElement.scrollHeight;

  const windowHeight =
    window.innerHeight;

  const maxScroll =
    documentHeight - windowHeight;

  let percentage = 0;

  if (maxScroll > 0) {
    percentage =
      (window.scrollY / maxScroll) * 100;
  }

  percentage = Math.min(
    100,
    Math.max(0, percentage)
  );

  if (progress) {
    progress.style.transform =
      `scaleX(${percentage / 100})`;
  }

  scrollTicking = false;
}


function requestProgressUpdate() {
  if (scrollTicking) return;

  scrollTicking = true;

  requestAnimationFrame(
    updateProgress
  );
}


window.addEventListener(
  'scroll',
  requestProgressUpdate,
  { passive: true }
);

window.addEventListener(
  'resize',
  requestProgressUpdate
);

updateProgress();

// Keep navigation aligned with the section currently being read.
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    $$('#primary-nav a').forEach(link => {
      if (link.getAttribute('href') === `#${visible.target.id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: [0, .1, .5] });
  $$('main section[id]').forEach(section => sectionObserver.observe(section));
}


/* ==============================================
   SECTION REVEAL
   ============================================== */

const revealItems = $$('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver = null;

function showAllSections() {
  revealObserver?.disconnect();
  root.classList.remove('motion-ready');
  revealItems.forEach(item => item.classList.add('is-visible'));
}

function initializeReveals() {
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    showAllSections();
    return;
  }
  revealObserver?.disconnect();
  // Only stagger siblings: section headings and separate groups start promptly.
  const groups = new Map();
  revealItems.forEach(item => {
    const index = groups.get(item.parentElement) || 0;
    item.style.setProperty('--reveal-delay', `${Math.min(index * 80, 240)}ms`);
    groups.set(item.parentElement, index + 1);
  });
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.hidden) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -24px 0px', threshold: 0.04 });
  revealItems.filter(item => !item.classList.contains('is-visible'))
    .forEach(item => revealObserver.observe(item));
  root.classList.add('motion-ready');
}
initializeReveals();

// Keyboard navigation must never land on an invisible reveal.
document.addEventListener('focusin', event => {
  const item = event.target.closest('.reveal');
  if (item) {
    item.classList.add('is-visible');
    revealObserver?.unobserve(item);
  }
});

const motionToggle = $('#motion-toggle');
let ambientPaused = false;
try { ambientPaused = localStorage.getItem('lj-motion-paused') === 'true'; }
catch { /* Motion controls work without browser storage. */ }
function syncAmbientMotion() {
  root.classList.toggle('ambient-paused', ambientPaused || reducedMotion.matches);
  if (!motionToggle) return;
  motionToggle.hidden = reducedMotion.matches;
  motionToggle.setAttribute('aria-pressed', String(ambientPaused));
  motionToggle.textContent = ambientPaused ? 'Resume background motion' : 'Pause background motion';
}
motionToggle?.addEventListener('click', () => {
  ambientPaused = !ambientPaused;
  try { localStorage.setItem('lj-motion-paused', String(ambientPaused)); }
  catch { /* Storage is optional. */ }
  syncAmbientMotion();
});
syncAmbientMotion();
function handleMotionPreference() {
  initializeReveals();
  syncAmbientMotion();
}
if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', handleMotionPreference);
else reducedMotion.addListener?.(handleMotionPreference);

// Stop ambient animation while the hero or browser tab is out of view.
let heroInView = true;
function syncAmbientVisibility() {
  root.classList.toggle('ambient-hidden', document.hidden || !heroInView);
}
document.addEventListener('visibilitychange', syncAmbientVisibility);
if ('IntersectionObserver' in window) {
  const heroObserver = new IntersectionObserver(entries => {
    heroInView = entries[0].isIntersecting;
    syncAmbientVisibility();
  });
  const hero = $('.hero');
  if (hero) heroObserver.observe(hero);
}
syncAmbientVisibility();

/* ==============================================
   INTERACTIVE PROJECT FILTERS
   ============================================== */

const filters = $$('.filter-btn');

const cards = $$('.project-card');


function filterProjects(category) {
  // Update active button

  filters.forEach((button) => {
    const isActive =
      button.dataset.filter === category;

    button.classList.toggle(
      'active',
      isActive
    );

    button.setAttribute(
      'aria-pressed',
      String(isActive)
    );
  });

  // Filter project cards

  cards.forEach((card) => {
    const shouldShow =
      category === 'all' ||
      card.dataset.category === category;

    card.hidden = !shouldShow;
    // Filter results appear immediately, without a delayed invisible click target.
    if (shouldShow) {
      card.classList.add('is-visible');
      revealObserver?.unobserve(card);
    }
  });
}


filters.forEach((button) => {
  button.addEventListener(
    'click',
    () => {
      filterProjects(
        button.dataset.filter
      );
    }
  );
});


/* ==============================================
   PROJECT DETAILS DIALOG
   ============================================== */

const dialog = $('#project-dialog');

const dialogSource = $('#dialog-source');
const dialogDemo = $('#dialog-demo');

// Production demos must use HTTPS; local and private-network addresses stay hidden.
function productionDemoUrl(value) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== 'https:' || url.username || url.password ||
        !host.includes('.') || host.includes(':') ||
        /^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host) ||
        /\.(localhost|local|internal|test|invalid|example)$/.test(host)) return null;
    return url.href;
  } catch { return null; }
}

function syncDemoLink(link, value) {
  if (!link) return;
  const url = productionDemoUrl(value);
  link.hidden = !url;
  if (url) link.href = url;
  else link.removeAttribute('href');
}

$$('[data-project-demo]').forEach(link => {
  syncDemoLink(link, PROJECTS[link.dataset.projectDemo]?.demo);
});

const dialogClose = $('#dialog-close');


function openProjectDialog(projectKey) {
  const project = PROJECTS[projectKey];

  if (!project || !dialog) return;

  const kicker = $('#dialog-kicker');

  const title = $('#dialog-title');

  const description = $('#dialog-description');

  const chips = $('#dialog-tech');


  // Set project information

  if (kicker) {
    kicker.textContent = project.kicker;
  }

  if (title) {
    title.textContent = project.title;
  }

  if (description) {
    description.textContent =
      project.description;
  }


  // Render technologies

  if (chips) {
    const techElements =
      project.tech.map((technology) => {
        const span =
          document.createElement('span');

        span.textContent = technology;

        return span;
      });

    chips.replaceChildren(
      ...techElements
    );
  }


  // Only show source link if it exists

  if (dialogSource) {
    if (project.source) {
      dialogSource.href =
        project.source;

      dialogSource.hidden = false;
    } else {
      dialogSource.hidden = true;

      dialogSource.removeAttribute(
        'href'
      );
    }
  }


  syncDemoLink(dialogDemo, project.demo);

  // Open native modal dialog

  if (
    typeof dialog.showModal === 'function' &&
    !dialog.open
  ) {
    dialog.showModal();

    document.body.classList.add(
      'modal-open'
    );
  }
}


$$('[data-project]').forEach((button) => {
  button.addEventListener(
    'click',
    () => {
      openProjectDialog(
        button.dataset.project
      );
    }
  );
});


function closeDialog() {
  if (dialog?.open) {
    dialog.close();
  }
}


dialogClose?.addEventListener(
  'click',
  closeDialog
);


// Remove body lock when dialog closes

dialog?.addEventListener(
  'close',
  () => {
    document.body.classList.remove(
      'modal-open'
    );
  }
);


// Close dialog when clicking on backdrop

dialog?.addEventListener(
  'click',
  (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom
    )) {
      closeDialog();
    }
  }
);


/* ==============================================
   TOAST NOTIFICATIONS
   ============================================== */

let toastTimeout = null;


function showToast(message, undo) {
  const toast = $('#toast');

  if (!toast) return;

  toast.textContent = message;
  if (typeof undo === 'function') {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Undo';
    button.addEventListener('click', () => {
      undo();
      showToast('Change undone.');
    }, { once: true });
    toast.appendChild(button);
  }

  toast.classList.add('visible');

  if (toastTimeout !== null) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(
    () => {
      toast.classList.remove(
        'visible'
      );

      toastTimeout = null;
    },
    undo ? 10000 : 4000
  );
}


/* ==============================================
   COPY GITHUB USERNAME
   ============================================== */

const copyGithubButton = $('#copy-github');

const GITHUB_USERNAME = 'eljayyit17-afk';


async function copyGithubUsername() {
  try {
    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(
        GITHUB_USERNAME
      );

    } else {
      // Fallback for older or non-secure browsers.

      const helper =
        document.createElement('textarea');

      helper.value = GITHUB_USERNAME;

      helper.setAttribute(
        'readonly',
        ''
      );

      helper.style.position = 'fixed';

      helper.style.opacity = '0';

      helper.style.left = '-9999px';

      document.body.appendChild(
        helper
      );

      helper.select();

      let copied = false;

      try {
        copied = document.execCommand(
          'copy'
        );
      } finally {
        helper.remove();
      }

      if (!copied) {
        throw new Error(
          'Clipboard copy unavailable'
        );
      }
    }

    showToast(
      'GitHub username copied!'
    );

  } catch (error) {
    console.warn(
      'Copy failed:',
      error
    );

    showToast(
      `GitHub: ${GITHUB_USERNAME}`
    );
  }
}


copyGithubButton?.addEventListener(
  'click',
  copyGithubUsername
);


/* ==============================================
   CV VIEW AND DOWNLOAD
   ============================================== */

/*
  Your index.html already contains:

  VIEW CV:
  <a href="./CV-ITABLE,LOVE%20JOY%202.pdf"
     target="_blank">
     View CV
  </a>

  DOWNLOAD CV:
  <a href="./CV-ITABLE,LOVE%20JOY%202.pdf"
     download="CV-ITABLE,LOVE JOY 2.pdf">
     Download CV
  </a>

  No JavaScript fetch() is needed.

  The PDF must be in the same folder
  as index.html on the deployed website.

  Keeping downloads as regular links
  avoids the previous "Failed to fetch"
  issue caused by local file restrictions.

*/


/* ==============================================
   INITIALIZATION COMPLETE
   ============================================== */

console.info(
  'Love Joy Portfolio initialized successfully.'
);
