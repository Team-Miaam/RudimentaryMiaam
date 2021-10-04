import { AnimatedSprite, Texture } from 'pixi.js';
import { getFileNameWithoutExtension } from '../util/path.js';
import { snip } from '../util/spritesheet.js';

class AnimatedSpriteWState extends AnimatedSprite {
	#states;

	constructor(animationMap) {
		super([Texture.EMPTY]);
		this.#states = { normal: {} };
		animationMap.data.tilesets.forEach((tileset) => {
			if (tileset.data === undefined) {
				tileset.data = animationMap.tilesets[tileset.name].data;
				tileset.data.image =
					animationMap.tilesets[tileset.name].images[getFileNameWithoutExtension(tileset.data.image)];
			}
		});
		this.#createNormalTextures(animationMap.data);
		this.state = { state: animationMap.data.layers[0].name };
	}

	#createNormalTextures(animationMap) {
		const states = animationMap.layers;
		const tileset = animationMap.tilesets[0].data;
		const spritesheet = tileset.image.texture;

		states.forEach((state) => {
			this.#states.normal[state.name] = [];
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
				this.#states.normal[state.name].push(texture);
			});
		});
	}

	createRotatedTextures({ rotationName, rotationGroup }) {
		this.#states[rotationName] = {};
		const rotatedTextures = this.#states[rotationName];
		Object.keys(this.#states.normal).forEach((state) => {
			rotatedTextures[state] = [];
			const textures = this.#states.normal[state];
			textures.forEach((texture, i) => {
				rotatedTextures[state].push(texture.clone());
				rotatedTextures[state][i].rotate = rotationGroup;
			});
		});
	}

	set state({ state, rotationName = 'normal', speed = 0.1, anchor = 0.5, loop = -1, angle = 0 }) {
		this.textures = this.#states[rotationName][state];
		this.anchor.set(anchor);
		this.animationSpeed = speed;
		this.loop = true;
		this.loopCount = loop;
		this.angle = angle;
		if (loop > 0) {
			this.onLoop = () => {
				if (this.loopCount === 0) {
					this.stop();
				}
				this.loopCount -= 1;
			};
		}
		if (loop !== 0) {
			this.play();
		}
	}
}

export default AnimatedSpriteWState;
