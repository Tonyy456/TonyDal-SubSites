class CustomSphere
{
    constructor(sphere)
    {
        this.go = sphere;
        this.grabSphere();
    }
    
    grabSphere()
    {
        this.mesh = this.go.mesh.copy();
        this.go.mesh = this.mesh;
        this.go.meshMeta = this.go.meshMeta.copy(this.mesh);
    }

    setHeight(foo)
    {
        let vs = this.mesh.vertices;
        
        for(let i = 0; i < vs.length / 3; i++)
        {
            let v = vec3.create([vs[3*i], vs[3*i+1], vs[3*i+2]])
            let currentLength = vec3.length(v);
            let height = foo(v)
            let vScaled = vec3.scale(v, height/currentLength);
            vs[3*i] = vScaled[0];
            vs[3*i+1] = vScaled[1];
            vs[3*i+2] = vScaled[2];
        }
        
        this.mesh.compileMesh();
    }

    setColor(bar)
    {
        let colorArray = [];
        let vs = this.mesh.vertices;
        for(let i = 0; i < vs.length / 3; i++)
        {
            let v = vec3.create([vs[3*i], vs[3*i+1], vs[3*i+2]]);
            let color = bar(v);
            colorArray.push(color[0]);
            colorArray.push(color[1]);
            colorArray.push(color[2]);
        }
        this.go.meshMeta.setColors(colorArray)
    }

}
