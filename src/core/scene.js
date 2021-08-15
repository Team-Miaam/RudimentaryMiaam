import Loader from '../loader/loader.js';

class Scene {
	/**
	 * whether the scene is active or not
	 * @type {boolean}
	 */
	#active;

	/**
	 * scene is created with all resources loaded
	 */
	#isCreated;

	preload;

	/**
	 * assets of the scene
	 */
	assets;

	/**
	 * entities of the scene
	 */
	entities;

	#entities;

	/**
	 * @type {View}
	 * View of the scene */
	#view;

	#map;

	#loader;

	constructor() {
		this.preload = {
			assets: [],
			entities: [],
		};
		this.assets = [];
		this.entities = [];
		this.#active = false;
		this.#isCreated = false;
		this.#entities = {};
		this.onCreate();
		this.#loader = new Loader();
		this.#loader.loadAssets(this.preload.assets);
		this.#loader.onComplete.add(() => {
			this.#isCreated = true;
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
				if (entitiesLoaded === this.preload.entities.length && this.isCreated()) {
					this.onStart();
				}
			});
		});
	}

	isActive() {
		return this.#active;
	}

	isCreated() {
		return this.#isCreated;
	}

	setIsActive(active) {
		if (this.#isCreated) {
			this.#active = active;
		}
	}

	addEntity(entity) {
		this.#entities[entity.getName()] = entity;
	}

	removeEntity(entity) {
		this.#entities[entity.getName()].onDestroy();
		delete this.#entities[entity.getName()];
	}

	setView(view) {
		this.#view = view;
	}

	setMap(map) {
		this.#map = map;
	}

	getLoadedAssets() {
		return this.#loader.loadedAssets;
	}

	getMap() {
		return this.#map;
	}

	getView() {
		return this.#view;
	}

	getEntities() {
		return this.#entities;
	}

	get entities() {
		return this.#entities;
	}
}

export default Scene;
