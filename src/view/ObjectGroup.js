import Layer from './layer.js';

class ObjectGroup extends Layer {
	constructSprite() {
		const { entities } = this.scene;
		const { objects } = this.layer;
		objects.forEach((object) => {
			const entity = entities[object.name];
			entity.transform = {
				x: object.x,
				y: object.y,
				rotation: object.rotation,
			};
			this.addChild(entity.sprite);
		});
	}
}

export default ObjectGroup;
