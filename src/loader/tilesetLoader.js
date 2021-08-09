import { getFileNameWithoutExtension, resolvePath } from './path.js';

const loadTileset = (loader, assets, tileset) => {
	loader.add(tileset.name, tileset.url);

	loader.use((resource, next) => {
		const { tilesets } = loader.loadedAssets;
		if (Object.prototype.hasOwnProperty.call(tilesets, resource.name)) {
			tilesets[resource.name] = resource;
		}
		next();
	});
	loader.load();
};

export default loadTileset;
