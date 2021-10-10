import { Graphics, BitmapText } from 'pixi.js';
import GameManager from '../manager/gameManager.js';
/**
 * Dialogue ui for player and npcs
 * @class
 */
class Dialogue {
	/**
	 * a queue which holds the conversation
	 * @public
	 * @type {Array.<String>}
	 */
	queue = [];
	/**
	 * if the box has created or not
	 * @public
	 * @type {Boolean} 
	 */
	hasBoxCreated = false;

	/**
	 * bitmap text
	 * @public
	 * @type {Object}
	 */
	dialogues;

	/**
	 * a graphics where the text wraps
	 * @public
	 * @type {Graphics}
	 */
	whiteBox = new Graphics();

	/**
	 * @public
	 * @type {Applicatoin}
	 */
	app = GameManager.instance.app;

	/**
	 * @public
	 * @type {String}
	 */
	fontName;


	onComplete;

	/**
	 * @public
	 * @constructor
	 * @param {Array.<String>} queue 
	 * @param {String} fontName 
	 */
	constructor(queue, fontName) {
		this.queue = queue;
		this.fontName = fontName;
		this.initiateDialogues();
		this.initiateWhiteBox();
		this.app.stage.addChild(this.whiteBox);
		this.app.stage.addChild(this.dialogues);
	}

	/**
	 * creates a rectangle
	 * @public
	 */
	initiateWhiteBox() {
		this.whiteBox.lineStyle(10, 0x000000, 5);
		this.whiteBox.beginFill(0x000000);
		this.whiteBox.drawRect(5, 402, 502, 105);
		this.whiteBox.endFill();
	}

	/**
	 * starts showing dialogues
	 * @public
	 */
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

	/**
	 * goes to next dialogue
	 * @returns null
	 */
	nextText() {
		if (this.whiteBox === undefined) {
			return;
		}
		if (this.queue.length > 1) {
			this.dialogues.text = this.queue.shift();
		} else {
			this.onComplete();
			this.destroy();
		}
	}

	/**
	 * destroys dialogue when needed
	 * @public
	 */
	destroy() {
		if (this.whiteBox !== undefined) {
			this.whiteBox.destroy();
			this.dialogues.destroy();
			this.whiteBox = undefined;
		}
	}
}
export default Dialogue;
