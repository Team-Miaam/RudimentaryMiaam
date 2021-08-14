import { Texture, Rectangle } from 'pixi.js';

const snip = (source, x, y, width, height) => {
	const texture = new Texture(source);
	// Make a rectangle the size of the sub-image
	const imageFrame = new Rectangle(x, y, width, height);
	texture.frame = imageFrame;
	return texture;
};

export { snip };
