import {
  createTodo,
  deleteTodo,
  getTodosByUserId,
  toggleTodoComplete,
  updateTodo,
} from "@controllers/todoController";

const currentUser = JSON.parse(localStorage.getItem("user"));

export const createTodoApi = async (title, category) => {
  return await createTodo(currentUser.id, title, category);
};

export const editTodoApi = async (id, title, category) => {
  return await updateTodo(id, title, category, currentUser.id);
};

export const deleteTodoApi = async (id) => {
  return await deleteTodo(id);
};

export const getTodosByUserIdApi = async () => {
  return await getTodosByUserId(currentUser.id);
};

export const toggleTodoCompleteApi = async (id) => {
  return await toggleTodoComplete(id);
};
