import { Container, Sprite, Texture } from "pixi.js";

export default class Vault extends Container {
  name = "Vault";
  private bg: Sprite;

  constructor() {
    super();
    this.bg = new Sprite(Texture.from("bg"));
    this.init();
  }

  init() {
    this.setSize(window.innerWidth, window.innerHeight)
    this.addChild(this.bg);
  }

  setSize(width: number, height: number) {
    const targetSize = Math.min(width, height);
    const scale = targetSize / this.bg.texture.height;

    this.bg.scale.set(scale);
    this.bg.anchor.set(0.5);
    this.bg.position.set(width / 2, height / 2);
  }
}

