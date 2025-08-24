import { Container, Sprite, Text, Texture, Ticker } from "pixi.js";
import { gsap } from "gsap";
import { setupSprite } from "../utils/misc";

export default class Vault extends Container {
  name = "Vault";
  private bg: Sprite = new Sprite(Texture.from("bg"));
  private blinks: Sprite[];
  private timerText: Text;
  private timerTicker: () => void = () => {};

  constructor() {
    super();
    this.blinks = Array.from(
      { length: 3 },
      () => new Sprite(Texture.from("blink"))
    );
    this.timerText = new Text("00:00", {
      fill: 0xffffff,
      fontSize: 60,
    });
    this.init();
  }

  startAnimateBlinks() {
    const blinkAnimation = (sprite: Sprite, delay: number) => {
      gsap.to(sprite, {
        alpha: 0.3,
        duration: 0.5,
        delay,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(sprite.scale, {
        x: sprite.scale.x * 1.2,
        y: sprite.scale.y * 1.2,
        duration: 1,
        delay,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      });
      gsap.to(sprite, {
        rotation: Math.PI / 4,
        duration: 2,
        delay,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    };

    this.blinks.forEach((blink, i) => {
      blinkAnimation(blink, i * 0.3);
    });
  }

  stopAnimateBlinks() {
    this.blinks.forEach((item) => gsap.killTweensOf(item));
    this.blinks.forEach((item) => (item.alpha = 1));
  }

  init() {
    this.resetTimer();
    this.setSize(window.innerWidth, window.innerHeight);
    this.addChild(this.bg);
    this.addChild(...this.blinks);
    this.addChild(this.timerText);
  }

  resetTimer() {
    this.timerText.text = "00:00";

    let gameStartTime = Date.now();

    this.timerTicker = () => {
      const elapsedSeconds = Math.floor((Date.now() - gameStartTime) / 1000);
      const minutes = Math.floor(elapsedSeconds / 60);
      const seconds = elapsedSeconds % 60;
      this.timerText!.text = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    };
    Ticker.shared.add(this.timerTicker);
  }

  stopTimer() {
    Ticker.shared.remove(this.timerTicker);
  }

  setSize(width: number, height: number) {
    const targetSize = Math.min(width, height);
    const scale = targetSize / this.bg.texture.height;

    this.bg.scale.set(scale);
    this.bg.anchor.set(0.5);
    this.bg.position.set(width / 2, height / 2);

    const blinkPositions = [
      { x: -100, y: -40 },
      { x: 200, y: 350 },
      { x: -480, y: -40 },
    ];

    this.blinks.forEach((blink, i) => {
      setupSprite(
        blink,
        width,
        height,
        blinkPositions[i].x,
        blinkPositions[i].y
      );
    });
    setupSprite(this.timerText, width, height, -1178, -145);
  }
}
