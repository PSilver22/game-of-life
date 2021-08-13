class Grid {
	constructor (width, height, cellSize) {
		this.width = width;
		this.height = height;
		this.cellSize = cellSize;

		// create matrix of size height X width
		this.matrix = new Array(height);
		for (let row = 0; row < height; ++row) {
			this.matrix[row] = new Array(width);
			for (let column = 0; column < height; ++column) {
				this.matrix[row][column] = new Cell();	
			}
		}
		
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

	drawGrid(canvasContext, top, left) {
		for (let i = 0; i < this.height; ++i) {
			for (let j = 0; j < this.width; ++j) {
				if (this.matrix[i][j].isLiving) {
					canvasContext.fillStyle = 'white';
				}
				else {
					canvasContext.fillStyle = 'gray';
				}

				canvasContext.fillRect(top + (i * this.cellSize), left + (j * this.cellSize), this.cellSize, this.cellSize);
			}
		}
	}
}