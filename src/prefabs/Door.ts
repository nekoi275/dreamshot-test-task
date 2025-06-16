import { Container, Sprite, Texture, Graphics } from "pixi.js";
import DoorHandle from "../prefabs/DoorHandle";
import Combination from "../model/Combination";
import { setupSprite } from "../utils/misc";

export default class Door extends Container {
  name = "Door";

  private door: Sprite = new Sprite(Texture.from("door"));
  private doorOpenShadow: Sprite = new Sprite(Texture.from("doorOpenShadow"));
  private doorOpen: Sprite = new Sprite(Texture.from("doorOpen"));
  private _isOpened: boolean = false;
  doorHandle: DoorHandle = new DoorHandle();
  secretCombination: Combination = Combination.newRandom(3);
  inputCombination: Combination = new Combination();

  constructor() {
    super();
    console.log(this.secretCombination.toString());
    this.isOpened = false;
    this.init();
  }

  set isOpened(isOpened: boolean) {
    this._isOpened = isOpened;
    this.door.visible = !isOpened;
    this.doorOpen.visible = isOpened;
    this.doorOpenShadow.visible = isOpened;
    this.doorHandle.visible = !isOpened;
  }

  get isOpened() {
    return this._isOpened;
  }

  reset() {
    this.secretCombination = Combination.newRandom(3);
    this.inputCombination = new Combination();
    console.log(this.secretCombination.toString());
  }

  initHitArea(isLeft: boolean, eventHandler: (event: any) => void) {
    const scale = this.door.scale._x;
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

  init() {
    this.setSize(window.innerWidth, window.innerHeight);
    [this.door, this.doorHandle, this.doorOpenShadow, this.doorOpen].every(
      (item) => this.addChild(item)
    );
  }

  setSize(width: number, height: number) {
    setupSprite(this.door, width, height, 66, -40);
    setupSprite(this.doorOpenShadow, width, height, 1520, 20);
    setupSprite(this.doorOpen, width, height, 1450, -40);

    this.doorHandle.setSize(width, height);
  }
}
