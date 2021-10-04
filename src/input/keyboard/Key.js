/**
 * Manages key pressed or not and assign and execute associate action.
 * @public
 * @class
 */
class Key {
	/**
	 * Values of Key.
	 */
	#value;

	/**
	 * True if the key isn't pressed.
	 * @type {Boolean}
	 */
	isUp;

	/**
	 * True if the key is pressed.
	 * @type {Boolean}
	 */
	isDown;

	/**
	 * The actions if key isn't pressed.
	 * @type {Object}
	 */
	#onUpActions;

	/**
	 * The actions if key is pressed.
	 * @type {Object}
	 */
	#onDownActions;

	/**
	 * Value saves the input data.
	 * @param {String} value - represent keyboard keys.
	 */
	constructor(value) {
		this.#value = value;
		this.isUp = true;
		this.isDown = false;

		this.#onUpActions = {};
		this.#onDownActions = {};
	}

	get value() {
		return this.#value;
	}
	/**
	 * Adds an named function for the key which is released.
	 * @param {String} name - Name of the action.
	 * @param {Function} action - Function to execute when key is released.
	 */
	addActionOnUp({ name, action }) {
		this.#onUpActions[name] = action;
	}

	/**
	 * Adds a named function for the key which is pressed.
	 * @param {String} name - Name of the action.
	 * @param {Function} - Function to execute when key is released.
	 */
	addActionOnDown({ name, action }) {
		this.#onDownActions[name] = action;
	}
	/**
	 * Run all the associated actions when key is released.
	 */
	resolveActionsOnUp() {
		Object.values(this.#onUpActions).forEach((action) => action());
	}
	/**
	 * Run all the associated actions when key is pressed.
	 */
	resolveActionsOnDown() {
		Object.values(this.#onDownActions).forEach((action) => action());
	}
}

export default Key;
