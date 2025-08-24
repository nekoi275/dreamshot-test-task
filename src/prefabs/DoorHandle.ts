import { Container, Sprite, Texture } from "pixi.js";
import gsap from "gsap";
import { setupSprite } from "../utils/misc";

export default class DoorHandle extends Container {
  name = "DoorHandle";

  private handleShadow: Sprite;
  private handle: Sprite;
  isControlable: boolean;

  constructor() {
    super();
    this.handleShadow = new Sprite(Texture.from("handleShadow"));
    this.handle = new Sprite(Texture.from("handle"));
    this.isControlable = true;

    this.init();
  }

  rotationAnimation(isLeft: boolean): Promise<gsap.core.Tween> {
    const direction = isLeft ? -1 : 1;
    const currentRotation = this.handle.rotation;
    const targetRotation = currentRotation + (Math.PI / 3) * direction;

    gsap.killTweensOf([this.handle, this.handleShadow]);
    return gsap.to([this.handle, this.handleShadow], {
      rotation: targetRotation,
      duration: 0.3,
      ease: "power2.out",
    }).then();
  }

  spinLikeCrazy(): Promise<gsap.core.Timeline> {
    this.isControlable = false;
    gsap.killTweensOf([this.handle, this.handleShadow]);

    const segments = 2 + Math.floor(Math.random() * 2); // 2-3 segments (reduced from 3-5)
    let timeline = gsap.timeline();

    for (let i = 0; i < segments; i++) {
      const rotations = 1 + Math.floor(Math.random() * 2); // 1-2 rotations (reduced from 2-6)
      const direction = Math.random() > 0.5 ? 1 : -1;
      const duration = 0.2 + Math.random() * 0.3; // 0.2-0.5s per segment (reduced from 0.5-1.5s)

      timeline = timeline.to([this.handle, this.handleShadow], {
        rotation: `+=${rotations * Math.PI * 2 * direction}`,
        duration,
        ease: "power1.inOut",
      });
    }

    return timeline
      .to([this.handle, this.handleShadow], {
        rotation: this.handle.rotation % (Math.PI * 2),
        duration: 0.2, // reduced from 0.3s
      })
      .then(() => { this.isControlable = true });
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
