class Cell {
	static cellSize = 0;

	constructor() {
		this.neighbors = Array(0);
		this.isLiving = false;
		this.top = 0;
		this.left = 0;
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
	 * Inverts if the cell is living.
	 */
	toggleLiving() {
		this.isLiving = !this.isLiving
	}
}