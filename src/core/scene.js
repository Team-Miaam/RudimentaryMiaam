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

	constructor() {
		this.isActive = false;
		// load the assets
		this.#entities = {};
		// set the default view to black
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
