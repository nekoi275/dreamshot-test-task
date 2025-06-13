import { Container, Text, Graphics } from "pixi.js";
import { centerObjects } from "../utils/misc";
import { SceneUtils } from "../core/App";
import Vault from "../prefabs/Vault";
import Door from "../prefabs/Door";
import Combination from "../model/Combination";

export default class Game extends Container {
  name = "Game";

  private vault!: Vault;
  private door!: Door;
  private combination!: Combination;

  constructor(protected utils: SceneUtils) {
    super();
  }

  private async displayLoadingScreen() {
    const bg = new Graphics()
      .beginFill(0x0b1354)
      .drawRect(0, 0, window.innerWidth, window.innerHeight);
    const text = new Text("Loading...", {
      fontFamily: "Verdana",
      fontSize: 50,
      fill: "white",
    });
    text.resolution = 2;
    centerObjects(text);
    this.addChild(bg, text);
  }

  async load() {
    this.displayLoadingScreen();
    await this.utils.assetLoader.loadAssets();
  }

  async start() {
    this.removeChildren();    
    this.vault = new Vault();
    this.door = new Door();
    
    this.addChild(this.vault);
    this.addChild(this.door);
    this.combination = Combination.generateRandom(3);
    console.log(this.combination.toString());
  }

  onResize(width: number, height: number) {
    this.vault.setSize(width, height);
    this.door.setSize(width, height);
  }
}
