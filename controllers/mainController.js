exports.getHomePage = (req, res, next) => {
    res.render("pages/home");
};

// Controller cho trang giới thiệu
exports.getAboutPage = (req, res, next) => {
    res.render("pages/about");
};