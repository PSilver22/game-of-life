class Cell {
	constructor() {
		this.neighbors = Array(0);
		this.isLiving = false;
	}

	/**
	 * Updates the cell for the next generation based on the rules of the game.
	 */
	updateNextGen()
	{
		let livingNeighbors = 0;
		for (let neighbor of neighbors) {
			if (neighbor.isLiving) {
				++livingNeighbors;
			}
		}
		
		switch (livingNeighbors) {
			case 3:
				this.isLiving = true;
				break;
			case 2:
				break;
			default:
				this.isLiving = false;
		}
	}
}