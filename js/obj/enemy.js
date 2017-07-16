function Enemy(pixelScale, SCENE_W, SCENE_H) {
	this.SCENE_W = SCENE_W;
	this.SCENE_H = SCENE_H;
	this.velocityObj = 8;
	this.pixelScale = pixelScale;
	this.life = 1;
	
	this.getLife = function getLife() {
		return this.life;
	}
	
	this.setLife = function setLife(life) {
		this.life = life;
	}
}
