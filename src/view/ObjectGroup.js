import Layer from './layer.js';

class ObjectGroup extends Layer {
	constructSprite() {
		const entities = this.scene.getEntities();
		const { objects } = this.layer;
		objects.forEach((object) => {
			const entity = entities[object.name];
			entity.setTransform({
				x: object.x,
				y: object.y,
				rotation: object.rotation,
			});
			this.addChild(entity.getSprite());
		});
	}
}

export default ObjectGroup;
