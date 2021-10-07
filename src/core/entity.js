import { Body } from 'matter-js';
import Loader from '../loader/loader.js';

class Entity {
	static loader;

	static preload;

	#name;

	#active;

	sprite;

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

	onUpdate(ticker) {
		if (this.body !== undefined) {
			this.transform = { x: this.body.position.x, y: this.body.position.y, rotation: this.body.angle };
		}
	}

	onDestroy() {}

	get name() {
		return this.#name;
	}

	get isActive() {
		return this.#active;
	}

	set isActive(active) {
		if (active) {
			this.#active = true;
		} else {
			this.#active = true;
		}
	}

	#updateSpriteTransform({ x = this.sprite.x, y = this.sprite.y, rotation = this.sprite.rotation }) {
		this.sprite.x = x;
		this.sprite.y = y;
		this.sprite.rotation = rotation;
	}

	#updateBodyTransform({ x = this.body.position.x, y = this.body.position.y, rotation = this.body.angle }) {
		Body.set(this.body, 'position', { x, y });
		Body.set(this.body, 'angle', rotation);
	}

	get transform() {
		return {
			x: this.sprite.x,
			y: this.sprite.y,
			rotation: this.sprite.rotation,
		};
	}

	set transform(transform) {
		if (this.body !== undefined) {
			this.#updateBodyTransform({
				x: transform.x,
				y: transform.y,
				rotation: transform.rotation,
			});
			// this.#updateBodyTransform(transform);
			this.#updateSpriteTransform({ x: this.body.position.x, y: this.body.position.y, rotation: this.body.angle });
		} else {
			this.#updateSpriteTransform(transform);
		}
	}
}

export default Entity;
