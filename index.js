const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();
const hostname = process.env.HOSTNAME || "127.0.0.1";
const port = process.env.PORT || 8080;

// CSS, etc
app.use(express.static("style"));

// Pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/contact-me.html"));
});

// Redirect route
app.get("/contact-me", (req, res) => {
  res.redirect("/contact");
});

// Page not found
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

// Server
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
