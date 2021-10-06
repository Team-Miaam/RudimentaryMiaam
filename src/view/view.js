import { Container } from 'pixi.js';
import layerTypeRendererRegistry from './layerType.js';
import { constructLayerMap } from '../util/layer/layer.js';

class View extends Container {
	#layers;

	constructor(map) {
		super();
		this.#layers = constructLayerMap(map);
		this.#constructSprites(map.data);
	}

	#constructSprites(map) {
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
				y: objectData.y - objectData.height,
				rotation: objectData.rotation,
			};
		}
		layer.container.addChild(object.sprite);
	}
}

export default View;
