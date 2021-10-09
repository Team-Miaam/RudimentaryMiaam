import { Bodies, Body, Composite, Events } from 'matter-js';
import PhysicsManager from '../manager/physicsManager.js';
import { constructPropertiesMap } from '../util/layer/layer.js';
import Layer from './layer.js';

class ObjectGroup extends Layer {
	constructBodies(map) {
		const { objects: objectsArray } = this.mapLayerData;
		const objectsMap = {};
		objectsArray.forEach((object) => {
			object.properties = constructPropertiesMap(object.properties);
			objectsMap[object.name] = object;
			if (this.mapLayerData.properties.physics === true) {
				const { x, y, width, height } = object;
				const { isStatic, isSensor } = this.mapLayerData.properties;
				const body = Bodies.rectangle(
					x + (width - map.tilewidth) / 2,
					y + (height - map.tileheight) / 2,
					width,
					height,
					{
						label: object.name,
						isStatic,
					}
				);
				if (isSensor) {
					Body.set(body, 'isSensor', true);
					Events.on(PhysicsManager.instance.engine, 'collisionStart', (event) => {
						const pairs = event.pairs[0];
						if (pairs.bodyA.label === object.name) {
							const eventTrigger = new CustomEvent(`collisionStart.${object.name}`, { detail: event });
							PhysicsManager.instance.events.dispatchEvent(eventTrigger);
						}
					});
					Events.on(PhysicsManager.instance.engine, 'collisionEnd', (event) => {
						const pairs = event.pairs[0];
						if (pairs.bodyA.label === object.name) {
							const eventTrigger = new CustomEvent(`collisionEnd.${object.name}`, { detail: event });
							PhysicsManager.instance.events.dispatchEvent(eventTrigger);
						}
					});
				}
				Composite.add(this.composite, body);
			}
		});

		this.mapLayerData.objects = objectsMap;
	}
}

export default ObjectGroup;
