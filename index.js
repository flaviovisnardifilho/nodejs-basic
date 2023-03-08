const http = require("http");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const hostname = process.env.HOSTNAME || "127.0.0.1";
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  let filePath = "./views/";
  switch (req.url) {
    case "/":
      filePath += "index.html";
      // res.statusCode = 200;
      break;
    case "/about":
      filePath += "about.html";
      // res.statusCode = 200;
      break;
    case "/contact":
      filePath += "contact-me.html";
      // res.statusCode = 200;
      break;
    case "/contact-me":
      res.statusCode = 301;
      res.setHeader("Location", "/contact");
      res.end();
      break;
    case "/styles.css":
      filePath += "styles.css";
      break;
    default:
      filePath += "404.html";
      res.statusCode = 404;
      break;
  }

  let extname = path.extname(filePath);
  let contentType = extname === ".css" ? "text/css" : "text/html";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.writeHead(res.statusCode, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
