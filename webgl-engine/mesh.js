class MeshMeta
{
    constructor(mesh)
    {
        this.mesh = mesh;
        this.draw_type = 0;
        this.colors = []
        this.setColorByFunction(function () {
            return [0,0,0];
        });
    }

    setDrawType(type)
    {
        this.draw_type = type;
    }

    copy(mesh)
    {
        let mm = new MeshMeta(mesh);
        mm.draw_type = this.draw_type;
        mm.colors = this.colors;
        return mm;
    }

    compileBuffer() { 
        let color_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
        color_buffer.size = 3;
        color_buffer.cache = this.colors;
        this.colors = color_buffer;
    }

    setColorByFunction(foo)
    {
        let colors = [];
        let vertices = this.mesh.vertices;
        for(let i = 0; i < vertices.length / 3; i++)
        {
            let x = vertices[3*i], y = vertices[3*i+1], z = vertices[3*i+2];
            let color = foo(x,y,z);
            colors.push(color[0]);
            colors.push(color[1]);
            colors.push(color[2]);
        }
        this.setColors(colors);
    }

    setColors(colorArray)
    {
        this.colors = colorArray;
        this.compileBuffer();
    }
    
}
class Mesh
{
    constructor() { 
        this.vertices = [];
        this.triangles = [];
        this.vertices_count = 0;
        this.triangles_count = 0;
    }

    copy()
    {
        let mesh = new Mesh();
        mesh.vertices = this.vertices;
        mesh.triangles = this.triangles;
        mesh.vertices_count = this.vertices_count;
        mesh.triangles_count = this.triangles_count;
        return mesh;
    }

    addVertex(x,y,z)
    {
        this.vertices.push(x);
        this.vertices.push(y);
        this.vertices.push(z);
        this.vertices_count++;
        return this.vertices_count - 1;
    }

    addTriangle(v0,v1,v2)
    {
        this.triangles.push(v0);
        this.triangles.push(v1);
        this.triangles.push(v2);
        this.triangles_count++;
    }

    addQuad(v0,v1,v2,v3)
    {
        this.triangles.push(v0);
        this.triangles.push(v1);
        this.triangles.push(v3);
        this.triangles.push(v1);
        this.triangles.push(v2);
        this.triangles.push(v3);
        this.triangles_count++;
        this.triangles_count++;
    }

    clear()
    {
        this.vertices_count = 0;
        this.vertices = [];
        this.triangles = [];
    }

    compileMesh()
    {
        let vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW); 
        vertex_buffer.size = 3;
        vertex_buffer.cache = this.vertices;
        this.vb = vertex_buffer;


        if(this.triangles != null) {
            let triangle_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangle_buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.triangles), gl.STATIC_DRAW); 
            triangle_buffer.size = 3;
            triangle_buffer.cache = this.triangles;
            this.tb = triangle_buffer;
        }
    }

    str()
    {
        let s = "";
        let ndp = 2;
        for(let i = 0; i < this.vertices.length / 3; i++)
        {   
            s += this.vertices[3*i].toFixed(ndp);
            s += ", ";
            s += this.vertices[3*i+1].toFixed(ndp);
            s += ", ";
            s += this.vertices[3*i+2].toFixed(ndp);
            s += "\n";
        }
        s += "\n";
        for(let i = 0; i < this.triangles.length / 3; i++)
        {
            s += this.triangles[3*i];
            s += ", ";
            s += this.triangles[3*i + 1];
            s += ", ";
            s += this.triangles[3*i + 2];
            s += "\n";
        }
        return s;
    }
}
