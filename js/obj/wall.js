function Wall(pixelScale, SCENE_W, SCENE_H) {
	this.SCENE_W = SCENE_W;
	this.SCENE_H = SCENE_H;
	this.pixelScale = pixelScale;
	this.life = 1;
	
	this.scale = pixelScale;
	this.addAnimation("normal", "assets/sprites/wall.png");
	
	this.update = function update() {
		
	}
	
	this.getLife = function getLife() {
		return this.life;
	}
	
	this.setLife = function setLife(life) {
		this.life = life;
	}
}
