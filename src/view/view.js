import { Container } from 'pixi.js';
import { getFileNameWithoutExtension } from '../util/path.js';
import layerTypeRendererRegistry from './layerType.js';

class View extends Container {
	#layers;

	constructor(map) {
		super();
		this.#layers = {};
		map.data.layers.forEach((layer) => {
			this.#layers[layer.name] = layer;
		});
		map.data.tilesets.forEach((tileset) => {
			tileset.data = map.tilesets[tileset.name].data;
			tileset.data.image = map.tilesets[tileset.name].images[getFileNameWithoutExtension(tileset.data.image)];
		});
		this.#renderLayers(map.data);
	}

	#renderLayers(map) {
		Object.values(this.#layers).forEach((layer) => {
			const renderedLayerContainer = new layerTypeRendererRegistry[layer.type]({
				layer,
			});
			renderedLayerContainer.constructSprite(map);
			this.addChild(renderedLayerContainer);
			layer.container = renderedLayerContainer;
		});
	}

	addObjectToLayer({ layer: layerName, object }) {
		const layer = this.#layers[layerName];
		const objectData = layer.objects[object.name];
		if (objectData !== undefined) {
			object.transform = {
				x: objectData.x,
				y: objectData.y,
				rotation: objectData.rotation,
			};
		}
		layer.container.addChild(object.sprite);
	}
}

export default View;
