const express = require("express");
const { readFileSync } = require("fs");
const { readFile } = require("fs/promises");
const path = require("path");
const app = express();
const port = 3000;
const basePath = process.cwd();

app.use(express.static("public"));

async function replacePartials(content) {
  const footerPromise = readFile(
    path.join(basePath, "./pages/partials/_footer.html"),
    "utf-8"
  );
  const headPromise = readFile(
    path.join(basePath, "./pages/partials/_head.html"),
    "utf-8"
  );
  const navPromise = readFile(
    path.join(basePath, "./pages/partials/_nav.html"),
    "utf-8"
  );

  const [footer, head, nav] = await Promise.all([
    footerPromise,
    headPromise,
    navPromise,
  ]);

  return content
    .replace("<!--{{FOOTER}}-->", footer)
    .replace("<!--{{HEAD}}-->", head)
    .replace("<!--{{NAV}}-->", nav);
}

async function sendPage(res, pageFile) {
  const content = await readFile(
    path.join(basePath, "pages", pageFile),
    "utf-8"
  );
  res.send(await replacePartials(content));
}

app.get("/", async (req, res) => await sendPage(res, "home.html"));
app.get("/login", async (req, res) => await sendPage(res, "login.html"));
app.get("/register", async (req, res) => await sendPage(res, "register.html"));
app.get("/settings", async (req, res) => await sendPage(res, "settings.html"));
app.get(
  "/editor",
  async (req, res) => await sendPage(res, "create-edit-article.html")
);
app.get(
  "/editor/:articleSlug",
  async (req, res) => await sendPage(res, "create-edit-article.html")
);
app.get(
  "/article/:articleSlug",
  async (req, res) => await sendPage(res, "article.html")
);
app.get(
  "/profile/:username",
  async (req, res) => await sendPage(res, "profile.html")
);
app.get(
  "/profile/:username/favorites",
  async (req, res) => await sendPage(res, "profile.html")
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
