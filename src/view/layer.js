import { Container } from 'pixi.js';

class Layer extends Container {
	layerData;

	constructor(layerData, map) {
		super();
		this.layerData = layerData.data;
		this.constructSprite(map);
	}

	constructSprite(map) {}
}

export default Layer;
