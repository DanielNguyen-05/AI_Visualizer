class GridVisualizer {
    constructor() {
        this.grid = [];
        this.startNode = null;
        this.targetNode = null;
        this.isRunning = false;
        this.isDragging = false;
        this.dragType = null;
        this.rows = 15;
        this.cols = 25;
        this.algorithmName = document.getElementById('grid-container')?.dataset.algorithm || 'uniformCostSearch';
        
        this.initializeGrid();
        this.createGridElement();
        this.setupEventListeners();
    }

    initializeGrid() {
        this.grid = [];
        for (let row = 0; row < this.rows; row++) {
            const currentRow = [];
            for (let col = 0; col < this.cols; col++) {
                currentRow.push(new Node(row, col));
            }
            this.grid.push(currentRow);
        }

        this.startNode = this.grid[7][5];
        this.startNode.isStart = true;
        
        this.targetNode = this.grid[7][19];
        this.targetNode.isTarget = true;
    }

    createGridElement() {
        const gridContainer = document.getElementById('grid-container');
        gridContainer.innerHTML = '';
        
        const gridElement = document.createElement('div');
        gridElement.className = 'grid';
        gridElement.id = 'grid';
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const node = this.grid[row][col];
                const nodeElement = document.createElement('div');
                nodeElement.className = 'node';
                nodeElement.id = `node-${row}-${col}`;
                
                if (node.isStart) {
                    nodeElement.classList.add('start');
                    nodeElement.textContent = '😊';
                } else if (node.isTarget) {
                    nodeElement.classList.add('target');
                    nodeElement.textContent = '🏠';
                }
                
                this.setupNodeEventListeners(nodeElement, node);
                gridElement.appendChild(nodeElement);
            }
        }
        
        gridContainer.appendChild(gridElement);
    }

    setupNodeEventListeners(nodeElement, node) {
        nodeElement.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if (this.isRunning) return;
            
            if (node.isStart) {
                this.isDragging = true;
                this.dragType = 'start';
            } else if (node.isTarget) {
                this.isDragging = true;
                this.dragType = 'target';
            } else if (!node.isWall) {
                node.isWall = true;
                this.updateNodeElement(node);
            } else {
                node.isWall = false;
                this.updateNodeElement(node);
            }
        });

        nodeElement.addEventListener('mouseenter', () => {
            if (this.isRunning) return;
            
            if (this.isDragging && this.dragType === 'start' && !node.isTarget && !node.isWall) {
                this.startNode.isStart = false;
                this.updateNodeElement(this.startNode);
                
                this.startNode = node;
                node.isStart = true;
                this.updateNodeElement(node);
            } else if (this.isDragging && this.dragType === 'target' && !node.isStart && !node.isWall) {
                this.targetNode.isTarget = false;
                this.updateNodeElement(this.targetNode);
                
                this.targetNode = node;
                node.isTarget = true;
                this.updateNodeElement(node);
            }
        });
    }

    setupEventListeners() {
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.dragType = null;
        });

        document.getElementById('visualize-btn').addEventListener('click', () => {
            if (this.isRunning) return;
            this.visualizeAlgorithm();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetGrid();
        });

        document.getElementById('generate-btn').addEventListener('click', () => {
            if (this.isRunning) return;
            this.generateMaze();
        });

        document.getElementById('detailed-btn').addEventListener('click', () => {
            this.showDetailedResult();
        });
    }

    updateNodeElement(node) {
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
    
        nodeElement.className = 'node';
        nodeElement.textContent = '';
        
        if (node.isStart) {
            nodeElement.classList.add('start');
            nodeElement.textContent = '😊';
        } else if (node.isTarget) {
            nodeElement.classList.add('target');
            nodeElement.textContent = '🏠';
        } else if (node.isWall) {
            nodeElement.classList.add('wall');
        } else if (node.isVisited) {
            nodeElement.classList.add('visited');
        }
    }

    async visualizeAlgorithm() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.resetGrid(false); 
        
        const visualizeBtn = document.getElementById('visualize-btn');
        visualizeBtn.textContent = 'Running...';
        visualizeBtn.disabled = true;

        const algoFn = window.Algorithms?.[this.algorithmName];
        if (typeof algoFn !== 'function') {
            console.error(`Thuật toán "${this.algorithmName}" không tồn tại.`);
            this.isRunning = false;
            return;
        }

        const visitedNodesInOrder = algoFn(this.startNode, this.targetNode, this.grid);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(this.targetNode);

        await this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
        
        this.isRunning = false;
        visualizeBtn.textContent = '▶ Start Visualize';
        visualizeBtn.disabled = false;
    }

    async animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            if (!this.isRunning) return;
            
            const node = visitedNodesInOrder[i];
            if (!node.isStart && !node.isTarget) {
                const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
                nodeElement.classList.add('visited');
            }
            
            await this.sleep(50);
        }

        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            if (!this.isRunning) return;
            
            const node = nodesInShortestPathOrder[i];
            if (!node.isStart && !node.isTarget) {
                const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
                nodeElement.classList.add('path');
            }
            
            await this.sleep(100);
        }
    }

    resetGrid(resetWalls = true) {
        if (this.isRunning) return;
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const node = this.grid[row][col];
                const nodeElement = document.getElementById(`node-${row}-${col}`);
                
                node.reset();
                
                nodeElement.className = 'node';
                nodeElement.textContent = '';
                
                if (resetWalls && node.isWall) {
                    node.isWall = false;
                }
                
                if (node.isStart) {
                    nodeElement.classList.add('start');
                    nodeElement.textContent = '😊';
                } else if (node.isTarget) {
                    nodeElement.classList.add('target');
                    nodeElement.textContent = '🏠';
                } else if (node.isWall) {
                    nodeElement.classList.add('wall');
                }
            }
        }
    }

    generateMaze() {
        if (this.isRunning) return;
        
        this.resetGrid();
        generateMaze(this.grid, this.startNode, this.targetNode);
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.updateNodeElement(this.grid[row][col]);
            }
        }
    }

    showDetailedResult() {
        if (this.isRunning) return;
        
        resetGrid(this.grid);
        const visitedNodesInOrder = uniformCostSearch(this.startNode, this.targetNode, this.grid);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(this.targetNode);
        
        const html = `
        <table style="width:100%;height:30vh;font-size:18px;">
            <tr><td>Path found</td><td>${nodesInShortestPathOrder.length > 0 ? 'Yes' : 'No'}</td></tr>
            <tr><td>Number of nodes explored</td><td>${visitedNodesInOrder.length}</td></tr>
            <tr><td>Total cost</td><td>${nodesInShortestPathOrder.length > 0 ? nodesInShortestPathOrder.length - 1 : '-'}</td></tr>
            <tr><td>Processing time</td><td>100s</td></tr>
        </table>
        `;

        document.getElementById('detail-table-body').innerHTML = html;
        document.getElementById('detail-table').style.display = 'block';
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

document.getElementById('close-detail-table').addEventListener('click', function () {
    document.getElementById('detail-table').style.display = 'none';
});

window.addEventListener('click', function (e) {
    if (e.target === document.getElementById('detail-table')) {
        document.getElementById('detail-table').style.display = 'none';
    }
});