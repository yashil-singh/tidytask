import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const toastSuccess = (message) => {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    className: "toast-success",
    style: {
      background: "transparent",
      color: "black",
      boxShadow: "none",
    },
  }).showToast();
};

export const toastError = (message) => {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    className: "toast-error",
    style: {
      background: "transparent",
      color: "red",
      boxShadow: "none",
    },
  }).showToast();
};
