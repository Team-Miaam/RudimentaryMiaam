import { Sprite } from 'pixi.js';
import { snip } from '../util/spritesheet.js';
import Layer from './layer.js';

class TileLayer extends Layer {
	constructSprite(map) {
		const tileset = map.tilesets[0].data;
		const spritesheet = tileset.image.texture;
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

			// Figure out the column and row number that the tileset
			// image is on, and then use those values to calculate
			// the x and y pixel position of the image on the tileset
			const tilesetColumn = (gid - 1) % tileset.columns;
			const tilesetRow = Math.floor((gid - 1) / tileset.columns);
			let tilesetX = tilesetColumn * map.tilewidth;
			let tilesetY = tilesetRow * map.tileheight;

			const { spacing } = tileset;
			if (spacing > 0) {
				tilesetX += spacing + spacing * ((gid - 1) % tileset.columns);
				tilesetY += spacing + spacing * Math.floor((gid - 1) / tileset.columns);
			}

			const texture = snip(spritesheet, tilesetX, tilesetY, map.tilewidth, map.tileheight);
			const tileSprite = new Sprite(texture);

			// Position the sprite on the map
			tileSprite.x = mapX;
			tileSprite.y = mapY;

			// Add the sprite to the current layer group
			this.addChild(tileSprite);
		});
	}
}

export default TileLayer;
