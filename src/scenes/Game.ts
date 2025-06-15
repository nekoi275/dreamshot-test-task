import { Container } from "pixi.js";
import { SceneUtils } from "../core/App";
import Vault from "../prefabs/Vault";
import Door from "../prefabs/Door";
import { gsap } from "gsap";

export default class Game extends Container {
  name = "Game";

  private vault!: Vault;
  private door!: Door;

  constructor(protected utils: SceneUtils) {
    super();
  }

  private onTap(isLeft: boolean) {
    this.door.doorHandle.rotationAnimation(isLeft);

    isLeft
      ? this.door.inputCombination.turnCounterClockwise()
      : this.door.inputCombination.turnClockwise();

    const isValid = this.door.secretCombination.isValid(
      this.door.inputCombination
    );
    const isEqual = this.door.secretCombination.equals(
      this.door.inputCombination
    );

    if (!isValid) {
      this.vault.stopTimer();
      this.door.doorHandle.spinLikeCrazy(() => this.resetGame());
    } else if (isEqual) {
      this.door.isOpened = true;
      this.vault.startAnimateBlinks();
      this.vault.stopTimer();
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
    this.door.reset();
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
    [this.vault, this.door].every((item) => item.setSize(width, height));
  }
}
