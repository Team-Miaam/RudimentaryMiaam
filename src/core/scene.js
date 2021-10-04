import Loader from '../loader/loader.js';
import View from '../view/view.js';

class Scene {

	/**
	 * loads assets for scenes
	 * @public
	 * @static
	 * @type {Loader}
	 */
	static loader;

	/**
	 * The assets has to be loaded before the the scene starts
	 * @public
	 * @static
	 * @type {Object}
	 */
	static preload;
	
	/**
	 * 
	 * @private
	 * @type {Boolean}
	 */
	#active;
	
	/**
	 * List of all entities
	 * @private
	 * @type {Object.<String, Entity>} 
	 */
	#entities;

	/**
	 * game-world/texture map
	 * @private
	 * @type {Object} 
	 */
	#map;

	/**
	 * @private
	 * @type {View}
	 */
	#view;

	/**
	 * loads assets for scenes
	 * @public
	 * @static
	 * @returns {Loader}
	 */
	static get loader() {
		return this.loader;
	}

	/**
	 * returns loaded assets
	 * @public
	 * @static
	 * @returns {Object}
	 */
	static get assets() {
		return this.loader.loadedAssets;
	}

	/**
	 * Calls onCreate function,then all the assets are preloaded, and load the entities.
	 * @constructor
	 */
	constructor() {
		this.#active = false;
		this.#entities = {};
		this.constructor.preload = this.constructor.preload
			? this.constructor.preload
			: {
					assets: [],
					entities: [],
			  };
		const { preload } = this.constructor;
		this.constructor.loader = new Loader();
		this.constructor.loader.loadAssets(preload.assets);
		this.constructor.loader.onComplete.add(() => {
			this.loadEntities(preload);
		});
	}
	
	/**
	 * Loads entities from preloaded assets
	 * @public
	 * @param {Object} preload 
	 */
	loadEntities(preload) {
		let entitiesLoaded = 0;
		preload.entities.forEach((Entity) => {
			Entity.Load();
			Entity.loader.onComplete.add(() => {
				entitiesLoaded += 1;
				if (entitiesLoaded === preload.entities.length) {
					this.onStart();
				}
			});
		});
	}

	/**
	 * called once before [onUpdate]{@link Scene#OnUpdate} at the begining of lif-cycle
	 * @public
	 * @abstract
	 */
	onStart() {}

	/**
	 * called at every frame 
	 * @public
	 * @param {Integer} delta 
	 */
	onUpdate(delta) {
		Object.values(this.entities).forEach((entity) => {
			entity.onUpdate(delta);
		});
	}

	/**
	 * called when scene is destroyed. Destroyes all loaded assets 
	 */
	onDestroy() {
		this.loader.destroy();
	}

	/**
	 * The scene is updating or not
	 * @public
	 * @returns {Boolean}
	 */
	get isActive() {
		return this.#active;
	}

	/**
	 * make the scene active or inactive for [onUpdate]{@link Scene#onUpdate}
	 * @public
	 */
	set isActive(active) {
		this.#active = active;
	}

	/**
	 * Adds an entity in a given layer
	 * @public
	 * @param {Layer} layer
	 * @param {Entity} entity
	 */
	addEntity({ layer, entity }) {
		this.#entities[entity.name] = entity;
		this.view.addObjectToLayer({ layer, object: entity });
	}

	/**
	 * Destroys an entity from [entities]{@link Scene#entities}
	 * @public
	 * @param {Entity} entity 
	 */
	removeEntity(entity) {
		this.#entities[entity.getName()].onDestroy();
		delete this.#entities[entity.getName()];
	}

	/**
	 * returns [entities]{@link Scene#entities}
	 * @returns {Object.<String, Entity>}
	 */
	get entities() {
		return this.#entities;
	}

	/**
	 * set map and view for [map]{@link Scene#map} and [view]{@link Scene#view}
	 * @public
	 */
	set map(map) {
		this.#map = map;
		this.view = new View(this.map);
	}

	/**
	 * returns [map]{@link Scene#map}
	 * @returns {Object}
	 */
	get map() {
		return this.#map;
	}

	/**
	 * sets view for [view]{@link Scene#view}
	 * @public
	 */
	set view(view) {
		this.#view = view;
	}
	
	/**
	 * returns [view]{@link Scene#view}
	 * @returns {view}
	 */
	get view() {
		return this.#view;
	}
}

export default Scene;
