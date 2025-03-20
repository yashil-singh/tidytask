import {
  addTodoModal,
  deleteTodoModal,
  editTodoModal,
} from "@js/todos/todoElements";
import { addClassName, removeClassName } from "@js/utils";

// Overlay element
export const overlay = document.querySelector(".overlay");

// Function to open modal
export const openModal = (modal) => {
  addClassName(overlay, "active");
  overlay.append(modal);
  removeClassName(modal, "hidden");

  document.body.style.overflow = "hidden";
};

// Function to close modal
export const closeModal = () => {
  addClassName(overlay, "closing");

  setTimeout(() => {
    removeClassName(overlay, "closing", "active");
    overlay.innerHTML = "";
  }, 300);

  const inputs = document.querySelectorAll(".overlay * input");
  inputs.forEach((input) => (input.value = ""));

  // reset all error inputs
  const errorInputs = document.querySelectorAll(".input-error");
  errorInputs.forEach((input) => input.classList.remove("input-error"));

  // reset all error messages
  const errors = document.querySelectorAll(".input-error-message");
  errors.forEach((error) => (error.innerText = ""));

  document.body.style.overflow = "auto";
};

// Event listener to close the modal when 'esc' key is pressed
document?.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    closeModal();
  }
});

// Event listener to close the modal when close button is clicked
document?.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

// Event listener to close the modal when overlay is clicked
overlay?.addEventListener("click", closeModal);

// Avoid closing modal when clicking on the modal content
addTodoModal?.addEventListener("click", (e) => {
  e.stopPropagation();
});
editTodoModal?.addEventListener("click", (e) => {
  e.stopPropagation();
});
deleteTodoModal?.addEventListener("click", (e) => {
  e.stopPropagation();
});
