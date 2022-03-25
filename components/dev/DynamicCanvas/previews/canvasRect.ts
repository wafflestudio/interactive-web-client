export const drawRect = (
  ctx: CanvasRenderingContext2D,
  info: {x: number; y: number; w: number; h: number},
  style = {}
) => {
  const {x, y, w, h} = info
  ctx.fillRect(x, y, w, h)
}
