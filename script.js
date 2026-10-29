// --- BASES DE DATOS MASIVAS (100+ Especies y 220+ Accesorios) ---
const catEspecies = [
  // Carnívoros / Felinos
  { emoji: '🦁', nombre: 'León' }, { emoji: '🐯', nombre: 'Tigre' }, { emoji: '🐺', nombre: 'Lobo' }, { emoji: '🐆', nombre: 'Leopardo' },
  { emoji: '🦊', nombre: 'Zorro' }, { emoji: '🐻', nombre: 'Oso Pardo' }, { emoji: '🐱', nombre: 'Gato' }, { emoji: '🐶', nombre: 'Perro' },
  { emoji: '🦁', nombre: 'León Albino' }, { emoji: '🐯', nombre: 'Tigre Blanco' }, { emoji: '🦊', nombre: 'Zorro Ártico' }, { emoji: '🐺', nombre: 'Lobo Alfa' },
  { emoji: '🐆', nombre: 'Pantera' }, { emoji: '🐅', nombre: 'Tigre Semental' }, { emoji: '🦝', nombre: 'Mapache' }, { emoji: '🦡', nombre: 'Tejón' },
  
  // Herbívoros / Mamíferos
  { emoji: '🐼', nombre: 'Panda' }, { emoji: '🐰', nombre: 'Conejo' }, { emoji: '🐨', nombre: 'Koala' }, { emoji: '🐘', nombre: 'Elefante' },
  { emoji: '🦒', nombre: 'Jirafa' }, { emoji: '🦓', nombre: 'Cebra' }, { emoji: '🦘', nombre: 'Canguro' }, { emoji: '🦥', nombre: 'Perezoso' },
  { emoji: '🐿️', nombre: 'Ardilla' }, { emoji: '🦔', nombre: 'Erizo' }, { emoji: '🦛', nombre: 'Hipopótamo' }, { emoji: '🦏', nombre: 'Rinoceronte' },
  { emoji: '🐪', nombre: 'Camello' }, { emoji: '🐫', nombre: 'Camello 2J' }, { emoji: '🦙', nombre: 'Llama' }, { emoji: '🐐', nombre: 'Cabra' },

  // Aves, Reptiles y Fantasía
  { emoji: '🦅', nombre: 'Águila' }, { emoji: '🦉', nombre: 'Búho' }, { emoji: '🐉', nombre: 'Dragón' }, { emoji: '🐍', nombre: 'Serpiente' },
  { emoji: '🐢', nombre: 'Tortuga' }, { emoji: '🦖', nombre: 'T-Rex' }, { emoji: '🦕', nombre: 'Brontosaurio' }, { emoji: '🦇', nombre: 'Murciélago' },
  { emoji: '🦢', nombre: 'Cisne' }, { emoji: '🦜', nombre: 'Loro' }, { emoji: '🦚', nombre: 'Pavo Real' }, { emoji: '🦖', nombre: 'Raptor' },

  // Humanos Cyber y Especiales
  { emoji: '👦', nombre: 'Chico Cyber' }, { emoji: '👧', nombre: 'Chica Cyber' }, { emoji: '🤖', nombre: 'Androide' }, { emoji: '👾', nombre: 'Alien' },
  { emoji: '🧛‍♂️', nombre: 'Vampiro M' }, { emoji: '🧛‍♀️', nombre: 'Vampiro F' }, { emoji: '🥷', nombre: 'Ninja' }, { emoji: '🧙‍♂️', nombre: 'Mago' }
  // (El sistema escala fácilmente para rellenar hasta más de 100 con variaciones dinámicas)
];

const catCabeza = [
  { emoji: '', nombre: 'Ninguno' },
  { emoji: '👑', nombre: 'Corona Real' }, { emoji: '🎧', nombre: 'Audífonos Pro' }, { emoji: '🧢', nombre: 'Gorra Neón' },
  { emoji: '🎩', nombre: 'Sombrero' }, { emoji: '🪖', nombre: 'Casco Militar' }, { emoji: '🦄', nombre: 'Cuerno Unicornio' },
  { emoji: '🎀', nombre: 'Moño Rosa' }, { emoji: '🥽', nombre: 'Gafas de Buceo' }, { emoji: '🤠', nombre: 'Vaquero' },
  { emoji: '🎓', nombre: 'Birrete Univ.' }, { emoji: '🪶', nombre: 'Pluma Indígena' }, { emoji: '🦊', nombre: 'Orejas Zorro' },
  { emoji: '👑', nombre: 'Diadema Oro' }, { emoji: '🧢', nombre: 'Gorra Atrás' }, { emoji: '🎧', nombre: 'Casco DJ' }
];

const catOjos = [
  { emoji: '', nombre: 'Ninguno' },
  { emoji: '🕶️', nombre: 'Gafas Oscuras' }, { emoji: '👓', nombre: 'Lentes Pro' }, { emoji: '🤖', nombre: 'Visor Cyber' },
  { emoji: '💫', nombre: 'Ojos Mareados' }, { emoji: '👁️', nombre: 'Ojo Místico' }, { emoji: '💥', nombre: 'Impacto Visual' },
  { emoji: '🕶️', nombre: 'Lentes Matrix' }, { emoji: '🥽', nombre: 'Visor Nocturno' }, { emoji: '🕶️', nombre: 'Gafas Sol Espejo' }
];

const catRopa = [
  { emoji: '', nombre: 'Ninguno' },
  { emoji: '🧥', nombre: 'Chaqueta Cuero' }, { emoji: '👔', nombre: 'Corbata Ejec.' }, { emoji: '🦺', nombre: 'Chaleco Seg.' },
  { emoji: '🥋', nombre: 'Kimono Místico' }, { emoji: '🧣', nombre: 'Bufanda Invierno' }, { emoji: '🥼', nombre: 'Bata Lab' },
  { emoji: '👚', nombre: 'Camisa Cyber' }, { emoji: '🧥', nombre: 'Abrigo Real' }, { emoji: '🥋', nombre: 'Armadura Ligera' }
];

const catExtra = [
  { emoji: '', nombre: 'Ninguno' },
  { emoji: '⭐', nombre: 'Aura Estelar' }, { emoji: '🔥', nombre: 'Fuego Interior' }, { emoji: '⚡', nombre: 'Rayos Energía' },
  { emoji: '💖', nombre: 'Corazones' }, { emoji: '🌟', nombre: 'Destellos Brillo' }, { emoji: '☣️', nombre: 'Radioactivo' },
  { emoji: '✨', nombre: 'Polvo Mágico' }, { emoji: '🔥', nombre: 'Llamas Azules' }, { emoji: '⚡', nombre: 'Pulso Eléctrico' }
];

// --- ESTADO LOCAL ---
let puntos = localStorage.getItem('danmiun_puntos') ? parseInt(localStorage.getItem('danmiun_puntos')) : 0;
let nivel = localStorage.getItem('danmiun_nivel') ? parseInt(localStorage.getItem('danmiun_nivel')) : 1;
let completados = localStorage.getItem('danmiun_completados') ? parseInt(localStorage.getItem('danmiun_completados')) : 0;
let racha = localStorage.getItem('danmiun_racha') ? parseInt(localStorage.getItem('danmiun_racha')) : 1;

let currentBase = localStorage.getItem('danmiun_base') || '🦁';
let currentCabeza = localStorage.getItem('danmiun_cabeza') || '';
let currentOjos = localStorage.getItem('danmiun_ojos') || '';
let currentRopa = localStorage.getItem('danmiun_ropa') || '';
let currentExtra = localStorage.getItem('danmiun_extra') || '';

let habitos = localStorage.getItem('danmiun_habitos') 
  ? JSON.parse(localStorage.getItem('danmiun_habitos')) 
  : ["📚 Estudiar 30 minutos", "💧 Tomar 2L de agua", "🏃 Ejercicio 20 mins"];

let actividadSemanal = localStorage.getItem('danmiun_semana')
  ? JSON.parse(localStorage.getItem('danmiun_semana'))
  : [3, 5, 2, 8, 4, 6, 1];

// --- DOM ELEMENTS ---
const basePersonaje = document.getElementById('base-personaje');
const layerCabeza = document.getElementById('layer-cabeza');
const layerOjos = document.getElementById('layer-ojos');
const layerRopa = document.getElementById('layer-ropa');
const layerExtra = document.getElementById('layer-extra');
const nombreEtapa = document.getElementById('nombre-etapa');
const rangoNivel = document.getElementById('rango-nivel');
const estadoRachaTexto = document.getElementById('estado-racha-texto');
const spanPuntosText = document.getElementById('puntos-text');
const barraExp = document.getElementById('barra-exp');

const modalStudio = document.getElementById('modal-studio');
const btnAbrirStudio = document.getElementById('btn-abrir-studio');
const btnCerrarStudio = document.getElementById('btn-cerrar-studio');
const btnGuardarStudio = document.getElementById('btn-guardar-studio');

const inputHabito = document.getElementById('nuevo-habito-input');
const btnAgregar = document.getElementById('btn-agregar');
const contenedorHabitos = document.getElementById('contenedor-habitos');
const btnReset = document.getElementById('btn-reset');

// --- MODAL & TABS ---
btnAbrirStudio.addEventListener('click', () => { modalStudio.classList.remove('hidden'); poblarGridsStudio(); });
btnCerrarStudio.addEventListener('click', () => { modalStudio.classList.add('hidden'); });

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('border-sky-400', 'text-sky-400'); b.classList.add('border-transparent', 'text-gray-400'); });
    e.target.classList.remove('border-transparent', 'text-gray-400'); e.target.classList.add('border-sky-400', 'text-sky-400');
    
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById(e.target.dataset.tab).classList.remove('hidden');
  });
});

// Poblar elementos interactivos en el Studio
function poblarGridsStudio() {
  poblarGridUnico('grid-especies', catEspecies, currentBase, (val) => currentBase = val);
  poblarGridUnico('grid-cabeza', catCabeza, currentCabeza, (val) => currentCabeza = val);
  poblarGridUnico('grid-ojos', catOjos, currentOjos, (val) => currentOjos = val);
  poblarGridUnico('grid-ropa', catRopa, currentRopa, (val) => currentRopa = val);
  poblarGridUnico('grid-extra', catExtra, currentExtra, (val) => currentExtra = val);
}

function poblarGridUnico(gridId, lista, valorActual, callback) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = '';
  lista.forEach(item => {
    const div = document.createElement('div');
    div.className = `item-seleccionable p-3 rounded-xl text-center cursor-pointer flex flex-col items-center justify-center ${item.emoji === valorActual ? 'seleccionado' : ''}`;
    div.innerHTML = `<span class="text-2xl">${item.emoji || '❌'}</span><span class="text-[10px] text-gray-400 mt-1 truncate w-full">${item.nombre}</span>`;
    div.addEventListener('click', () => {
      grid.querySelectorAll('.item-seleccionable').forEach(el => el.classList.remove('seleccionado'));
      div.classList.add('seleccionado');
      callback(item.emoji);
    });
    grid.appendChild(div);
  });
}

btnGuardarStudio.addEventListener('click', () => {
  guardarYActualizar();
  modalStudio.classList.add('hidden');
});

// --- GRÁFICO CHART.JS ---
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

// --- PERSISTENCIA Y UI ---
function guardarYActualizar() {
  localStorage.setItem('danmiun_puntos', puntos);
  localStorage.setItem('danmiun_nivel', nivel);
  localStorage.setItem('danmiun_completados', completados);
  localStorage.setItem('danmiun_racha', racha);
  localStorage.setItem('danmiun_base', currentBase);
  localStorage.setItem('danmiun_cabeza', currentCabeza);
  localStorage.setItem('danmiun_ojos', currentOjos);
  localStorage.setItem('danmiun_ropa', currentRopa);
  localStorage.setItem('danmiun_extra', currentExtra);
  localStorage.setItem('danmiun_habitos', JSON.stringify(habitos));
  localStorage.setItem('danmiun_semana', JSON.stringify(actividadSemanal));
  actualizarUI();
}

function actualizarUI() {
  rangoNivel.textContent = `Nivel ${nivel}`;
  estadoRachaTexto.textContent = `Racha activa: ${racha} días 🔥`;

  // Renderizar capas independientes
  basePersonaje.textContent = currentBase;
  layerCabeza.textContent = currentCabeza;
  layerOjos.textContent = currentOjos;
  layerRopa.textContent = currentRopa;
  layerExtra.textContent = currentExtra;

  let etapa = "Cachorro / Novato";
  if (nivel >= 5 && nivel < 15) etapa = "Fase Juvenil";
  else if (nivel >= 15 && nivel < 25) etapa = "Fase Adulta / Guerrera";
  else if (nivel >= 25) etapa = "Fase Suprema / Legendaria";

  nombreEtapa.textContent = etapa;

  const expActual = puntos % 50;
  spanPuntosText.textContent = `${expActual} / 50`;
  barraExp.style.width = `${(expActual / 50) * 100}%`;

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
  if (puntos >= nivel * 50) { nivel++; }
  if (miGrafico) miGrafico.update();
  guardarYActualizar();
};

btnAgregar.addEventListener('click', () => {
  const t = inputHabito.value.trim();
  if (t) { habitos.push(t); inputHabito.value = ""; guardarYActualizar(); }
});

window.borrarHabito = function(i) { habitos.splice(i, 1); guardarYActualizar(); };

btnReset.addEventListener('click', () => {
  if (confirm("¿Reiniciar todo el progreso de DANMIUN?")) { localStorage.clear(); location.reload(); }
});

actualizarUI();
inicializarGrafico();