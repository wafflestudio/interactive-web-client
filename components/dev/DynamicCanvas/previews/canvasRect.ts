export const drawRect = (
  ctx: CanvasRenderingContext2D,
  info: {x: number; y: number; w: number; h: number},
  fill: string
) => {
  const {x, y, w, h} = info
  ctx.globalAlpha = 0.5
  ctx.fillStyle = fill
  ctx.fillRect(x, y, w, h)
}
