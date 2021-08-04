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
		if (this.#initialized) {
			throw new Error('Class constructor is private. Use getInstance to get an instance.');
		}
	}

	/**
	 * @returns {GameManager}
	 */
	static getInstance() {
		if (this.#initialized) {
			this.#instance = new GameManager();
			this.#initialized = true;
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
	getApp() {
		return this.#app;
	}
}

export default GameManager;
