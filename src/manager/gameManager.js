import { Application } from 'pixi.js';
import Keyboard from '../input/keyboard/keyboard.js';

/**
 * Game managers manages the application window.
 * @public
 * @class
 */
class GameManager {
	/**
	 * singleton instance.
	 * @type {GameManager}
	 */
	static #instance;

	/**
	 * keeping track of singleton instance.
	 * @type {boolean}
	 */
	static #initialized = false;

	/**
	 * Application with renderer, ticker and root container.
	 * @type {Application}
	 */
	#app;

	/**
	 * Initiate a singleton instance of game manager.
	 * @private
	 * @constructor
	 */
	constructor() {
		if (GameManager.#initialized) {
			throw new Error('Use getInstance to get an instance.');
		}
		GameManager.#initialized = true;
		Keyboard.bindEventListener(window);
	}

	/**
	 * Returns the singleton instance of game manager.
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
	 * @param {Object} options
	 */
	createWindow(options) {
		this.#app = new Application(options);
	}

	/**
	 * Returns the application associated with this game.
	 * @returns {Application} the main application
	 */
	get app() {
		return this.#app;
	}

	/**
	 * Returns the view of the window.
	 * @returns {View}
	 */
	get window() {
		return this.#app.view;
	}
}

export default GameManager;
