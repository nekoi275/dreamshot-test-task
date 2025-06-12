import { Container, Sprite, Texture, Graphics } from "pixi.js";

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

  private initHitArea(
    isLeft: boolean,
    eventHandler: (event: any) => void
  ) {
    const angle = isLeft ? Math.PI / 2 : -Math.PI / 2;
    const hitArea = new Graphics()
      .beginFill(0, 0.01)
      .arc(0, 0, this.handle.texture.width, angle, -angle)
      .closePath();
    hitArea.eventMode = "static";
    hitArea.cursor = "pointer";
    hitArea.on("pointertap", eventHandler);
    this.handle.addChild(hitArea);
  }

  init() {
    this.setSize(window.innerWidth, window.innerHeight);
    this.addChild(this.handleShadow);
    this.addChild(this.handle);
    this.initHitArea(false, () => {
      console.log("right");
    });
    this.initHitArea(true, () => {
        console.log("left");
      });
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
