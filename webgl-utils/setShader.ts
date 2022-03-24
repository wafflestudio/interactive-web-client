export const setShader = (
  gl: WebGL2RenderingContext,
  type: any,
  source: any
) => {
  const shader = gl.createShader(type)
  if (shader) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader
    } else {
      console.log(gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
    }
  }
}
