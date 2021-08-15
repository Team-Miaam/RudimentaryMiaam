import ObjectGroup from './objectGroup.js';
import TileLayer from './tilelayer.js';

const layerTypeRendererRegistry = {
	tilelayer: TileLayer,
	objectgroup: ObjectGroup,
};

export default layerTypeRendererRegistry;
