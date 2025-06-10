import { Container, Sprite, Texture } from "pixi.js";
import DoorHandle from "../prefabs/DoorHandle";

export default class Door extends Container {
  name = "Door";

  private door: Sprite;
  private doorHandle: DoorHandle;

  constructor() {
    super();
    this.door = new Sprite(Texture.from("door"));
    this.doorHandle = new DoorHandle();
    this.init();
  }

  init() {
    this.setSize(window.innerWidth, window.innerHeight);
    this.addChild(this.door);
    this.addChild(this.doorHandle);
  }

  setSize(width: number, height: number) {
    const scale = Math.min(width, height) / 3000; // target size / bg height in pixels
    this.door.scale.set(scale);
    this.door.anchor.set(0.5);
    const offsetY = -40 * scale; // adjustment according to door position on bg
    const offsetX = 66 * scale;
    this.door.position.set(width / 2 + offsetX, height / 2 + offsetY);
    this.doorHandle.setSize(width, height);
  }
}
