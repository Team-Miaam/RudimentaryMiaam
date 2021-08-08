import GameManager from './gameManager.js';

/**
 * @public
 * @class
 */
class SceneManager {
	/**
	 * singleton instance
	 * @type {SceneManager}
	 */
	static #instance;

	/**
	 * keeping track of singleton instance
	 * @type {boolean}
	 */
	static #initialized = false;

	#gameManager;

	/**
	 * map of all scenes
	 * @type {Object.<string, Scene>}
	 */
	#scenes;

	constructor() {
		if (SceneManager.#initialized) {
			throw new Error('Class constructor is private. Use getInstance to get an instance.');
		}
		this.#scenes = {};
		this.#gameManager = GameManager.getInstance();
		SceneManager.#initialized = true;
		SceneManager.#instance = this;
	}

	/**
	 * @returns {SceneManager}
	 */
	static getInstance() {
		if (!this.#initialized) {
			this.#instance = new SceneManager();
		}
		return this.#instance;
	}

	/**
	 * initialize a scene and prepares the scene using onCreate
	 * @param {function} SceneClass
	 */
	addScene(SceneClass) {
		const scene = new SceneClass();
		this.#scenes[SceneClass.name] = scene;
	}

	/**
	 * start updating previously added scene
	 * @param {string} sceneName
	 */
	startScene(sceneName) {
		const scene = this.#scenes[sceneName];
		if (!scene.isActive()) {
			scene.setIsActive(true);
			// TODO: update the ticker
		}
	}

	/**
	 * stop updating the scene if active
	 * @param {string} sceneName
	 */
	stopScene(sceneName) {
		const scene = this.#scenes[sceneName];
		if (scene.isActive()) {
			scene.setIsActive(false);
			// TODO: update the ticker
		}
	}

	/**
	 * removes and destroys the scene from the scene manager
	 * @param {string} sceneName
	 */
	removeScene(sceneName) {
		const scene = this.#scenes[sceneName];
		// TODO: updater the ticker
		scene.onDestroy();
		delete this.#scenes[sceneName];
	}

	/**
	 * sets the main view to preferred scene
	 * @param {string} sceneName
	 */
	setMainView(sceneName) {
		// TODO: update the app root content
	}
}
export default SceneManager;
