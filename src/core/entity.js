import Loader from '../loader/loader.js';

class Entity {
	#name;

	#active;

	#created;

	preload;

	#sprite;

	#loader;

	constructor({ name }) {
		this.#name = name;
		this.preload = {
			assets: [],
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

	onUpdate(ticker) {}

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
		return {
			x: this.sprite.x,
			y: this.sprite.y,
			rotation: this.sprite.rotation,
		};
	}

	set transform(transform) {
		Object.entries(transform).forEach(([key, value]) => {
			this.#sprite[key] = value;
		});
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
