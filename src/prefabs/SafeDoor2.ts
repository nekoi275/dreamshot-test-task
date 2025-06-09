import { Container, Sprite, Texture, Graphics } from "pixi.js";

export default class SafeDoor extends Container {
  name = "SafeDoor";

  private door: Sprite;
  private handleShadow: Sprite;

  constructor() {
    super();
    this.door = new Sprite(Texture.from("door"));
    this.handleShadow = new Sprite(Texture.from("handleShadow"));

    this.init();
  }

  init() {
    this.setSize(window.innerWidth, window.innerHeight);

    this.addChild(this.door);
    this.addChild(this.handleShadow);
  }

  setSize(width: number, height: number) {
    const targetSize = Math.min(width, height);
    
    const bgDoorRatio = 1832 / 3000; // door height / bg height in pixels
    const scale = targetSize / this.door.texture.height * bgDoorRatio;

    this.door.scale.set(scale);
    this.door.anchor.set(0.5);
    const offsetY = -40 * scale; // adjustment according to door position on bg
    const offsetX =  66 * scale; // adjustment according to door position on bg
    this.door.position.set(width / 2 + offsetX, height / 2 + offsetY);
  }
}
