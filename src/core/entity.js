class Entity {
	/**
	 * assets of the entity
	 */

	assets;

	transform;

	animation;

	sprite;

	constructor() {
		// load the assets
		this.transform = {
			x: 0,
			y: 0,
		};
	}

	onCreate() {}

	onUpdate() {
		// animate is animation is available
	}

	onDestroy() {}
}

export default Entity;
