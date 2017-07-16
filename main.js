var tank;
var bullets = [];
var walls = [];
var frame;
var collision;

var grid; // development

var SCENE_W = 4096;	// 4 x 4
var SCENE_H = 3584;

var pixelScale = 4;

function setup() {
	collision = new Collision(pixelScale, SCENE_W, SCENE_H);
	var canvas = createCanvas(1234, 1080);	// x4 snes resolution 256 x 224 pixels
	
	grid = createGrid(pixelScale, SCENE_W, SCENE_H); // development
//	console.log(grid);
	// sharp pixel edges
	noSmooth();
	
	// create a tank
	Tank.prototype = createSprite(SCENE_W / 2, SCENE_H / 2, 32, 32);
	tank = new Tank(pixelScale, SCENE_W, SCENE_H);
		
	// create some background for visual reference
	for (var i = 0; i < 80; i++) {
		// create a sprite and add the 3 animations
		Wall.prototype = createSprite(random(-width, SCENE_W + width), random(-height, SCENE_H + height), 32, 32);
		walls.push(new Wall(pixelScale, SCENE_W, SCENE_H));
	}
	
	frame = loadImage("assets/sprites/frame.png");
}

function draw() {
	background(255,255,255); // set background
	
	// update objects
	update();
	
	// a camera is created automatically at the beginning
	// normal zoom
	camera.zoom = 1;
	// set the camera position to the tank position
	camera.position.x = tank.position.x;
	camera.position.y = tank.position.y;
	
	// draw the scene
	drawGrid(grid); // development
	// walls first
	if (walls.length > 0) {
		for (var i = 0; i < walls.length; i++) {
			drawSprite(walls[i]);
		}
	}
	// draw bullets if fired
	bullets = tank.getBullets();	
	if (bullets != false) {
		for (var i = 0; i < bullets.length; i++) {
			drawSprite(bullets[i]);
		}
	}
	// character on the top
	drawSprite(tank);
	
	/*
	I can turn on and off the camera at any point to restore
	the normal drawing coordinates, the frame will be drawn at 
	the absolute 0,0 (try to see what happens if you don't turn it off
	*/
	camera.off();
	image(frame, 0, 0);
}

function update() {
	// update walls
	if (walls.length > 0) {
		for (var i = 0; i < walls.length; i++) {
			walls[i].update();
		}
	}
	// update bullets if fired
	bullets = tank.getBullets();
	if (bullets != false) {
		for (var i = 0; i < this.bullets.length; i++) {
			bullets[i].update();
		}
	}
	// update tank
	tank.update(bullets, walls);
	
	// at last update collision
	collision.update();
	
	//delete dead objects
	// walls
	if (walls.length > 0) {
		for (var i = 0; i < walls.length; i++) {
			var life = walls[i].getLife();
			if (life == 0) {
				walls.splice(i, 1);
			}
		}
	}
}
