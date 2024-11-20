/*
 * Interface for gl object
 *
 * gl.shaderProgram {
 *      var  vertexColorAttribute (attribute for vertex color)
 *      var  aposition (attribute for the default position of a vertex)
 *      var  matrix (uniform for the matrix that transforms a vertex)
 * }
 * 
 * gl.pipeline {
 *      var  shape_buffer (array: contains gl buffers)
 *      func add_shape(array of vertices, vertex size)
 *      func get_vertex_buffer(Shape)
 *      func get_color_buffer(Shape)
 *      func get_vertices(Shape)
 * }
 *
 * gl.renderer {
 *      func drawScene(project)
 *      func clear(r,g,b)
 *      func drawBuffers(shape)
 * }
 *
 */
var gl;
function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");  // the graphics context 
//        gl = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
        gl.viewportWidth = canvas.width;   // the width of the canvas
        gl.viewportHeight = canvas.height; // the height 
    } catch (e) { } 
    if (!gl) {
        alert("WebGL is not supported or working");
    }
    gl.shaderProgram = init_shaders(gl);
    _init_pipeline(gl);
    _init_renderer(gl);
}

function _init_pipeline(gl)
{
    gl.pipeline = {};
    var pipeline = gl.pipeline;
    pipeline.shape_buffer = [];
    pipeline._vertices = [];

    // create a buffer for a shape. returns index``
    pipeline.add_shape = function (array, vertexSize)
    {
        let vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);
        vertexBuffer.vertexSize = vertexSize;
        vertexBuffer.numVertices = array.length / vertexSize;
        this.shape_buffer.push(vertexBuffer);
        this._vertices.push(array);
    }

    pipeline.get_vertex_buffer = function (shape)
    {
        return this.shape_buffer[shape.buffer];
    }

    pipeline.get_color_buffer = function (shape)
    {
        vertices = this.get_vertex_buffer(shape);
        colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        var colors = [];
        for(let i = 0; i < vertices.numVertices; i++)
        {
            colors.push(shape.color.r);
            colors.push(shape.color.g);
            colors.push(shape.color.b);
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        colorBuffer.vertexSize = vertices.vertexSize;
        colorBuffer.numVertices = colors.length / vertices.vertexSize;
        return colorBuffer;
    }

    pipeline.get_vertices = function (shape)
    {
        return this._vertices[shape.buffer];
    }
}
/*
 * =================================================================================
 */

function _init_renderer(gl)
{
    var renderer = {};

    renderer.clear = function (r,g,b)
    {
        gl.clearColor(r,g,b,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
    }

    renderer.drawBuffers = function (shape)
    {
        var shaderProgram = gl.shaderProgram;
        var pipeline = gl.pipeline;
        vertex_buffer = pipeline.get_vertex_buffer(shape);
        color_buffer = pipeline.get_color_buffer(shape)

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.vertexAttribPointer(shaderProgram.aposition, vertex_buffer.vertexSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,color_buffer.vertexSize, gl.FLOAT, false, 0, 0);

        var position = helper.worldToCanvas(shape.position);
        var translationMat = TranslationMatrix(position.x, position.y, 0);
        var rotationMat = translationMat.multiply(RotationMatrixZ(shape.angle));
        var scaleMat = rotationMat.multiply(ScalingMatrix(shape.scale, shape.scale, shape.scale));
        scaleMat = shape.model
        var affMatrix = scaleMat.columnMajorArray();
        gl.uniformMatrix4fv(shaderProgram.matrix, false, affMatrix);

        //type of draw
        var draw_type = shape.draw_type;
        if(draw_type == 2)
        {
            gl.drawArrays(gl.TRIANGLE_FAN, 0, vertex_buffer.numVertices);
        } 
        else if (draw_type == 1)
        {
            gl.drawArrays(gl.LINE_LOOP, 0, vertex_buffer.numVertices);
        } 
        else if (draw_type == 0)
        {
            gl.drawArrays(gl.POINTS, 0, vertex_buffer.numVertices);
        } 
    }

    renderer.drawScene = function (project)
    {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        for (i in project.shapes) {
            this.drawBuffers(project.shapes[i]);
        }
    }

    gl.renderer = renderer;
}





