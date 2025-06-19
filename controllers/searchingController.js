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
    });
}

exports.getBFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/bfs", { 
        pageTitle: 'Breadth-first search (BFS)',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
    });
}

exports.getDFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/dfs", { 
        pageTitle: 'Depth-first search (DFS)',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
    });
}

exports.getAStarPage = (req, res, next) => {
    res.render("pages/searching_algorithms/a-star", { 
        pageTitle: 'A* search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
    });
};

exports.getIDDFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/iddfs", { 
        pageTitle: 'Iterative deepening depth-first search (IDDFS)',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
    })
};

exports.getIDAStarPage = (req, res, next) => {
    res.render("pages/searching_algorithms/ida-star", { 
        pageTitle: 'Iterative deepening A* search (IDA*)',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
    });
};

exports.getBEAMPage = (req, res, next) => {
    res.render("pages/searching_algorithms/beam", { 
        pageTitle: 'Beam search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
    });
};

exports.getBIDIRECTPage = (req, res, next) => {
    res.render("pages/searching_algorithms/bi-direct", { 
        pageTitle: 'Bi-directional search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
    });
};

exports.getComparePage = (req, res) => {
    res.render('pages/searching-compare', {
        pageTitle: 'Searching Algorithm Comparison',
        pageCSS: '/assets/css/searching-compare.css',
        pageJS: ['/assets/js/searching-compare.js', 'https://cdn.jsdelivr.net/npm/chart.js'],
    });
};