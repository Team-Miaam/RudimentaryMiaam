import Loader from '../loader/loader.js';
import Entity from './entity.js';

class Scene {
	/**
	 * @type {boolean}
	 * whether the scene is active or not
	 */
	#active;

	/**
	 * @type {boolean}
	 * scene is created with all resources loaded
	 */
	#isCreated;

	/**
	 * @type {Object}
	 * all the preloaded objects of the scene
	 */
	preload;

	/**
	 * @type {Array.<Entity>}
	 * entities of the scene
	 */

	#entities;

	/**
	 * map of the scene;
	 */
	#map;

	/**
	 * @type {View}
	 * View of the scene */
	#view;

	#loader;

	constructor() {
		this.#active = false;
		this.#isCreated = false;
		this.preload = {
			assets: [],
			entities: [],
		};
		this.#entities = {};
		this.onCreate();
		this.#loader = new Loader();
		this.#loader.loadAssets(this.preload.assets);
		this.#loader.onComplete.add(() => {
			this.isCreated = true;
		});
		this.#initializeEntities();
	}

	onCreate() {}

	onStart() {}

	onUpdate(ticker) {
		Object.entries(this.#entities).forEach((entity) => {
			entity.onUpdate();
		});
	}

	onDestroy() {
		this.#loader.destroy();
	}

	#initializeEntities() {
		let entitiesLoaded = 0;
		this.preload.entities.forEach((entity) => {
			const { type: Type } = entity;
			const entityObj = new Type({
				name: entity.name,
				...entity.args,
			});
			entityObj.loader.onComplete.add(() => {
				entitiesLoaded += 1;
				this.addEntity(entityObj);
				if (entitiesLoaded === this.preload.entities.length && this.isCreated) {
					this.onStart();
				}
			});
		});
	}

	get isActive() {
		return this.#active;
	}

	set isActive(active) {
		if (this.isCreated) {
			this.#active = active;
		}
	}

	get isCreated() {
		return this.#isCreated;
	}

	set isCreated(created) {
		this.#isCreated = created;
	}

	get assets() {
		return this.#loader.loadedAssets;
	}

	addEntity(entity) {
		this.#entities[entity.getName()] = entity;
	}

	removeEntity(entity) {
		this.#entities[entity.getName()].onDestroy();
		delete this.#entities[entity.getName()];
	}

	get entities() {
		return this.#entities;
	}

	set map(map) {
		this.#map = map;
	}

	get map() {
		return this.#map;
	}

	set view(view) {
		this.#view = view;
	}

	get view() {
		return this.#view;
	}
}

export default Scene;
