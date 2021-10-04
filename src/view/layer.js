import { Container } from 'pixi.js';

/**
 * @class
 * @public
 * this class represents a Container
 * Layer contains array of textures
 */
class Layer extends Container {
	/**
	 * @public
	 * @type {Object}
	 * stores data of a layer from the given map in json format
	 */
	mapLayerData;
	/**
	 * @constructor
	 * creates layer
	 * @param {Object} layer - represents the data of a layer from the given map in json format
	 * 
	 */
	constructor({ layer }) {
		super();
		this.mapLayerData = layer;
	}
	/**
	 * @abstract
	 * creates sprites from data
	 */
	constructSprite() { }
}

export default Layer;
