// Estado Global de la App
const state = {
  lang: 'es', // 'es' | 'en'
  theme: 'dark', // 'dark' | 'light'
  user: { name: 'Andrew Nathan', email: 'andrew@gmail.com' },
  habits: [
    { id: 1, title: 'Daily Running', category: 'ongoing', completed: false, time: '22:34:04' },
    { id: 2, title: 'Journaling & Reflection', category: 'upcoming', completed: false, time: '15:00:00' }
  ],
  weekly: [6, 12, 8, 14, 5, 11, 9]
};

// Traducciones
const translations = {
  es: {
    subtitle: 'Estudio de Avatar y Gestor de Hábitos',
    email_label: 'Correo electrónico',
    user_label: 'Nombre de usuario',
    pass_label: 'Contraseña',
    btn_signup: 'Registrarse / Iniciar Sesión',
    build_habit: '¡Construye un hábito hoy!',
    habits_stats: 'Estadísticas de Hábitos',
    habit_details: 'Detalles del Hábito',
    neg_reinforce: 'Refuerzos Negativos (-)',
    btn_complete: 'Marcar Hábito como Completado',
    profile: 'Perfil de Usuario',
    edit_profile: 'Editar Perfil'
  },
  en: {
    subtitle: 'Master Avatar Studio & Habit Tracker',
    email_label: 'Email address',
    user_label: 'Username',
    pass_label: 'Password',
    btn_signup: 'Sign Up / Log In',
    build_habit: 'Build a Habit Today!',
    habits_stats: 'Habits Statistics',
    habit_details: 'Habit Details',
    neg_reinforce: 'Negative (-) Reinforcements',
    btn_complete: 'Mark Habit As Complete',
    profile: 'User Profile',
    edit_profile: 'Edit Profile'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderWeeklyBars();
  renderHabitsList();
});

function setupEventListeners() {
  // Autenticación simulada
  document.getElementById('auth-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('auth-username').value;
    state.user.name = username;
    document.getElementById('header-username').textContent = username;
    
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
  });

  // Cambio de Idioma
  document.getElementById('btn-toggle-lang').addEventListener('click', toggleLanguage);
  document.getElementById('btn-lang-main').addEventListener('click', toggleLanguage);

  // Cambio de Tema
  document.getElementById('btn-toggle-theme-auth').addEventListener('click', toggleTheme);
  document.getElementById('btn-theme-main').addEventListener('click', toggleTheme);

  // Crear Hábito
  document.getElementById('form-new-habit').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('new-habit-title').value;
    state.habits.push({ id: Date.now(), title, category: 'ongoing', completed: false, time: '00:00:00' });
    document.getElementById('new-habit-title').value = '';
    closeModal();
    renderHabitsList();
  });
}

function toggleLanguage() {
  state.lang = state.lang === 'es' ? 'en' : 'es';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[state.lang][key]) {
      el.textContent = translations[state.lang][key];
    }
  });
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  const body = document.getElementById('app-body');
  if (state.theme === 'light') {
    body.classList.remove('bg-slate-950', 'text-slate-100');
    body.classList.add('bg-slate-100', 'text-slate-900');
  } else {
    body.classList.remove('bg-slate-100', 'text-slate-900');
    body.classList.add('bg-slate-950', 'text-slate-100');
  }
}

function switchTab(tabId) {
  document.querySelectorAll('.view-screen').forEach(screen => screen.classList.add('hidden'));
  document.getElementById(`view-${tabId}`).classList.remove('hidden');
}

function renderWeeklyBars() {
  const container = document.getElementById('dashboard-weekly-bars');
  container.innerHTML = '';
  const max = Math.max(...state.weekly);
  
  state.weekly.forEach(val => {
    const height = Math.round((val / max) * 100);
    const bar = document.createElement('div');
    bar.className = 'flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all';
    bar.style.height = `${height}%`;
    container.appendChild(bar);
  });
}

function renderHabitsList() {
  const container = document.getElementById('dashboard-habits-list');
  container.innerHTML = '';

  state.habits.forEach(habit => {
    const card = document.createElement('div');
    card.className = 'bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center justify-between';
    card.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">🏃‍♂️</div>
        <div>
          <h4 class="font-bold text-slate-100 text-xs">${habit.title}</h4>
          <span class="text-[10px] text-red-400 bg-red-950/40 px-2 py-0.5 rounded">${habit.time}</span>
        </div>
      </div>
      <button onclick="switchTab('habit-detail')" class="px-3 py-1.5 bg-slate-800 hover:bg-blue-600 text-white text-[10px] font-semibold rounded-xl transition">Ver</button>
    `;
    container.appendChild(card);
  });
}

function openModal() { document.getElementById('modal-habit').classList.remove('hidden'); }
function closeModal() { document.getElementById('modal-habit').classList.add('hidden'); }
function markHabitComplete() { alert('¡Hábito marcado como completado con éxito!'); switchTab('dashboard'); }