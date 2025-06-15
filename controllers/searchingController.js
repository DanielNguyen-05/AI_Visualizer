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
        // algorithm: "uniformCostSearch"
    });
}

exports.getBFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/bfs", { 
        pageTitle: 'Breadth-first search (BFS)',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        // algorithm: "breadthFirstSearch" 
    });
}

exports.getDFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/dfs", { 
        pageTitle: 'Depth-first search (DFS)',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        // algorithm: "depthFirstSearch" 
    });
}

exports.getAStarPage = (req, res, next) => {
    res.render("pages/searching_algorithms/a-star", { 
        pageTitle: 'A* search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        // algorithm: "aStar" 
    });
};

exports.getIDDFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/iddfs", { 
        pageTitle: 'Iterative deepening depth-first search (IDDFS)',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        // algorithm: "iterativeDependingDFS" 
    })
};

exports.getIDAStarPage = (req, res, next) => {
    res.render("pages/searching_algorithms/ida-star", { 
        pageTitle: 'Iterative deepening A* search (IDA*)',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        // algorithm: "idaStar"
    });
};

exports.getBEAMPage = (req, res, next) => {
    res.render("pages/searching_algorithms/beam", { 
        pageTitle: 'Beam search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        // algorithm: "beamSearch" 
    });
};

exports.getBIDIRECTPage = (req, res, next) => {
    res.render("pages/searching_algorithms/beam", { 
        pageTitle: 'Bi-directional search',
        pageCSS: '/assets/css/pathfinding.css',
        pageJS: ['/assets/js/algorithm.js', '/assets/js/visualization.js', '/assets/js/pathfinding.js'],
        // algorithm: "biDirectional"
    });
};