function Tank() {
	// lock keys
	this.pressW = false;
	this.pressS = false;
	this.pressA = false;
	this.pressD = false;
	this.pressSpace = false;
	
	this.tankMovement = function tankMovement(velocity, SCENE_W, SCENE_H) {
		// up
		if(keyWentUp("w") && this.pressW == true && this.pressS == false && this.pressA == false && this.pressD == false) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = false;
			this.pressD = false;
			
			this.velocity.y = 0;
			this.rotation = 0;
			this.changeAnimation("standing");
		}
		if(keyDown("w") && this.pressW == false && this.pressS == false && this.pressA == false && this.pressD == false) {
			this.pressW = true;
			this.pressS = false;
			this.pressA = false;
			this.pressD = false;
			
			this.velocity.y = -velocity;
			this.rotation = 0;
			this.changeAnimation("moving");
		}
		
		// down
		if(keyWentUp("s") && this.pressW == false && this.pressS == true && this.pressA == false && this.pressD == false) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = false;
			this.pressD = false;
			
			this.velocity.y = 0;
			this.rotation = 180;
			this.changeAnimation("standing");
		}
		if(keyDown("s") && this.pressW == false && this.pressS == false && this.pressA == false && this.pressD == false) {
			this.pressW = false;
			this.pressS = true;
			this.pressA = false;
			this.pressD = false;
			
			this.velocity.y = velocity;
			this.rotation = 180;
			this.changeAnimation("moving");
		}
		
		// left
		if(keyWentUp("a") && this.pressW == false && this.pressS == false && this.pressA == true && this.pressD == false) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = false;
			this.pressD = false;
			
			this.velocity.x = 0;
			this.rotation = 270;
			this.changeAnimation("standing");
		}
		if(keyDown("a") && this.pressW == false && this.pressS == false && this.pressA == false && this.pressD == false) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = true;
			this.pressD = false;
			
			this.velocity.x = -velocity;
			this.rotation = 270;
			this.changeAnimation("moving");
		}
		
		// right
		if(keyWentUp("d") && this.pressW == false && this.pressS == false && this.pressA == false && this.pressD == true) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = false;
			this.pressD = false;
			
			this.velocity.x = 0;
			this.rotation = 90;
			this.changeAnimation("standing");
		}
		if(keyDown("d") && this.pressW == false && this.pressS == false && this.pressA == false && this.pressD == false) {
			this.pressW = false;
			this.pressS = false;
			this.pressA = false;
			this.pressD = true;
			
			this.velocity.x = velocity;
			this.rotation = 90;
			this.changeAnimation("moving");
		}
		
		// limit the tank movements
		if(this.position.x < 0) {
			this.position.x = 0;
		}
		if(this.position.y < 0) {
			this.position.y = 0;
		}
		if(this.position.x > SCENE_W) {
			this.position.x = SCENE_W;
		}
		if(this.position.y > SCENE_H) {
			this.position.y = SCENE_H;
		}
	}
	
	this.tankShoot = function tankShoot(velocity, pixelScale) {
		// press space
		if(keyWentUp("space") && this.pressSpace == true) {
			this.pressSpace = false;
		}
		if(keyDown("space") && this.pressSpace == false) {
			this.pressSpace = true;
			console.log('tock');
			// create a sprite and add animation
			bullet = createSprite(tank.position.x, tank.position.y, 32, 32);
			bullet.scale = pixelScale;
			bullet.velocity.y = velocity * 2;
			bullet.addAnimation("normal", "assets/sprites/bullet.png");
		}
		
		return bullet;
	}
}
