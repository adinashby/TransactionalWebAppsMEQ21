const express = require("express");

// express app
const app = express();

// register view engine (default location is "views" folder
app.set("view engine", "ejs");

// If you like to change the default template location
// app.set("views", "myviews");

// listen for requests
app.listen(3000);

app.get("/", (req, res) => {
  const blogs = [
    { title: "Test1", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Test2", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Test3", snippet: "Lorem ipsum dolor sit amet consectetur" },
  ];

  res.render("index", { title: "Homepage", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
