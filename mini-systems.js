'use strict';

// Fully functional portfolio mini-apps. These are self-contained, browser-only
// learning demos. No backend, account, analytics or external API is involved.
(() => {
  const el = (selector) => document.querySelector(selector);
  const all = (selector) => [...document.querySelectorAll(selector)];
  const STORAGE = {
    inventory: 'lj-inventory-v1',
    tasks: 'lj-tasks-v1',
    grades: 'lj-grades-v1'
  };
  const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  function loadData(key, sample) {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return sample;
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.slice(0, 250) : sample;
    } catch {
      return sample;
    }
  }
  function saveData(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); }
    catch { /* Forms still work if storage is unavailable. */ }
  }
  function notify(message) {
    if (typeof showToast === 'function') showToast(message);
  }
  function makeText(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = content;
    return node;
  }
  function makeAction(label, action, id, ariaLabel) {
    const button = makeText('button', 'lab-row-action', label);
    button.type = 'button';
    button.dataset.action = action;
    button.dataset.id = id;
    if (ariaLabel) button.setAttribute('aria-label', ariaLabel);
    return button;
  }
  function showEmpty(target, message) {
    target.replaceChildren(makeText('p', 'lab-empty', message));
  }

  // Accessible tablist: mouse, keyboard arrows, Home and End.
  const tabs = all('[data-demo-tab]');
  function activateTab(tab, focus = false) {
    if (!tab) return;
    tabs.forEach((current) => {
      const selected = current === tab;
      current.classList.toggle('active', selected);
      current.setAttribute('aria-selected', String(selected));
      current.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(current.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
        (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      activateTab(tabs[nextIndex], true);
    });
  });

  // MINI SYSTEM 1: INVENTORY TRACKER
  // Quantity changes, live search, low-stock highlighting and local persistence.
  const sampleInventory = [
    { id: 'sample-1', name: 'USB-C Cable', quantity: 12 },
    { id: 'sample-2', name: 'Wireless Mouse', quantity: 4 },
    { id: 'sample-3', name: 'Notebook', quantity: 0 }
  ];
  let inventory = loadData(STORAGE.inventory, sampleInventory).filter(item =>
    item && typeof item.id === 'string' && typeof item.name === 'string' &&
    Number.isInteger(item.quantity) && item.quantity >= 0 && item.quantity <= 9999
  );
  function addInventoryItem(name, quantity) {
    const item = { id: makeId(), name: name.trim(), quantity: Number(quantity) };
    inventory.push(item);
    saveData(STORAGE.inventory, inventory);
    renderInventory();
  }
  function changeStock(id, amount) {
    const item = inventory.find(item => item.id === id);
    if (!item) return;
    item.quantity = Math.max(0, Math.min(9999, item.quantity + amount));
    saveData(STORAGE.inventory, inventory);
    renderInventory();
  }
  function renderInventory() {
    const target = el('#inventory-list');
    el('#inventory-count').textContent = String(inventory.length);
    el('#inventory-low').textContent = String(inventory.filter(item => item.quantity <= 5).length);
    const query = el('#inventory-search').value.trim().toLowerCase();
    const visible = inventory.filter(item => item.name.toLowerCase().includes(query));
    if (!visible.length) {
      showEmpty(target, query ? 'No matching products. Try a different search.' : 'No products yet. Add your first item above.');
      return;
    }
    const fragment = document.createDocumentFragment();
    visible.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'lab-data-row';
      const icon = makeText('span', 'lab-data-icon', '▦');
      icon.setAttribute('aria-hidden', 'true');
      const details = document.createElement('div');
      details.className = 'lab-row-details';
      details.append(makeText('strong', '', item.name), makeText('small', '', item.quantity === 0 ? 'Out of stock' : item.quantity <= 5 ? 'Low stock' : 'In stock'));
      const amount = makeText('span', `lab-stock ${item.quantity <= 5 ? 'lab-stock-low' : ''}`, String(item.quantity));
      amount.title = 'Quantity in stock';
      const actions = document.createElement('div');
      actions.className = 'lab-row-actions';
      const minus = makeAction('−', 'decrease', item.id, `Reduce stock for ${item.name}`);
      minus.disabled = item.quantity === 0;
      const plus = makeAction('+', 'increase', item.id, `Increase stock for ${item.name}`);
      plus.disabled = item.quantity >= 9999;
      const remove = makeAction('×', 'remove', item.id, `Remove ${item.name}`);
      remove.classList.add('lab-delete');
      actions.append(minus, plus, remove);
      row.append(icon, details, amount, actions);
      fragment.append(row);
    });
    target.replaceChildren(fragment);
  }
  el('#inventory-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = el('#inventory-name');
    const quantityInput = el('#inventory-quantity');
    const name = nameInput.value.trim();
    const quantity = Number(quantityInput.value);
    if (!name || !Number.isInteger(quantity) || quantity < 0 || quantity > 9999) {
      notify('Enter a valid product name and quantity (0–9999).');
      return;
    }
    if (inventory.length >= 250) { notify('Demo limit: 250 products.'); return; }
    const exists = inventory.some(item => item.name.toLowerCase() === name.toLowerCase());
    if (exists) { notify('This product already exists. Use + to restock it.'); return; }
    addInventoryItem(name, quantity);
    nameInput.value = '';
    quantityInput.value = '10';
    nameInput.focus();
    notify('Product added!');
  });
  el('#inventory-search').addEventListener('input', renderInventory);
  el('#inventory-list').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const { action, id } = button.dataset;
    if (action === 'increase') changeStock(id, 1);
    if (action === 'decrease') changeStock(id, -1);
    if (action === 'remove') {
      inventory = inventory.filter(item => item.id !== id);
      saveData(STORAGE.inventory, inventory);
      renderInventory();
      notify('Product removed.');
    }
  });
  renderInventory();

  // MINI SYSTEM 2: TASK MANAGER
  // Add, complete, filter and delete tasks; saved between visits.
  const sampleTasks = [
    { id: 'task-sample-1', title: 'Review JavaScript concepts', priority: 'high', done: false },
    { id: 'task-sample-2', title: 'Polish portfolio homepage', priority: 'medium', done: true },
    { id: 'task-sample-3', title: 'Explore new UI ideas', priority: 'low', done: false }
  ];
  let tasks = loadData(STORAGE.tasks, sampleTasks).filter(task => task &&
    typeof task.id === 'string' && typeof task.title === 'string' &&
    ['high', 'medium', 'low'].includes(task.priority) && typeof task.done === 'boolean');
  let taskFilter = 'all';
  function addTask(title, priority) {
    tasks.unshift({ id: makeId(), title, priority, done: false });
    saveData(STORAGE.tasks, tasks);
    renderTasks();
  }
  function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (!task) return;
    task.done = !task.done;
    saveData(STORAGE.tasks, tasks);
    renderTasks();
  }
  function renderTasks() {
    const target = el('#tasks-list');
    el('#tasks-total').textContent = String(tasks.length);
    el('#tasks-done').textContent = String(tasks.filter(task => task.done).length);
    const visible = tasks.filter(task => taskFilter === 'all' || (taskFilter === 'done' ? task.done : !task.done));
    if (!visible.length) {
      showEmpty(target, taskFilter === 'all' ? 'No tasks yet. Add your first task above.' : 'No tasks in this view.');
      return;
    }
    const fragment = document.createDocumentFragment();
    visible.forEach(task => {
      const row = document.createElement('div');
      row.className = `lab-data-row lab-task-row${task.done ? ' is-done' : ''}`;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'lab-task-checkbox';
      checkbox.checked = task.done;
      checkbox.dataset.id = task.id;
      checkbox.setAttribute('aria-label', `Mark ${task.title} ${task.done ? 'incomplete' : 'complete'}`);
      const details = document.createElement('div');
      details.className = 'lab-row-details';
      details.append(makeText('strong', '', task.title));
      const priority = makeText('span', `lab-priority lab-priority-${task.priority}`, task.priority);
      const remove = makeAction('×', 'delete-task', task.id, `Delete ${task.title}`);
      remove.classList.add('lab-delete');
      row.append(checkbox, details, priority, remove);
      fragment.append(row);
    });
    target.replaceChildren(fragment);
  }
  el('#tasks-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const titleInput = el('#task-title');
    const title = titleInput.value.trim();
    const priority = el('#task-priority').value;
    if (!title || !['high', 'medium', 'low'].includes(priority)) return;
    if (tasks.length >= 250) { notify('Demo limit: 250 tasks.'); return; }
    addTask(title, priority);
    titleInput.value = '';
    titleInput.focus();
    notify('Task added!');
  });
  el('#tasks-list').addEventListener('change', (event) => {
    if (event.target.matches('input.lab-task-checkbox')) toggleTask(event.target.dataset.id);
  });
  el('#tasks-list').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action="delete-task"]');
    if (!button) return;
    tasks = tasks.filter(task => task.id !== button.dataset.id);
    saveData(STORAGE.tasks, tasks);
    renderTasks();
    notify('Task removed.');
  });
  all('[data-task-filter]').forEach(button => button.addEventListener('click', () => {
    taskFilter = button.dataset.taskFilter;
    all('[data-task-filter]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    renderTasks();
  }));
  renderTasks();

  // MINI SYSTEM 3: GRADE CALCULATOR
  // Scores are on a 0–100 scale, weighted by units. The 75 threshold is only
  // an example benchmark; not an assertion about any university's grading policy.
  const sampleSubjects = [
    { id: 'grade-sample-1', name: 'Web Development', grade: 92, units: 3 },
    { id: 'grade-sample-2', name: 'Database Systems', grade: 88, units: 3 }
  ];
  let subjects = loadData(STORAGE.grades, sampleSubjects).filter(subject => subject &&
    typeof subject.id === 'string' && typeof subject.name === 'string' &&
    typeof subject.grade === 'number' && subject.grade >= 0 && subject.grade <= 100 &&
    Number.isInteger(subject.units) && subject.units >= 1 && subject.units <= 6);
  function calculateAverage(subjects) {
    const totalUnits = subjects.reduce((sum, subject) => sum + subject.units, 0);
    if (totalUnits === 0) return null;
    const weightedSum = subjects.reduce((sum, subject) => sum + subject.grade * subject.units, 0);
    return weightedSum / totalUnits;
  }
  function renderGrades() {
    const target = el('#grades-list');
    const average = calculateAverage(subjects);
    el('#grades-average').textContent = average === null ? '—' : average.toFixed(2);
    const status = el('#grades-status');
    status.textContent = average === null ? '—' : average >= 75 ? 'On track ✓' : 'Below 75';
    status.classList.toggle('lab-status-alert', average !== null && average < 75);
    if (!subjects.length) { showEmpty(target, 'No subjects yet. Add one above to calculate your average.'); return; }
    const fragment = document.createDocumentFragment();
    subjects.forEach(subject => {
      const row = document.createElement('div');
      row.className = 'lab-data-row';
      const icon = makeText('span', 'lab-data-icon', '◈');
      icon.setAttribute('aria-hidden', 'true');
      const details = document.createElement('div');
      details.className = 'lab-row-details';
      details.append(makeText('strong', '', subject.name), makeText('small', '', `${subject.units} unit${subject.units === 1 ? '' : 's'}`));
      const score = makeText('span', 'lab-grade-score', subject.grade.toFixed(2).replace(/\.00$/, ''));
      const remove = makeAction('×', 'delete-grade', subject.id, `Remove ${subject.name}`);
      remove.classList.add('lab-delete');
      row.append(icon, details, score, remove);
      fragment.append(row);
    });
    target.replaceChildren(fragment);
  }
  el('#grades-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const subjectInput = el('#grade-subject');
    const name = subjectInput.value.trim();
    const grade = Number(el('#grade-score').value);
    const units = Number(el('#grade-units').value);
    if (!name || !Number.isFinite(grade) || grade < 0 || grade > 100 || !Number.isInteger(units) || units < 1 || units > 6) {
      notify('Enter a grade from 0–100 and units from 1–6.');
      return;
    }
    if (subjects.length >= 250) { notify('Demo limit: 250 subjects.'); return; }
    subjects.push({ id: makeId(), name, grade, units });
    saveData(STORAGE.grades, subjects);
    renderGrades();
    subjectInput.value = '';
    el('#grade-score').value = '';
    subjectInput.focus();
    notify('Subject added!');
  });
  el('#grades-list').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action="delete-grade"]');
    if (!button) return;
    subjects = subjects.filter(subject => subject.id !== button.dataset.id);
    saveData(STORAGE.grades, subjects);
    renderGrades();
    notify('Subject removed.');
  });
  renderGrades();

  // The View Code accordions contain readable excerpts. The complete code for
  // all three systems lives in this file and is included in the source ZIP.
  all('[data-copy-snippet]').forEach(button => button.addEventListener('click', async () => {
    const code = button.closest('.lab-code-inner').querySelector('code').textContent;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const helper = document.createElement('textarea');
        helper.value = code;
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        if (!document.execCommand('copy')) throw new Error('Copy unavailable');
        helper.remove();
      }
      notify('JavaScript snippet copied!');
    } catch {
      notify('Select and copy the snippet above.');
    }
  }));
})();
