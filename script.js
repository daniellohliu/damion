// Cargar datos de localStorage para DANMIUN
let puntos = localStorage.getItem('danmiun_puntos') ? parseInt(localStorage.getItem('danmiun_puntos')) : 0;
let nivel = localStorage.getItem('danmiun_nivel') ? parseInt(localStorage.getItem('danmiun_nivel')) : 1;
let completados = localStorage.getItem('danmiun_completados') ? parseInt(localStorage.getItem('danmiun_completados')) : 0;

// Hábitos por defecto si está vacío
let habitos = localStorage.getItem('danmiun_habitos') 
  ? JSON.parse(localStorage.getItem('danmiun_habitos')) 
  : ["📚 Estudiar 30 minutos", "💧 Tomar 2L de agua", "🏃 Ejercicio 20 mins"];

// Elementos del DOM
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

// Guardar en localStorage
function guardarEnMemoria() {
  localStorage.setItem('danmiun_puntos', puntos);
  localStorage.setItem('danmiun_nivel', nivel);
  localStorage.setItem('danmiun_completados', completados);
  localStorage.setItem('danmiun_habitos', JSON.stringify(habitos));
}

// Actualizar interfaz
function actualizarUI() {
  spanNivel.textContent = nivel;
  spanPuntosTotal.textContent = puntos;
  spanCompletadosTotal.textContent = completados;

  const puntosParaSiguienteNivel = nivel * 50;
  const puntosNivelActual = puntos % 50;
  spanPuntosText.textContent = `${puntosNivelActual} / 50`;

  const porcentaje = (puntosNivelActual / 50) * 100;
  barraExp.style.width = `${porcentaje}%`;

  // Avatar según el Nivel
  if (nivel === 1) {
    avatar.textContent = "🤖";
    rangoAvatar.textContent = "Unidad Cyber-01";
  } else if (nivel === 2) {
    avatar.textContent = "👾";
    rangoAvatar.textContent = "Cyber Hunter";
  } else if (nivel === 3) {
    avatar.textContent = "🦊";
    rangoAvatar.textContent = "Agente Neón";
  } else {
    avatar.textContent = "🐉";
    rangoAvatar.textContent = "DANMIUN MASTER";
  }

  renderizarHabitos();
}

// Renderizar la lista de hábitos
function renderizarHabitos() {
  contenedorHabitos.innerHTML = "";
  
  habitos.forEach((texto, index) => {
    const li = document.createElement('li');
    li.className = "bg-[#0d1117] border border-gray-800 p-3.5 rounded-xl flex justify-between items-center group";
    li.innerHTML = `
      <span class="text-sm font-medium text-gray-200">${texto}</span>
      <div class="flex items-center gap-2">
        <button onclick="completarMision()" class="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition">
          Completar (+10 pts)
        </button>
        <button onclick="borrarHabito(${index})" class="text-gray-500 hover:text-red-400 p-1 text-xs transition">
          ✕
        </button>
      </div>
    `;
    contenedorHabitos.appendChild(li);
  });
}

// Lógica de completar misión
window.completarMision = function() {
  puntos += 10;
  completados += 1;

  // Animación Avatar
  avatar.classList.add('animacion-celebrar');
  setTimeout(() => avatar.classList.remove('animacion-celebrar'), 500);

  // Evaluar subir de nivel
  if (puntos >= nivel * 50) {
    nivel++;
    estadoAvatar.textContent = `¡NIVEL ${nivel} ALCANZADO! 🚀`;
  } else {
    const frases = ["¡Excelente avance! 🔥", "¡Misión cumplida! ⚡", "¡Puntos sumados! 💪"];
    estadoAvatar.textContent = frases[Math.floor(Math.random() * frases.length)];
  }

  guardarEnMemoria();
  actualizarUI();
};

// Agregar nuevo hábito
btnAgregar.addEventListener('click', () => {
  const texto = inputHabito.value.trim();
  if (texto !== "") {
    habitos.push(texto);
    inputHabito.value = "";
    guardarEnMemoria();
    actualizarUI();
  }
});

// Borrar hábito
window.borrarHabito = function(index) {
  habitos.splice(index, 1);
  guardarEnMemoria();
  actualizarUI();
};

// Reiniciar datos
btnReset.addEventListener('click', () => {
  if (confirm("¿Seguro que quieres reiniciar el progreso de DANMIUN?")) {
    localStorage.clear();
    puntos = 0;
    nivel = 1;
    completados = 0;
    habitos = ["📚 Estudiar 30 minutos", "💧 Tomar 2L de agua"];
    guardarEnMemoria();
    actualizarUI();
  }
});

// Inicializar
actualizarUI();