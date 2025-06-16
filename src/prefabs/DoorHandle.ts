import { Container, Sprite, Texture } from "pixi.js";
import gsap from "gsap";
import { setupSprite } from "../utils/misc";

export default class DoorHandle extends Container {
  name = "DoorHandle";

  private handleShadow: Sprite;
  private handle: Sprite;

  constructor() {
    super();
    this.handleShadow = new Sprite(Texture.from("handleShadow"));
    this.handle = new Sprite(Texture.from("handle"));

    this.init();
  }

  rotationAnimation(isLeft: boolean) {
    const direction = isLeft ? -1 : 1;
    const currentRotation = this.handle.rotation;
    const targetRotation = currentRotation + (Math.PI / 3) * direction;

    gsap.killTweensOf([this.handle, this.handleShadow]);
    gsap.to([this.handle, this.handleShadow], {
      rotation: targetRotation,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  spinLikeCrazy(onComplete: () => void): void {
    gsap.killTweensOf([this.handle, this.handleShadow]);

    const segments = 3 + Math.floor(Math.random() * 3); // 3-5 segments
    let timeline = gsap.timeline();

    for (let i = 0; i < segments; i++) {
      const rotations = 2 + Math.floor(Math.random() * 5); // 2-6 rotations
      const direction = Math.random() > 0.5 ? 1 : -1;
      const duration = 0.5 + Math.random() * 1; // 0.5-1.5s per segment

      timeline = timeline.to([this.handle, this.handleShadow], {
        rotation: `+=${rotations * Math.PI * 2 * direction}`,
        duration,
        ease: "power1.inOut",
      });
    }

    timeline = timeline
      .to([this.handle, this.handleShadow], {
        rotation: this.handle.rotation % (Math.PI * 2), // normalize final rotation
        duration: 0.3,
      })
      .eventCallback("onComplete", onComplete);
  }

  init() {
    this.setSize(window.innerWidth, window.innerHeight);
    this.addChild(this.handleShadow);
    this.addChild(this.handle);
  }

  setSize(width: number, height: number) {
    setupSprite(this.handle, width, height, -20, -40);
    setupSprite(this.handleShadow, width, height, -17, -5);
  }
}
