import { Container } from 'pixi.js';
import { getFileNameWithoutExtension } from '../util/path.js';
import layerTypeRendererRegistry from './layerType.js';

/**
 * @class
 * @public
 * A container which holds all the {@link Layer}
 */
class View extends Container {
	/**
	 * @private
	 * @type {Object}
	 * array of layers from map 
	 */
	#layers;
	/**
	 * @public
	 * @constructor 
	 * @param { Object } map - Holds all the data of a tiled game-world/texture map
	 */
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
	/**
	 * @private
	 * @param {Object} map - Holds all the data of a tiled game-world/texture map
	 * Creates sprites from textures based on the class type of layer and add them to the view 
	 */
	#renderLayers(map) {
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
				y: objectData.y,
				rotation: objectData.rotation,
			};
		}
		layer.container.addChild(object.sprite);
	}
}

export default View;
