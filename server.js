const express = require("express");
const app = express();
const port = 4000;

// hàm get để lấy ra cái giao diện (hiện đang là trang chủ)
app.get("/", (req, res) => {
  res.send("Đây là trang chủ");
});

app.get("/about", (req, res) => {
  res.send("Đây là trang giới thiệu thành viên!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
