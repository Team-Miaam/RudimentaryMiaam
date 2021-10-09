import { Graphics, BitmapText } from 'pixi.js';
import GameManager from '../manager/gameManager.js';

class Dialogue {
	queue = [];

	hasBoxCreated = false;

	dialogues;

	whiteBox = new Graphics();

	app = GameManager.instance.app;

	fontName;

	onComplete;

	constructor(queue, fontName) {
		this.queue = queue;
		this.fontName = fontName;
		this.initiateDialogues();
		this.initiateWhiteBox();
		this.app.stage.addChild(this.whiteBox);
		this.app.stage.addChild(this.dialogues);
	}

	initiateWhiteBox() {
		this.whiteBox.lineStyle(3, 0xffffff, 1);
		this.whiteBox.beginFill(0x000000);
		this.whiteBox.drawRect(0, 402, GameManager.instance.app.screen.width, 110);
		this.whiteBox.endFill();
	}

	initiateDialogues() {
		this.dialogues = new BitmapText('', {
			fontName: this.fontName,
			align: 'left',
			maxWidth: GameManager.instance.app.screen.width - 10,
		});
		this.dialogues.x = 10;
		this.dialogues.y = 402 + 10;
		this.queue.push(' ');
		this.nextText();
	}

	nextText() {
		if (this.whiteBox === undefined) {
			return;
		}
		if (this.queue.length > 1) {
			this.dialogues.text = this.queue.shift();
		} else {
			if (this.onComplete !== undefined) {
				this.onComplete();
			}
			this.destroy();
		}
	}

	destroy() {
		if (this.whiteBox !== undefined) {
			this.onComplete = undefined;
			this.whiteBox.destroy();
			this.dialogues.destroy();
			this.whiteBox = undefined;
		}
	}
}
export default Dialogue;
