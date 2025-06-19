const pathFoundCanva = document.getElementById("path-found-chart");
const nodesCanva = document.getElementById("nodes-chart");
const totalCostCanva = document.getElementById("cost-chart");
const processingTimeCanva = document.getElementById("time-chart");
// console.log(pathFoundCanva);
const colorBar = [
    'rgba(52, 152, 219, 0.8)', 'rgba(255, 159, 67, 0.8)', 'rgba(241, 196, 15, 0.8)', 'rgba(46, 204, 113, 0.8)'/*,
    'rgba(255, 99, 132, 0.8)', 'rgba(155, 89, 182, 0.8)', 'rgba(26, 188, 156, 0.8)', 'rgba(231, 76, 60, 0.8)',*/
]

let pathFoundData = []
let nodesData = []
let totalCostData = []
let processingTimeData = []


const algorithms = [
    'Uniform Cost Search',
    'IDA*',
    'Breadth-First Search',
    'Depth-First Search',
    'A* Search',
    'Iterative Deepening DFS',
    'Beam Search',
    'Bi-directional Search'
];

document.addEventListener("DOMContentLoaded", () => {
    console.log(sessionStorage.getItem('compareResults-Searching'));
    const results = JSON.parse(sessionStorage.getItem('compareResults-Searching'));
    
    if (!results) {
        console.error('No results found in sessionStorage');
        return;
    }

    console.log('Results loaded:', results);
    console.log(typeof results.map(r => r.nodesExplored)[0])

    const chartConfigs = [
        {
            id: 'path-found-chart',
            label: 'Path Found',
            data: results.map(r => r.pathFound === "Yes" ? 1 : 0),
            options: {
                scales: {
                    y: {
                        max: 1,
                        ticks: {
                            stepSize: 1,
                            color: '#000',
                            callback: value => value === 1 ? 'Yes' : 'No'
                        }, 
                        grid: { color: '#000' },
                    },
                    x: {
                        ticks: { color: '#000' },
                        grid: { color: '#000' }
                    }
                }
            },
            colors: colorBar,
        },
        {
            id: 'nodes-chart',
            label: 'Nodes Explored',
            data: results.map(r => r.nodesExplored),
            colors: colorBar,
        },
        {
            id: 'cost-chart',
            label: 'Total Cost',
            data: results.map(r => r.totalCost === '-' ? 0 : r.totalCost),
            colors: colorBar,
        },
        {
            id: 'time-chart',
            label: 'Processing Time (ms)',
            data: results.map(r => parseFloat(r.processingTime)),
            colors: colorBar,
        }
    ];

    chartConfigs.forEach(config => createChart(config));
});

function createChart({ id, label, data, options = {}, colors }) {
    const canvas = document.getElementById(id);
    if (!canvas) {
        console.error(`Canvas with id ${id} not found`);
        return;
    }

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: label,
                color: '#000',
                font: { size: 24 }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#000' },
                ticks: { color: '#000' }
            },
            x: {
                grid: { color: '#000' },
                ticks: { color: '#000' }
            }
        }
    };

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: algorithms,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: colors,
            }]
        },
        options: { ...defaultOptions, ...options }
    });
}

