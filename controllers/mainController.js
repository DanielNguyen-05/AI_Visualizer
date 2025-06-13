exports.getHomePage = (req, res, next) => {
    res.render("pages/home", {
        pageTitle: 'Algorithms World',
        pageCSS: '/assets/css/home-page.css',
        pageJS: '/assets/js/home-page.js',
    });
};

exports.getAboutPage = (req, res, next) => {
    res.render("pages/about", {
        pageTitle: 'About us',
        pageCSS: '/assets/css/about-page.css',
        pageJS: '/assets/js/bar.js',
    });
};

exports.getAlgorithmPage = (req, res, next) => {
    res.render("pages/algorithm", {
        pageTitle: 'Algorithms',
        pageCSS: '/assets/css/algorithm-page.css',
        pageJS: '/assets/js/bar.js',
    });
};