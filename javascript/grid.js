class Grid {
	constructor (width, height, cellSize) {
		this.width = width;
		this.height = height;

		// create matrix of size height X width
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
				if ((column - 1) >= 0 && (row - 1) >= 0) {
					this.matrix[row][column].neighbors.push(this.matrix[row - 1][column - 1]);
				}

				if ((row - 1) >= 0) {
					this.matrix[row][column].neighbors.push(this.matrix[row - 1][column]);
				}

				if ((row - 1) >= 0 && (column + 1) != width) {
					this.matrix[row][column].neighbors.push(this.matrix[row - 1][column + 1]);
				}

				if ((column - 1) >= 0) {
					this.matrix[row][column].neighbors.push(this.matrix[row][column - 1]);
				}

				if ((column + 1) != width) {
					this.matrix[row][column].neighbors.push(this.matrix[row][column + 1]);
				}

				if ((row + 1) != height && (column - 1) >= 0) {
					this.matrix[row][column].neighbors.push(this.matrix[row + 1][column - 1]);
				}

				if ((row + 1) != height) {
					this.matrix[row][column].neighbors.push(this.matrix[row + 1][column]);
				}

				if ((row + 1) != height && (column + 1) != width) {
					this.matrix[row][column].neighbors.push(this.matrix[row + 1][column + 1]);
				}
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
		for (let i = 0; i < this.height; ++i) {
			for (let j = 0; j < this.width; ++j) {
				this.matrix[i][j].top = top + (i * Cell.cellSize) + i;
				this.matrix[i][j].left = left + (j * Cell.cellSize) + j;

				this.matrix[i][j].drawCell(canvasContext);
			}
		}
	}

	/**
	* Method that does a binary search to find and change the status of the cell.
	* @param {*} event The event object passed from the HTML listener.
	*/
	onClick(event, canvasContext) {
		let l = 0;
		let r = this.height - 1;
		let cellRow;

		while (l <= r) {
			let m = Math.round((l + r)/2);

			if (this.matrix[m][0].top <= event.pageY && (this.matrix[m][0].top + Cell.cellSize) >= event.pageY) {
				cellRow = this.matrix[m];
				break;
			}
			else if (this.matrix[m][0].top >= event.pageY) {
				r = m - 1;
			}
			else {
				l = m + 1;
			}
		}

		l = 0;
		r = this.width - 1;
		while (l <= r) {
			let m = Math.round((l + r)/2);

			if (cellRow[m].left <= event.pageX && (cellRow[m].left + Cell.cellSize) >= event.pageX) {
				cellRow[m].toggleLiving();
				cellRow[m].drawCell(canvasContext);
				return;
			}
			else if (cellRow[m].left >= event.pageX) {
				r = m - 1;
			}
			else {
				l = m + 1;
			}
		}
	}
}