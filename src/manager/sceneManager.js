import { Composite } from 'matter-js';
import GameManager from './gameManager.js';
import PhysicsManager from './physicsManager.js';

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

	/**
	 * @type {GameManager}
	 */
	#gameManager;

	#physicsManager;

	/**
	 * map of all scenes
	 * @type {Object.<string, Scene>}
	 */
	#scenes;

	currentScene;

	constructor() {
		if (SceneManager.#initialized) {
			throw new Error('Class constructor is private. Use get instance to get an instance.');
		}
		this.#scenes = {};
		this.currentScene = {
			name: '',
			ticker: undefined,
		};
		this.#gameManager = GameManager.instance;
		this.#physicsManager = PhysicsManager.instance;
		SceneManager.#initialized = true;
	}

	/**
	 * @returns {SceneManager}
	 */
	static get instance() {
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
		if (!scene.isActive) {
			scene.isActive = true;
			const interval = setInterval(() => {
				if (scene.isLoaded) {
					scene.onStart();
					this.currentScene = {
						name: sceneName,
						ticker: (delta) => {
							scene.onUpdate(delta);
						},
					};
					this.#gameManager.app.ticker.add(this.currentScene.ticker, this.#gameManager.app);
					clearInterval(interval);
				}
			}, 1000);
		}
	}

	/**
	 * stop updating the scene if active
	 * @param {string} sceneName
	 */
	stopScene() {
		const scene = this.#scenes[this.currentScene.name];
		this.#gameManager.app.ticker.remove(this.currentScene.ticker, this.#gameManager.app);
		scene.isActive = false;
	}

	/**
	 * removes and destroys the scene from the scene manager
	 * @param {string} sceneName
	 */
	removeScene(sceneName) {
		const scene = this.#scenes[sceneName];
		if (this.currentScene.name === sceneName) {
			this.stopScene();
		}
		scene.onDestroy();
		delete this.#scenes[sceneName];
	}

	/**
	 * sets the main view to preferred scene
	 * @param {string} sceneName
	 */
	set view(sceneName) {
		const { view } = this.#scenes[sceneName];
		this.#gameManager.app.stage.addChild(view);
	}

	set world(sceneName) {
		const { world } = this.#scenes[sceneName];
		this.#physicsManager.engine.world = world.composite;
	}
}
export default SceneManager;
