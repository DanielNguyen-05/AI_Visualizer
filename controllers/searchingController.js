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

exports.getUCSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/ucs", { 
        pageTitle: 'Unifrom Cost Search (UCS)',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        algorithm: "ucs",
    });
}

exports.getBFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/bfs", { 
        pageTitle: 'Bread First Search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        algorithm: "breadthFirstSearch" 
    });
}

exports.getDFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/dfs", { 
        pageTitle: 'Depth First Search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        algorithm: "depthFirstSearch" });
}

exports.getAStarPage = (req, res, next) => {
    res.render("pages/searching_algorithms/a-star", { 
        pageTitle: 'A* Search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        algorithm: "aStar" });
};

exports.getIDDFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/iddfs", { 
        pageTitle: 'Iterative Deepening DFS',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        algorithm: "iterativeDependingDFS" });
};

exports.getIDAStarPage = (req, res, next) => {
    res.render("pages/searching_algorithms/ida-star", { 
        pageTitle: 'Iterative Deepening A* (IDA*) Search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        algorithm: "ida-star",
    });
};

exports.getBEAMPage = (req, res, next) => {
    res.render("pages/searching_algorithms/beam", { 
        pageTitle: 'Beam Search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        algorithm: "beamSearch" });
};

exports.getBIDIRECTPage = (req, res, next) => {
    res.render("pages/searching_algorithms/beam", { 
        algorithm: "biDirectional",
        pageTitle: 'Bi-directional Search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
     });
};