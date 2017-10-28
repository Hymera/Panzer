function Wall(pixelScale, SCENE_W, SCENE_H) {
	this.SCENE_W = SCENE_W;
	this.SCENE_H = SCENE_H;
	this.pixelScale = pixelScale;
	this.life = 2;
	
	this.scale = pixelScale;
	this.addAnimation("normal", "assets/sprites/wall_0.png");
	this.addAnimation("broken", "assets/sprites/wall_1.png");
	this.immovable = true;
	
	this.update = function update() {
		if (this.life >= 2) {
			this.changeAnimation("normal");
		}
		
		if (this.life <= 1) {
			this.changeAnimation("broken");
		}
	}
	
	this.getLife = function getLife() {
		return this.life;
	}
	
	this.setLife = function setLife(life) {
		this.life = life;
	}
}
