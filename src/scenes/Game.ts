import { Container, Text, Graphics } from "pixi.js";
import { centerObjects } from "../utils/misc";
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

  private async displayLoadingScreen() {
    const bg = new Graphics()
      .beginFill(0x0b1354)
      .drawRect(0, 0, window.innerWidth, window.innerHeight);
    const text = new Text("Loading...", {
      fontFamily: "Verdana",
      fontSize: 50,
      fill: "white",
    });
    text.resolution = 2;
    centerObjects(text);
    this.addChild(bg, text);
  }

  private onTap(isLeft: boolean) {
    this.door.doorHandle.controlAnimation(isLeft);

    isLeft
      ? this.door.inputCombination.turnCounterClockwise()
      : this.door.inputCombination.turnClockwise();

    const isValid = this.door.secretCombination.isValid(
      this.door.inputCombination
    );
    const isEqual = this.door.secretCombination.equals(
      this.door.inputCombination
    );

    if (!isValid && !isEqual) {
      this.door.doorHandle.spinLikeCrazy();
      this.door.reset();
    } else if (isValid && isEqual) {
      this.door.isOpened = true;
      this.vault.startAnimateBlinks();
      gsap.delayedCall(5, () => {
        this.door.isOpened = false;
        this.door.doorHandle.spinLikeCrazy();
        this.door.reset();
        this.vault.stopAnimateBlinks();
      });
    }
  }

  async load() {
    this.displayLoadingScreen();
    await this.utils.assetLoader.loadAssets();
  }

  async start() {
    this.removeChildren();
    this.vault = new Vault();
    this.door = new Door();

    this.addChild(this.vault);
    this.addChild(this.door);
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
