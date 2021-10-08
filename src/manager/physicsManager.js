import { Composite, Engine, Events } from 'matter-js';

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
		PhysicsManager.#initialized = true;
		this.#events = document.createElement('div');
		this.reset();
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

	reset() {
		Events.off(this.engine);
		Composite.clear(this.#engine.world, false, true);
		this.#events = this.#events.cloneNode(true);
	}

	get engine() {
		return this.#engine;
	}

	get events() {
		return this.#events;
	}
}

export default PhysicsManager;
