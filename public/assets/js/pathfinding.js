// Main application entry point
document.addEventListener('DOMContentLoaded', function() {
    const gridVisualizer = new GridVisualizer();

    setupUIEnhancements();
    setupKeyboardShortcuts(gridVisualizer);
    setupResponsiveBehavior();
});

function setupKeyboardShortcuts(gridVisualizer) {
    document.addEventListener('keydown', (e) => {
        if (gridVisualizer.isRunning) return;
        
        switch(e.key.toLowerCase()) {
            case ' ':
            case 'enter':
                e.preventDefault();
                gridVisualizer.visualizeAlgorithm();
                break;
            case 'r':
                e.preventDefault();
                gridVisualizer.resetGrid();
                break;
            case 'g':
                e.preventDefault();
                gridVisualizer.generateMaze();
                break;
            case 'd':
                e.preventDefault();
                gridVisualizer.showDetailedResult();
                break;
            case 'escape':
                if (gridVisualizer.isRunning) {
                    gridVisualizer.isRunning = false;
                }
                break;
        }
    });
}

function setupResponsiveBehavior() {
    window.addEventListener('resize', () => {
        const grid = document.querySelector('.grid');
        if (grid && window.innerWidth < 768) {
            grid.style.transform = 'scale(0.8)';
        } else if (grid) {
            grid.style.transform = 'scale(1)';
        }
    });
    
    if (window.innerWidth < 768) {
        const grid = document.querySelector('.grid');
        if (grid) {
            grid.style.transform = 'scale(0.8)';
        }
    }
}

function showHelpDialog() {
    const helpContent = `
🎯 Bi-Iterative Deepening A* (IDA*) Pathfinding Visualizer

📖 How to use:
• Click and drag 😊 (Start) and 🏠 (Target) to move them
• Click on empty cells to create/remove walls
• Press "Generate Map" to create a random maze
• Press "Start Visualize" to run the algorithm
• Press "Reset" to clear the visualization
• Press "Detailed Result" to see algorithm statistics

⌨️ Keyboard Shortcuts:
• Space/Enter: Start visualization
• R: Reset grid
• G: Generate maze
• D: Show detailed results
• Escape: Stop running algorithm

🔍 Algorithm Info:
IDA* combines iterative deepening with A* heuristics for memory-efficient pathfinding. This implementation uses Uniform Cost Search (UCS) which guarantees the shortest path by exploring nodes in order of their cost from the start.

🎨 Legend:
• Green (😊): Start node
• Orange (🏠): Target node  
• Black: Walls/obstacles
• Light Blue: Visited nodes
• Yellow: Shortest path
    `;
    
    alert(helpContent);
}

function measureAlgorithmPerformance(algorithmFunction, ...args) {
    const startTime = performance.now();
    const result = algorithmFunction(...args);
    const endTime = performance.now();
    
    return {
        result: result,
        executionTime: endTime - startTime,
        nodesExplored: result.length
    };
}

// Export for potential use in other modules
window.GridVisualizerApp = {
    measureAlgorithmPerformance,
    showHelpDialog
};