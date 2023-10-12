const express = require("express");
const i18n = require("i18n");
const cookieParser = require("cookie-parser");
const app = express();

// Configure i18n
i18n.configure({
  locales: ["en", "fr", "es"],
  directory: __dirname + "/locales",
  defaultLocale: "en",
  cookie: "lang",
});

// you will need to use cookieParser to expose cookies to req.cookies
app.use(cookieParser());

// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);

// Set up EJS and static files
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Define routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/setlocale/:locale", (req, res) => {
  const { locale } = req.params;
  // console.log(locale);
  res.cookie("lang", locale);
  res.redirect("back");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
