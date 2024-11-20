class GameObject
{
    constructor(mesh)
    {
        this.children = []; 
        this.transform = new Transform();
        this.mesh = mesh;
        if(mesh == null)
        {
            this.display = false;
        } 
        else 
        {
            this.display = true;
            this.meshMeta = new MeshMeta(this.mesh);
            this.draw_type = mesh.type;
        }
    }
    setColor(color)
    {
        this.meshMeta.setColorByFunction(function(){return color});
    }
    setChild(obj)
    {
        this.children.push(obj);
    }
    lookAt(coi, local = true)
    {
        this.transform.lookAt(coi, local);
    }
    translate(dp, local = true) {
        this.transform.translate(dp, local);
    }
    scale(ds, local = true) {
        this.transform.scale(ds, local);
    }
    rotate(axis, angle, local = true) {
        this.transform.rotate(axis, angle, local);
    }
    rotateEulers(change, local = true)
    {
        this.transform.rotateEulers(change, local);
    }
}

class Empty extends GameObject
{
    constructor()
    {
        super();
    }
}

class Camera extends GameObject
{
    constructor(aspect)
    {
        super();
        this.near = 0.1;
        this.far = 1000;
        this.fovy = 60;
        this.aspect = aspect;
        this._calculate();
    }
    lookAt(coi, local = true)
    {
        this.transform.lookAt(coi, local);
        this._calculate();
    }
    translate(dp, local = true) {
        this.transform.translate(dp, local);
        this._calculate();
    }
    scale(ds, local = true) {
        this.transform.scale(ds, local);
    }
    rotate(axis, angle, local = true) {
        this.transform.rotate(axis, angle, local);
        this._calculate();
    }
    rotateEulers(change, local = true)
    {
        this.transform.rotateEulers(change, local);
        this._calculate();
    }
    setNear(val)
    {
        this.near = val;
        _calculate();
    }
    _calculate()
    {
        let t = this.transform;
        let pos = t.position;
        let coi = vec3.add(pos, t.forward);
        this.proj = mat4.projection(this.near, this.far, this.fovy, this.aspect);
        this.view = mat4.view(pos, t.up, coi, 0);
    }
    getProjection()
    {
        return this.proj;
    }
    getView()
    {
        return this.view;
    }
}
