function Hud() {
	this.reloadeTime = 0;
	this.long = 3;
	
	this.update = function update() {
		this.reloade();
	}
	
	this.draw = function draw() {
		strokeWeight(5);
		rect(795, 28, 310, 24);
		
		strokeWeight(15);
		strokeCap(SQUARE);
		line(1100 - this.long * 100, 40, 1100, 40);
	}
	
	this.reloade = function reloade() {
		if (tank.getShoot() == true && Math.round(new Date().getTime()/1000) >= this.reloadeTime) {
			this.reloadeTime = Math.round(new Date().getTime()/1000) + 3; // next shoot after 3 seconds
			this.long = 0;
		}
		
		if (Math.round(new Date().getTime()/1000) >= this.reloadeTime - 2) {
			this.long = 1;
		}
		
		if (Math.round(new Date().getTime()/1000) >= this.reloadeTime - 1) {
			this.long = 2;
		}
		
		if (Math.round(new Date().getTime()/1000) >= this.reloadeTime) {
			this.long = 3;
		}
	}
}
