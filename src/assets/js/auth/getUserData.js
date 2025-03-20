import { format } from "date-fns";

export const currentUser = JSON.parse(localStorage.getItem("user"));

export const loadUserData = () => {
  const username = document.querySelectorAll("#current-user-username");
  const joinDate = document.querySelectorAll("#current-user-join-date");
  const name = document.querySelectorAll("#current-user-name");
  const avatarContainer = document.querySelectorAll(
    "#current-user-avatar-container",
  );

  username?.forEach((e) => {
    e.innerHTML = currentUser.username;
  });

  joinDate.forEach((e) => {
    e.innerHTML =
      "Joined " + format(new Date(currentUser.joined), "do MMMM yyyy");
  });

  name.forEach((e) => {
    e.innerHTML = currentUser.name.split(" ")[0];
  });

  avatarContainer.forEach((e) => {
    const img = document.createElement("img");
    img.src = `https://avatar.iran.liara.run/username?username=${currentUser.name}`;
    img.classList.add("avatar");
    img.onload = () => {
      e.append(img);
    };
  });
};
