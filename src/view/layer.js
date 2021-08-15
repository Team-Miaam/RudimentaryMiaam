import { Container } from 'pixi.js';

class Layer extends Container {
	scene;

	map;

	layer;

	constructor({ scene, map, layer }) {
		super();
		this.scene = scene;
		this.map = map;
		this.layer = layer;
		this.constructSprite();
	}

	constructSprite() {}
}

export default Layer;
