import { getFileNameWithoutExtension, resolvePath } from '../util/path.js';

const loadAnimation = (loader, assets, asset) => {
	loader.add(asset.name, asset.url);
	let { animations } = loader.loadedAssets;
	const { parent } = asset;
	if (parent) {
		animations = loader.loadedAssets[`${parent.type}s`][parent.name].animations;
	}
	loader.use((resource, next) => {
		if (Object.prototype.hasOwnProperty.call(animations, resource.name)) {
			animations[asset.name] = resource;
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

export default loadAnimation;
