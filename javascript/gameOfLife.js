// setup HTML canvas
let canvas = document.getElementById('grid');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasContext = canvas.getContext('2d')

// get the size of the cells
let cellSize = parseInt(prompt("How big should the cells be? "));

// setup the grid
let grid = new Grid(Math.round(canvas.width/cellSize), Math.round(canvas.height/cellSize), cellSize);
grid.initGrid(canvasContext, 0, 0);


addEventListener('click', event => {grid.onClick(event, canvasContext)}, false);
addEventListener('keypress', event => {
	if (!event.repeat) {
		switch (event.key) {
			case "p":
				let gameSpeed = 1000 * parseInt(prompt("How fast should the simulation run? (0 - 2) "));
				Grid.isRunning = true;
				grid.performSimulation(gameSpeed, canvasContext);
				break;
		}
	}
})