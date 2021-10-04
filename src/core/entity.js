import Loader from '../loader/loader.js';

/**
 * Entity represents all the dynamic component of scene.
 * @class
 */
class Entity {
	static loader;

	static preload;
	/**
	 * Name of entity.
	 * @type {String}
	 */
	#name;
	/**
	 * True if entity being updated.
	 * @type {Boolean}
	 */
	#active;

	/**
	 * Sprites of entity.
	 * @type {Sprite}
	 */
	#sprite;
	/**
	 * Pre loads all the assets associated with this entity.
	 */
	static Load() {
		this.loader = new Loader();
		this.preload = this.preload
			? this.preload
			: {
					assets: [],
			  };
		this.loader.loadAssets(this.preload.assets);
	}
	/**
	 * Returns the assets.
	 */
	static get assets() {
		return this.loader.loadedAssets;
	}
	/**
	 * Get loader.
	 */
	static get loader() {
		return this.loader;
	}
	/**
	 * Initiates this entity and calls onStart method.
	 * @param {String} name
	 */
	constructor({ name }) {
		// TODO: throw exception when entity is not loaded
		this.#name = name;
		this.#active = false;
		this.onStart();
	}

	onStart() {}

	onUpdate(ticker) {}

	onDestroy() {}
	/**
	 * Returns the name of the entity.
	 * @returns {String}
	 */
	get name() {
		return this.#name;
	}
	/**
	 * Checks if the entity is active.
	 * @returns {Boolean}
	 */
	get isActive() {
		return this.#active;
	}
	/**
	 * Set if entity is active or not.
	 */
	set isActive(active) {
		this.#active = active;
	}
	/**
	 * Returns the transform of the entity.
	 * @returns {Object} Coordinate and the rotation of the entity.
	 */
	get transform() {
		return {
			x: this.sprite.x,
			y: this.sprite.y,
			rotation: this.sprite.rotation,
		};
	}
	/**
	 * Set the transform of the entity dynamically.
	 */
	set transform(transform) {
		Object.entries(transform).forEach(([key, value]) => {
			this.#sprite[key] = value;
		});
	}
	/**
	 * Returns the sprite of the entity.
	 * @return {Sprite}
	 */
	get sprite() {
		return this.#sprite;
	}
	/**
	 * Sets the sprite of the entity.
	 */
	set sprite(sprite) {
		this.#sprite = sprite;
	}
}

export default Entity;
