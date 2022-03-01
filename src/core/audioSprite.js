import { Sound } from '@pixi/sound';

class AudioSprite {
	clip;

	url;

	sprites;

	loop;

	constructor({ url, sprites, loop }) {
		this.url = url;
		this.sprites = sprites;
		if (loop) {
			this.createClip({ url, loop });
		} else {
			this.createClip({ url });
		}
		this.loop = this.clip.loop;
	}

	createClip = ({ url, loop }) => {
		this.clip = Sound.from({
			url,
			sprites: this.sprites,
			preload: true,
		});
		if (loop) {
			this.loop = loop;
		}
	};
}
export default AudioSprite;
