import { format } from "date-fns";

// Add todo form related elements
export const addTodoForm = document.getElementById("add-todo-form"); // add form
export const addTodoTitleInput = document.getElementById("add-title"); // add title
export const addTodoCategoryInput = document.getElementById("add-category"); // add category

// Edit todo form related elements
export const editTodoForm = document?.getElementById("edit-todo-form");
export const editTodoTitleInput = document.getElementById("edit-title"); // edit title
export const editTodoCategoryInput = document.getElementById("edit-category"); // edit category

// Submit button elements
export const addTodoSubmitButton = document.getElementById("add-submit-button");
export const editTodoSubmitButton =
  document.getElementById("edit-submit-button");
export const deleteTodoSubmitButton = document.getElementById(
  "delete-submit-button",
);

// Open modal button elements
export const openAddModalButton = document.getElementById(
  "add-todo-modal-open-button",
);
export const openEditModalButton = document.getElementById(
  "edit-todo-modal-open-button",
);
export const openDeleteModalButton = document.getElementById(
  "delete-todo-modal-open-button",
);

// Container holding the todos
export const todosContainer = document.getElementById("tasks-container");

// Modal elements
export const addTodoModal = document.getElementById("add-todo-modal");
export const editTodoModal = document.getElementById("edit-todo-modal");
export const deleteTodoModal = document.getElementById("delete-todo-modal");

// Errros
export const titleError = document.getElementById("title-error");

// To create todo element
export const createTodoElement = (todo) => {
  const { id, title, category, isCompleted, createdAt } = todo;

  const formatedDate = format(
    new Date(createdAt),
    "iii, do MMM yyyy, h:mm aaa",
  );

  const div = document.createElement("div");
  div.classList.add("todo-container", "active");
  div.setAttribute("data-todo-id", id);

  div.innerHTML = `
    <div class="todo-details">
      <!-- Checkbox -->
      <input
        type="checkbox"
        ${isCompleted && "checked"}
        class="size-6 toggle-checkbox"
        data-id="${id}"
      />
      <div class="flex flex-col">
        <span data-id-title=${id} class="todo-title ${isCompleted && "done"}" id="todo-${id}-title">${title}</span>
        <p class="text-muted text-sm">
          <span id="todo-${id}-category">
            ${category && `${category} - `}
          </span>
          <span>
            ${formatedDate}
          </span>
        </p>
      </div>
    </div>
  
    <div class="flex">
      <!-- Open Edit Todo Modal Button -->
      <button
        class="btn btn-ghost edit-todo"
        id="edit-todo-modal-open-button-${id}"
        data-todo-id="${id}"
        data-todo-title="${title}"
        data-todo-category="${category}"
      >
        <i data-lucide="pen" class="size-5"></i>
      </button>
      <!-- Open Delete Todo Modal Button -->
      <button
        class="btn btn-ghost-destructive delete-todo"
        id="delete-todo-modal-open-button-${id}"
        data-todo-id="${id}"
      >
        <i data-lucide="trash-2" class="size-5"></i>
      </button>
    </div>`;

  return div;
};

// To remove todo element by id
export const removeTodoElement = (id) => {
  const task = document.querySelector(`[data-todo-id='${id}']`);

  task.remove();
};

export const createCategoryHeaderElement = () => {
  const div = document.createElement("div");
  div.classList.add("category-header");

  div.innerHTML = `
          <div class="flex items-center gap-1">
            <button
              class="btn btn-icon"
              id="category-toggle-button"
              data-category-id="1"
            >
              <i data-lucide="chevron-up"></i>
            </button>
            <h1 class="category-title">Category</h1>
          </div>
        `;

  return div;
};
