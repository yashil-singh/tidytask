import { getTodosByUserIdApi } from "@js/api/todos";
import { toastError } from "@js/ui/toast";

export const fetchTodos = async () => {
  try {
    const response = await getTodosByUserIdApi();

    return response.data;
  } catch (error) {
    toastError(error.message);
  }
};

export const fetchTodosByCategory = async () => {};
