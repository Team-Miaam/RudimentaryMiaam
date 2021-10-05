import { Composite } from 'matter-js';
import { constructLayerMap } from '../util/layer/layer.js';

class World {
	#composite;

	#layers;

	constructor(map) {
		this.#composite = Composite.create();
		this.#layers = constructLayerMap(map);
	}
}

export default World;
