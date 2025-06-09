import { Container, Sprite, Texture, Graphics } from "pixi.js";

export type VaultConfig = {
  layers: string[];
};

export default class SafeVault extends Container {
  name = "SafeVault";
  private bg?: Sprite;
  private combination: string[] = [];

  constructor() {
    super();
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
    const texture = Texture.from("bg");
    this.bg = new Sprite(texture);
    this.resize(window.innerWidth, window.innerHeight)

    this.addChild(this.bg);
    this.generateCombination();
  }

  resize(width: number, height: number) {
    if (!this.bg) return;
    const targetSize = Math.min(width, height);
    const scale = targetSize / this.bg.texture.height;

    this.bg.scale.set(scale);
    this.bg.anchor.set(0.5);
    this.bg.position.set(width / 2, height / 2);
  }
}
