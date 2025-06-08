import { Container, Sprite, Texture } from "pixi.js";

export type VaultConfig = {
  layers: string[];
};

export default class SafeVault extends Container {
  name = "SafeVault";
  private bg: Sprite | null = null;
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

  async init() {
    const texture = Texture.from("bg");
    this.bg = new Sprite(texture);
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    if (this.bg) {
      this.addChild(this.bg);
    }
    this.generateCombination();
  }
}

