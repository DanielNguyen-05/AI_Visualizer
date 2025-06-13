// Main application entry point
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the grid visualizer
    const gridVisualizer = new GridVisualizer();
    
    // Add some additional UI enhancements
    setupUIEnhancements();
    
    // Add keyboard shortcuts
    setupKeyboardShortcuts(gridVisualizer);
    
    // Add responsive behavior
    setupResponsiveBehavior();
});

function setupUIEnhancements() {
    // Add hover effects to navigation elements
    const navElements = document.querySelectorAll('.menu-icon, .home-icon, .help-icon, .nav-arrow');
    navElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
    
    // Add click handlers for navigation
    document.querySelector('.home-icon').addEventListener('click', () => {
        window.location.reload();
    });
    
    document.querySelector('.help-icon').addEventListener('click', () => {
        showHelpDialog();
    });
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

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
    // Handle window resize
    window.addEventListener('resize', () => {
        // Adjust grid size on mobile
        const grid = document.querySelector('.grid');
        if (grid && window.innerWidth < 768) {
            grid.style.transform = 'scale(0.8)';
        } else if (grid) {
            grid.style.transform = 'scale(1)';
        }
    });
    
    // Initial check
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

// Utility functions for algorithm performance monitoring
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