function Debugger(name = 'default') {
	this.timeOld = 0;
	this.timeDelOld = 0;
	this.counter = 0;
	this.name = name;
	
	this.start = function start() {
		var d = new Date();
		this.timeOld = d.getTime();
	}

	this.end = function end() {
		var d = new Date();
		var timeNew = d.getTime();
		
		var timeDel = timeNew - this.timeOld;
		
		if (timeDel > this.timeDelOld && this.counter > 100) {
			console.log('debugger: ' + this.name + ' max = ' + timeDel + ' ms');
			this.timeDelOld = timeDel;
		}
		
		this.counter = this.counter + 1;
	}
}
