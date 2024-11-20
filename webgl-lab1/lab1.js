//------------------------------ PARAMS ---------------------------------
var gl;
var shaderProgram;
var currentShape;
var canvas;

var shapes = [];
var color = new Color(1,0,0);
var mouseP = [0.5,0.5];

var mvMatrix = mat4.create();

//------------------------------ HELPER ---------------------------------
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function resizeWindow() {
    var result = prompt("Enter \"width,height\": ");
    var pieces = result.split(",");
    var width = Number(pieces[0]);
    var height = Number(pieces[1]);
    if(isNaN(width) || isNaN(height)) {
        alert("Bad formatting, try this without quotes: " +
                "\"#,#\"");
    } else {
        //resize
        canvas.width = width;
        canvas.height = height;
        gl.viewportWidth = canvas.width;   // the width of the canvas
        gl.viewportHeight = canvas.height; // the height 
        initBuffers();
        drawScene();
    }
}

//------------------------------ INITIALIZE ---------------------------------
function setText() {
    text = document.getElementById("mouseP");
    text.innerHTML = "" + mouseP[0].toFixed(2) + ", " + mouseP[1].toFixed(2);
}
function webGLStart() {
	canvas = document.getElementById("code00-canvas");

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);

	initGL(canvas);
    initShaders();

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.transUniform = gl.getUniformLocation(shaderProgram, "translation");

    initBuffers();

    clear(0,0,0);
    drawScene();
}


function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");  // the graphics context 
        gl.viewportWidth = canvas.width;   // the width of the canvas
        gl.viewportHeight = canvas.height; // the height 
    } catch (e) { } 
    if (!gl) {
        alert("WebGL is not supported or working");
    }
    
}
function initBufferForSquare(s)
{
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    vertices = s.vertices;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexBuffer.vertexSize = s.vertexSize;
    vertexBuffer.numVertices = s.numVertices;
    s.vbuf = vertexBuffer;

    colorBuffer = gl.createBuffer();
    s.cbuf = colorBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var colors = s.colors;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    colorBuffer.vertexSize = s.vertexSize;
    colorBuffer.numVertices = s.numVertices;
}

function initBuffers(){
    for (i in shapes){
        initBufferForSquare(shapes[i]);
    }
}

//------------------------------ DRAW MECHANICS---------------------------------
function clear(r,g,b)
{
    gl.clearColor(r,g,b,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
}

function drawBuffers(shape, draw_type)
{
    buf = shape.vbuf;
    col = shape.cbuf;
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    mat4.identity(mvMatrix);
    Z_angle = 0;
    mvMatrix = mat4.rotate(mvMatrix, degToRad(Z_angle), [0, 0, 1]); 

    var offset = 0; 
    var stride = 0; 

    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, buf.vertexSize, gl.FLOAT, false, stride, offset);

    gl.bindBuffer(gl.ARRAY_BUFFER, col);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,col.vertexSize, gl.FLOAT, false, stride, offset);

    //translations and rotations! by setting uniform in vertex shader
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    gl.uniform2f(shaderProgram.transUniform, shape.position[1], shape.position[0]); 

    //type of draw
    draw_type = shape.draw_type;
    if(draw_type == 2){
        gl.drawArrays(gl.TRIANGLE_FAN, 0, buf.numVertices);
    } else if (draw_type == 1){
        gl.drawArrays(gl.LINE_LOOP, 0, buf.numVertices);
    } else if (draw_type == 0){
        gl.drawArrays(gl.POINTS, 0, buf.numVertices);
    } 
}

function drawScene()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for (i in shapes) {
        drawBuffers(shapes[i], 2);
    }
}

//------------------------------ EVENTS ---------------------------------
function onKeyDown(event)
{
    if(event.key == 'p')
    {
        point = new Point(0.2, color);
        point.setPosition(mouseP[0], mouseP[1]);
        shapes.push(point);
        initBuffers();
        drawScene();
    } else if (event.key == 'h') {
        tri = new HLine(0.2, color);
        tri.setPosition(mouseP[0], mouseP[1]);
        shapes.push(tri);
        initBuffers();
        drawScene();
    } else if (event.key == 'v') {
        tri = new VLine(0.2, color);
        tri.setPosition(mouseP[0], mouseP[1]);
        shapes.push(tri);
        initBuffers();
        drawScene();
    } else if (event.key == 't') {  
        tri = new Triangle(0.2, color);
        tri.setPosition(mouseP[0], mouseP[1]);
        shapes.push(tri);
        initBuffers();
        drawScene();
    } else if (event.key == 'q') {
        s = new Square(0.2, color);
        s.setPosition(mouseP[0], mouseP[1]);
        shapes.push(s);
        initBuffers();
        drawScene();
    } else if (event.key == 'r') {
        color = new Color(1,0,0);
    } else if (event.key == 'g') {
        color = new Color(0,1,0);
    } else if (event.key == 'b') {
        color = new Color(0,0,1);
    } else if (event.key == 'd') {
        drawScene();
    } else if (event.key == 'c') {
        clear(0,0,0);
    } else if (event.key == 'R') {
        s = new Circle(30, 0.2, color);
        s.setPosition(mouseP[0], mouseP[1]);
        shapes.push(s);
        initBuffers();
        drawScene();
    }
}

function onMouseDown(event)
{
    text = document.getElementById("mouseP");
    rect = canvas.getBoundingClientRect();
    center = [(rect.left + rect.right) / 2,
               (rect.bottom + rect.top) / 2];
    x2 = (event.pageX-center[0])
    y2 = -1*(event.pageY-center[1]) + (event.pageY - event.clientY)
    x2 = 2 * x2 / rect.width;
    y2 = 2 * y2 / rect.height;
    mouseP = [y2,x2];
    text.innerHTML = "" + mouseP[0].toFixed(2) + ", " + mouseP[1].toFixed(2);
}
function onMouseMove(event) {}
