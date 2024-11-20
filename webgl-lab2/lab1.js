var project = {};
project.currentColor = new Color(1,0,0);
project.shapes = [];
project.currentShape = "point";

var color = new Color(1,0,0);


function webGLStart() {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);

	  project.canvas = document.getElementById("code00-canvas");
    project.key_commands = initialize_key_presses();
    project.shape_handler = initialize_shape_factory();

	  initGL(project.canvas);
    initialize_shape_buffers(gl);
    initUI();

    gl.renderer.clear(0,0,0);
    gl.renderer.drawScene(project);
}

function clearShapes() 
{
    project.shapes = [];
    gl.renderer.drawScene(project);
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
        project.canvas.width = width;
        project.canvas.height = height;
        gl.viewportWidth = project.canvas.width;   // the width of the canvas
        gl.viewportHeight = project.canvas.height; // the height 
        gl.renderer.drawScene(project);
    }
}


