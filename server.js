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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
