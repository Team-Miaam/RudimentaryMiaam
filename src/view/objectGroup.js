import Layer from './layer.js';

/**
 * this class extends {@link Layer}
 * ObjectGroup creates sprites from objects in map
 * 
 * @class
 * @public
 */
class ObjectGroup extends Layer {
	constructSprite() {
		const { objects: objectsArray } = this.mapLayerData;
		const objectsMap = {};
		objectsArray.forEach((object) => {
			objectsMap[object.name] = object;
		});

		this.mapLayerData.objects = objectsMap;
	}
}

export default ObjectGroup;
