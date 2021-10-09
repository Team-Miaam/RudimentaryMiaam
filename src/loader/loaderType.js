import loadAnimation from './animationLoader.js';
import loadFont from './fontLoader.js';
import loadImage from './imageLoader.js';
import loadMap from './mapLoader.js';
import loadTileset from './tilesetLoader.js';

const assetTypeLoaderRegistry = {
	map: loadMap,
	tileset: loadTileset,
	image: loadImage,
	animation: loadAnimation,
	font: loadFont,
};

export default assetTypeLoaderRegistry;
