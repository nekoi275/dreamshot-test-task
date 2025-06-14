import { Container, Sprite, Texture } from "pixi.js";
import { gsap } from "gsap";

export default class Vault extends Container {
  name = "Vault";
  private bg: Sprite = new Sprite(Texture.from("bg"));
  private blink1: Sprite = new Sprite(Texture.from("blink"));
  private blink2: Sprite = new Sprite(Texture.from("blink"));
  private blink3: Sprite = new Sprite(Texture.from("blink"));

  constructor() {
    super();
    this.init();
  }

  private setupSprite(
    sprite: Sprite,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number
  ) {
    const scale = Math.min(width, height) / 3000; // target size / bg height in pixels
    sprite.scale.set(scale);
    sprite.anchor.set(0.5);
    sprite.position.set(
      width / 2 + offsetX * scale,
      height / 2 + offsetY * scale
    );
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
        rotation: Math.PI / 8,
        duration: 2,
        delay,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    };

    blinkAnimation(this.blink1, 0);
    blinkAnimation(this.blink2, 0.3);
    blinkAnimation(this.blink3, 0.6);
  }

  init() {
    this.setSize(window.innerWidth, window.innerHeight);
    this.addChild(this.bg);
    this.addChild(this.blink1);
    this.addChild(this.blink2);
    this.addChild(this.blink3);
  }

  setSize(width: number, height: number) {
    const targetSize = Math.min(width, height);
    const scale = targetSize / this.bg.texture.height;

    this.bg.scale.set(scale);
    this.bg.anchor.set(0.5);
    this.bg.position.set(width / 2, height / 2);

    this.setupSprite(this.blink1, width, height, -100, -40);
    this.setupSprite(this.blink2, width, height, 200, 350);
    this.setupSprite(this.blink3, width, height, -480, -40);
  }
}
