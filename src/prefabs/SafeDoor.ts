import { Container, Sprite, Texture, Graphics } from "pixi.js";

export default class SafeDoor extends Container {
  name = "SafeDoor";

  private door: Sprite;
  private handleShadow: Sprite;
  private handle: Sprite;

  constructor() {
    super();
    this.door = new Sprite(Texture.from("door"));
    this.handleShadow = new Sprite(Texture.from("handleShadow"));
    this.handle = new Sprite(Texture.from("handle"));

    this.init();
  }

  private setDoorSize(scale: number, width: number, height: number) {
    this.door.scale.set(scale);
    this.door.anchor.set(0.5);
    const offsetY = -40 * scale; // adjustment according to door position on bg
    const offsetX =  66 * scale; 
    this.door.position.set(width / 2 + offsetX, height / 2 + offsetY);
  }
  
  private setHandleSize(scale: number, width: number, height: number) {
    this.handle.scale.set(scale);
    this.handle.anchor.set(0.5);
    const handleOffsetX = -20 * scale; // adjustment according to handle position on door
    const handleOffsetY = -40 * scale;
    this.handle.position.set(width / 2 + handleOffsetX, height / 2 + handleOffsetY);

    this.handleShadow.scale.set(scale);
    this.handleShadow.anchor.set(0.5);
    const handleShadowOffsetX = -17 * scale; // adjustment according to handle position on door
    const handleShadowOffsetY = -5 * scale;
    this.handleShadow.position.set(width / 2 + handleShadowOffsetX, height / 2 + handleShadowOffsetY);
  }

  init() {
    this.setSize(window.innerWidth, window.innerHeight);

    this.addChild(this.door);
    this.addChild(this.handleShadow);
    this.addChild(this.handle);
  }
  
  setSize(width: number, height: number) {
    const scale = Math.min(width, height) / 3000; // target size / bg height in pixels
    this.setDoorSize(scale, width, height);
    this.setHandleSize(scale, width, height);
  }
}
