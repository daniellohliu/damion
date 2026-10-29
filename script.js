let puntos = localStorage.getItem('danmiun_puntos') ? parseInt(localStorage.getItem('danmiun_puntos')) : 0;
let nivel = localStorage.getItem('danmiun_nivel') ? parseInt(localStorage.getItem('danmiun_nivel')) : 1;
let completados = localStorage.getItem('danmiun_completados') ? parseInt(localStorage.getItem('danmiun_completados')) : 0;
let racha = localStorage.getItem('danmiun_racha') ? parseInt(localStorage.getItem('danmiun_racha')) : 1;
let tipoPersonaje = localStorage.getItem('danmiun_personaje') || '🦁';
let accesorioElegido = localStorage.getItem('danmiun_accesorio') || '';

let habitos = localStorage.getItem('danmiun_habitos') 
  ? JSON.parse(localStorage.getItem('danmiun_habitos')) 
  : ["📚 Estudiar 30 minutos", "💧 Tomar 2L de agua", "🏃 Ejercicio 20 mins"];

let actividadSemanal = localStorage.getItem('danmiun_semana')
  ? JSON.parse(localStorage.getItem('danmiun_semana'))
  : [3, 5, 2, 8, 4, 6, 1];

// Elementos DOM
const avatarPreview = document.getElementById('avatar-preview');
const nombreAvatarUi = document.getElementById('nombre-avatar-ui');
const estadoEvolucion = document.getElementById('estado-evolucion');
const spanCompletadosTotal = document.getElementById('completados-total');
const spanRacha = document.getElementById('racha-dias');
const barraProgresoHoy = document.getElementById('barra-progreso-hoy');
const porcentajeTexto = document.getElementById('porcentaje-texto');

const selectPersonaje = document.getElementById('select-personaje');
const selectAccesorio = document.getElementById('select-accesorio');
const inputHabito = document.getElementById('nuevo-habito-input');
const btnAgregar = document.getElementById('btn-agregar');
const contenedorHabitos = document.getElementById('contenedor-habitos');
const btnReset = document.getElementById('btn-reset');

selectPersonaje.value = tipoPersonaje;
selectAccesorio.value = accesorioElegido;

selectPersonaje.addEventListener('change', (e) => {
  tipoPersonaje = e.target.value;
  localStorage.setItem('danmiun_personaje', tipoPersonaje);
  actualizarUI();
});

selectAccesorio.addEventListener('change', (e) => {
  accesorioElegido = e.target.value;
  localStorage.setItem('danmiun_accesorio', accesorioElegido);
  actualizarUI();
});

// Gráfico Chart.js
let miGrafico;
function inicializarGrafico() {
  const ctx = document.getElementById('grafico-semanal').getContext('2d');
  miGrafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [{ data: actividadSemanal, backgroundColor: '#38bdf8', borderRadius: 6 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }
  });
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
  spanRacha.textContent = racha;
  spanCompletadosTotal.textContent = `${completados} / ${habitos.length}`;
  
  let porcentaje = habitos.length > 0 ? Math.round((completados / habitos.length) * 100) : 0;
  porcentajeTexto.textContent = `${porcentaje}%`;
  barraProgresoHoy.style.width = `${porcentaje}%`;

  // Lógica de evolución por Niveles (Cachorro ➔ Joven ➔ Adulto ➔ Supremo)
  let etapa = "Cachorro / Novato";
  if (nivel >= 5 && nivel < 15) etapa = "Fase Juvenil";
  else if (nivel >= 15 && nivel < 25) etapa = "Fase Adulta / Guerrera";
  else if (nivel >= 25) etapa = "Fase Suprema / Legendaria";

  estadoEvolucion.textContent = `Nivel ${nivel} • ${etapa}`;
  nombreAvatarUi.textContent = `${tipoPersonaje === '🦁' ? 'León' : tipoPersonaje === '🦊' ? 'Zorro' : tipoPersonaje === '🐺' ? 'Lobo' : 'Avatar'} (${etapa.split(' ')[0]})`;
  avatarPreview.textContent = `${tipoPersonaje} ${accesorioElegido}`;

  renderizarHabitos();
}

function renderizarHabitos() {
  contenedorHabitos.innerHTML = "";
  habitos.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = "bg-[#0d1117] border border-gray-800 p-3 rounded-xl flex justify-between items-center text-xs";
    li.innerHTML = `<span class="font-medium text-gray-200">${t}</span>
      <div class="flex gap-2">
        <button onclick="completarMision()" class="bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2.5 py-1 rounded-lg font-bold">Completar</button>
        <button onclick="borrarHabito(${i})" class="text-gray-500 hover:text-red-400">✕</button>
      </div>`;
    contenedorHabitos.appendChild(li);
  });
}

window.completarMision = function() {
  puntos += 10; completados += 1; actividadSemanal[0] += 1;
  avatarPreview.classList.add('animacion-celebrar');
  setTimeout(() => avatarPreview.classList.remove('animacion-celebrar'), 400);

  if (puntos >= nivel * 50) { nivel++; }
  if (miGrafico) miGrafico.update();
  guardarEnMemoria(); actualizarUI();
};

btnAgregar.addEventListener('click', () => {
  const t = inputHabito.value.trim();
  if (t) { habitos.push(t); inputHabito.value = ""; guardarEnMemoria(); actualizarUI(); }
});

window.borrarHabito = function(i) { habitos.splice(i, 1); guardarEnMemoria(); actualizarUI(); };

btnReset.addEventListener('click', () => {
  if (confirm("¿Reiniciar progreso de DANMIUN?")) { localStorage.clear(); location.reload(); }
});

actualizarUI();
inicializarGrafico();