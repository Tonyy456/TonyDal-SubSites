function _load_engine_scripts()
{
    function createScript (url) {
        var script = document.createElement("script");
        script.src = url;  
        script.type = "text/javascript"
        document.head.appendChild(script); 
    }

    let path = "/"
    let files = [
        "util.js",
        "matrix.js",
        "quat.js",
        "vec.js",
        "time.js",
        "primitives.js",
        "go.js",
        "transform.js",
        "shader.js",
        "gl_init.js",
        "mesh.js",
        "pipeline.js",
        "renderer.js",
        "scene.js",
        "engine.js",
        "input.js"
    ]
    for(i = 0; i < files.length; i++)
    {
        createScript(path + files[i])
    }
}
_load_engine_scripts();
