import { Container, Sprite, Texture, Graphics } from "pixi.js";
import DoorHandle from "../prefabs/DoorHandle";
import Combination from "../model/Combination";

export default class Door extends Container {
  name = "Door";

  private door: Sprite = new Sprite(Texture.from("door"));
  private doorHandle: DoorHandle = new DoorHandle();
  private doorOpenShadow: Sprite = new Sprite(Texture.from("doorOpenShadow"));
  private doorOpen: Sprite = new Sprite(Texture.from("doorOpen"));
  private _isOpened: boolean = false;
  private secretCombination: Combination = Combination.newRandom(3);
  private inputCombination: Combination = new Combination();

  constructor() {
    super();
    this.isOpened = false;

    this.init();
  }

  private setupSprite(
    sprite: Sprite,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number
  ) {
    const scale = Math.min(width, height) / 3000; // target size / bg height in pixels
    sprite.scale.set(scale);
    sprite.anchor.set(0.5);
    sprite.position.set(
      width / 2 + offsetX * scale,
      height / 2 + offsetY * scale
    );
  }

  public set isOpened(isOpened: boolean) {
    this._isOpened = isOpened;
    this.door.visible = !isOpened;
    this.doorOpen.visible = isOpened;
    this.doorOpenShadow.visible = isOpened;
    this.doorHandle.visible = !isOpened;
  }

  public get isOpened() {
    return this._isOpened;
  }

  private initHitArea(isLeft: boolean, eventHandler: (event: any) => void) {
    const scale = Math.min(window.innerWidth, window.innerHeight) / 3000;
    const angle = isLeft ? Math.PI / 2 : -Math.PI / 2;
    const hitArea = new Graphics()
      .beginFill(0, 0.01)
      .arc(-360 * scale, 0, 1750 * scale, angle, -angle)
      .closePath();

    hitArea.eventMode = "static";
    hitArea.cursor = "pointer";
    hitArea.on("pointertap", eventHandler);

    this.door.addChild(hitArea);
  }

  private onTap(isLeft: boolean) {
    this.doorHandle.controlAnimation(isLeft);

    isLeft
      ? this.inputCombination.turnCounterClockwise()
      : this.inputCombination.turnClockwise();

    const isValid = this.secretCombination.isValid(this.inputCombination);
    const isEqual = this.secretCombination.equals(this.inputCombination);

    if (!isValid && !isEqual) {
      this.doorHandle.spinLikeCrazy();
      this.reset();
    } else if (isValid && isEqual) {
      this.isOpened = true;
    }
  }

  private reset() {
    this.secretCombination = Combination.newRandom(3);
    this.inputCombination = new Combination();
    console.log(this.secretCombination.toString());
  }

  init() {
    this.setSize(window.innerWidth, window.innerHeight);
    this.addChild(this.door);
    this.addChild(this.doorHandle);
    this.addChild(this.doorOpenShadow);
    this.addChild(this.doorOpen);
    console.log(this.secretCombination.toString());
    this.initHitArea(true, () => {
      this.onTap(true);
    });
    this.initHitArea(false, () => {
      this.onTap(false);
    });
  }

  setSize(width: number, height: number) {
    this.setupSprite(this.door, width, height, 66, -40);
    this.setupSprite(this.doorOpenShadow, width, height, 1520, 20);
    this.setupSprite(this.doorOpen, width, height, 1450, -40);

    this.doorHandle.setSize(width, height);
  }
}
