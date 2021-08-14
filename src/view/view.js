import { Container } from 'pixi.js';
import { getFileNameWithoutExtension } from '../util/path.js';
import layerTypeRendererRegistry from './layerType.js';

class View extends Container {
	#layers;

	constructor(scene) {
		super();
		const map = scene.getMap();
		this.#layers = map.data.layers;
		map.data.tilesets.forEach((tileset) => {
			tileset.data = map.tilesets[tileset.name].data;
			tileset.data.image = map.tilesets[tileset.name].images[getFileNameWithoutExtension(tileset.data.image)];
		});
		const tileset = map.data.tilesets;
		this.#renderLayers(map.data);
	}

	#renderLayers(map) {
		this.#layers.forEach((layer) => {
			const renderedLayerContainer = new layerTypeRendererRegistry[layer.type](layer, map);
			this.addChild(renderedLayerContainer);
		});
	}
}

export default View;
