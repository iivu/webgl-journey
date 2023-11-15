function initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    // 添加源码
    gl.shaderSource(vertexShader, VERTEX_SHADER_SOURCE);
    gl.shaderSource(fragmentShader, FRAGMENT_SHADER_SOURCE);
    // 编译源码
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    // opengl程序对象
    const program = gl.createProgram();
    // 添加程序 / 链接程序 / 使用程序
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
}

function getTranslateMatrix(x = 0, y = 0, z = 0) {
    return new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        x, y, z, 1.0
    ])
}

function getRotateZMatrix(deg) {
    const cos = Math.cos
    const sin = Math.sin
    return new Float32Array([
        cos(deg), sin(deg), 0.0, 0.0,
        -sin(deg), cos(deg), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ])
}

function getScaleMatrix(x = 1, y = 1, z = 1) {
    return new Float32Array([
        x, 0.0, 0.0, 0.0,
        0.0, y, 0.0, 0.0,
        0.0, 0.0, z, 0.0,
        0.0, 0.0, 0.0, 1.0
    ])
}
