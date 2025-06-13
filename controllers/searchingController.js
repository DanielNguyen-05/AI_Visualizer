exports.getSearchingPage = (req, res, next) => {
    res.render("pages/searching", {
        pageTitle: 'Searching',
        pageCSS: '/assets/css/searching.css',
    });
};

exports.getSearchingMenuPage = (req, res, next) => {
    res.render("pages/searching-menu", {
        pageTitle: 'Searching Menu',
        pageCSS: '/assets/css/searching-menu.css',
    });
};

exports.getIDAStarPage = (req, res, next) => {
    res.render("pages/searching_algorithms/ida-star", { 
        pageTitle: 'Iterative Deepening A* (IDA*) Search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        algorithm: "ida-star",
    });
};

exports.getUCSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/ucs", { 
        pageTitle: 'Unifrom Cost Search (UCS)',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        algorithm: "ucs",
    });
};