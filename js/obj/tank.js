function Tank(pixelScale, SCENE_W, SCENE_H) {
	// lock keys
	this.pressW = false;
	this.pressS = false;
	this.pressA = false;
	this.pressD = false;
	this.pressSpace = false;
	
	this.SCENE_W = SCENE_W;
	this.SCENE_H = SCENE_H;
	this.velocityObj = 8;
	this.pixelScale = pixelScale;
	this.bullets = [];
	this.direction = 0;
	this.life = 1;
	this.timeSave = 0;
	
	this.scale = pixelScale;
	this.addAnimation("standing", "assets/sprites/panzer_0.png");
	this.addAnimation("moving", "assets/sprites/panzer_0.png", "assets/sprites/panzer_1.png");
	
	this.update = function update() {
		this.tankMovement();
		this.tankShoot();
	}
	
	this.tankMovement = function tankMovement() {
		// up
		if (keyWentUp("w") && this.pressW == true && this.pressS == false && this.pressA == false && this.pressD == false) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = false;
			this.pressD = false;
			
			this.velocity.y = 0;
			this.rotation = 0;
			this.changeAnimation("standing");
		}
		if (keyDown("w") && this.pressW == false && this.pressS == false && this.pressA == false && this.pressD == false) {
			this.pressW = true;
			this.pressS = false;
			this.pressA = false;
			this.pressD = false;
			
			this.direction = 0;
			this.velocity.y = -this.velocityObj;
			this.rotation = 0;
			this.changeAnimation("moving");
		}
		
		// down
		if (keyWentUp("s") && this.pressW == false && this.pressS == true && this.pressA == false && this.pressD == false) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = false;
			this.pressD = false;
			
			this.velocity.y = 0;
			this.rotation = 180;
			this.changeAnimation("standing");
		}
		if (keyDown("s") && this.pressW == false && this.pressS == false && this.pressA == false && this.pressD == false) {
			this.pressW = false;
			this.pressS = true;
			this.pressA = false;
			this.pressD = false;
			
			this.direction = 1;
			this.velocity.y = this.velocityObj;
			this.rotation = 180;
			this.changeAnimation("moving");
		}
		
		// left
		if (keyWentUp("a") && this.pressW == false && this.pressS == false && this.pressA == true && this.pressD == false) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = false;
			this.pressD = false;
			
			this.velocity.x = 0;
			this.rotation = 270;
			this.changeAnimation("standing");
		}
		if (keyDown("a") && this.pressW == false && this.pressS == false && this.pressA == false && this.pressD == false) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = true;
			this.pressD = false;
			
			this.direction = 2;
			this.velocity.x = -this.velocityObj;
			this.rotation = 270;
			this.changeAnimation("moving");
		}
		
		// right
		if (keyWentUp("d") && this.pressW == false && this.pressS == false && this.pressA == false && this.pressD == true) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = false;
			this.pressD = false;
			
			this.velocity.x = 0;
			this.rotation = 90;
			this.changeAnimation("standing");
		}
		if (keyDown("d") && this.pressW == false && this.pressS == false && this.pressA == false && this.pressD == false) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = false;
			this.pressD = true;
			
			this.direction = 3;
			this.velocity.x = this.velocityObj;
			this.rotation = 90;
			this.changeAnimation("moving");
		}
		
		// limit the tank movements
		if (this.position.x < 0) {
			this.position.x = 0;
		}
		if (this.position.y < 0) {
			this.position.y = 0;
		}
		if (this.position.x > this.SCENE_W) {
			this.position.x = this.SCENE_W;
		}
		if (this.position.y > this.SCENE_H) {
			this.position.y = this.SCENE_H;
		}
	}
	
	this.tankShoot = function tankShoot() {
		// press space
		if (keyWentUp("space") && this.pressSpace == true) {
			this.pressSpace = false;
		}
		if (keyDown("space") && this.pressSpace == false && Math.round(new Date().getTime()/1000) >= this.timeSave) {
			this.pressSpace = true;
			this.timeSave = Math.round(new Date().getTime()/1000) + 3; // next shoot after 3 seconds
			// create a bullet
			Bullet.prototype = createSprite(this.position.x, this.position.y, 8, 8);
			this.bullets.push(new Bullet(this.direction, this.pixelScale, this.SCENE_W, this.SCENE_H));
		}
		// delete dead bullets
		if (this.bullets.length > 0) {
			for (var i = 0; i < this.bullets.length; i++) {
				var life = this.bullets[i].getLife();
				if (life == 0) {
					this.bullets.splice(i, 1);
				}
			}
		}
	}
	
	this.getBullets = function getBullets() {
		if (this.bullets.length > 0) {
			return this.bullets;
		} else {
			return false;
		}
	}
	
	this.getLife = function getLife() {
		return this.life;
	}
	
	this.setLife = function setLife(life) {
		this.life = life;
	}
}
