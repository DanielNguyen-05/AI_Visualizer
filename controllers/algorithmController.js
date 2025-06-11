// Controller cho trang thông tin chi tiết về searching algorithm
exports.getSearchingAlgorithmDetailPage = (req, res, next) => {
    res.render("pages/algorithm-searching");
};

// Controller cho trang menu các thuật toán tìm kiếm
exports.getSearchingMenuPage = (req, res, next) => {
    res.render("pages/searching-menu");
};

// Controller cho trang pathfinding
exports.getPathfindingPage = (req, res, next) => {
    res.render("pages/pathfinding");
};