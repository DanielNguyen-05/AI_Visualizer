exports.getHomePage = (req, res, next) => {
    res.render("pages/home", {
        layout: false,
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

exports.getGuidePage = (req, res, next) => {
    res.render("pages/guide", {
        pageTitle: 'Guide Page',
        pageCSS: '/assets/css/guide.css',
    });
};