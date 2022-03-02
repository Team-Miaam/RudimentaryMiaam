import { Sound } from '@pixi/sound';

class Audio {
	clip;

	#url;

	#volume;

	#loop;

	constructor({ url, loop }) {
		this.#url = url;
		if (loop) this.createClip({ url, loop });
		else this.createClip({ url });
		this.#volume = this.clip.volume;
		this.#loop = this.clip.loop;
	}

	createClip = ({ url, loop }) => {
		this.clip = Sound.from({
			url,
			preload: true,
		});
		if (loop) {
			this.#loop = loop;
		}
		console.log(this.#loop);
	};

	play = () => {
		this.clip.play();
	};

	pause = () => {
		this.clip.pause();
	};

	resume = () => {
		this.clip.resume();
	};

	destroy = () => {
		this.clip.destroy();
	};

	get volume() {
		return this.#volume
	}

	set volume(volume) {
		this.#volume = volume;
	}

	set loop(loop) {
		this.#loop = loop;
	}
}

export default Audio;
