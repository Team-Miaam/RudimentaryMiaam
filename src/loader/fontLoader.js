
const loadFont = (loader, assets, asset) => {
	loader.add(asset.name, asset.url);
	let { fonts } = loader.loadedAssets;
	const { parent } = asset;
	if (parent) {
		fonts = loader.loadedAssets[`${parent.type}s`][parent.name].fonts;
	}
	loader.use((resource, next) => {
		if (Object.prototype.hasOwnProperty.call(fonts, resource.name)) {
			fonts[asset.name] = resource;
		}
		next();
	});
	loader.load();
};

export default loadFont;
