import { Bodies, Composite } from 'matter-js';
import Layer from './layer.js';

class TileLayer extends Layer {
	constructBodies(map) {
		this.mapLayerData.data.forEach((gid, index) => {
			if (gid === 0) {
				return;
			}

			// Figure out the map column and row number that we're on, and then
			// calculate the grid cell's x and y pixel position
			const mapColumn = index % map.width;
			const mapRow = Math.floor(index / map.width);
			const mapX = mapColumn * map.tilewidth;
			const mapY = mapRow * map.tileheight;

			const body = Bodies.rectangle(mapX, mapY, map.tilewidth, map.tileheight, { isStatic: true });

			// Add the sprite to the current layer group
			Composite.add(this.composite, body);
		});
	}
}

export default TileLayer;
