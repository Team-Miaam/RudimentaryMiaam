import { Container } from 'pixi.js';

/**
 * this class represents a Container. Layer contains array of textures.
 * 
 * @class
 * @public
 */
class Layer extends Container {
	/**
	 * stores data of a layer from the given map in json format.
	 * 
	 * @public
	 * @type {Object}
	 */
	mapLayerData;
	/**
	 * creates layer.
	 * @param {Object} layer - represents the data of a layer from the given map in json format.
	 * 
	 * @constructor
	 */
	constructor({ layer }) {
		super();
		this.mapLayerData = layer;
	}
	/**
	 * creates sprites from data.
	 * 
	 * @abstract
	 */
	constructSprite() { }
}

export default Layer;
