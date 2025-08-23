import { Container } from "pixi.js";
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

  constructor(protected utils: SceneUtils) {
    super();
    console.log(this.secretCombination.toString());
  }

  private onTap(isLeft: boolean) {
    if (!this.door.doorHandle.isControlable) return;
    this.door.doorHandle.rotationAnimation(isLeft);

    isLeft
      ? this.inputCombination.turnCounterClockwise()
      : this.inputCombination.turnClockwise();

    const isValid = this.secretCombination.isValid(
      this.inputCombination
    );
    const isEqual = this.secretCombination.equals(
      this.inputCombination
    );

    if (!isValid) {
      this.vault.stopTimer();
      this.door.doorHandle.spinLikeCrazy(() => this.resetGame());
    } else if (isEqual) {
      gsap.delayedCall(0.3, () => {
        this.door.isOpened = true;
        this.vault.startAnimateBlinks();
        this.vault.stopTimer();
      });
      gsap.delayedCall(
        5,
        (callback: () => void) => {
          this.door.isOpened = false;
          this.door.doorHandle.spinLikeCrazy(callback);
        },
        [() => this.resetGame()]
      );
    }
  }

  private resetGame() {
    this.secretCombination = Combination.newRandom(3);
    this.inputCombination = new Combination();
    console.log(this.secretCombination.toString());
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
    [this.vault, this.door].every((item) => this.addChild(item));
    this.door.initHitArea(true, () => {
      this.onTap(true);
    });
    this.door.initHitArea(false, () => {
      this.onTap(false);
    });
  }

  onResize(width: number, height: number) {
    this.vault.setSize(width, height);
    this.door.setSize(width, height);
  }
}
