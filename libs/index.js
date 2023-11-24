function initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  // 添加源码
  gl.shaderSource(vertexShader, VERTEX_SHADER_SOURCE)
  gl.shaderSource(fragmentShader, FRAGMENT_SHADER_SOURCE)
  // 编译源码
  gl.compileShader(vertexShader)
  gl.compileShader(fragmentShader)
  // opengl程序对象
  const program = gl.createProgram()
  // 添加程序 / 链接程序 / 使用程序
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.useProgram(program)
  return program
}

function getTranslateMatrix(x = 0, y = 0, z = 0) {
  return new Float32Array([
    1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, x, y, z, 1.0
  ])
}

function getRotateZMatrix(deg) {
  const cos = Math.cos
  const sin = Math.sin
  return new Float32Array([
    cos(deg), sin(deg), 0.0, 0.0, -sin(deg), cos(deg), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0
  ])
}

function getScaleMatrix(x = 1, y = 1, z = 1) {
  return new Float32Array([
    x, 0.0, 0.0, 0.0, 0.0, y, 0.0, 0.0, 0.0, 0.0, z, 0.0, 0.0, 0.0, 0.0, 1.0
  ])
}

function mixMatrix(a, b) {
  const result = new Float32Array(16)
  for (let i = 0; i < 4; i++) {
    result[i] = a[i] * b[0] + a[i + 4] * b[1] + a[i + 8] * b[2] + a[i + 12] * b[3]
    result[i + 4] = a[i] * b[4] + a[i + 4] * b[5] + a[i + 8] * b[6] + a[i + 12] * b[7]
    result[i + 8] = a[i] * b[8] + a[i + 4] * b[9] + a[i + 8] * b[10] + a[i + 12] * b[11]
    result[i + 12] = a[i] * b[12] + a[i + 4] * b[13] + a[i + 8] * b[14] + a[i + 12] * b[15]
  }
  return result
}

// 归一化
function normalized(arr) {
  const sum = arr.reduce((prev, cur) => prev + cur * cur, 0)
  const middle = Math.sqrt(sum)
  return arr.map(item => item / middle)
}

// 向量叉积，获取法向量
function cross(a, b) {
  return new Float32Array([
    a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]
  ])
}

// 点积，求投影长度
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

// 向量差
function minus(a, b) {
  return new Float32Array([
    a[0] - b[0], a[1] - b[1], a[2] - b[2]
  ])
}

// 获取视图矩阵
function getViewMatrix(eyex,eyey,eyez,lookAtx,lookAty,lookAtz,upx,upy,upz) {
  const eye = new Float32Array([eyex,eyey,eyez])
  const lookAt = new Float32Array([lookAtx,lookAty,lookAtz])
  const up = new Float32Array([upx,upy,upz])
  const z = minus(eye, lookAt)
  normalized(z)
  normalized(up)
  const x = cross(z, up)
  normalized(x)
  const y = cross(x, z)
  return new Float32Array([
    x[0], y[0], z[0], 0.0,
    x[1], y[1], z[1], 0.0,
    x[2], y[2], z[2], 0.0,
    -dot(x, eye), -dot(y, eye), -dot(z, eye), 1.0
  ])
}

// 获取正射投影矩阵
function getOrthoMatrix(left, right, bottom, top, near, far) {
  return new Float32Array([
    2.0 / (right - left), 0.0, 0.0, 0.0,
    0.0, 2.0 / (top - bottom), 0.0, 0.0,
    0.0, 0.0, -2.0 / (far - near), 0.0,
    -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1.0
  ])
}

// 获取透视投影矩阵
function getPerspectiveMatrix(fov, aspect, near, far) {
  fov = fov * Math.PI / 180
  return new Float32Array([
    1/(aspect*Math.tan(fov/2)), 0.0, 0.0, 0.0,
    0.0, 1/Math.tan(fov/2), 0.0, 0.0,
    0.0, -(far+near)/(far-near), -(2*far*near)/(far-near), 0.0,
    0.0,0.0,-1.0,0.0,
  ])
}
