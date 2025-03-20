import { toggleTodoCompleteApi } from "@js/api/todos";
import { openModal } from "../ui/modal";
import { toastError } from "@js/ui/toast";
import { fetchTodos } from "./fetchTodos";
import { createTodo } from "./createTodo";
import deleteTodo from "./deleteTodo";
import { editTodo } from "./editTodo";
import {
  addTodoCategoryInput,
  addTodoForm,
  addTodoModal,
  addTodoSubmitButton,
  addTodoTitleInput,
  createTodoElement,
  deleteTodoModal,
  deleteTodoSubmitButton,
  editTodoCategoryInput,
  editTodoForm,
  editTodoModal,
  editTodoSubmitButton,
  editTodoTitleInput,
  openAddModalButton,
  titleError,
  todosContainer,
} from "./todoElements";

// Currently selected todo
let selectedTodo = null;

// To set the selected todo
const setSeletedTodo = (button) => {
  const todoId = button.getAttribute("data-todo-id");
  const todoTitle = button.getAttribute("data-todo-title");
  const todoCategory = button.getAttribute("data-todo-category");

  selectedTodo = { todoId, todoTitle, todoCategory };
};

// Opening add todo modal
openAddModalButton?.addEventListener("click", () => {
  openModal(addTodoModal);
  addTodoTitleInput.focus();
});

// Adding event listeners to action buttons
todosContainer?.addEventListener("click", async (e) => {
  const deleteButton = e.target.closest(".delete-todo");
  const editButton = e.target.closest(".edit-todo");

  if (deleteButton) {
    setSeletedTodo(deleteButton);
    openModal(deleteTodoModal);
  } else if (editButton) {
    setSeletedTodo(editButton);

    editTodoTitleInput.value = selectedTodo.todoTitle;
    editTodoCategoryInput.value = selectedTodo.todoCategory;

    openModal(editTodoModal);
  } else if (e.target.classList.contains("toggle-checkbox")) {
    const id = e.target.getAttribute("data-id");

    const response = await toggleTodoCompleteApi(id);

    if (response.success) {
      const title = document.getElementById(`todo-${id}-title`);
      title.classList.toggle("done");
    } else {
      toastError(response.message);
    }
  }
});

// Reset the todo form
export const resetAddTodoForm = () => {
  addTodoSubmitButton.disabled = false;
  addTodoSubmitButton.innerText = "Add";
  titleError.innerText = "";
  addTodoTitleInput.classList.remove("input-error");
};

// Reset the edit todo form
export const resetEditTodoForm = () => {
  editTodoSubmitButton.disabled = false;
  editTodoSubmitButton.innerText = "Edit";
  titleError.innerText = "";
  editTodoTitleInput.classList.remove("input-error");
};

// Creating todo
addTodoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTodoElement = await createTodo();

  if (!newTodoElement) return;

  resetAddTodoForm();

  if (todosContainer.innerText === "No todos added yet.") {
    todosContainer.innerText = "";
  }
  todosContainer.prepend(newTodoElement);
  lucide.createIcons();

  addTodoTitleInput.value = "";
  addTodoCategoryInput.value = "";
});

// Editing todo
editTodoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = selectedTodo?.todoId;

  if (!id) return;

  const isEdited = await editTodo(id);

  if (isEdited) resetEditTodoForm();
});

// Deleting todo
deleteTodoSubmitButton.addEventListener("click", async () => {
  const id = selectedTodo.todoId;

  await deleteTodo(id);

  if (todosContainer.innerHTML === "") {
    todosContainer.innerText = "No todos added yet.";
  }
});

export const loadTodos = async () => {
  todosContainer.innerText = "Loading todos...";
  const todos = await fetchTodos();

  todosContainer.innerText = "";
  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);

    todosContainer.appendChild(todoElement);
  });

  if (todos.length < 1) todosContainer.innerText = "No todos added yet.";

  lucide.createIcons();
};
