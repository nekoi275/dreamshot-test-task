import { Container, Sprite, Texture } from "pixi.js";

export default class Vault extends Container {
  name = "Vault";
  private bg: Sprite;
  private combination: string[] = [];

  constructor() {
    super();
    this.bg = new Sprite(Texture.from("bg"));
    this.init();
  }

  private generateCombination(): string[] {
    const directions = ["clockwise", "counterclockwise"];
    const combo: string[] = [];

    for (let i = 0; i < 3; i++) {
      const number = Math.floor(Math.random() * 9) + 1;
      const direction = directions[Math.floor(Math.random() * 2)];
      combo.push(`${number} ${direction}`);
    }

    console.log("Safe combination:", combo.join(", "));
    this.combination = combo;
    return combo;
  }

  init() {
    this.setSize(window.innerWidth, window.innerHeight)

    this.addChild(this.bg);
    this.generateCombination();
  }

  setSize(width: number, height: number) {
    const targetSize = Math.min(width, height);
    const scale = targetSize / this.bg.texture.height;

    this.bg.scale.set(scale);
    this.bg.anchor.set(0.5);
    this.bg.position.set(width / 2, height / 2);
  }
}
