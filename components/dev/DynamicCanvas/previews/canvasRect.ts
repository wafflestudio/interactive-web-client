export const drawEllipse = (
  ctx: CanvasRenderingContext2D,
  geometry: { x: number; y: number; w: number; h: number },
  fill: string,
  stroke: string,
) => {
  const { x, y, w, h } = geometry;
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
};

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  geometry: { x: number; y: number; w: number; h: number },
  fill: string,
  stroke: string,
) => {
  const { x, y, w, h } = geometry;
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fill();
  ctx.stroke();
};
