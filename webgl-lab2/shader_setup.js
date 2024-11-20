/*
 * init_shaders(gl) is source function to call. 
 *
 * will initialize the entire shader program for the rest of the 
 * rendering pipeline process.
 *
 */

/*
 * creates a shader based on code and type of shader provided
 */
function create_shader(gl, source, type)
{
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        alert(gl.getShaderInfoLog(shader));
        console.log(`Failed to compile ${type == gl.VERTEX_SHADER ? `vertex` : `fragment`} shader`);
        return null;
    }
    return shader;
}

/*
 * Creates a shader program based on the shaders
 */
function create_program(gl, vertexShader, fragmentShader)
{    
    /*
     * Initialize shader program completely
     */
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);
    return shaderProgram;
}

/*
 * initializes the attributes needed for the rest of the program
 */
function init_attributes(gl, shaderProgram)
{
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    shaderProgram.aposition  = gl.getAttribLocation(shaderProgram, "a_position");
    gl.enableVertexAttribArray(shaderProgram.aposition);

    shaderProgram.matrix = gl.getUniformLocation(shaderProgram, "u_matrix");
}

/*
 *  initializes the shaders program
 */
function init_shaders(gl)
{
    var vertexShaderSource = `
        attribute vec4 a_position;
        attribute vec3 aVertexColor;
        uniform mat4 u_matrix;

        varying vec4 vColor;

        void main(void) {
            gl_PointSize = 10.0; 
            gl_Position = u_matrix * a_position;
            vColor = vec4(aVertexColor,1.0); 
        }
    `;
    var fragmentShaderSource = `
        precision mediump float;
        varying vec4 vColor; 

        void main(void) {
            gl_FragColor = vColor; 
        }
    `;

    var vertexShader = create_shader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    var fragmentShader = create_shader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    var shaderProgram = create_program(gl, vertexShader, fragmentShader);
    init_attributes(gl, shaderProgram);

    return shaderProgram;
}
