const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const app = express();
const port = 4000;

// Truyền routes
const mainRoutes = require('./routes/mainRoutes');
const searchingRoutes = require('./routes/searchingRoutes');

// Thiết lập thư mục views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); 

// Thiết lập layout
app.use(expressLayouts);
app.set('layout', 'layouts/default');

// Thiết lập thư mục public - thư mục chứa các file tĩnh của Frontend
app.use(express.static(path.join(__dirname, "public")));

// Sử dụng các Routes đã định nghĩa
app.use('/', mainRoutes); 
app.use('/searching', searchingRoutes); 

// Xử lý lỗi chung
app.use((err, req, res, next) => {
    console.error(err.stack);
});

// Hàm get cho trang algorithm
app.get("/algorithm", (req, res) => {
  res.render("pages/algorithm");
});

// Hàm get cho trang algorithms-detail
app.get("/algorithms-detail", (req, res) => {
  res.render("pages/algorithms-detail");
});

app.use((req, res, next) => {
  res.status(404).render('pages/404', {
        pageTitle: 'Error 404',
        pageCSS: '/assets/css/404.css',
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});