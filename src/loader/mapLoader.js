import { getFileNameWithoutExtension, resolvePath } from './path.js';

const loadMap = (loader, assets, map) => {
	loader.add(map.name, map.url);
	const { maps } = loader.loadedAssets;
	loader.use((resource, next) => {
		if (Object.prototype.hasOwnProperty.call(maps, resource.name)) {
			maps[map.name] = resource;
			const { tilesets } = resource.data;
			tilesets.forEach((tileset) => {
				const resolvedPath = resolvePath(map.url, tileset.source);
				const resourceName = getFileNameWithoutExtension(resolvedPath);
				// attaching resource names to tileset for easy picking
				tileset.name = resourceName;
				// adding the tilesets to the queue
				assets.push({
					name: resourceName,
					url: resolvedPath,
					type: 'tileset',
				});
			});
		}
		next();
	});
	loader.load();
};

export default loadMap;
