import { Loader as PIXILoader } from 'pixi.js';
import assetTypeLoaderRegistry from './loaderType.js';

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
				if (!parent[`${asset.type}s`]) {
					parent[`${asset.type}s`] = {};
				}
				parent[`${asset.type}s`][asset.name] = {};
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
