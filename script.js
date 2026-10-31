// Estado global de la aplicación
const state = {
  theme: 'dark', // 'dark' | 'light'
  xp: 20,
  maxXp: 50,
  level: 1,
  habits: [
    { id: 1, title: 'Estudiar 30 minutos', completed: false, xp: 10 },
    { id: 2, title: 'Tomar 2L de agua', completed: false, xp: 10 },
    { id: 3, title: 'Ejercicio 30 min', completed: false, xp: 10 }
  ],
  weeklyActivity: [
    { day: 'Lun', val: 7 },
    { day: 'Mar', val: 12 },
    { day: 'Mié', val: 5 },
    { day: 'Jue', val: 9 },
    { day: 'Vie', val: 14 },
    { day: 'Sáb', val: 4 },
    { day: 'Dom', val: 8 }
  ],
  avatarItems: [
    { id: 1, title: 'Escudo Nómada', unlocked: true },
    { id: 2, title: 'Capa Neón', unlocked: false },
    { id: 3, title: 'Casco Titán', unlocked: false },
    { id: 4, title: 'Aura Eléctrica', unlocked: false }
  ]
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  setupEventListeners();
  lucide.createIcons();
});

// Renderizar la interfaz
function renderApp() {
  renderHabits();
  renderWeeklyChart();
  renderAvatarItems();
  updateProgressUI();
}

// Configurar oyentes de eventos
function setupEventListeners() {
  // Cambio de modo claro / oscuro
  document.getElementById('btn-toggle-theme').addEventListener('click', toggleTheme);

  // Navegación por pestañas
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
  });

  // Modal
  document.getElementById('btn-open-modal').addEventListener('click', () => toggleModal(true));
  document.getElementById('btn-close-modal').addEventListener('click', () => toggleModal(false));
  document.getElementById('btn-cancel-modal').addEventListener('click', () => toggleModal(false));
  document.getElementById('form-new-habit').addEventListener('submit', handleAddHabit);
}

// Alternar Tema (Oscuro / Claro)
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  const body = document.getElementById('app-body');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  const themeLabel = document.getElementById('theme-label');

  if (state.theme === 'light') {
    body.classList.remove('bg-slate-950', 'text-slate-100');
    body.classList.add('bg-slate-50', 'text-slate-900');
    iconSun.classList.remove('hidden');
    iconMoon.classList.add('hidden');
    themeLabel.textContent = 'Modo Claro';
  } else {
    body.classList.remove('bg-slate-50', 'text-slate-900');
    body.classList.add('bg-slate-950', 'text-slate-100');
    iconSun.classList.add('hidden');
    iconMoon.classList.remove('hidden');
    themeLabel.textContent = 'Modo Oscuro';
  }
}

// Cambiar de Pestaña
function switchTab(tabId) {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-600/20');
      btn.classList.remove('text-slate-400');
    } else {
      btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-600/20');
      btn.classList.add('text-slate-400');
    }
  });

  document.querySelectorAll('.view-content').forEach(view => {
    view.classList.add('hidden');
  });
  document.getElementById(`view-${tabId}`).classList.remove('hidden');
}

// Renderizar Misiones/Hábitos
function renderHabits() {
  const container = document.getElementById('habits-list');
  container.innerHTML = '';

  state.habits.forEach(habit => {
    const item = document.createElement('div');
    item.className = `flex items-center justify-between p-3.5 rounded-xl border transition ${
      habit.completed 
        ? 'bg-blue-950/20 border-blue-500/30' 
        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
    }`;

    item.innerHTML = `
      <div class="flex items-center gap-3">
        <button onclick="toggleHabit(${habit.id})" class="w-5 h-5 rounded-md border flex items-center justify-center transition ${
          habit.completed 
            ? 'bg-blue-600 border-blue-500 text-white' 
            : 'border-slate-700 hover:border-blue-500'
        }">
          ${habit.completed ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
        </button>
        <span class="text-xs font-medium ${habit.completed ? 'line-through text-slate-500' : 'text-slate-200'}">
          ${habit.title}
        </span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 border border-blue-500/20">
          +${habit.xp} XP
        </span>
        <button onclick="deleteHabit(${habit.id})" class="text-slate-500 hover:text-red-400 transition">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;
    container.appendChild(item);
  });
  lucide.createIcons();
}

// Completar/Descompletar Hábito
function toggleHabit(id) {
  const habit = state.habits.find(h => h.id === id);
  if (!habit) return;

  habit.completed = !habit.completed;
  if (habit.completed) {
    state.xp += habit.xp;
    if (state.xp >= state.maxXp) {
      state.level += 1;
      state.xp = state.xp - state.maxXp;
      state.maxXp += 20;
    }
  } else {
    state.xp = Math.max(0, state.xp - habit.xp);
  }

  renderApp();
}

// Eliminar Hábito
function deleteHabit(id) {
  state.habits = state.habits.filter(h => h.id !== id);
  renderApp();
}

// Agregar Nuevo Hábito
function handleAddHabit(e) {
  e.preventDefault();
  const titleInput = document.getElementById('habit-title');
  const xpInput = document.getElementById('habit-xp');

  const newHabit = {
    id: Date.now(),
    title: titleInput.value.trim(),
    completed: false,
    xp: parseInt(xpInput.value) || 10
  };

  state.habits.push(newHabit);
  titleInput.value = '';
  toggleModal(false);
  renderApp();
}

// Abrir/Cerrar Modal
function toggleModal(show) {
  const modal = document.getElementById('modal-new-habit');
  if (show) {
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

// Actualizar Barra de XP y Nivel
function updateProgressUI() {
  document.getElementById('badge-level').textContent = `Nivel ${state.level}`;
  document.getElementById('xp-text').textContent = `${state.xp} / ${state.maxXp} XP`;
  const pct = Math.min(100, Math.round((state.xp / state.maxXp) * 100));
  document.getElementById('xp-bar').style.width = `${pct}%`;
}

// Renderizar Gráfica Semanal
function renderWeeklyChart() {
  const container = document.getElementById('weekly-bars');
  container.innerHTML = '';
  const maxVal = Math.max(...state.weeklyActivity.map(item => item.val));

  state.weeklyActivity.forEach(item => {
    const heightPct = Math.round((item.val / maxVal) * 100);
    const bar = document.createElement('div');
    bar.className = 'flex-1 flex flex-col items-center gap-2 h-full justify-end group';
    bar.innerHTML = `
      <div class="w-full bg-slate-800/80 rounded-lg group-hover:bg-blue-600/40 transition-all duration-300 relative overflow-hidden" style="height: ${heightPct}%">
        <div class="absolute inset-0 bg-gradient-to-t from-blue-600 to-cyan-400 opacity-80"></div>
      </div>
      <span class="text-[10px] font-medium text-slate-400">${item.day}</span>
    `;
    container.appendChild(bar);
  });
}

// Renderizar Items del Avatar
function renderAvatarItems() {
  const container = document.getElementById('avatar-items');
  container.innerHTML = '';

  state.avatarItems.forEach(item => {
    const box = document.createElement('div');
    box.className = `p-4 rounded-xl border text-center transition ${
      item.unlocked 
        ? 'bg-blue-950/30 border-blue-500/40 text-slate-200' 
        : 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60'
    }`;
    box.innerHTML = `
      <i data-lucide="${item.unlocked ? 'shield-check' : 'lock'}" class="w-6 h-6 mx-auto mb-2 ${item.unlocked ? 'text-blue-400' : 'text-slate-600'}"></i>
      <span class="text-xs font-semibold block">${item.title}</span>
    `;
    container.appendChild(box);
  });
}