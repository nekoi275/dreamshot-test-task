import { Sprite } from "pixi.js";

export function setupSprite(
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
