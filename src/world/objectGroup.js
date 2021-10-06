import Layer from './layer.js';

class ObjectGroup extends Layer {
	constructBodies() {
		const { objects: objectsArray } = this.mapLayerData;
		const objectsMap = {};
		objectsArray.forEach((object) => {
			objectsMap[object.name] = object;
		});

		this.mapLayerData.objects = objectsMap;
	}
}

export default ObjectGroup;
