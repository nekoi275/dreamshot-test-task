import { Container, Sprite, Texture, Graphics } from "pixi.js";
import DoorHandle from "../prefabs/DoorHandle";

export default class Door extends Container {
  name = "Door";

  private door: Sprite;
  private doorHandle: DoorHandle;
  private doorOpenShadow: Sprite;
  private doorOpen: Sprite;
  private _isOpened: boolean = false;

  constructor() {
    super();
    this.door = new Sprite(Texture.from("door"));
    this.doorHandle = new DoorHandle();
    this.doorOpenShadow = new Sprite(Texture.from("doorOpenShadow"));
    this.doorOpen = new Sprite(Texture.from("doorOpen"));
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

  init() {
    this.setSize(window.innerWidth, window.innerHeight);
    this.addChild(this.door);
    this.addChild(this.doorHandle);
    this.addChild(this.doorOpenShadow);
    this.addChild(this.doorOpen);
    this.initHitArea(true, () => {
      console.log("left");
      this.doorHandle.controlAnimation(true);
    });
    this.initHitArea(false, () => {
      console.log("right");
      this.doorHandle.controlAnimation(false);
    });
  }

  setSize(width: number, height: number) {
    this.setupSprite(this.door, width, height, 66, -40);
    this.setupSprite(this.doorOpenShadow, width, height, 1520, 20);
    this.setupSprite(this.doorOpen, width, height, 1450, -40);

    this.doorHandle.setSize(width, height);
  }
}
