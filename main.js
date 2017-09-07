var tank;
var bullets = [];
var walls = [];
var frame;
var collision;
var hud;

var grid; // development

var SCENE_W = 4096;	// 4 x 4
var SCENE_H = 3584;

var pixelScale = 4;

var pixel = 32 * pixelScale;
var wallNumberH = SCENE_W / pixel - 4; // y
var wallNumberV = SCENE_H / pixel + 4; // x

function setup() {
	collision = new Collision();
	hud = new Hud();
	var canvas = createCanvas(1234, 1080);	// x4 snes resolution 256 x 224 pixels
	
	grid = createGrid(pixelScale, SCENE_W, SCENE_H); // development
//	console.log(grid);
	// sharp pixel edges
	noSmooth();
	
	// create a tank
	Tank.prototype = createSprite(SCENE_W / 2, SCENE_H / 2, 32, 32);
	tank = new Tank(pixelScale, SCENE_W, SCENE_H);
		
	// create walls
	for (var i = 0; i <= wallNumberH; i++) {
		for (var j = 0; j <= wallNumberV; j++) {
			if(i % 4 == 0 && j % 4 == 0) {
				Wall.prototype = createSprite(i * pixel, j * pixel, 32, 32);
				walls.push(new Wall(pixelScale, SCENE_W, SCENE_H));
			}
		}
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
	if (walls != null && walls.length > 0) {
		for (var i = 0; i < walls.length; i++) {
			drawSprite(walls[i]);
		}
	}
	// draw bullets if fired
	if (bullets != null && bullets.length > 0) {
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
	hud.draw();
	image(frame, 0, 0);
}

function update() {
	// update bullets if fired
	if (bullets != null && bullets.length > 0) {
		for (var i = 0; i < this.bullets.length; i++) {
			bullets[i].update();
		}
	}
	// update tank
	tank.update();
	
	// at last update collision and delete objects
	collision.update();
	
	// update hud
	hud.update();
}
