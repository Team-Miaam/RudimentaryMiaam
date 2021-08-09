import { getFileNameWithoutExtension, resolvePath } from './path.js';

const loadTileset = (loader, assets, asset) => {
	loader.add(asset.name, asset.url);

	loader.use((resource, next) => {
		let { tilesets } = loader.loadedAssets;
		const { parent } = asset;
		if (parent) {
			tilesets = loader.loadedAssets[`${parent.type}s`][parent.name].tilesets;
		}
		if (Object.prototype.hasOwnProperty.call(tilesets, resource.name)) {
			tilesets[resource.name] = resource;
		}
		next();
	});
	loader.load();
};

export default loadTileset;
