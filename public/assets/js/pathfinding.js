// Main application entry point
document.addEventListener('DOMContentLoaded', function() {
    const gridVisualizer = new GridVisualizer();
    setupResponsiveBehavior();
});

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
};