import { Container, Sprite, Texture } from "pixi.js";
import gsap from "gsap";

export default class DoorHandle extends Container {
  name = "DoorHandle";

  private handleShadow: Sprite;
  private handle: Sprite;
  public currentNumber: number = 0;

  constructor() {
    super();
    this.handleShadow = new Sprite(Texture.from("handleShadow"));
    this.handle = new Sprite(Texture.from("handle"));

    this.init();
  }

  controlAnimation(isLeft: boolean) {
    const direction = isLeft ? -1 : 1;
    const currentRotation = this.handle.rotation;
    const targetRotation = currentRotation + (Math.PI / 3) * direction;
    this.currentNumber += 1;

    gsap.killTweensOf([this.handle, this.handleShadow]);
    gsap.to([this.handle, this.handleShadow], {
      rotation: targetRotation,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  spinLikeCrazy(): void {
    gsap.killTweensOf([this.handle, this.handleShadow]);

    const segments = 3 + Math.floor(Math.random() * 3); // 3-5 segments
    const timeline = gsap.timeline();

    for (let i = 0; i < segments; i++) {
      const rotations = 2 + Math.floor(Math.random() * 5); // 2-6 rotations
      const direction = Math.random() > 0.5 ? 1 : -1;
      const duration = 0.5 + Math.random() * 1; // 0.5-1.5s per segment

      timeline.to([this.handle, this.handleShadow], {
        rotation: `+=${rotations * Math.PI * 2 * direction}`,
        duration,
        ease: "power1.inOut",
      });
    }

    timeline.to([this.handle, this.handleShadow], {
      rotation: this.handle.rotation % (Math.PI * 2), // Normalize final rotation
      duration: 0.3,
    });
  }

  init() {
    this.setSize(window.innerWidth, window.innerHeight);
    this.addChild(this.handleShadow);
    this.addChild(this.handle);
  }

  setSize(width: number, height: number) {
    const scale = Math.min(width, height) / 3000; // target size / bg height in pixels
    this.handle.scale.set(scale);
    this.handle.anchor.set(0.5);
    const handleOffsetX = -20 * scale; // adjustment according to handle position on door
    const handleOffsetY = -40 * scale;
    this.handle.position.set(
      width / 2 + handleOffsetX,
      height / 2 + handleOffsetY
    );

    this.handleShadow.scale.set(scale);
    this.handleShadow.anchor.set(0.5);
    const handleShadowOffsetX = -17 * scale; // adjustment according to handle position on door
    const handleShadowOffsetY = -5 * scale;
    this.handleShadow.position.set(
      width / 2 + handleShadowOffsetX,
      height / 2 + handleShadowOffsetY
    );
  }
}
