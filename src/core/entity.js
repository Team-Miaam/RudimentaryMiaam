import Loader from '../loader/loader.js';

class Entity {
	#name;

	#active;

	#isCreated;

	preload;

	/**
	 * assets of the entity
	 */

	assets;

	#transform;

	#sprite;

	#loader;

	constructor({ name }) {
		this.#name = name;
		this.preload = {
			assets: [],
		};
		this.assets = [];
		this.#transform = {
			x: 0,
			y: 0,
			rotation: 0,
		};
		this.#active = false;
		this.#isCreated = false;
		this.onCreate();
		this.#loader = new Loader();
		this.#loader.loadAssets(this.preload.assets);
		this.#loader.onComplete.add(() => {
			this.onStart();
			this.#isCreated = true;
		});
	}

	onCreate() {}

	onStart() {}

	onUpdate() {
		// animate is animation is available
	}

	onDestroy() {}

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

	setTransform({ x, y, rotation }) {
		this.#transform.x = x;
		this.#transform.y = y;
		this.#transform.rotation = rotation;
		this.#sprite.x = this.#transform.x;
		this.#sprite.y = this.#transform.y;
	}

	setSprite(sprite) {
		this.#sprite = sprite;
	}

	getLoadedAssets() {
		return this.#loader.loadedAssets;
	}

	getName() {
		return this.#name;
	}

	getSprite() {
		return this.#sprite;
	}

	get loader() {
		return this.#loader;
	}
}

export default Entity;
