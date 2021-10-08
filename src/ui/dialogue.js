import { Graphics, Text, BitmapText } from 'pixi.js';
import GameManager from '../manager/gameManager';
import { Keyboard } from '../input/keyboard/keyboard';

class Dialogue {
	queue = [];

	hasBoxCreated = false;

	dialogues;

	whiteBox = new Graphics();

	app = GameManager.instance.app;

	fontName;

	constructor(queue, fontName) {
		this.queue = queue;
		this.fontName = fontName;
		this.initiateDialogues();
		this.initiateWhiteBox();
		this.app.stage.addChild(this.whiteBox);
		this.app.stage.addChild(this.dialogues);
	}

	initiateWhiteBox() {
		this.whiteBox.lineStyle(10, 0x000000, 5);
		this.whiteBox.beginFill(0x000000);
		this.whiteBox.drawRect(5, 402, 502, 105);
		this.whiteBox.endFill();
	}

	initiateDialogues() {
		this.dialogues = new BitmapText('', {
			fontName: this.fontName,
			align: 'left',
			maxWidth: 512,
		});
		this.dialogues.x = 10;
		this.dialogues.y = 402;
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
			this.whiteBox.destroy();
			this.dialogues.destroy();
			this.whiteBox = undefined;
		}
	}
}
export default Dialogue;