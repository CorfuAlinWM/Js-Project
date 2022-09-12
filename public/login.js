import { updateNav } from "./main.js";

updateNav();

const formEl = document.querySelector("form");

// handle login submit
formEl?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formEl = event.target;
  const emailEl = formEl?.querySelector('form input[placeholder="Email"]');
  const passEl = formEl?.querySelector('form input[placeholder="Password"]');

  // request login
  try {
    const response = await fetch("https://api.realworld.io/api/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: emailEl.value,
          password: passEl.value,
        },
      }),
    });

    const data = await response.json();

    // save user information to local storage
    localStorage.setItem("u", JSON.stringify(data.user));

    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
});
