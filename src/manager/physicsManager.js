import { Engine } from 'matter-js';

class PhysicsManager {
	static #instance;

	static #initialized = false;

	#engine;

	constructor() {
		if (PhysicsManager.#initialized) {
			throw new Error('Class constructor is private. Use get instance method instead');
		}
		this.#engine = Engine.create();
		PhysicsManager.#initialized = true;
	}

	static get instance() {
		if (!PhysicsManager.#initialized) {
			this.#instance = new PhysicsManager();
		}
		return this.#instance;
	}

	update(delta) {
		Engine.update(this.#engine);
	}

	get engine() {
		return this.#engine;
	}
}

export default PhysicsManager;
