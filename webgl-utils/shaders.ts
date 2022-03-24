export const vsRectSource = `
    attribute vec2 a_position;

    void main() {
      gl_Position = v_position;
    }
  `

export const fsRectSource = (fill: string) => `
    precision mediump float;
    
    void main() {
      gl_FragColor = vec4(1, 0, 0.5, 1);
    }
  `
