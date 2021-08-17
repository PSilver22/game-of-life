class Cell {
	static cellSize = 0;

	constructor() {
		this.neighbors = [];
		this.isLiving = false;
		this.top = 0;
		this.left = 0;
	}

	/**
	 * Reverses the process to find 
	 * @param {*} x X window position on screen
	 * @param {*} y Y window position on screen
	 * @param {*} topOfGrid The pixel row of top of the grid
	 * @param {*} leftOfGrid The pixel column of the left of the grid
	 * @returns Array of size two with the row, column (in that order) of the pixel at window position x, y
	*/
	static getIndexFromPos(x, y, topOfGrid, leftOfGrid) {
		return [Math.ceil((y - Cell.cellSize - topOfGrid) / (Cell.cellSize + 1)), Math.ceil((x - Cell.cellSize - leftOfGrid) / (Cell.cellSize + 1))];
	}

	/**
	 * Updates the cell for the next generation based on the rules of the game.
	 */
	getNextGen()
	{
		let livingNeighbors = 0;
		for (let neighbor of this.neighbors) {
			if (neighbor.isLiving) {
				++livingNeighbors;
			}
		}
		
		switch (livingNeighbors) {
			case 3:
				return true;
			case 2:
				return this.isLiving;
			default:
				return false;
		}
	}

	/**
	 * Draws the cell
	 * @param {*} canvasContext The context of the HTML canvas.
	 */
	drawCell(canvasContext) {
		if (this.isLiving) {
			canvasContext.fillStyle = 'white';
		}
		else {
			canvasContext.fillStyle = 'gray';
		}

		canvasContext.fillRect(this.left, this.top, Cell.cellSize, Cell.cellSize);
	}

	/**
	 * Inverts if the cell is living and remove/add it to livingCells array.
	 */
	toggleLiving() {
		this.isLiving = !this.isLiving
	}
}