// almacenamiento de tareas
let tareas = [];

window.addEventListener("load", () => {
  const tareasGuardadas = localStorage.getItem("listaTareas");
  if (tareasGuardadas) {
    tareas = JSON.parse(tareasGuardadas);
    tareas.forEach(tarea => {
      agregarTareaDOM(tarea);
    });
  }
});

const agregarTareaDOM = tarea => {
  const nuevaTarea = document.createElement("li");
  nuevaTarea.innerHTML = `
      <input type="checkbox" ${tarea.tareaHecha ? 'checked' : ''}>
      ${tarea.tareaTexto}
      / Fecha: ${tarea.fecha}
      <hr>
      `;
  if (tarea.prioridad === "importante") {
    nuevaTarea.style.fontWeight = "bold";
    nuevaTarea.style.fontStyle = "italic";
  }
  if (tarea.tareaHecha) {
    nuevaTarea.style.textDecoration = "line-through";
  }
  listaTareas.appendChild(nuevaTarea);
}

const form = document.querySelector("form");
const tareaInput = document.getElementById("tarea");
const prioridadInput = document.getElementById("prioridad");
const listaTareas = document.getElementById("listaTareas");
const limpiarTareasBtn = document.getElementById("limpiarTareasHechas");
const limpiarTodasTareas = document.getElementById("limpiarTareas");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const tareaTexto = tareaInput.value;
  const prioridad = prioridadInput.value;
  const tareaHecha = false;
  const fecha = new Date().toLocaleDateString();

  if (tareaTexto.trim() === "") {
    alert("Introduce algún valor");
    return;
  }

  const tarea = { tareaTexto, prioridad, tareaHecha, fecha };
  tareas.push(tarea);
  agregarTareaDOM(tarea);

  tareaInput.value = "";
  prioridadInput.value = "normal";
});

listaTareas.addEventListener("change", (evento) => {
  const tareaCheckbox = evento.target.parentElement;
  const indice = Array.from(listaTareas.children).indexOf(tareaCheckbox);
  tareas[indice].tareaHecha = !tareas[indice].tareaHecha;

  if (tareas[indice].tareaHecha) {
    tareaCheckbox.style.textDecoration = "line-through";
  } else {
    tareaCheckbox.style.textDecoration = "none";
  }
});

limpiarTareasBtn.addEventListener("click", () => {
  tareas = tareas.filter(tarea => !tarea.tareaHecha);
  const tareasHechas = listaTareas.querySelectorAll("input:checked");
  tareasHechas.forEach((tareaHecha) => {
    tareaHecha.parentElement.remove();
  });
});

limpiarTodasTareas.addEventListener("click", (e) => {
  if (confirm("¿Estás seguro que quieres borrar todas las tareas?")) {
    tareas = [];
    while (listaTareas.firstChild) {
      listaTareas.firstChild.remove();
    }
  }
});

window.addEventListener("unload", () => {
  localStorage.setItem("listaTareas", JSON.stringify(tareas));
});

