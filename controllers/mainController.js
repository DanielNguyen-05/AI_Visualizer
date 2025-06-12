exports.getHomePage = (req, res, next) => {
    res.render("pages/home");
};

exports.getAboutPage = (req, res, next) => {
    res.render("pages/about");
};

exports.getAlgorithmPage = (req, res, next) => {
    res.render("pages/algorithm");
};