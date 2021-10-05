import { getFileNameWithoutExtension } from '../path.js';

const constructLayerMap = (map) => {
	const layers = {};
	map.data.layers.forEach((layer) => {
		layers[layer.name] = JSON.parse(JSON.stringify(layer));
	});

	return layers;
};

/* eslint-disable no-param-reassign */
const preProcessTilesets = (map) => {
	map.data.tilesets.forEach((tileset) => {
		tileset.data = map.tilesets[tileset.name].data;
		tileset.data.image = map.tilesets[tileset.name].images[getFileNameWithoutExtension(tileset.data.image)];
	});
};

export { constructLayerMap, preProcessTilesets };
