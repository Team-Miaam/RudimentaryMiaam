import { Composite } from 'matter-js';
import layerTypeRendererRegistry from './layerType.js';
import { constructLayerMap } from '../util/layer/layer.js';

class World {
	#composite;

	#layers;

	constructor(map) {
		this.#composite = Composite.create();
		this.#layers = constructLayerMap(map);
		this.#constructComposites(map.data);
	}

	#constructComposites(map) {
		Object.values(this.#layers).forEach((layer) => {
			if (layer.type !== 'objectgroup' && layer.properties === undefined) {
				return;
			}
			const renderedLayerComposite = new layerTypeRendererRegistry[layer.type]({
				layer,
			});
			// if (renderedLayerComposite.constructor.name === 'ObjectGroup') {
			renderedLayerComposite.constructBodies(map);
			Composite.add(this.composite, renderedLayerComposite.composite);
			layer.composite = renderedLayerComposite.composite;
			// }
		});
	}

	addObjectToLayer({ layer: layerName, object }) {
		const layer = this.#layers[layerName];
		if (object.body !== undefined) {
			Composite.add(layer.composite, object.body);
		}
	}

	get composite() {
		return this.#composite;
	}
}

export default World;
