function dijkstra(grid, start, finish) {
  const visitedInOrder = [];
  start.distance = 0;
  const unvisited = allNodes(grid);
  while (unvisited.length) {
    sortNodes(unvisited);
    const closest = unvisited.shift();
    if (closest === finish) {
      return visitedInOrder;
    }
    if (closest.isWall) continue;
    if (closest.distance === Infinity) return visitedInOrder;
    closest.isVisited = true;
    visitedInOrder.push(closest);

    updateUnvisitedNeighbors(closest, grid);
  }
  return visitedInOrder;
}

export { dijkstra };
