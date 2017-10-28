function Boundary(pixelScale, SCENE_W, SCENE_H) {
	this.SCENE_W = SCENE_W;
	this.SCENE_H = SCENE_H;
	this.pixelScale = pixelScale;
	
	this.scale = pixelScale;
	this.addAnimation("normal", "assets/sprites/boundary.png");
	this.immovable = true;
}
