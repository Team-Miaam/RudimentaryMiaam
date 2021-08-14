import Loader from '../loader/loader.js';

class Scene {
	/**
	 * whether the scene is active or not
	 * @type {boolean}
	 */
	#active;

	/**
	 * assets of the scene
	 */
	assets;

	/**
	 * scene is created with all resources loaded
	 */
	#isCreated;

	/**
	 * entities of the scene
	 */
	#entities;

	/**
	 * @type {View}
	 * View of the scene */
	#view;

	#map;

	#loader;

	constructor() {
		this.assets = [];
		this.#active = false;
		this.#isCreated = false;
		this.#entities = {};
		this.onCreate();
		this.#loader = new Loader();
		this.#loader.loadAssets(this.assets);
		this.#loader.onComplete.add((loader, resources) => {
			this.onStart();
			this.#isCreated = true;
		});
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

	isActive() {
		return this.#active;
	}

	setIsActive(active) {
		if (this.#isCreated) {
			this.#active = active;
		}
	}

	addEntity(name, entity) {
		entity.onStart();
		this.#entities[name] = entity;
	}

	removeEntity(name) {
		this.#entities[name].onDestroy();
		delete this.#entities[name];
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
}

export default Scene;
