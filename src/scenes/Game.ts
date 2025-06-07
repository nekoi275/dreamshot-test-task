import { Container, Text, Graphics } from "pixi.js";
import { centerObjects } from "../utils/misc";
import { SceneUtils } from "../core/App";

export default class Game extends Container {
  name = "Game";

  constructor(protected utils: SceneUtils) {
    super();
  }

  async load() {

    const bg = new Graphics().beginFill(0x0b1354).drawRect(0, 0, window.innerWidth, window.innerHeight)

    const text = new Text("Loading...", {
      fontFamily: "Verdana",
      fontSize: 50,
      fill: "white",
    });

    text.resolution = 2;

    centerObjects(text);

    this.addChild(bg, text);

    await this.utils.assetLoader.loadAssets();
  }

  async start() {
    console.log('started')
  }

  update(delta: number) {
  }

  onResize(width: number, height: number) {
  }
}