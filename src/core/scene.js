import Loader from '../loader/loader.js';

class Scene {
	static loader;

	static preload;

	#active;

	#entities;

	#map;

	#view;

	static get loader() {
		return this.loader;
	}

	static get assets() {
		return this.loader.loadedAssets;
	}

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

	onStart() {}

	onUpdate(delta) {
		Object.values(this.entities).forEach((entity) => {
			entity.onUpdate(delta);
		});
	}

	onDestroy() {
		this.loader.destroy();
	}

	get isActive() {
		return this.#active;
	}

	set isActive(active) {
		this.#active = active;
	}

	addEntity(entity) {
		this.#entities[entity.name] = entity;
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
