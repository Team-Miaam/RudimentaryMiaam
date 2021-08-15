import Loader from '../loader/loader.js';

class Entity {
	#name;

	#active;

	#created;

	preload;

	#transform;

	#sprite;

	#loader;

	constructor({ name }) {
		this.#name = name;
		this.preload = {
			assets: [],
		};
		this.#transform = {
			x: 0,
			y: 0,
			rotation: 0,
		};
		this.#active = false;
		this.#created = false;
		this.onCreate();
		this.#loader = new Loader();
		this.#loader.loadAssets(this.preload.assets);
		this.#loader.onComplete.add(() => {
			this.onStart();
			this.isCreated = true;
		});
	}

	onCreate() {}

	onStart() {}

	onUpdate() {}

	onDestroy() {}

	get name() {
		return this.#name;
	}

	get isActive() {
		return this.#active;
	}

	set isActive(active) {
		if (this.#created) {
			this.#active = active;
		}
	}

	get isCreated() {
		return this.#created;
	}

	set isCreated(created) {
		this.#created = created;
	}

	get assets() {
		return this.#loader.loadedAssets;
	}

	get transform() {
		return this.#transform;
	}

	set transform({ x, y, rotation }) {
		this.#transform.x = x;
		this.#transform.y = y;
		this.#transform.rotation = rotation;
		this.#sprite.x = this.#transform.x;
		this.#sprite.y = this.#transform.y;
	}

	get sprite() {
		return this.#sprite;
	}

	set sprite(sprite) {
		this.#sprite = sprite;
	}

	get loader() {
		return this.#loader;
	}
}

export default Entity;
