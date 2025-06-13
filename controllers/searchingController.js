exports.getSearchingPage = (req, res, next) => {
    res.render("pages/searching");
};

exports.getSearchingMenuPage = (req, res, next) => {
    res.render("pages/searching-menu");
};

exports.getBFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/bfs", { algorithm: "breadthFirstSearch" });
}

exports.getDFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/dfs", { algorithm: "depthFirstSearch" });
}

exports.getUCSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/ucs", { algorithm: "uniformCostSearch" });
};

exports.getAStarPage = (req, res, next) => {
    res.render("pages/searching_algorithms/a-star", { algorithm: "aStar" });
};

exports.getIDDFSPage = (req, res, next) => {
    res.render("pages/searching_algorithms/iddfs", { algorithm: "iterativeDependingDFS" });
};

exports.getIDAStarPage = (req, res, next) => {
    res.render("pages/searching_algorithms/ida-star", { algorithm: "idaStar" });
};

exports.getBEAMPage = (req, res, next) => {
    res.render("pages/searching_algorithms/beam", { algorithm: "beamSearch" });
};

exports.getBIDIRECTPage = (req, res, next) => {
    res.render("pages/searching_algorithms/beam", { algorithm: "biDirectional" });
};