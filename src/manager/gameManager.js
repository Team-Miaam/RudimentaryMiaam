import { Application } from 'pixi.js';

/**
 * Game manager
 * @public
 * @class
 */
class GameManager {
	/**
	 * singleton instance
	 * @type {GameManager}
	 */
	static #instance;

	/**
	 * keeping track of singleton instance
	 * @type {boolean}
	 */
	static #initialized = false;

	/**
	 * Application with renderer, ticker and root container
	 * @type {Application}
	 */
	#app;

	/**
	 * @private
	 * @constructor
	 */
	constructor() {
		if (GameManager.#initialized) {
			throw new Error('Use getInstance to get an instance.');
		}
		GameManager.#initialized = true;
		GameManager.#instance = this;
	}

	/**
	 * @returns {GameManager}
	 */
	static get instance() {
		if (!this.#initialized) {
			this.#instance = new GameManager();
		}
		return this.#instance;
	}

	/**
	 * creates the game window using given options
	 * TODO: Add documentation for various options
	 * @param {Object} options
	 */
	createWindow(options) {
		this.#app = new Application(options);
	}

	/**
	 *
	 * @returns {Application} the main application
	 */
	get app() {
		return this.#app;
	}

	get window() {
		return this.#app.view;
	}
}

export default GameManager;
