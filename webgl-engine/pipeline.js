class Pipeline 
{
    constructor()
    {
        this.vbos = {};
    }

    initMesh(type, mesh)
    {
        mesh.compileMesh();
        this.vbos[type] = mesh;
    }

    createShape(type)
    {
        let vbo = this.vbos[type];
        let shape = new GameObject(vbo);
        return shape;        
    }
}
