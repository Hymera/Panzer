function Collision() {
	
	this.update = function update() {
		// bullets collide walls
		if (bullets != null && bullets.length > 0) {
			if (walls != null && walls.length > 0) {
				for (var i = 0; i < bullets.length; i++) {
					for (var j = 0; j < walls.length; j++) {
						// bullet overlap wall
						if (bullets[i].overlap(walls[j])) {
							var lifeB = bullets[i].getLife();
							bullets[i].setLife(lifeB--);
							
							var lifeW = walls[j].getLife();
							walls[j].setLife(lifeW--);
							
							// delete dead bullet and wall					
							if (lifeB <= 0) {
								bullets.splice(i, 1);
							}
							if (lifeW <= 0) {
								walls.splice(j, 1);
							}
							break;
						}
						// delete bullet when hit map border
						var lifeB = bullets[i].getLife();
						if (lifeB <= 0) {
							bullets.splice(i, 1);
							break;
						}
					}
				}
			}
		}
		// tank collide walls
		
		// enemy collide walls
		
		// tank collide enemy
		
		// tank collide bullets
		
		// enemy collide bullets
		
	}
}
