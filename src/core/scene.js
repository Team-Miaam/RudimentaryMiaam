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

	#loader;

	constructor() {
		this.assets = [];
		this.resources = {};
		this.#active = false;
		this.#isCreated = false;
		this.#entities = {};
		this.onAwake();
		this.#loader = new Loader();
		this.#loader.loadAssets(this.assets);
		this.#loader.onComplete.add((loader, resources) => {
			console.log('all complete', this.#loader);
			this.onStart();
			this.#isCreated = true;
		});
	}

	onAwake() {}

	onStart() {}

	onUpdate(ticker) {
		Object.entries(this.#entities).forEach((entity) => {
			entity.onUpdate();
		});
	}

	onDestroy() {}

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
}

export default Scene;
