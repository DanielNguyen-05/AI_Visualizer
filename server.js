const express = require("express");
const path = require("path"); // Tiện cho deploy
const ejs = require("ejs"); // Import EJS
const app = express();
const port = 4000;

// Thiết lập thư mục views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // Đặt view engine là ejs

// Thiết lập thư mục public - thư mục chứa các file tĩnh của Frontend
app.use(express.static(path.join(__dirname, "public")));

// Hàm get để lấy giao diện trang chủ
app.get("/", (req, res) => {
  res.render("pages/home");
});

// Hàm get cho trang giới thiệu
app.get("/about", (req, res) => {
  res.render("pages/about");
});

// Hàm get cho trang đọc detail về searching algorithm
app.get("/algorithm/searching", (req, res) => {
  res.render("pages/algorithm-searching");
});

// Hàm get cho trang algorithms-menu
app.get("/algorithm/searching/menu", (req, res) => {
  res.render("pages/searching-menu");
});

// Hàm get cho trang pathfinding (đang fix lại)
app.get("/algorithm/pathfinding", (req, res) => {
  res.render("pages/pathfinding");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
