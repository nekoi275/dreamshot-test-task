import { Container, Sprite, Texture } from "pixi.js";

export type DoorConfig = {
  layers: string[];
};

export default class SafeDoor extends Container {
  name = "SafeDoor";

  constructor() {
    super();
    this.init();
  }

  async init() {
    const doorTexture = Texture.from("door");
    const doorSprite = new Sprite(doorTexture);
    doorSprite.scale.set(0.2);
    doorSprite.anchor.set(0.5);
    doorSprite.x = window.innerWidth / 2;
    doorSprite.y = window.innerHeight / 2;
    const handleShadowTexture = Texture.from("handleShadow");
    const handleShadowSprite = new Sprite(handleShadowTexture);
    handleShadowSprite.scale.set(0.3);
    handleShadowSprite.anchor.set(0.5);
    handleShadowSprite.x = window.innerWidth / 2;
    handleShadowSprite.y = window.innerHeight / 2;
    const handleTexture = Texture.from("handle");
    const handle = new Sprite(handleTexture);
    handle.scale.set(0.3);
    handle.anchor.set(0.5);
    handle.x = window.innerWidth / 2;
    handle.y = window.innerHeight / 2;
    this.addChild(doorSprite);
    this.addChild(handleShadowSprite);
    this.addChild(handle);
  }
}
