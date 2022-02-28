import { Sound } from '@pixi/sound';

class Audio {
	#clip;

	#url;

	constructor({ url }) {
		this.#url = url;
		this.createClip({ url });
	}

	createClip = ({ url }) => {
		this.#clip = Sound.from({
			url,
			preload: true,
			loaded: () => {
			},
		});
	};

	play = () => {
		this.#clip.play();
	};
}

export default Audio;
