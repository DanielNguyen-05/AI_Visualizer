const express = require("express");
const path = require("path");
const app = express();
const port = 4000;

// Import routes
const mainRoutes = require('./routes/mainRoutes');
const searchingRoutes = require('./routes/searchingRoutes');

// Thiết lập thư mục views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // Đặt view engine là ejs

// Thiết lập thư mục public - thư mục chứa các file tĩnh của Frontend
app.use(express.static(path.join(__dirname, "public")));

// Sử dụng các Routes đã định nghĩa
app.use('/', mainRoutes); // Gắn các route chính vào đường dẫn gốc '/'
app.use('/searching', searchingRoutes); 

// Xử lý lỗi chung
app.use((err, req, res, next) => {
    console.error(err.stack);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});