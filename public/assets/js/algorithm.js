// Node class for the grid
class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isStart = false;
        this.isTarget = false;
        this.isWall = false;
        this.isVisited = false;
        this.distance = Infinity;
        this.previousNode = null;
        this.gCost = Infinity; // Cost from start
        this.hCost = 0; // Heuristic cost to target
        this.fCost = Infinity; // gCost + hCost
    }

    reset() {
        this.isVisited = false;
        this.distance = Infinity;
        this.previousNode = null;
        this.gCost = Infinity;
        this.hCost = 0;
        this.fCost = Infinity;
    }
}

// Heuristic function (Manhattan distance)
function heuristic(nodeA, nodeB) {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

// Get neighbors of a node
function getNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right

    for (const [dRow, dCol] of directions) {
        const newRow = row + dRow;
        const newCol = col + dCol;

        if (newRow >= 0 && newRow < grid.length && 
            newCol >= 0 && newCol < grid[0].length) {
            neighbors.push(grid[newRow][newCol]);
        }
    }

    return neighbors;
}

// Uniform Cost Search (UCS) algorithm
function uniformCostSearch(startNode, targetNode, grid) {
    const visitedNodesInOrder = [];
    const openSet = [startNode];
    
    startNode.gCost = 0;
    startNode.fCost = 0;

    while (openSet.length > 0) {
        // Sort by gCost (UCS uses actual cost, not heuristic)
        openSet.sort((a, b) => a.gCost - b.gCost);
        const currentNode = openSet.shift();

        if (currentNode.isWall) continue;
        if (currentNode.isVisited) continue;

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        if (currentNode === targetNode) {
            return visitedNodesInOrder;
        }

        const neighbors = getNeighbors(currentNode, grid);
        
        for (const neighbor of neighbors) {
            if (neighbor.isWall || neighbor.isVisited) continue;

            const tentativeGCost = currentNode.gCost + 1; // Assuming uniform cost of 1

            if (tentativeGCost < neighbor.gCost) {
                neighbor.previousNode = currentNode;
                neighbor.gCost = tentativeGCost;
                neighbor.fCost = neighbor.gCost;

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    return visitedNodesInOrder;
}

// IDA* algorithm implementation
function idaStar(startNode, targetNode, grid) {
    let threshold = heuristic(startNode, targetNode);
    const visitedNodesInOrder = [];

    while (true) {
        const result = idaStarSearch(startNode, targetNode, 0, threshold, grid, visitedNodesInOrder);
        
        if (result.found) {
            return visitedNodesInOrder;
        }
        
        if (result.threshold === Infinity) {
            return visitedNodesInOrder; // No path found
        }
        
        threshold = result.threshold;
    }
}

function idaStarSearch(node, targetNode, gCost, threshold, grid, visitedNodesInOrder) {
    const fCost = gCost + heuristic(node, targetNode);
    
    if (fCost > threshold) {
        return { found: false, threshold: fCost };
    }
    
    if (node === targetNode) {
        return { found: true, threshold: threshold };
    }
    
    if (!node.isVisited) {
        node.isVisited = true;
        visitedNodesInOrder.push(node);
    }
    
    let minThreshold = Infinity;
    const neighbors = getNeighbors(node, grid);
    
    for (const neighbor of neighbors) {
        if (neighbor.isWall) continue;
        
        const newGCost = gCost + 1;
        const result = idaStarSearch(neighbor, targetNode, newGCost, threshold, grid, visitedNodesInOrder);
        
        if (result.found) {
            neighbor.previousNode = node;
            return result;
        }
        
        minThreshold = Math.min(minThreshold, result.threshold);
    }
    
    return { found: false, threshold: minThreshold };
}

// Get shortest path by backtracking from target to start
function getNodesInShortestPathOrder(targetNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = targetNode;
    
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    
    return nodesInShortestPathOrder;
}

// Reset all nodes in the grid
function resetGrid(grid) {
    for (const row of grid) {
        for (const node of row) {
            node.reset();
        }
    }
}

// Generate random walls in the grid
function generateMaze(grid, startNode, targetNode) {
    // Clear existing walls first
    for (const row of grid) {
        for (const node of row) {
            if (!node.isStart && !node.isTarget) {
                node.isWall = false;
            }
        }
    }

    // Add random walls (about 30% of the grid)
    const totalNodes = grid.length * grid[0].length;
    const wallCount = Math.floor(totalNodes * 0.25);
    
    for (let i = 0; i < wallCount; i++) {
        const row = Math.floor(Math.random() * grid.length);
        const col = Math.floor(Math.random() * grid[0].length);
        const node = grid[row][col];
        
        if (!node.isStart && !node.isTarget) {
            node.isWall = true;
        }
    }
}