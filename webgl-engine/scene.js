class Scene
{
	constructor()
	{
        this.gos = {};       
        this.root = {};
        this.root.children = [];
        this.camera = new Camera(gl.viewportWidth / gl.viewportHeight);
        this.camera.name = "camera";
	}

    addGo(obj)
    {
        this.gos[obj.name] = obj;
        this.root.children.push(obj);
    }

    getObject(name)
    {
        return this.gos[name];
    }

    getRoot()
    {
        return this.root;
    }
    getObjects()
    {
        let os = [];
        for (let o in this.gos) { 
            os.push(this.gos[o]);
        }
        return os;
    }

    log() 
    {
        console.log(this.gos);
    }
}
