import { Loader as PIXILoader } from 'pixi.js';
import loadMap from './mapLoader.js';
import loadTileset from './tilesetLoader.js';

const assetTypeLoaderRegistry = {
	map: loadMap,
	tileset: loadTileset,
};

class Loader extends PIXILoader {
	loadedAssets;

	constructor() {
		super();
		this.loadedAssets = {};
	}

	loadAssets(assets) {
		let noOfAssetsLoaded = 0;

		const loadAsset = (index) => {
			const asset = assets[noOfAssetsLoaded];
			const { parent } = asset;
			if (parent) {
				if (!this.loadedAssets[`${parent.type}s`][parent.name][`${asset.type}s`]) {
					this.loadedAssets[`${parent.type}s`][parent.name][`${asset.type}s`] = {};
				}
				this.loadedAssets[`${parent.type}s`][parent.name][`${asset.type}s`][asset.name] = {};
			} else if (!this.loadedAssets[`${asset.type}s`]) {
				this.loadedAssets[`${asset.type}s`] = {};
				this.loadedAssets[`${asset.type}s`][asset.name] = {};
			}
			assetTypeLoaderRegistry[asset.type](this, assets, asset);
		};

		this._afterMiddleware.push((resource, next) => {
			noOfAssetsLoaded += 1;
			if (noOfAssetsLoaded !== assets.length) {
				this.reset();
				loadAsset(noOfAssetsLoaded);
			}
			next();
		});

		loadAsset(noOfAssetsLoaded);
	}

	use(fn) {
		this._afterMiddleware.splice(this._afterMiddleware.length - 1, 0, fn);
		return this;
	}
}

export default Loader;
