import { signup } from "@js/api/users";
import { toastError, toastSuccess } from "@js/ui/toast";

const fullName = document.getElementById("fullName");
const username = document.getElementById("username");
const password = document.getElementById("password");
const nameError = document.getElementById("name-error");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

const submitButton = document.getElementById("signup-button");

const resetForm = () => {
  nameError.innerText = "";
  usernameError.innerText = "";
  passwordError.innerText = "";
  fullName.classList.remove("input-error");
  username.classList.remove("input-error");
  password.classList.remove("input-error");
};

submitButton.addEventListener("click", async (e) => {
  resetForm();

  if (!fullName.value) {
    fullName.classList.add("input-error");
    fullName.focus();

    nameError.innerText = "Full name is required.";
  }

  if (!username.value) {
    username.classList.add("input-error");

    if (fullName.value) {
      username.focus();
    }

    usernameError.innerText = "Username is required.";
  }

  if (!password.value) {
    password.classList.add("input-error");

    if (username.value) {
      password.focus();
    }

    passwordError.innerText = "Password is required.";
  }

  e.preventDefault();

  submitButton.disabled = true;
  submitButton.innerText = "Signing up...";

  const response = await signup(fullName.value, username.value, password.value);

  if (response.success) {
    toastSuccess(response.message);

    fullName.value = "";
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
  submitButton.innerText = "Sign up";
});
