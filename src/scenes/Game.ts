import { Container, Text, Graphics } from "pixi.js";
import { centerObjects } from "../utils/misc";
import { SceneUtils } from "../core/App";
import SafeVault from "../prefabs/SafeVault";
import SafeDoor from "../prefabs/SafeDoor";

export default class Game extends Container {
  name = "Game";

  private safevault!: SafeVault;
  private safeDoor!: SafeDoor;

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
    this.safevault = new SafeVault();
    this.safeDoor = new SafeDoor();
    
    this.addChild(this.safevault);
    this.addChild(this.safeDoor);
  }
}
