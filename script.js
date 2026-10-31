// Estado del editor en PixelCraft
const canvasState = {
  elements: [
    { id: 1, type: 'text', content: '¡Hola en PixelCraft!', x: 50, y: 50, color: '#ffffff' },
    { id: 2, type: 'shape', content: 'Rectángulo', x: 200, y: 150, color: '#6366f1' }
  ],
  selectedId: null
};

document.addEventListener('DOMContentLoaded', () => {
  renderCanvas();
  lucide.createIcons();
});

// Añadir elementos al lienzo
function addElement(type) {
  const newElement = {
    id: Date.now(),
    type: type,
    content: type === 'text' ? 'Nuevo Texto' : 'Forma',
    x: Math.floor(Math.random() * 300) + 20,
    y: Math.floor(Math.random() * 200) + 20,
    color: type === 'text' ? '#38bdf8' : '#ec4899'
  };
  canvasState.elements.push(newElement);
  renderCanvas();
}

// Renderizar el lienzo y las capas
function renderCanvas() {
  const board = document.getElementById('canvas-board');
  const layersList = document.getElementById('layers-list');
  board.innerHTML = '';
  layersList.innerHTML = '';

  canvasState.elements.forEach(el => {
    // Crear elemento visual en el lienzo
    const div = document.createElement('div');
    div.className = `absolute p-3 rounded-xl cursor-move border transition-all ${
      canvasState.selectedId === el.id ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-700/50'
    }`;
    div.style.left = `${el.x}px`;
    div.style.top = `${el.y}px`;
    div.style.backgroundColor = el.type === 'shape' ? el.color : 'transparent';
    div.style.color = el.color;
    div.innerHTML = el.type === 'text' ? `<span class="font-bold text-sm">${el.content}</span>` : `<span class="text-xs text-white font-semibold">${el.content}</span>`;
    
    // Evento de selección
    div.addEventListener('click', (e) => {
      e.stopPropagation();
      canvasState.selectedId = el.id;
      renderCanvas();
    });

    board.appendChild(div);

    // Crear item en la lista lateral de capas
    const layerItem = document.createElement('div');
    layerItem.className = `p-2.5 rounded-lg border text-xs flex justify-between items-center cursor-pointer transition ${
      canvasState.selectedId === el.id ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
    }`;
    layerItem.innerHTML = `<span>${el.type.toUpperCase()}: ${el.content}</span>`;
    layerItem.addEventListener('click', () => {
      canvasState.selectedId = el.id;
      renderCanvas();
    });
    layersList.appendChild(layerItem);
  });
}

// Simular exportación
function exportCanvas() {
  alert('¡Diseño exportado con éxito desde PixelCraft!');
}