var tank;
var bullet;
var bg;
var frame;

var grid; // development

var SCENE_W = 4096;	// 4 x 4
var SCENE_H = 3584;

var pixelScale = 4;

function setup() {
	var canvas = createCanvas(1234, 1080);	// x4 snes resolution 256 x 224 pixels
	
	grid = createGrid(pixelScale, SCENE_W, SCENE_H); // development
//	console.log(grid);
	// sharp pixel edges
	noSmooth();
	
	// create a tank
	Tank.prototype = createSprite(SCENE_W / 2, SCENE_H / 2, 32, 32);
	tank = new Tank(pixelScale, SCENE_W, SCENE_H);
	
	bg = new Group();
	
	// create some background for visual reference
	for(var i = 0; i < 80; i++) {
		// create a sprite and add the 3 animations
		var rock = createSprite(random(-width, SCENE_W + width), random(-height, SCENE_H + height), 32, 32);
		rock.scale = pixelScale;
		
		rock.addAnimation("normal", "assets/sprites/wall.png");
		bg.add(rock);
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
	// rocks first
	drawSprites(bg);
	// draw bullets if fired
	bullet = tank.getBullet();	
	if(bullet != false) {
		drawSprite(bullet);
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
	tank.update();
}
