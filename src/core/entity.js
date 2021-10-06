import Loader from '../loader/loader.js';

/**
 *
 */
class Entity {
	static loader;

	static preload;

	#name;

	#active;

	#sprite;

	body;

	static Load() {
		this.loader = new Loader();
		this.preload = this.preload
			? this.preload
			: {
					assets: [],
			  };
		this.loader.loadAssets(this.preload.assets);
	}

	static get assets() {
		return this.loader.loadedAssets;
	}

	static get loader() {
		return this.loader;
	}

	constructor({ name, props }) {
		// TODO: throw exception when entity is not loaded
		this.#name = name;
		this.#active = false;
		this.onStart(props);
	}

	onStart(props) {}

	onUpdate(ticker) {}

	onDestroy() {}

	get name() {
		return this.#name;
	}

	get isActive() {
		return this.#active;
	}

	set isActive(active) {
		this.#active = active;
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
}

export default Entity;
