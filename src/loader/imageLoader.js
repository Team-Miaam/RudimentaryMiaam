const loadImage = (loader, assets, asset) => {
	loader.add(asset.name, asset.url);
	let { images } = loader.loadedAssets;
	const { parent } = asset;
	if (parent) {
		images = parent.images;
	}

	loader.use((resource, next) => {
		if (Object.prototype.hasOwnProperty.call(images, resource.name)) {
			images[resource.name] = resource;
		}
		next();
	});
	loader.load();
};

export default loadImage;
