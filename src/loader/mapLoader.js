import { getFileNameWithoutExtension, resolvePath } from '../util/path.js';

const loadMap = (loader, assets, asset) => {
	loader.add(asset.name, asset.url);
	let { maps } = loader.loadedAssets;
	const { parent } = asset;
	if (parent) {
		maps = loader.loadedAssets[`${parent.type}s`][parent.name].maps;
	}
	loader.use((resource, next) => {
		if (Object.prototype.hasOwnProperty.call(maps, resource.name)) {
			maps[asset.name] = resource;
			const { tilesets } = resource.data;
			tilesets.forEach((tileset) => {
				const resolvedPath = resolvePath(asset.url, tileset.source);
				const resourceName = getFileNameWithoutExtension(resolvedPath);
				// attaching resource names to tileset for easy picking
				tileset.name = resourceName;
				// adding the tilesets to the queue
				assets.push({
					name: resourceName,
					url: resolvedPath,
					type: 'tileset',
					parent: resource,
				});
			});
		}
		next();
	});
	loader.load();
};

export default loadMap;
