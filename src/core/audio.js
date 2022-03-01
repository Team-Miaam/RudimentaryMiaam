import { Sound } from '@pixi/sound';

class Audio {
	clip;

	#url;

	constructor({ url }) {
		this.#url = url;
		this.createClip({ url });
	}

	createClip = ({ url }) => {
		this.clip = Sound.from({
			url,
			preload: true,
		});
	};

	play = () => {
		this.clip.play();
	};

	pause = () => {
		this.clip.pause();
	}

	destroy = () => {
		this.clip.destroy();
	}

	
}

export default Audio;
