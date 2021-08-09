import { getFileNameWithoutExtension, resolvePath } from '../util/path.js';

const loadTileset = (loader, assets, asset) => {
	loader.add(asset.name, asset.url);
	let { tilesets } = loader.loadedAssets;
	const { parent } = asset;
	if (parent) {
		tilesets = parent.tilesets;
	}
	loader.use((resource, next) => {
		if (Object.prototype.hasOwnProperty.call(tilesets, resource.name)) {
			tilesets[resource.name] = resource;
			const resolvedPath = resolvePath(asset.url, resource.data.image);
			const resourceName = getFileNameWithoutExtension(resolvedPath);
			console.log(resolvedPath);
			assets.push({
				name: resourceName,
				url: resolvedPath,
				type: 'image',
				parent: resource,
			});
		}
		next();
	});
	loader.load();
};

export default loadTileset;
