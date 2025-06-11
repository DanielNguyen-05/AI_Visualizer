// --- Dijkstra algorithm and helpers (from your code, potentially slightly modified) ---
function dijkstra(start, goal, grid) {
    const visitedNodesInOrder = [];
    start.distance = 0;
    const unvisitedNodes = getAllNodes(grid); // Helper function

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes); // Helper function
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrder; // Trapped

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === goal) return visitedNodesInOrder; // Target found

        updateUnvisitedNeighbors(closestNode, grid); // Helper function
    }
    return visitedNodesInOrder; // Target not reachable
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const neighbors = getNeighbors(node, grid); // Helper function
    for (const neighbor of neighbors) {
        if (!neighbor.isWall) { // Check if neighbor is not a wall
            const tentativeDistance = node.distance + 1; // Assuming cost is 1 for each step
            if (tentativeDistance < neighbor.distance) {
                neighbor.distance = tentativeDistance;
                neighbor.previousNode = node;
            }
        }
    }
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
    return neighbors.filter(neighbor => !neighbor.isVisited); // Only unvisited neighbors
}

// --- Path reconstruction ---
function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}


// --- Grid and Visualization Logic ---
const canvas = document.getElementById('pathfindingGrid');
const ctx = canvas.getContext('2d');

const NUM_ROWS = 20; // Example, adjust as needed
const NUM_COLS = 30; // Example
let CELL_SIZE; // Will be calculated based on canvas size

let grid = [];
let start = null;
let goal = null;

let isDrawingWalls = false;
let currentAlgorithm = 'Dijkstra'; // You can change this later

// Node constructor/factory
function createNode(col, row) {
    return {
        col,
        row,
        isStart: false,
        isGoal: false,
        isWall: false,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null,
        // For drawing
        x: col * CELL_SIZE,
        y: row * CELL_SIZE,
    };
}

function initializeGrid() {
    grid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < NUM_COLS; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    // Set default start and goal (example)
    start = grid[Math.floor(NUM_ROWS / 2)][Math.floor(NUM_COLS / 4)];
    start.isStart = true;
    goal = grid[Math.floor(NUM_ROWS / 2)][Math.floor(NUM_COLS * 3 / 4)];
    goal.isGoal = true;

    // Reset distances and visited status for all nodes
    for (const row of grid) {
        for (const node of row) {
            node.distance = Infinity;
            node.isVisited = false;
            node.previousNode = null;
            node.isPath = false; // Clear previous path
             // Ensure start node distance is 0 if it's the current start
            if (node.isStart) node.distance = 0;
        }
    }
}


function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#a0a0cf'; // Lighter grid lines

    for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
            const node = grid[row][col];
            ctx.beginPath();
            ctx.rect(node.x, node.y, CELL_SIZE, CELL_SIZE);

            if (node.isStart) {
                ctx.fillStyle = 'green'; // Start node color
            } else if (node.isGoal) {
                ctx.fillStyle = 'red'; // Goal node color
            } else if (node.isPath) {
                ctx.fillStyle = 'yellow'; // Path color
            } else if (node.isVisited) {
                ctx.fillStyle = 'lightblue'; // Visited node color
            } else if (node.isWall) {
                ctx.fillStyle = '#333'; // Wall color
            } else {
                ctx.fillStyle = '#e0e0ff'; // Empty cell (same as canvas bg)
            }
            ctx.fill();
            ctx.stroke();
        }
    }
}

function setupCanvas() {
    const gridSection = document.querySelector('.grid-section');
    // Adjust canvas size to fit, maintaining aspect ratio roughly
    const availableWidth = gridSection.offsetWidth * 0.9; // Use 90% of width
    CELL_SIZE = Math.floor(availableWidth / NUM_COLS);
    canvas.width = NUM_COLS * CELL_SIZE;
    canvas.height = NUM_ROWS * CELL_SIZE;

    initializeGrid();
    drawGrid();
}

// --- Event Listeners ---
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('click', handleMouseClick); // For single clicks

let draggedNode = null; // To handle dragging start/goal

function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
}

function getNodeFromMousePos(mousePos) {
    const col = Math.floor(mousePos.x / CELL_SIZE);
    const row = Math.floor(mousePos.y / CELL_SIZE);
    if (row >= 0 && row < NUM_ROWS && col >= 0 && col < NUM_COLS) {
        return grid[row][col];
    }
    return null;
}

function handleMouseDown(evt) {
    const mousePos = getMousePos(evt);
    const node = getNodeFromMousePos(mousePos);
    if (!node) return;

    if (node.isStart || node.isGoal) {
        draggedNode = node;
    } else {
        isDrawingWalls = true;
        node.isWall = !node.isWall; // Toggle wall
        drawGrid();
    }
}

function handleMouseMove(evt) {
    if (draggedNode) {
        const mousePos = getMousePos(evt);
        const targetNode = getNodeFromMousePos(mousePos);
        if (targetNode && targetNode !== draggedNode && !targetNode.isWall && !targetNode.isStart && !targetNode.isGoal) {
            if (draggedNode.isStart) {
                start.isStart = false;
                start = targetNode;
                start.isStart = true;
            } else if (draggedNode.isGoal) {
                goal.isGoal = false;
                goal = targetNode;
                goal.isGoal = true;
            }
            draggedNode = targetNode; // Update dragged node to the new position
            drawGrid();
        }
    } else if (isDrawingWalls) {
        const mousePos = getMousePos(evt);
        const node = getNodeFromMousePos(mousePos);
        if (node && !node.isStart && !node.isGoal) {
            node.isWall = true; // Continuously draw walls
            drawGrid();
        }
    }
}

function handleMouseUp() {
    isDrawingWalls = false;
    draggedNode = null;
}

function handleMouseClick(evt) { // For toggling walls on single click if not dragging
    if (isDrawingWalls || draggedNode) return; // Handled by mousedown/move/up
    const mousePos = getMousePos(evt);
    const node = getNodeFromMousePos(mousePos);
    if (node && !node.isStart && !node.isGoal) {
        node.isWall = !node.isWall;
        drawGrid();
    }
}


// Button event listeners
document.getElementById('btnVisualize').addEventListener('click', visualizeAlgorithm);
document.getElementById('btnReset').addEventListener('click', () => {
    setupCanvas(); // Re-initializes and redraws
});
document.getElementById('btnGenerateMap').addEventListener('click', generateRandomMap);


function generateRandomMap() {
    initializeGrid(); // Clear existing walls, start, goal
    for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
            if (grid[row][col].isStart || grid[row][col].isGoal) continue;
            if (Math.random() < 0.25) { // 25% chance of being a wall
                grid[row][col].isWall = true;
            } else {
                grid[row][col].isWall = false;
            }
        }
    }
    // Ensure start/goal are not walls
    start.isWall = false;
    goal.isWall = false;
    drawGrid();
}


function animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) { // Finished visiting
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i); // Adjust speed (10ms per node)
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            if (!node.isStart && !node.isGoal) {
                grid[node.row][node.col].isVisited = true; // Update internal grid state
                // Visually update the specific node
                ctx.beginPath();
                ctx.rect(node.x, node.y, CELL_SIZE, CELL_SIZE);
                ctx.fillStyle = 'lightblue';
                ctx.fill();
                ctx.stroke();
            }
        }, 10 * i);
    }
}

function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
             grid[node.row][node.col].isPath = true; // Update internal grid state
            if (!node.isStart && !node.isGoal) {
                // Visually update the specific node
                ctx.beginPath();
                ctx.rect(node.x, node.y, CELL_SIZE, CELL_SIZE);
                ctx.fillStyle = 'yellow';
                ctx.fill();
                ctx.stroke();
            }
        }, 30 * i); // Adjust speed (30ms per path node)
    }
}


function visualizeAlgorithm() {
    // Clear previous visualization states (visited, path) but keep walls, start, goal
    for (const row of grid) {
        for (const node of row) {
            node.isVisited = false;
            node.isPath = false;
            node.distance = Infinity;
            node.previousNode = null;
        }
    }
    start.distance = 0; // Crucial for Dijkstra
    drawGrid(); // Redraw to clear old visualization

    // Ensure start and goal are set
    if (!start || !goal) {
        alert("Please set a start and goal node.");
        return;
    }

    const visitedNodesInOrder = dijkstra(start, goal, grid);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(goal);

    // Check if a path was found (goal's previousNode will be set if reachable)
    if (goal.previousNode === null && goal !== start) {
        console.log("No path found to the goal node.");
        // Optionally, animate visited nodes even if no path
         animateAlgorithm(visitedNodesInOrder, []); // Animate visited even if no path
        // alert("No path found!");
        return;
    }

    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
}


// --- Initial Setup ---
window.onload = () => {
    setupCanvas();
    // Update algorithm title (example)
    document.querySelector('.algorithm-title h1').textContent = 'Dijkstra Search';
};
window.onresize = setupCanvas; // Adjust grid on window resize