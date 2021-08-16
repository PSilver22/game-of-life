class Grid {
	static isRunning = false;
	
	constructor (width, height, cellSize) {
		this.width = width;
		this.height = height;
		this.top = 0;
		this.left = 0;
	
		// create matrix of size height X width of cells
		this.matrix = new Array(height);
		for (let row = 0; row < height; ++row) {
			this.matrix[row] = new Array(width);
			for (let column = 0; column < width; ++column) {
				this.matrix[row][column] = new Cell();	
			}
		}
		Cell.cellSize = cellSize;
		
		// long ugly way to get all the neighbors of a cell
		for (let row = 0; row < height; ++row) {
			for (let column = 0; column < width; ++column) {
				// get surrounding columns and rows, if the cell is on the border have it link to other border.
				let rightColumn = ((column + 1) < width) ? (column + 1) : 0;
				let leftColumn = ((column - 1) >= 0) ? (column - 1) : (width - 1);
				let lowerRow = ((row + 1) < height) ? (row + 1) : 0;
				let upperRow = ((row - 1) >= 0) ? (row - 1) : (height - 1);

				// Collect all 8 neighboring cells
				this.matrix[row][column].neighbors.push(this.matrix[upperRow][leftColumn]);
				this.matrix[row][column].neighbors.push(this.matrix[upperRow][column]);
				this.matrix[row][column].neighbors.push(this.matrix[upperRow][rightColumn]);
				this.matrix[row][column].neighbors.push(this.matrix[row][leftColumn]);
				this.matrix[row][column].neighbors.push(this.matrix[row][rightColumn]);
				this.matrix[row][column].neighbors.push(this.matrix[lowerRow][leftColumn]);
				this.matrix[row][column].neighbors.push(this.matrix[lowerRow][column]);
				this.matrix[row][column].neighbors.push(this.matrix[lowerRow][rightColumn]);
			}
		}
	}

	/**
	 * Initializes cells and draws grid
	 * @param {*} canvasContext The context to the HTML canvas 
	 * @param {*} top The pixel row of the top of the grid
	 * @param {*} left The pixel row of the left of the grid
	 */
	initGrid(canvasContext, top, left) {
		this.top = top;
		this.left = left;

		for (let i = 0; i < this.height; ++i) {
			for (let j = 0; j < this.width; ++j) {
				this.matrix[i][j].top = top + (i * Cell.cellSize) + i;
				this.matrix[i][j].left = left + (j * Cell.cellSize) + j;

				this.matrix[i][j].drawCell(canvasContext);
			}
		}
	}

	/**
	* Method that flips the state of the clicked on cell.
	* @param {*} event The event object passed from the HTML listener.
	*/
	onClick(event, canvasContext) {
		let cellIndicies = Cell.getIndexFromPos(event.pageX, event.pageY, this.top, this.left);
		let cell = this.matrix[cellIndicies[0]][cellIndicies[1]];

		cell.toggleLiving();
		cell.drawCell(canvasContext);
	}

	/**
	 * Function to change the state of the simulation on keypress.
	 * @param {*} event Keypress event object
	 */
	onKeypress(event) {
		if (!event.repeat) {
			switch (event.key) {
				// Starts the simulation.
				case "1":
					if (!Grid.isRunning) {
						let multiplier = Number(prompt("How fast should the simulation run? (0 - 4] "));
						if (multiplier > 0 && multiplier <= 4) {
							let frameTimeout = Math.round(100 / multiplier);
							Grid.isRunning = true;
							this.performSimulation(frameTimeout, canvasContext);
						}
						else {
							alert("Illegal multiplier, try again.");
						}
					}
					break;
	
				// Stops the simulation
				case "2":
					Grid.isRunning = false;
					break;
			}
		}
	}

	/**
	 * Updates every cell for the next generation.
	 * To make sure all cells update correctly this function first checks which cells need to be toggled, then toggles them after.
	 * @param {*} frameTimeout How much time should there be in between each frame
	 * @param {*} canvasContext The context of the HTML canvas
	 */
	 async performSimulation(frameTimeout, canvasContext)
	 {
		 while (Grid.isRunning) {
			 // Find the index of cells that need to be toggled
			 let cellsToToggle = []; 
			 for (let i = 0; i < this.height; ++i) {
				 for(let j = 0; j < this.width; ++j) {
					 let toggleLiving = this.matrix[i][j].getNextGen() != this.matrix[i][j].isLiving;
					 if (toggleLiving) {
						 cellsToToggle.push([i, j]);
					 }
				 }
			 }
 
			 // Toggle cells
			 for (let cellIndex of cellsToToggle) {
				 this.matrix[cellIndex[0]][cellIndex[1]].toggleLiving();
				 this.matrix[cellIndex[0]][cellIndex[1]].drawCell(canvasContext);
			 }
 
			 await new Promise(r => setTimeout(r, frameTimeout));
		 }
	 }
}