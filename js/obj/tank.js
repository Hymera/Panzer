// lock keys
var pressW = false;
var pressS = false;
var pressA = false;
var pressD = false;

var velocityBullet = 16;
var bullet;

function tankMovement(velocity, tank, SCENE_W, SCENE_H) {
	// up
	if(keyWentUp("w") && pressW == true && pressS == false && pressA == false && pressD == false) {
		pressW = false;
		pressS = false;
		pressA = false;
		pressD = false;
		
		tank.velocity.y = 0;
		tank.rotation = 0;
		tank.changeAnimation("standing");
	}
	if(keyDown("w") && pressW == false && pressS == false && pressA == false && pressD == false) {
		pressW = true;
		pressS = false;
		pressA = false;
		pressD = false;
		
		tank.velocity.y = -velocity;
		tank.rotation = 0;
		tank.changeAnimation("moving");
	}
	
	// down
	if(keyWentUp("s") && pressW == false && pressS == true && pressA == false && pressD == false) {
		pressW = false;
		pressS = false;
		pressA = false;
		pressD = false;
		
		tank.velocity.y = 0;
		tank.rotation = 180;
		tank.changeAnimation("standing");
	}
	if(keyDown("s") && pressW == false && pressS == false && pressA == false && pressD == false) {
		pressW = false;
		pressS = true;
		pressA = false;
		pressD = false;
		
		tank.velocity.y = velocity;
		tank.rotation = 180;
		tank.changeAnimation("moving");
	}
	
	// left
	if(keyWentUp("a") && pressW == false && pressS == false && pressA == true && pressD == false) {
		pressW = false;
		pressS = false;
		pressA = false;
		pressD = false;
		
		tank.velocity.x = 0;
		tank.rotation = 270;
		tank.changeAnimation("standing");
	}
	if(keyDown("a") && pressW == false && pressS == false && pressA == false && pressD == false) {
		pressW = false;
		pressS = false;
		pressA = true;
		pressD = false;
		
		tank.velocity.x = -velocity;
		tank.rotation = 270;
		tank.changeAnimation("moving");
	}
	
	// right
	if(keyWentUp("d") && pressW == false && pressS == false && pressA == false && pressD == true) {
		pressW = false;
		pressS = false;
		pressA = false;
		pressD = false;
		
		tank.velocity.x = 0;
		tank.rotation = 90;
		tank.changeAnimation("standing");
	}
	if(keyDown("d") && pressW == false && pressS == false && pressA == false && pressD == false) {
		pressW = false;
		pressS = false;
		pressA = false;
		pressD = true;
		
		tank.velocity.x = velocity;
		tank.rotation = 90;
		tank.changeAnimation("moving");
	}
	
	// limit the tank movements
	if(tank.position.x < 0) {
		tank.position.x = 0;
	}
	if(tank.position.y < 0) {
		tank.position.y = 0;
	}
	if(tank.position.x > SCENE_W) {
		tank.position.x = SCENE_W;
	}
	if(tank.position.y > SCENE_H) {
		tank.position.y = SCENE_H;
	}
}

function tankShoot(tank, pixelScale) {
	// press space
	if(keyDown("g") {
		// create a sprite and add animation
		this.bullet = createSprite(tank.position.x, tank.position.y, 32, 32);
		this.bullet.scale = pixelScale;
		this.bullet.velocity.y = velocityBullet;
		this.bullet.addAnimation("normal", "assets/sprites/bullet.png");
		this.drawSprite(bullet);
	}
}
