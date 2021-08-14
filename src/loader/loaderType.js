import loadImage from './imageLoader.js';
import loadMap from './mapLoader.js';
import loadTileset from './tilesetLoader.js';

const assetTypeLoaderRegistry = {
	map: loadMap,
	tileset: loadTileset,
	image: loadImage,
};

export default assetTypeLoaderRegistry;