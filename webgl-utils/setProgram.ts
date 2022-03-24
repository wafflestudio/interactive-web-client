export const setProgram = (
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) => {
  const program = gl.createProgram()
  if (program) {
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      //if program linking success
      return program
    } else {
      console.log(gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
    }
  }
}
