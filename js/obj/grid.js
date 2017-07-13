function createGrid(pixelScale, SCENE_W, SCENE_H) {
	var pixel = 32 * pixelScale;
	var x1 = 0;
	var y1 = 0 - pixel;
	var x2 = SCENE_W;
	var y2 = 0 - pixel;
	var numberH = SCENE_W / pixel - 4; // y
	var numberV = SCENE_H / pixel + 4; // x
	var grid = createArray(numberH + 1, numberV + 1);
	
	for (var i = 0; i <= numberH; i++) {
		for (var j = 0; j <= numberV; j++) {
			grid[i][j] = j * pixel;
		}
	}
	
	return grid;
}

function drawGrid(grid) {
	strokeWeight(2);
	var YMax = grid.length -1;	// 28
	var XMax = grid[0].length - 1; // 32
	
	// H | Y
	for (var i = 0; i < grid.length; i++) {
		line(grid[0][0], grid[0][i], grid[0][XMax], grid[YMax][i]);
	}
	
	// W | X	
	for (var i = 0; i <= grid[0].length; i++) {
		line(grid[0][i], grid[0][0], grid[YMax][i], grid[YMax][YMax]);
	}
}

function createArray(length) {
    var arr = new Array(length || 0), i = length;
	
	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) {
			arr[length-1 - i] = createArray.apply(this, args);
		}
	}
	
	return arr;
}
