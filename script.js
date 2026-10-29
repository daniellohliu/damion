let puntos = localStorage.getItem('danmiun_puntos') ? parseInt(localStorage.getItem('danmiun_puntos')) : 0;
let nivel = localStorage.getItem('danmiun_nivel') ? parseInt(localStorage.getItem('danmiun_nivel')) : 1;
let completados = localStorage.getItem('danmiun_completados') ? parseInt(localStorage.getItem('danmiun_completados')) : 0;
let racha = localStorage.getItem('danmiun_racha') ? parseInt(localStorage.getItem('danmiun_racha')) : 1;
let colorAccentuacion = localStorage.getItem('danmiun_color') || 'blue';
let modoOscuro = localStorage.getItem('danmiun_theme') !== 'light';

let habitos = localStorage.getItem('danmiun_habitos') 
  ? JSON.parse(localStorage.getItem('danmiun_habitos')) 
  : ["📚 Estudiar 30 minutos", "💧 Tomar 2L de agua", "🏃 Ejercicio 20 mins"];

let actividadSemanal = localStorage.getItem('danmiun_semana')
  ? JSON.parse(localStorage.getItem('danmiun_semana'))
  : [3, 5, 2, 8, 4, 6, 1];

// Elementos DOM
const spanPuntosText = document.getElementById('puntos-text');
const spanNivel = document.getElementById('nivel');
const spanRacha = document.getElementById('racha-dias');
const avatar = document.getElementById('avatar');
const rangoAvatar = document.getElementById('rango-avatar');
const estadoAvatar = document.getElementById('estado-avatar');

const inputHabito = document.getElementById('nuevo-habito-input');
const btnAgregar = document.getElementById('btn-agregar');
const contenedorHabitos = document.getElementById('contenedor-habitos');
const btnReset = document.getElementById('btn-reset');
const inputNotas = document.getElementById('input-notas');

const selectColor = document.getElementById('select-color');
const btnTheme = document.getElementById('btn-theme');
const bodyTheme = document.getElementById('body-theme');

inputNotas.value = localStorage.getItem('danmiun_notas') || '';
inputNotas.addEventListener('input', () => {
  localStorage.setItem('danmiun_notas', inputNotas.value);
});

// Selector de Color
selectColor.value = colorAccentuacion;
bodyTheme.className = `bg-[#0a0e17] text-white min-h-screen font-sans pb-12 accent-${colorAccentuacion}`;
if(!modoOscuro) bodyTheme.classList.add('theme-light');

selectColor.addEventListener('change', (e) => {
  colorAccentuacion = e.target.value;
  localStorage.setItem('danmiun_color', colorAccentuacion);
  bodyTheme.className = `bg-[#0a0e17] text-white min-h-screen font-sans pb-12 accent-${colorAccentuacion}`;
  if(!modoOscuro) bodyTheme.classList.add('theme-light');
});

btnTheme.addEventListener('click', () => {
  modoOscuro = !modoOscuro;
  localStorage.setItem('danmiun_theme', modoOscuro ? 'dark' : 'light');
  if(modoOscuro) bodyTheme.classList.remove('theme-light');
  else bodyTheme.classList.add('theme-light');
  btnTheme.textContent = modoOscuro ? '🌙' : '☀️';
});

// Audio API
function reproducirSonido(tipo) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(tipo === 'nivel' ? 660 : 440, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start(); osc.stop(ctx.currentTime + 0.3);
  } catch(e) {}
}

// Gráfico
let miGrafico;
function inicializarGrafico() {
  const ctx = document.getElementById('grafico-semanal').getContext('2d');
  miGrafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [{ data: actividadSemanal, backgroundColor: '#38bdf8', borderRadius: 6 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
  });
}

// Pomodoro
let tiempoPomo = 1500, timerId = null;
const pomoDisplay = document.getElementById('pomodoro-timer');
document.getElementById('btn-pomo-start').addEventListener('click', () => {
  if(!timerId) {
    timerId = setInterval(() => {
      if(tiempoPomo > 0) {
        tiempoPomo--;
        let m = Math.floor(tiempoPomo/60), s = tiempoPomo%60;
        pomoDisplay.textContent = `${m<10?'0':''}${m}:${s<10?'0':''}${s}`;
      } else { clearInterval(timerId); timerId = null; reproducirSonido('nivel'); }
    }, 1000);
  }
});
document.getElementById('btn-pomo-pause').addEventListener('click', () => { clearInterval(timerId); timerId = null; });
document.getElementById('btn-pomo-reset').addEventListener('click', () => { clearInterval(timerId); timerId = null; tiempoPomo = 1500; pomoDisplay.textContent = "25:00"; });

function verificarLogros() {
  if(completados >= 1) document.getElementById('badge-1').style.opacity = '1';
  if(racha >= 2) document.getElementById('badge-2').style.opacity = '1';
  if(nivel >= 3) document.getElementById('badge-3').style.opacity = '1';
  if(nivel >= 5) document.getElementById('badge-4').style.opacity = '1';
}

function guardarEnMemoria() {
  localStorage.setItem('danmiun_puntos', puntos);
  localStorage.setItem('danmiun_nivel', nivel);
  localStorage.setItem('danmiun_completados', completados);
  localStorage.setItem('danmiun_racha', racha);
  localStorage.setItem('danmiun_habitos', JSON.stringify(habitos));
  localStorage.setItem('danmiun_semana', JSON.stringify(actividadSemanal));
}

function actualizarUI() {
  spanNivel.textContent = nivel;
  spanRacha.textContent = racha;
  spanPuntosText.textContent = `${puntos % 50} / 50`;
  document.getElementById('barra-exp').style.width = `${((puntos % 50) / 50) * 100}%`;
  rangoAvatar.textContent = `León Nivel ${nivel}`;
  verificarLogros();
  renderizarHabitos();
}

function renderizarHabitos() {
  contenedorHabitos.innerHTML = "";
  habitos.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = "bg-[#0d1117] border border-gray-800 p-3.5 rounded-xl flex justify-between items-center theme-subcard";
    li.innerHTML = `<span class="text-sm font-medium">${t}</span>
      <div class="flex gap-2">
        <button onclick="completarMision()" class="bg-sky-500/10 text-sky-400 border border-sky-500/30 px-3 py-1.5 rounded-lg text-xs font-bold">Completar (+10)</button>
        <button onclick="borrarHabito(${i})" class="text-gray-500 hover:text-red-400 text-xs">✕</button>
      </div>`;
    contenedorHabitos.appendChild(li);
  });
}

window.completarMision = function() {
  puntos += 10; completados += 1; actividadSemanal[0] += 1;
  reproducirSonido('completar');
  avatar.classList.add('animacion-celebrar');
  setTimeout(() => avatar.classList.remove('animacion-celebrar'), 500);

  if(puntos >= nivel * 50) { nivel++; reproducirSonido('nivel'); estadoAvatar.textContent = "¡RUGIDO DE PODER! Nivel Subido 🦁"; }
  else { estadoAvatar.textContent = "¡Excelente avance, cazador! 🔥"; }

  if(miGrafico) miGrafico.update();
  guardarEnMemoria(); actualizarUI();
};

btnAgregar.addEventListener('click', () => {
  const t = inputHabito.value.trim();
  if(t) { habitos.push(t); inputHabito.value = ""; guardarEnMemoria(); actualizarUI(); }
});

window.borrarHabito = function(i) { habitos.splice(i, 1); guardarEnMemoria(); actualizarUI(); };

btnReset.addEventListener('click', () => {
  if(confirm("¿Reiniciar todo el progreso de DANMIUN?")) {
    localStorage.clear(); location.reload();
  }
});

actualizarUI();
inicializarGrafico();