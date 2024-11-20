/*
 * Plan of attack
 * - first be able to init gl. 
 * - then be able to figure out NDC for a point draw.
 * - work on game object item
 * - work on pipeline and rendering process
 * - get simple 2d drawing
 * - work to transform 3d objects into the 3d plane
 *
 * initGL()
 * _init_pipeline()
 * _init_renderer()
 *
 * ======private variables======
 * _shapes = dict(name,shape)
 * _vertices = (type, VBO)
 *
 * ======pipeline======
 * _create_VBO(list vertices)
 * importShape(string type, list vertices)
 * createShape(string type, string name)
 * removeShape(string name)
 * getShape(string name)
 *
 * ======renderer======
 * _drawShapes()
 * render()
 * clear()
 *
 * ======gameobject======
 * _transform
 *
 * translate(x,y,z)
 * setPosition(x,y,z)
 * scale(x,y,z)
 * setScale(x,y,z)
 * rotate(x,y,z)
 * setEulers(x,y,z)
 *
 * ======shape : gameobject======
 * constructor(VBO)
 * setColor(c)
 * getModel()
 *
 *
 * ======camera : gameobject======
 * setOrtho()
 * setProjection()
 * getViewMat()
 * getProjectionMat()
 *
 *
 * ======transform======
 * _modelMatrix
 * getModel()
 *
 * ........ other draw type methods?
 *
 */
function _init_gl(canvas) {
    let gl;
    try {
        gl = canvas.getContext("experimental-webgl");  // the graphics context 
        gl.viewportWidth = canvas.width;   // the width of the canvas
        gl.viewportHeight = canvas.height; // the height 
        gl.enable(gl.DEPTH_TEST);
    } catch (e) { } 
    if (!gl) {
        alert("WebGL is not supported or working");
    }
    return gl;
}
