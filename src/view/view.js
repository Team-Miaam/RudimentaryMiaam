import { Container } from 'pixi.js';
import layerTypeRendererRegistry from './layerType.js';
import { constructLayerMap } from '../util/layer/layer.js';

/**
 * A container which holds all the {@link Layer}
 *
 * @class
 * @public
 *
 */
class View extends Container {
	/**
	 * array of layers from map
	 *
	 * @private
	 * @type {Object}
	 */
	#layers;

	/**
	 * @public
	 * @constructor
	 * @param { Object } map - Holds all the data of a tiled game-world/texture map
	 */
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
			// to add any texture dynamically later in the life-cycle of game
			layer.container = renderedLayerContainer;
		});
	}

	/**
	 * @public
	 * @param {String} layerName - On which layer we will add the Object
	 * @param {Object} object - The object, that will be added in the layer
	 * add object dynamically to the layer
	 */
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
		if (object.sprite !== undefined) {
			layer.container.addChild(object.sprite);
		}
	}
}

export default View;
