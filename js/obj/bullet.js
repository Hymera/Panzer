function Bullet(direction, pixelScale, SCENE_W, SCENE_H) {
	this.direction = direction;
	this.SCENE_W = SCENE_W;
	this.SCENE_H = SCENE_H;
	this.velocityObj = 16;
	this.pixelScale = pixelScale;
	
	this.scale = pixelScale;
	this.addAnimation("normal", "assets/sprites/bullet.png");
	
	// velocity direction according to the facing direction
	// up
	if (this.direction == 0) {
		this.velocity.y = -this.velocityObj;
		this.rotation = 0;
	}
	
	// down
	if (this.direction == 1) {
		this.velocity.y = this.velocityObj;
		this.rotation = 180;
	}
	
	// left
	if (this.direction == 2) {
		this.velocity.x = -this.velocityObj;
		this.rotation = 270;
	}
	
	// right
	if (this.direction == 3) {
		this.velocity.x = this.velocityObj;
		this.rotation = 90;
	}
}
