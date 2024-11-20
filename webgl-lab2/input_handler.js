/*
 * a factory that creates a shape based on the key value to the dictionary
 */
function initialize_shape_factory() {
    var shape_handler = {};
    shape_handler['point'] = (project) => {
        return new Point(0.2, project.currentColor);
    }
    shape_handler['square'] = (project) => {
        return new Square(0.2, project.currentColor);
    }
    shape_handler['triangle'] = (project) => {
        return new Triangle(0.2, project.currentColor);
    }
    shape_handler['hline'] = (project) => {
        return new HLine(0.2, project.currentColor);
    }
    shape_handler['vline'] = (project) => {
        return new VLine(0.2, project.currentColor);
    }
    shape_handler['circle'] = (project) => {
        return new Circle(0.2, project.currentColor);
    }
    return shape_handler;
}
/*
 * returns a shape based on string of project.currentShape
 */
function construct_shape(project)
{
    var currentShape = project.currentShape;
    var shape_handler = project.shape_handler;
    if(currentShape in shape_handler)
    {
        return shape_handler[currentShape](project);
    }
    return null;
}

/*
 * global variables related to rotation and changing color of a shape.
 */
var _angle_to_use = 0;
var _last_mouseP = null;
var _cached_shape = null;
var _global = false;
var _allow_recoloring = false;



/*
 * set the shape that you can currently change
 */
function setSelectedShape(shape)
{
    _cached_shape = shape;
}


/*
 * toggle weather or not you can recolor a shape
 */
function toggleRecoloring()
{
    _allow_recoloring = !_allow_recoloring;
    var button = document.getElementById("toggle1");
    if(_allow_recoloring)
    {
        button.style.backgroundColor='white';
        button.style.color='black';
    } 
    else 
    {
        button.style.backgroundColor='black';
        button.style.color='white';
    }
}


/*
 * color the current selected shape a certain color
 */
function colorCurrent(project)
{
    if(_cached_shape == null) return;
    if(!_allow_recoloring) return;
    _cached_shape.color = project.currentColor;
    gl.renderer.drawScene(project);
}

/*
 * execute a command given by key
 */
function ExecuteKeyCommand(key)
{
    var commands = project.key_commands;
    if (key in commands)
    {
        commands[key](gl, project);
    }
}

/*
 * onKeyDown event, whenever a key is pressed, this is called
 */
function onKeyDown(event)
{
    ExecuteKeyCommand(event.key);
}

/*
 * onMouseDown event used whenever the mouse is left clicked
 */
function onMouseDown(event)
{
    var mouseP = helper.getMousePosition(event);
    if(!helper.pointInCanvas(mouseP)) return; 
    // Check for mouse collision with a shape
    var collision = false;
    for(let i = 0; i < project.shapes.length; i++)
    {
        var shape = project.shapes[i];
        if(shape.checkCollision(helper.getMousePosition(event))){
            setSelectedShape(shape);
            collision = true;
            changeToRotationEvent(mouseP, _cached_shape);
        }
    }
    if(_global){
        changeToRotationEvent(mouseP, _cached_shape);
        return;
    }

    if (collision) {
        return;
    }
    var shape = construct_shape(project);
    if(shape != null){
        shape.setPosition(mouseP.x, mouseP.y);
        project.shapes.push(shape);
        gl.renderer.drawScene(project);
        changeToRotationEvent(mouseP, shape);
    }
}

function globalRotate(da)
{
    for(let i = 0; i < project.shapes.length; i++)
    {
        var shape = project.shapes[i];
        shape.angle += da;
    }
}

function changeToRotationEvent(mouseP, shape)
{
    _angle_to_use = 0;
    _last_mouseP  = mouseP;
    _cached_shape = shape;
    document.addEventListener('mousemove', onMouseMove); 
    document.addEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousedown', onMouseDown);
}

/*
 * onMouseUp event that triggers when mouse button is up
 */
function onMouseUp(event)
{
    document.removeEventListener('mousemove', onMouseMove); 
    document.removeEventListener('mouseup', onMouseUp);
    document.addEventListener('mousedown', onMouseDown);
}


/*
 * onMouseMove called when the mouse moves
 */
function onMouseMove(event) 
{
    var mouseP = helper.getMousePosition(event);
    var dx = _last_mouseP.x - mouseP.x;
    var dy = _last_mouseP.y - mouseP.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var da = (distance * 120);
    _angle_to_use += (da);
    _last_mouseP = mouseP;

    if(_global){
        _cached_shape.rotate(da, false);
    }
    else {
        _cached_shape.rotate(da, true);
    }
    gl.renderer.drawScene(project);
}

/*
 * scales currently selected shape by ds;
 */
function scaleCurrentShape(ds)
{
    var shape = _cached_shape;
    var newScale = shape.scale + ds;
    shape.Scale(newScale);
    gl.renderer.drawScene(project)
}

/*
 * scales all shapes by ds;
 */
function scaleGlobally(ds)
{
    var shape = _cached_shape;
    var newScale = shape.scale + ds;
    shape.Scale(newScale, false);
    gl.renderer.drawScene(project)
}


/*
 * functions related to displaying what shape type is next to draw
 */
var uiText;
var preText;
function initUI()
{
    uiText = document.getElementById('shape-type');
    preText = uiText.innerHTML;
    uiText.innerHTML = `${preText} ${project.currentShape}`;
}
function updateUI()
{
    uiText.innerHTML = `${preText} ${project.currentShape}`;
}

/*
 *initializes a handler for a key press
 */
function initialize_key_presses()
{
    // ============ KEY PRESSES ==================
    var _key_handler = {};

    _key_handler['p'] = (gl, project) => {
        project.currentShape = 'point';
        updateUI();
    }
    _key_handler['h'] = (gl, project) => {
        project.currentShape = 'hline';
        updateUI();
    }
    _key_handler['v'] = (gl, project) => {
        project.currentShape = 'vline';
        updateUI();
    }
    _key_handler['t'] = (gl, project) => {
        project.currentShape = 'triangle';
        updateUI();
    }
    _key_handler['q'] = (gl, project) => {
        project.currentShape = 'square';
        updateUI();
    }
    _key_handler['R'] = (gl, project) => {
        project.currentShape = 'circle';
        updateUI();
    }

    _key_handler['r'] = (gl, project) => {
        project.currentColor = new Color(1,0,0);
        colorCurrent(project);
    }
    _key_handler['g'] = (gl, project) => {
        project.currentColor = new Color(0,1,0);
        colorCurrent(project);
    }
    _key_handler['b'] = (gl, project) => {
        project.currentColor = new Color(0,0,1);
        colorCurrent(project);
    }

    _key_handler['s'] = (gl, project) => {
        var ds = -0.1;
        if (!_global) scaleCurrentShape(ds);
        else scaleGlobally(ds);
    }
    _key_handler['S'] = (gl, project) => {
        var ds = 0.1;
        if (!_global) scaleCurrentShape(ds);
        else scaleGlobally(ds);
    }
    _key_handler['w'] = (gl, project) => {
        _global = false;
    }
    _key_handler['W'] = (gl, project) => {
        _global = true;
    }

    _key_handler['d'] = (gl, project) => {
        gl.renderer.drawScene(project);
    }
    _key_handler['c'] = (gl, project) => {
        gl.renderer.clear(0,0,0);
    }

    return _key_handler;
}

