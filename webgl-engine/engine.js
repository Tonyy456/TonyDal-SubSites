var gl = {};
class GameEngine
{
    constructor() {}

    InitEngine(canvas)
    {
        console.log(_init_gl)
        gl = _init_gl(canvas);
        this._shader = new Shader();
        this._pipeline = new Pipeline();
        this._renderer = new Renderer();
        this.time = new Time();
        this._scene = new Scene();
        this.input = new Input();
        initPrimitives();

    }

    Render()
    {
        this._renderer.render(this._scene, this._shader, this._pipeline);    
    }

    Clear()
    {
        this._renderer.clear([0.1,0.1,0.1]);
    }

    CreateCamera(name)
    {

    }

    InitMesh(type, vertices)
    {
        this._pipeline.initMesh(type, vertices);
    }

    CreateEmpty(name)
    {
        let empty = new Empty();
        empty.name = name;
        return empty;
    }

    CreateAtPoint(type, name, point)
    {
        let s = this.CreateObject(type, name);
        s.translate(point);
        return s;
    }

    CreateObject(type, name)
    {
        let newShape = this._pipeline.createShape(type);
        newShape.name = name;
        return newShape;
    }

    AddToScene(obj)
    {
        this._scene.addGo(obj);
    }

    GetCam()
    {
        return this._scene.camera;
    }

    GetObject(name)
    {
        return this._scene.getObject(name);
    }

    log()
    {
        this._scene.log();
    }
}
