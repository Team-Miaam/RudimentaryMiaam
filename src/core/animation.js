import { AnimatedSprite, Texture } from 'pixi.js';
import { getFileNameWithoutExtension } from '../util/path.js';
import { snip } from '../util/spritesheet.js';

class AnimatedSpriteWState extends AnimatedSprite {
	#states;

	constructor(animationMap) {
		super([Texture.EMPTY]);
		this.#states = {};
		animationMap.data.tilesets.forEach((tileset) => {
			tileset.data = animationMap.tilesets[tileset.name].data;
			tileset.data.image = animationMap.tilesets[tileset.name].images[getFileNameWithoutExtension(tileset.data.image)];
		});
		this.#createTextures(animationMap.data);
		this.setState(animationMap.data.layers[0].name);

		this.anchor.set(0.5);
		this.animationSpeed = 0.1;
		this.loop = true;
		this.play();
	}

	#createTextures(animationMap) {
		const states = animationMap.layers;
		const tileset = animationMap.tilesets[0].data;
		const spritesheet = tileset.image.texture;

		states.forEach((state) => {
			this.#states[state.name] = [];
			state.data.forEach((gid) => {
				if (gid === 0) {
					return;
				}
				// Figure out the column and row number that the tileset
				// image is on, and then use those values to calculate
				// the x and y pixel position of the image on the tileset
				const tilesetColumn = (gid - 1) % tileset.columns;
				const tilesetRow = Math.floor((gid - 1) / tileset.columns);
				let tilesetX = tilesetColumn * animationMap.tilewidth;
				let tilesetY = tilesetRow * animationMap.tileheight;

				const { spacing } = tileset;
				if (spacing > 0) {
					tilesetX += spacing + spacing * ((gid - 1) % tileset.columns);
					tilesetY += spacing + spacing * Math.floor((gid - 1) / tileset.columns);
				}

				const texture = snip(spritesheet, tilesetX, tilesetY, animationMap.tilewidth, animationMap.tileheight);
				this.#states[state.name].push(texture);
			});
		});
	}

	setState(state) {
		this.textures = this.#states[state];
	}
}

export default AnimatedSpriteWState;
