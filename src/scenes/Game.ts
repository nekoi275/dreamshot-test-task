import { Container, Graphics, Text } from "pixi.js";
import { SceneUtils } from "../core/App";
import Vault from "../prefabs/Vault";
import Door from "../prefabs/Door";
import { gsap } from "gsap";
import Combination from "../model/Combination";

export default class Game extends Container {
  name = "Game";

  private vault!: Vault;
  private door!: Door;
  private secretCombination: Combination = Combination.newRandom(3);
  private inputCombination: Combination = new Combination();
  private combinationOverlay!: Graphics;
  private combinationText!: Text;
  private screenWidth: number = window.innerWidth;
  private screenHeight: number = window.innerHeight;

  constructor(protected utils: SceneUtils) {
    super();
    this.createCombinationDisplay();
    this.updateCombinationDisplay();
  }

  private createCombinationDisplay() {
    this.combinationOverlay = new Graphics();
    this.combinationOverlay.zIndex = 1000;
    
    // Create text for combination
    this.combinationText = new Text("", {
      fill: 0xffffff,
      fontSize: 24,
      fontFamily: "Arial",
    });
    this.combinationText.zIndex = 1001;
    
    this.addChild(this.combinationOverlay);
    this.addChild(this.combinationText);
  }

  private updateCombinationDisplay() {
    const padding = 20;
    const text = this.secretCombination.toString();
    this.combinationText.text = text;
    
    const textBounds = this.combinationText.getBounds();
    const boxWidth = textBounds.width + padding * 2;
    const boxHeight = textBounds.height + padding * 2;
    
    this.combinationOverlay.clear();
    this.combinationOverlay
      .beginFill(0x000000, 0.5)
      .drawRect(0, 0, boxWidth, boxHeight)
      .endFill();
    
    this.combinationOverlay.position.set(
      (this.screenWidth - boxWidth) / 2,
      this.screenHeight - boxHeight - 40
    );
    
    this.combinationText.position.set(
      (this.screenWidth - boxWidth) / 2 + padding,
      this.screenHeight - boxHeight - 40 + padding
    );
  }

  private onTap(isLeft: boolean) {
    if (!this.door.doorHandle.isControlable) return;

    isLeft
      ? this.inputCombination.turnCounterClockwise()
      : this.inputCombination.turnClockwise();

    const isValid = this.secretCombination.isValid(
      this.inputCombination
    );
    const isEqual = this.secretCombination.equals(
      this.inputCombination
    );
    this.door.doorHandle.rotationAnimation(isLeft).then(_ => {
      if (!isValid) {
        this.gameOver();
      } else if (isEqual) {
        this.win();
      }
    });
  }

  private gameOver() {
    this.vault.stopTimer();
    this.door.doorHandle.spinLikeCrazy().then(() => this.resetGame());
  }

  private win() {
    this.door.isOpened = true;
    this.vault.startAnimateBlinks();
    this.vault.stopTimer();
    gsap.delayedCall(
      5,
      (callback: () => void) => {
        this.door.isOpened = false;
        this.door.doorHandle.spinLikeCrazy().then(callback);
      },
      [() => this.resetGame()]
    );
  }

  private resetGame() {
    this.secretCombination = Combination.newRandom(3);
    this.inputCombination = new Combination();
    this.updateCombinationDisplay();
    this.vault.stopAnimateBlinks();
    this.vault.resetTimer();
  }

  async load() {
    await this.utils.assetLoader.loadAssets();
  }

  async start() {
    this.removeChildren();
    this.vault = new Vault();
    this.door = new Door();
    this.addChild(this.vault, this.door);
    
    this.addChild(this.combinationOverlay);
    this.addChild(this.combinationText);
    
    this.door.initHitArea(true, () => {
      this.onTap(true);
    });
    this.door.initHitArea(false, () => {
      this.onTap(false);
    });
  }

  onResize(width: number, height: number) {
    this.screenWidth = width;
    this.screenHeight = height;
    this.vault.setSize(width, height);
    this.door.setSize(width, height);
    this.updateCombinationDisplay();
  }
}
