import { deleteTodoApi } from "@js/api/todos";
import { toastSuccess } from "@js/ui/toast";
import { closeModal } from "@js/ui/modal";
import { deleteTodoModal, removeTodoElement } from "./todoElements";

const deleteTodo = async (id) => {
  const response = await deleteTodoApi(id);

  if (response.success) {
    removeTodoElement(id);
    toastSuccess(response.message);
  }

  closeModal(deleteTodoModal);
};

export default deleteTodo;
