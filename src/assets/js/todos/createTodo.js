import { createTodoApi } from "@js/api/todos";
import { toastError, toastSuccess } from "@js/ui/toast";
import { closeModal } from "@js/ui/modal";
import {
  addTodoCategoryInput,
  addTodoSubmitButton,
  addTodoTitleInput,
  createTodoElement,
  titleError,
} from "./todoElements";
import { resetAddTodoForm } from "./todo";

export const createTodo = async () => {
  const title = addTodoTitleInput.value;
  const category = addTodoCategoryInput.value;

  if (!title) {
    addTodoTitleInput.focus();
    addTodoTitleInput.classList.add("input-error");
    titleError.innerText = "Title is required.";
    return;
  }

  addTodoSubmitButton.disabled = true;
  addTodoSubmitButton.innerText = "Adding...";

  const response = await createTodoApi(title, category);

  addTodoSubmitButton.disabled = false;
  addTodoSubmitButton.innerText = "Add";

  if (response.success) {
    toastSuccess(response.message);

    addTodoTitleInput.value = "";
    addTodoCategoryInput.value = "";

    closeModal();

    const todo = createTodoElement(response.data);

    return todo;
  } else {
    toastError(response.message);
    return null;
  }
};
