/*
 * creates a shader based on code and type of shader provided
 */
class Shader
{
    constructor()
    {
        /* ===== VERTEX SHADER ===== */
        this.vertexShaderSource = `
            attribute vec4 a_position;
            attribute vec3 aVertexColor;
            uniform mat4 u_matrix;
            varying vec4 vColor;
            void main(void) {
                gl_Position = u_matrix * a_position;
                float distance = length(gl_Position); 
                gl_PointSize = 300.0 / (9.0 * distance);
                vColor = vec4(aVertexColor,1.0); 
            }
        `;

        /* ===== FRAGMENT SHADER ===== */
        this.fragmentShaderSource = `
            precision mediump float;
            varying vec4 vColor; 
            void main(void) {
                gl_FragColor = vColor; 
            }
        `;

        this.program = this.init_shaders();
    }
    /* =========== GET ATTRIBUTES ========================= */
    setColorAttr(buffer)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(this.vertexC, buffer.size, gl.FLOAT, false, 0, 0);
    }
    setPositionAttr(buffer)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(this.position, buffer.size, gl.FLOAT, false, 0, 0);
    }
    setModelAttr(model)
    {
        gl.uniformMatrix4fv(this.matrix, false, model);
    }
    setTriangles(triangles)
    {
        if(triangles)
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangles);
    }

    /* =========== INITIALIZATION OF SHADERS ============== */
    create_shader(source, type)
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

    create_program(vertexShader, fragmentShader)
    {   
        let shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
        gl.useProgram(shaderProgram);
        return shaderProgram;
    }

    init_attributes(shaderProgram)
    {
        this.vertexC = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(this.vertexC);

        this.position  = gl.getAttribLocation(shaderProgram, "a_position");
        gl.enableVertexAttribArray(this.position);

        this.matrix = gl.getUniformLocation(shaderProgram, "u_matrix");
    }
    
    init_shaders()
    {    
        var vertexShaderSource = this.vertexShaderSource;
        var fragmentShaderSource = this.fragmentShaderSource;

        var vertexShader = this.create_shader(vertexShaderSource, gl.VERTEX_SHADER);
        var fragmentShader = this.create_shader(fragmentShaderSource, gl.FRAGMENT_SHADER);
        var shaderProgram = this.create_program(vertexShader, fragmentShader);
        this.init_attributes(shaderProgram);
        return shaderProgram;
    }
}
