import { Composite } from 'matter-js';

class Layer {
	/**
	 * @type {Composite}
	 */
	#composite;

	mapLayerData;

	constructor({ layer }) {
		this.#composite = Composite.create({ label: layer.name });
		this.mapLayerData = layer;
	}

	constructBodies() {}

	get composite() {
		return this.#composite;
	}
}

export default Layer;
