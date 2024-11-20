/*
 * Gives functionality to completely intialize the buffers for a shape
 */
let shapeBuffers = [];
let shapeVertices = [];
let initialized = false;

function initialize_shape_buffers(gl) {
    var vertexSize = 3;
    var pipeline = gl.pipeline;
    pipeline.add_shape([ // Square
            -0.5,  -0.5,  0.0,
            -0.5,  0.5,  0.0, 
            0.5, 0.5,  0.0,
            0.5, -0.5,  0.0,

        ],vertexSize);

    pipeline.add_shape([ //Triangle
            0.0,  0.5,  0.0,
            -0.5,  0.0,  0.0, 
            0.5, 0.0,  0.0,
        ],vertexSize);

    pipeline.add_shape([ //HLine
            0.5,  0,  0.0,
            -0.5,  0,  0.0,         
        ],vertexSize);

    pipeline.add_shape([ //VLine
            0,  0.5,  0.0,
            0,  -0.5,  0.0, 
        ],vertexSize);

    pipeline.add_shape([ //Point
            0.0,0.0,0.0
        ],vertexSize);

    pipeline.add_shape(_get_circle_vertices(30), 3);
}

function _get_circle_vertices(vertices)
{
    //circle buffer initialization
    let res = vertices - 2;
    let cvertices = [0.0,0.0,0.0];
    let dA = 2 * Math.PI / res; 
    let a = 0;
    for(let i = 0; i < res + 1; i++) {
        var width = Math.cos(a) * 0.5;
        var height = Math.sin(a) * 0.5;
        cvertices.push(width);
        cvertices.push(height);
        cvertices.push(0);
        a += dA;
    }
    return cvertices;
}

