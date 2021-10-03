import { Container } from 'pixi.js';

class Layer extends Container {
	mapLayerData;

	constructor({ layer }) {
		super();
		this.mapLayerData = layer;
	}

	constructSprite() {}
}

export default Layer;
