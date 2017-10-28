var tank;
var paths = [];
var bullets = [];
var walls = [];
var boundaries = [];
var frame;
var collision;
var hud;
var mapNow;

//var grid; // development
var debug = new Debugger('update');

var SCENE_W = 4096;	// 4 x 4
var SCENE_H = 3584;

var pixelScale = 4;

var pixel = 32 * pixelScale;
var gridNumberH = SCENE_W / pixel - 4; // y
var gridNumberV = SCENE_H / pixel + 4; // x

function setup() {
	collision = new Collision();
	hud = new Hud();
	
	var canvas = createCanvas(1234, 1080);	// x4 snes resolution 256 x 224 pixels 1234, 1080
	mapNow = createMap(pixelScale, SCENE_W, SCENE_H);
	
//	grid = createGrid(pixelScale, SCENE_W, SCENE_H); // development
	
	// sharp pixel edges
	noSmooth();
	
	// create walls and tank
	for (var i = 0; i <= gridNumberH; i++) {
		for (var j = 0; j <= gridNumberV; j++) {
			// create a wall
			if(mapNow[i][j] == 1) {
				Wall.prototype = createSprite(j * pixel, i * pixel, 32, 32);
				walls.push(new Wall(pixelScale, SCENE_W, SCENE_H));
			}
			// create a tank
			if(mapNow[i][j] == 2) {
				Tank.prototype = createSprite(j * pixel, i * pixel, 32, 32);
				tank = new Tank(pixelScale, SCENE_W, SCENE_H);
			}
			// create a boundary
			if(mapNow[i][j] == 3) {
				Boundary.prototype = createSprite(j * pixel, i * pixel, 32, 32);
				boundaries.push(new Boundary(pixelScale, SCENE_W, SCENE_H));
			}
		}
	}
	
	frame = loadImage("assets/sprites/frame.png");
}

function draw() {
	background(190,190,190); // set background
	
	debug.start();
	// update objects
	update();
	debug.end();
	// a camera is created automatically at the beginning
	// normal zoom
	camera.zoom = 1;
	// set the camera position to the tank position
	camera.position.x = tank.position.x;
	camera.position.y = tank.position.y;
	
	// draw the scene
//	drawGrid(grid); // development
	
	// walls first
	if (walls != null && walls.length > 0) {
		for (var i = 0; i < walls.length; i++) {
			drawSprite(walls[i]);
		}
	}
	
	// boundaries
	if (boundaries != null && boundaries.length > 0) {
		for (var i = 0; i < boundaries.length; i++) {
			drawSprite(boundaries[i]);
		}
	}
	
	// draw bullets if fired
	if (bullets != null && bullets.length > 0) {
		for (var i = 0; i < bullets.length; i++) {
			drawSprite(bullets[i]);
		}
	}
	
	// draw paths
	if (paths != null && paths.length > 0) {
		for (var i = 0; i < paths.length; i++) {
			drawSprite(paths[i]);
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
	// update walls
	if (walls != null && walls.length > 0) {
		for (var i = 0; i < walls.length; i++) {
			walls[i].update();
		}
	}
	
	// update tank
	if (tank != null) {
		tank.update();
	}
	
	// at last update collision and delete objects
	collision.update();
	
	// update hud
	hud.update();
}
