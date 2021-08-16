import KeyboardKey from './keyboardKey.js';

class Keyboard {
	static #keys = {};

	static bindEventListener(object) {
		object.addEventListener(
			'keyup',
			(event) => {
				const { key } = event;
				this.#registerKeyIfUndefined(key);
				this.#onKeyUp(this.#keys[key]);
			},
			false
		);
		object.addEventListener(
			'keydown',
			(event) => {
				const { key } = event;
				this.#registerKeyIfUndefined(key);
				this.#onKeyDown(this.#keys[key]);
			},
			false
		);
	}

	static #onKeyUp(key) {
		if (key.isDown) {
			key.resolveActionsOnUp();
		}
		key.isDown = false;
		key.isUp = true;
	}

	static #onKeyDown(key) {
		if (key.isUp) {
			key.resolveActionsOnDown();
		}
		key.isDown = true;
		key.isUp = false;
	}

	static #registerKeyIfUndefined(key) {
		if (!this.#keys[key]) {
			this.#keys[key] = new KeyboardKey(key);
		}
	}

	static key(key) {
		this.#registerKeyIfUndefined(key);
		return this.#keys[key];
	}
}

export default Keyboard;
