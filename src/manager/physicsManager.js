import { Engine } from 'matter-js';

class PhysicsManager {
	static #instance;

	static #initialized = false;

	#engine;

	#events;

	constructor() {
		if (PhysicsManager.#initialized) {
			throw new Error('Class constructor is private. Use get instance method instead');
		}
		this.#engine = Engine.create();
		this.#events = document.createElement('div');
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

	get events() {
		return this.#events;
	}
}

export default PhysicsManager;
