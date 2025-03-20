import { login } from "@js/api/users";
import { toastError, toastSuccess } from "@js/ui/toast";

const username = document.getElementById("username");
const password = document.getElementById("password");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

const submitButton = document.getElementById("login-button");

const resetForm = () => {
  usernameError.innerText = "";
  passwordError.innerText = "";
  username.classList.remove("input-error");
  password.classList.remove("input-error");
};

submitButton.addEventListener("click", async (e) => {
  resetForm();

  e.preventDefault();

  submitButton.disabled = true;
  submitButton.innerText = "Logging in...";

  if (!username.value) {
    username.classList.add("input-error");
    username.focus();

    usernameError.innerText = "Username is required.";
  }

  if (!password.value) {
    password.classList.add("input-error");

    if (username.value) {
      password.focus();
    }

    passwordError.innerText = "Password is required.";
  }

  const response = await login(username.value, password.value);

  if (response.success) {
    toastSuccess(response.message);

    username.value = "";
    password.value = "";

    setTimeout(() => {
      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/tidytask";
    }, 1000);
  } else {
    toastError(response.message);
  }

  submitButton.disabled = false;
  submitButton.innerText = "Log in";
});
