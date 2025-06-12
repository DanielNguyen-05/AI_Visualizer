exports.getSearchingPage = (req, res, next) => {
    res.render("pages/searching");
};

exports.getSearchingMenuPage = (req, res, next) => {
    res.render("pages/searching-menu");
};

exports.getIDAStarPage = (req, res, next) => {
    res.render("pages/searching_algorithms/ida-star", { algorithm: "ida-star" });
};

exports.getUCSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/ucs", { algorithm: "ucs" });
};