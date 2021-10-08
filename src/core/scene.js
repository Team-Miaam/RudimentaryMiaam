import Loader from '../loader/loader.js';
import PhysicsManager from '../manager/physicsManager.js';
import { preProcessTilesets } from '../util/layer/layer.js';
import View from '../view/view.js';
import World from '../world/world.js';

class Scene {
	static loader;

	static preload;

	#active;

	#entities;

	#map;

	#view;

	#world;

	processed = false;

	static get loader() {
		return this.loader;
	}

	static get assets() {
		return this.loader.loadedAssets;
	}

	/**
	 * Calls onCreate function,then all the assets are being preloaded, and load the entities.
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
		this.isLoaded = false;
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
					this.isLoaded = true;
					console.log('scene loaded');
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
		this.view.destroy();
	}

	get isActive() {
		return this.#active;
	}

	set isActive(active) {
		this.#active = active;
	}

	addEntity({ layer, entity }) {
		this.#entities[entity.name] = entity;
		this.view.addObjectToLayer({ layer, object: entity });
		this.world.addObjectToLayer({ layer, object: entity });
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
		if (!this.processed) {
			preProcessTilesets(this.map);
			this.processed = true;
		}
		PhysicsManager.instance.reset();
		this.#world = new World(this.map);
		this.#view = new View(this.map);
	}

	get map() {
		return this.#map;
	}

	get view() {
		return this.#view;
	}

	get world() {
		return this.#world;
	}
}

export default Scene;
