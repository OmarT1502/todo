import { TodoItem } from "./TodoItem.js";
import { TodoCollection } from "./TodoCollection.js";
let todos = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"),
    new TodoItem(4, "Call Joe", true)
];
let collection = new TodoCollection("Adam", todos);
// Obtener elementos del DOM
const listElement = document.getElementById("todo-list");
const inputElement = document.getElementById("new-task");
const addButton = document.getElementById("add-task");
const removeCompletedButton = document.getElementById("remove-completed");
const taskCountElement = document.getElementById("task-count");
// Función para actualizar la lista de tareas en el navegador
function renderTodoList() {
    listElement.innerHTML = "";
    let { total, incomplete } = collection.getItemsCount();
    taskCountElement.textContent = `Total: ${total} | Pendientes: ${incomplete}`;
    collection.getTodoItems(true).forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="${item.complete ? 'completed' : ''}">${item.task}</span>
            <input type="checkbox" ${item.complete ? "checked" : ""} data-id="${item.id}">
        `;
        listElement.appendChild(listItem);
    });
}
// Agregar una nueva tarea
addButton.addEventListener("click", () => {
    if (inputElement.value.trim() !== "") {
        collection.addTodo(inputElement.value);
        inputElement.value = "";
        renderTodoList();
    }
});
// Eliminar tareas completadas
removeCompletedButton.addEventListener("click", () => {
    collection.removeComplete();
    renderTodoList();
});
// Marcar tareas como completadas
listElement.addEventListener("change", (event) => {
    const target = event.target;
    if (target.type === "checkbox") {
        const id = parseInt(target.getAttribute("data-id"));
        const todo = collection.getTodoById(id);
        if (todo) {
            todo.complete = target.checked;
            renderTodoList();
        }
    }
});
// Renderizar al cargar la página
document.addEventListener("DOMContentLoaded", renderTodoList);
