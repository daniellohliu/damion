// Cargar Datos
let puntos = localStorage.getItem('danmiun_puntos') ? parseInt(localStorage.getItem('danmiun_puntos')) : 0;
let nivel = localStorage.getItem('danmiun_nivel') ? parseInt(localStorage.getItem('danmiun_nivel')) : 1;
let completados = localStorage.getItem('danmiun_completados') ? parseInt(localStorage.getItem('danmiun_completados')) : 0;
let modoOscuro = localStorage.getItem('danmiun_theme') !== 'light';

let habitos = localStorage.getItem('danmiun_habitos') 
  ? JSON.parse(localStorage.getItem('danmiun_habitos')) 
  : ["📚 Estudiar 30 minutos", "💧 Tomar 2L de agua", "🏃 Ejercicio 20 mins"];

let actividadSemanal = localStorage.getItem('danmiun_semana')
  ? JSON.parse(localStorage.getItem('danmiun_semana'))
  : [3, 5, 2, 8, 4, 6, 1];

// Elementos DOM
const spanPuntosText = document.getElementById('puntos-text');
const spanPuntosTotal = document.getElementById('puntos-total');
const spanCompletadosTotal = document.getElementById('completados-total');
const spanNivel = document.getElementById('nivel');
const barraExp = document.getElementById('barra-exp');
const avatar = document.getElementById('avatar');
const rangoAvatar = document.getElementById('rango-avatar');
const estadoAvatar = document.getElementById('estado-avatar');

const inputHabito = document.getElementById('nuevo-habito-input');
const btnAgregar = document.getElementById('btn-agregar');
const contenedorHabitos = document.getElementById('contenedor-habitos');
const btnReset = document.getElementById('btn-reset');

const btnTheme = document.getElementById('btn-theme');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
const bodyTheme = document.getElementById('body-theme');

// 1. Web Audio API (Sonidos Retro sin archivos externos)
function reproducirSonido(tipo) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (tipo === 'completar') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (tipo === 'nivel') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch(e) { console.log("Audio no soportado o bloqueado"); }
}

// 2. Gráfico Chart.js
let miGrafico;
function inicializarGrafico() {
  const ctx = document.getElementById('grafico-semanal').getContext('2d');
  miGrafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [{
        label: 'Misiones Completadas',
        data: actividadSemanal,
        backgroundColor: '#38bdf8',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
        x: { grid: { display: false } }
      }
    }
  });
}

// 3. Temporizador Pomodoro
let tiempoPomo = 25 * 60;
let timerId = null;
const pomoDisplay = document.getElementById('pomodoro-timer');

function actualizarPomodoroDisplay() {
  const min = Math.floor(tiempoPomo / 60);
  const sec = tiempoPomo % 60;
  pomoDisplay.textContent = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

document.getElementById('btn-pomo-start').addEventListener('click', () => {
  if (!timerId) {
    timerId = setInterval(() => {
      if (tiempoPomo > 0) {
        tiempoPomo--;
        actualizarPomodoroDisplay();
      } else {
        clearInterval(timerId);
        timerId = null;
        reproducirSonido('nivel');
        alert("¡Tiempo de enfoque terminado! Toma un descanso de 5 minutos.");
      }
    }, 1000);
  }
});

document.getElementById('btn-pomo-pause').addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
});

document.getElementById('btn-pomo-reset').addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  tiempoPomo = 25 * 60;
  actualizarPomodoroDisplay();
});

// 4. Switch Modo Claro / Oscuro
function aplicarTema() {
  if (modoOscuro) {
    bodyTheme.classList.remove('theme-light');
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Modo Oscuro';
  } else {
    bodyTheme.classList.add('theme-light');
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Modo Claro';
  }
  localStorage.setItem('danmiun_theme', modoOscuro ? 'dark' : 'light');
}

btnTheme.addEventListener('click', () => {
  modoOscuro = !modoOscuro;
  aplicarTema();
});

// Guardar en memoria
function guardarEnMemoria() {
  localStorage.setItem('danmiun_puntos', puntos);
  localStorage.setItem('danmiun_nivel', nivel);
  localStorage.setItem('danmiun_completados', completados);
  localStorage.setItem('danmiun_habitos', JSON.stringify(habitos));
  localStorage.setItem('danmiun_semana', JSON.stringify(actividadSemanal));
}

// Actualizar UI General
function actualizarUI() {
  spanNivel.textContent = nivel;
  spanPuntosTotal.textContent = puntos;
  spanCompletadosTotal.textContent = completados;

  const puntosNivelActual = puntos % 50;
  spanPuntosText.textContent = `${puntosNivelActual} / 50`;
  barraExp.style.width = `${(puntosNivelActual / 50) * 100}%`;

  if (nivel === 1) { avatar.textContent = "🤖"; rangoAvatar.textContent = "Unidad Cyber-01"; }
  else if (nivel === 2) { avatar.textContent = "👾"; rangoAvatar.textContent = "Cyber Hunter"; }
  else if (nivel === 3) { avatar.textContent = "🦊"; rangoAvatar.textContent = "Agente Neón"; }
  else { avatar.textContent = "🐉"; rangoAvatar.textContent = "DANMIUN MASTER"; }

  renderizarHabitos();
}

function renderizarHabitos() {
  contenedorHabitos.innerHTML = "";
  habitos.forEach((texto, index) => {
    const li = document.createElement('li');
    li.className = "bg-[#0d1117] border border-gray-800 p-3.5 rounded-xl flex justify-between items-center theme-subcard";
    li.innerHTML = `
      <span class="text-sm font-medium text-gray-200">${texto}</span>
      <div class="flex items-center gap-2">
        <button onclick="completarMision()" class="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition">
          Completar (+10 pts)
        </button>
        <button onclick="borrarHabito(${index})" class="text-gray-500 hover:text-red-400 p-1 text-xs transition">✕</button>
      </div>
    `;
    contenedorHabitos.appendChild(li);
  });
}

window.completarMision = function() {
  puntos += 10;
  completados += 1;
  actividadSemanal[0] += 1; // Sumar al día actual en la gráfica

  reproducirSonido('completar');
  avatar.classList.add('animacion-celebrar');
  setTimeout(() => avatar.classList.remove('animacion-celebrar'), 500);

  if (puntos >= nivel * 50) {
    nivel++;
    reproducirSonido('nivel');
    estadoAvatar.textContent = `¡NIVEL ${nivel} ALCANZADO! 🚀`;
  } else {
    estadoAvatar.textContent = "¡Misión cumplida! ⚡";
  }

  if (miGrafico) miGrafico.update();
  guardarEnMemoria();
  actualizarUI();
};

btnAgregar.addEventListener('click', () => {
  const texto = inputHabito.value.trim();
  if (texto !== "") {
    habitos.push(texto);
    inputHabito.value = "";
    guardarEnMemoria();
    actualizarUI();
  }
});

window.borrarHabito = function(index) {
  habitos.splice(index, 1);
  guardarEnMemoria();
  actualizarUI();
};

btnReset.addEventListener('click', () => {
  if (confirm("¿Reiniciar progreso de DANMIUN?")) {
    localStorage.clear();
    puntos = 0; nivel = 1; completados = 0;
    habitos = ["📚 Estudiar 30 minutos", "💧 Tomar 2L de agua"];
    actividadSemanal = [0, 0, 0, 0, 0, 0, 0];
    guardarEnMemoria();
    actualizarUI();
    if (miGrafico) {
      miGrafico.data.datasets[0].data = actividadSemanal;
      miGrafico.update();
    }
  }
});

// Inicializar
aplicarTema();
actualizarUI();
inicializarGrafico();