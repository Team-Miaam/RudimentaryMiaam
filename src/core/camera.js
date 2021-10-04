/**Class representing game camera */
class Camera {
	/**
	 * 
	 */
	#view;

	#width;

	#height;

	#x;

	#y;

	#worldWidth;

	#worldHeight;

	constructor(scene, cameraWidth, cameraHeight) {
		this.#view = scene.view;
		this.#width = cameraWidth;
		this.#height = cameraHeight;
		const { data: world } = scene.map;
		this.#worldWidth = world.width * world.tilewidth;
		this.#worldHeight = world.height * world.tileheight;
	}

	// `x` and `y` getters/setters
	// When you change the camera's position,
	// they shift the position of the world in the opposite direction

	get x() {
		return this.#x;
	}

	set x(value) {
		this.#x = value;
		this.#view.x = -value;
	}

	get y() {
		return this.#y;
	}

	set y(value) {
		this.#y = value;
		this.#view.y = -value;
	}

	// Boundary properties that define a rectangular area, half the size
	// of the game screen. If the sprite that the camera is following
	// is inside this area, the camera won't scroll. If the sprite
	// crosses this boundary, the `follow` function ahead will change
	// the camera's x and y position to scroll the game world

	get rightInnerBoundary() {
		return this.x + this.#width / 2 + this.#width / 4;
	}

	get leftInnerBoundary() {
		return this.x + this.#width / 2 - this.#width / 4;
	}

	get topInnerBoundary() {
		return this.y + this.#height / 2 - this.#height / 4;
	}

	get bottomInnerBoundary() {
		return this.y + this.#height / 2 + this.#height / 4;
	}

	follow(entity) {
		const { sprite } = entity;
		// Check the sprites position in relation to the inner
		// boundary. Move the camera to follow the sprite if the sprite
		// strays outside the boundary
		if (sprite.x < this.leftInnerBoundary) {
			this.x = sprite.x - this.#width / 4;
		}
		if (sprite.y < this.topInnerBoundary) {
			this.y = sprite.y - this.#height / 4;
		}
		if (sprite.x + sprite.width > this.rightInnerBoundary) {
			this.x = sprite.x + sprite.width - (this.#width / 4) * 3;
		}
		if (sprite.y + sprite.height > this.bottomInnerBoundary) {
			this.y = sprite.y + sprite.height - (this.#height / 4) * 3;
		}
		// If the camera reaches the edge of the map, stop it from moving
		if (this.x < 0) {
			this.x = 0;
		}
		if (this.y < 0) {
			this.y = 0;
		}
		if (this.x + this.#width > this.#worldWidth) {
			this.x = this.#worldWidth - this.#width;
		}
		if (this.y + this.#height > this.#worldHeight) {
			this.y = this.#worldHeight - this.#height;
		}
	}

	// Use the `centerOver` method to center the camera over a sprite
	centerOver(entity) {
		const { sprite } = entity;
		const halfWidth = sprite.width / 2;
		const halfHeight = sprite.height / 2;
		// Center the camera over a sprite
		this.x = sprite.x + halfWidth - this.#width / 2;
		this.y = sprite.y + halfHeight - this.#height / 2;
	}
}

export default Camera;
