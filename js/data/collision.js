function Collision() {
	
	this.update = function update() {
		// bullets collide walls and boundaries
		if (bullets != null && bullets.length > 0) {
			if (walls != null && walls.length > 0) {
				for (var i = 0; i < bullets.length; i++) {
					for (var j = 0; j < walls.length; j++) {
						// bullet overlap wall
						if (bullets[i].overlap(walls[j])) {
							var lifeB = bullets[i].getLife();
							lifeB = lifeB - 1;
							bullets[i].setLife(lifeB);
							
							var lifeW = walls[j].getLife();
							lifeW = lifeW - 1;
							walls[j].setLife(lifeW);
							
							// delete dead bullet and wall					
							if (lifeB <= 0) {
								bullets.splice(i, 1);
							}
							if (lifeW <= 0) {
								walls.splice(j, 1);
							}
							break;
						}
					}
				}
			}
		}
		// bullets collide boundaries
		if (bullets != null && bullets.length > 0) {
			if (boundaries != null && boundaries.length > 0) {
				for (var i = 0; i < bullets.length; i++) {
					for (var j = 0; j < boundaries.length; j++) {
						// bullet overlap boundaries
						if (bullets[i].overlap(boundaries[j])) {
							var lifeB = bullets[i].getLife();
							lifeB = lifeB - 1;
							bullets[i].setLife(lifeB);
							
							// delete dead bullet			
							if (lifeB <= 0) {
								bullets.splice(i, 1);
							}
							break;
						}
					}
				}
			}
		}
		// tank collide walls
		if (walls != null && walls.length > 0) {
			for (var i = 0; i < walls.length; i++) {
				// tank overlap wall
				if (tank.overlap(walls[i])) {
					tank.collide(walls[i]);
				}
			}
		}
		// enemy collide walls
		
		// tank collide boundaries
		if (boundaries != null && boundaries.length > 0) {
			for (var i = 0; i < boundaries.length; i++) {
				// tank overlap boundary
				if (tank.overlap(boundaries[i])) {
					tank.collide(boundaries[i]);
				}
			}
		}
		// enemy collide boundaries
		
		// tank collide enemy
		
		// tank collide bullets
		
		// enemy collide bullets
		
		// bullet collide bullet
	}
}
