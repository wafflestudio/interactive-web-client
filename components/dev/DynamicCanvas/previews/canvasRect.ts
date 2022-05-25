export const drawEllipse = (
  ctx: CanvasRenderingContext2D,
  geometry: { x: number; y: number; w: number; h: number },
  fill: string,
) => {
  const { x, y, w, h } = geometry;
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 2 * Math.PI);
  ctx.fill();
};

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  geometry: { x: number; y: number; w: number; h: number },
  fill: string,
) => {
  const { x, y, w, h } = geometry;
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fill();
};
