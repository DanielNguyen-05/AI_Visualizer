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

// Iterative Deepening A-Star
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

// Breadth-First Search (BFS) algorithm
function breadthFirstSearch(startNode, targetNode, grid) {
    const visitedNodesInOrder = [];
    const queue = [startNode];
    startNode.isVisited = true;

    while (queue.length > 0) {
        const currentNode = queue.shift();
        visitedNodesInOrder.push(currentNode);

        if (currentNode === targetNode) {
            return visitedNodesInOrder;
        }

        const neighbors = getNeighbors(currentNode, grid);
        
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && !neighbor.isWall) {
                neighbor.isVisited = true;
                neighbor.previousNode = currentNode;
                queue.push(neighbor);
            }
        }
    }

    return visitedNodesInOrder;
}

// Depth-First Search (DFS) algorithm
function depthFirstSearch(startNode, targetNode, grid) {
    const visitedNodesInOrder = [];
    const stack = [startNode];

    while (stack.length > 0) {
        const currentNode = stack.pop();

        if (currentNode.isWall || currentNode.isVisited) continue;

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        if (currentNode === targetNode) {
            return visitedNodesInOrder;
        }

        const neighbors = getNeighbors(currentNode, grid);
        
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && !neighbor.isWall) {
                neighbor.previousNode = currentNode;
                stack.push(neighbor);
            }
        }
    }

    return visitedNodesInOrder;
}

// A* Search algorithm
function aStar(startNode, targetNode, grid) {
    const visitedNodesInOrder = [];
    const openSet = [startNode];
    
    startNode.gCost = 0;
    startNode.hCost = heuristic(startNode, targetNode);
    startNode.fCost = startNode.gCost + startNode.hCost;

    while (openSet.length > 0) {
        openSet.sort((a, b) => {
            if (a.fCost === b.fCost) {
                return a.hCost - b.hCost;
            }
            return a.fCost - b.fCost;
        });
        
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

            const tentativeGCost = currentNode.gCost + 1;

            if (tentativeGCost < neighbor.gCost) {
                neighbor.previousNode = currentNode;
                neighbor.gCost = tentativeGCost;
                neighbor.hCost = heuristic(neighbor, targetNode);
                neighbor.fCost = neighbor.gCost + neighbor.hCost;

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    return visitedNodesInOrder;
}

//Iterative Depending DFS
function iterativeDependingDFS(startNode, targetNode, grid) {
    const maxDepth = grid.length * grid[0].length;
    for (let depth = 0; depth <= maxDepth; depth++) {
        for (const row of grid) {
            for (const node of row) {
                node.isVisited = false;
                node.previousNode = null;
            }
        }

        const visitedNodesInOrder = [];
        const found = depthLimitedSearch(startNode, targetNode, depth, grid, visitedNodesInOrder);
        if (found) return visitedNodesInOrder;
    }

    return []; 
}

function depthLimitedSearch(node, targetNode, depth, grid, visitedNodesInOrder) {
    if (depth < 0 || node.isWall || node.isVisited) return false;

    node.isVisited = true;
    visitedNodesInOrder.push(node);

    if (node === targetNode) return true;

    const neighbors = getNeighbors(node, grid);

    for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
            neighbor.previousNode = node;
            if (depthLimitedSearch(neighbor, targetNode, depth - 1, grid, visitedNodesInOrder)) {
                return true;
            }
        }
    }

    return false;
}

// Beam Search algorithm 
function beamSearch(startNode, targetNode, grid, beamWidth = 3) {
    const visitedNodesInOrder = [];
    let currentLevel = [startNode];
    
    startNode.hCost = heuristic(startNode, targetNode);
    startNode.isVisited = true;
    visitedNodesInOrder.push(startNode);

    while (currentLevel.length > 0) {
        const nextLevel = [];

        for (const currentNode of currentLevel) {
            if (currentNode === targetNode) {
                return visitedNodesInOrder;
            }

            const neighbors = getNeighbors(currentNode, grid);
            
            for (const neighbor of neighbors) {
                if (!neighbor.isVisited && !neighbor.isWall) {
                    neighbor.hCost = heuristic(neighbor, targetNode);
                    neighbor.previousNode = currentNode;
                    nextLevel.push(neighbor);
                }
            }
        }

        nextLevel.sort((a, b) => a.hCost - b.hCost);
        currentLevel = nextLevel.slice(0, beamWidth);

        for (const node of currentLevel) {
            if (!node.isVisited) {
                node.isVisited = true;
                visitedNodesInOrder.push(node);
            }
        }
    }

    return visitedNodesInOrder;
}

//Bi-directional search
function biDirectional(startNode, targetNode, grid) {
    const visitedNodesInOrder = [];

    const queueStart = [startNode];
    const queueEnd = [targetNode];

    const visitedFromStart = new Set();
    const visitedFromEnd = new Set();

    const parentFromStart = new Map();
    const parentFromEnd = new Map();

    visitedFromStart.add(startNode);
    visitedFromEnd.add(targetNode);

    while (queueStart.length && queueEnd.length) {
        // Expand from Start
        const currentFromStart = queueStart.shift();
        currentFromStart.isVisited = true;
        visitedNodesInOrder.push(currentFromStart);

        const neighborsFromStart = getNeighbors(currentFromStart, grid);
        for (const neighbor of neighborsFromStart) {
            if (neighbor.isWall || visitedFromStart.has(neighbor)) continue;

            parentFromStart.set(neighbor, currentFromStart);
            visitedFromStart.add(neighbor);
            queueStart.push(neighbor);

            if (visitedFromEnd.has(neighbor)) {
                return Backtracking(neighbor, parentFromStart, parentFromEnd, visitedNodesInOrder);
            }
        }

        // Expand from End
        const currentFromEnd = queueEnd.shift();
        currentFromEnd.isVisited = true;
        visitedNodesInOrder.push(currentFromEnd);

        const neighborsFromEnd = getNeighbors(currentFromEnd, grid);
        for (const neighbor of neighborsFromEnd) {
            if (neighbor.isWall || visitedFromEnd.has(neighbor)) continue;

            parentFromEnd.set(neighbor, currentFromEnd);
            visitedFromEnd.add(neighbor);
            queueEnd.push(neighbor);

            if (visitedFromStart.has(neighbor)) {
                return Backtracking(neighbor, parentFromStart, parentFromEnd, visitedNodesInOrder);
            }
        }
    }

    return visitedNodesInOrder;
}

//Backtracking to get the final path
function Backtracking(meetingNode, parentFromStart, parentFromEnd, visitedNodesInOrder) {
    let node = meetingNode;
    while (parentFromStart.has(node)) {
        const prev = parentFromStart.get(node);
        node.previousNode = prev;
        node = prev;
    }

    node = meetingNode;
    while (parentFromEnd.has(node)) {
        const prev = parentFromEnd.get(node);
        prev.previousNode = node;  
        node = prev;
    }

    return visitedNodesInOrder;
}


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

window.Algorithms = {
    breadthFirstSearch,
    depthFirstSearch,
    uniformCostSearch,
    aStar,
    iterativeDependingDFS,
    beamSearch,
    biDirectional,
    idaStar
};
