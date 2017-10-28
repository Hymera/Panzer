function Path(direction, pixelScale, SCENE_W, SCENE_H) {
	this.SCENE_W = SCENE_W;
	this.SCENE_H = SCENE_H;
	this.pixelScale = pixelScale;
	this.direction = direction;
	
	this.scale = pixelScale;
	this.addAnimation("path", "assets/sprites/panzer_path.png");
	
	// path direction according to the facing direction
	// up
	if (this.direction == 0) {
		this.rotation = 0;
	}
	
	// down
	if (this.direction == 1) {
		this.rotation = 180;
	}
	
	// left
	if (this.direction == 2) {
		this.rotation = 270;
	}
	
	// right
	if (this.direction == 3) {
		this.rotation = 90;
	}
}
