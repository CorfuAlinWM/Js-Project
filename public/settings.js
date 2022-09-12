import { getUser, logoutUser, updateNav } from "./main.js";

updateNav();

const user = getUser();
if (user) {
  const logoutContainerEl = document.getElementById("logoutContainer");
  logoutContainerEl?.appendChild(document.createElement("hr"));

  const button = document.createElement("button");
  button.innerText = "Or click here to logout.";
  button.classList.add("btn", "btn-outline-danger");
  button.addEventListener("click", () => {
    logoutUser();
  });
  logoutContainerEl?.appendChild(button);
}
