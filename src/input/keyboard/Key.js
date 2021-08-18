class Key {
	#value;

	isUp;

	isDown;

	#onUpActions;

	#onDownActions;

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

	addActionOnUp({ name, action }) {
		this.#onUpActions[name] = action;
	}

	addActionOnDown({ name, action }) {
		this.#onDownActions[name] = action;
	}

	resolveActionsOnUp() {
		Object.values(this.#onUpActions).forEach((action) => action());
	}

	resolveActionsOnDown() {
		Object.values(this.#onDownActions).forEach((action) => action());
	}
}

export default Key;
