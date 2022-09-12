export function getUser() {
  const raw = localStorage.getItem("u");
  return raw ? JSON.parse(raw) : null;
}

export function logoutUser() {
  localStorage.removeItem("u");
  window.location.href = "/";
}

export function updateNav() {
  const path = window.location.pathname;
  const navList = document.querySelector("ul.navbar-nav");

  navList
    ?.querySelectorAll(".nav-link")
    .forEach((element) => element.classList.remove("active"));

  if (path === "/") {
    getNavItemLink(1)?.classList.add("active");
  } else if (path === "/editor") {
    getNavItemLink(2)?.classList.add("active");
  } else if (path === "/settings") {
    getNavItemLink(3)?.classList.add("active");
  } else if (path === "/login") {
    getNavItemLink(4)?.classList.add("active");
  } else if (path === "/register") {
    getNavItemLink(5)?.classList.add("active");
  } else if (path.startsWith("/profile/@")) {
    getNavItemLink(6)?.classList.add("active");
  }

  const user = getUser();
  if (user) {
    const signInEl = getNavItemLink(4);
    signInEl.classList.add("hidden");

    const signUpEl = getNavItemLink(5);
    signUpEl.classList.add("hidden");

    const profileEl = getNavItemLink(6);
    profileEl.href = `/profile/@${user.username}`;
    profileEl.querySelector("a span").innerHTML = user.username;
  } else {
    const newArticleEl = getNavItemLink(2);
    newArticleEl.classList.add("hidden");

    const settingsEl = getNavItemLink(3);
    settingsEl.classList.add("hidden");
  }
}

function getNavItemLink(nr) {
  return document.querySelector(
    `ul.navbar-nav .nav-item:nth-child(${nr}) .nav-link`
  );
}

updateNav();
