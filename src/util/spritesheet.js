import { Texture, Rectangle } from 'pixi.js';

const snip = (source, x, y, width, height) => {
	const texture = new Texture(source, new Rectangle(x, y, width, height));
	return texture;
};

export { snip };
