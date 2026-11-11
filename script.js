const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const emptyMessage = document.getElementById("empty-message");
const taskCount = document.getElementById("task-count");
const filterButtons = document.querySelectorAll(".filter");

let todos = [];
let currentFilter = "all";

todoForm.addEventListener("submit", (event) => {
  // event.preventDefault();
  const text = todoInput.value.trim();

  if (text) {
    addTodo(text);
    todoInput.value = "";
    todoInput.focus();
  }
});

function addTodo(text) {
  todos.push({
    id: Date.now(),
    text: text,
    completed: false
  });
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = "";

  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "pending") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  visibleTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item${todo.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    // checkbox.setAttribute("aria-label", "Mark task as completed");
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const taskText = document.createElement("span");
    taskText.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    li.append(checkbox, taskText, deleteButton);
    todoList.appendChild(li);
  });

  emptyMessage.style.display = visibleTodos.length === 0 ? "block" : "none";
  if (todos.length === 0) {
    emptyMessage.textContent = "No tasks yet. Add your first task!";
  } else if (visibleTodos.length === 0) {
    emptyMessage.textContent = "No tasks in this filter.";
  }

  const pendingCount = todos.filter((todo) => !todo.completed).length;
  taskCount.textContent = `${pendingCount} pending / ${todos.length} total`;
}


function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}



filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderTodos();
  });
});

renderTodos();
