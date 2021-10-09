import Key from './Key.js';
/**
 * Connect between event window and keyboard inputs. 
 * @class 
 */
class Keyboard {
	/**
	 * List of the all the key used in current running game.
	 * @static
	 * @type {Object}
	 */
	static #keys = {};

	/**
	 * Checks whether input key is already in Key object,if not bind keyboard with that event window.
	 * @public
	 * @static
	 * @param {Object} object 
	 */
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

	// FIXME: Buggy behaviour on multiple key presses at same time
	/**
	 * @private
	 * @static
	 * @param {String} key - checks if key is pressed when key is released.
	 */
	static #onKeyUp(key) {
		if (key.isDown) {
			key.resolveActionsOnUp();
		}
		key.isDown = false;
		key.isUp = true;
	}
	/**
	 * @private
	 * @static
	 * @param {String} key - checks if key is pressed when key is pressed.
	 */
	static #onKeyDown(key) {
		if (key.isUp) {
			key.resolveActionsOnDown();
		}
		key.isDown = true;
		key.isUp = false;
	}
	
	/**
	 * @private
	 * @static
	 * @param {String} key - checks and register if key is pressed when key is undefined.
	 */
	static #registerKeyIfUndefined(key) {
		if (!this.#keys[key]) {
			this.#keys[key] = new Key(key);
		}
	}
	/**
	 * @static
	 * @param {String} key - checks and register if key is pressed when pre-declared key is undefined.
	 * @returns {Key} Instance of key class.
	 */
	static key(key) {
		this.#registerKeyIfUndefined(key);
		return this.#keys[key];
	}
}

export default Keyboard;
