function Tank(pixelScale, SCENE_W, SCENE_H) {
	// lock keys
	this.pressW = false;
	this.pressS = false;
	this.pressA = false;
	this.pressD = false;
	this.pressF = false;
	
	this.SCENE_W = SCENE_W;
	this.SCENE_H = SCENE_H;
	this.velocityObj = 8;
	this.pixelScale = pixelScale;
	this.direction = 0;
	this.life = 1;
	this.reloadeTime = 0;	// shooting pause
	this.oldPositionX = this.position.x;
	this.oldPositionY = this.position.y;
	
	this.scale = pixelScale;
	this.addAnimation("standing", "assets/sprites/panzer_0.png");
	this.addAnimation("moving", "assets/sprites/panzer_0.png", "assets/sprites/panzer_1.png");
	this.addAnimation("shooting", "assets/sprites/panzer_2.png");
	
	this.update = function update() {
		this.tankMovement();
		this.tankShoot();
		this.tankPath();
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
		// press f = shoot
		if (keyWentUp("f") && this.pressF == true) {
			this.pressF = false;
			// shoot animation
			if (this.pressW == true || this.pressS == true || this.pressA == true || this.pressD == true || this.pressF == true) {
				this.changeAnimation("moving");
			} else {
				this.changeAnimation("standing");
			}
		}
		if (keyDown("f") && this.pressF == false && Math.round(new Date().getTime()/1000) >= this.reloadeTime) {
			this.pressF = true;
			this.reloadeTime = Math.round(new Date().getTime()/1000) + 3; // next shoot after 3 seconds
			// shoot animation
			this.changeAnimation("shooting");
			// create a bullet
			Bullet.prototype = createSprite(this.position.x, this.position.y, 8, 8);
			bullets.push(new Bullet(this.direction, this.pixelScale, this.SCENE_W, this.SCENE_H));
		}
	}
	
	this.tankPath = function tankPath() {
		var diffX = this.oldPositionX - this.position.x;
		var diffY = this.oldPositionY - this.position.y;
		
		if (diffX >= 24 || diffX <= -24 || diffY >= 24 || diffY <= -24) { //24
			this.oldPositionX = this.position.x;
			this.oldPositionY = this.position.y;
			Path.prototype = createSprite(this.position.x, this.position.y, 32, 32);
			paths.push(new Path(this.direction, this.pixelScale, this.SCENE_W, this.SCENE_H));
		} else if (paths.length <= 32) {
			
		} else {
			var out = paths.splice(0, 1);
			out = null;
		}
	}
	
	this.getLife = function getLife() {
		return this.life;
	}
	
	this.setLife = function setLife(life) {
		this.life = life;
	}
	
	this.getShoot = function getShoot() {
		return this.pressF;
	}
}
