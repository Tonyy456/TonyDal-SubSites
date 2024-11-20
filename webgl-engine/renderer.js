class Renderer
{
    constructor() {} 

    clear(color)
    {
        let bc =color; 
        gl.clearColor(bc[0], bc[1], bc[2], 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    render(scene, shader, pipeline)
    {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        let camera = scene.camera
        let root = scene.getRoot();
        let stack = new MatrixStack(
            camera.getProjection(),
            camera.getView()
        );
        for(var i = 0; i < root.children.length; i++)
        {
            var toRender = root.children[i];
            this.r_render_o(toRender, stack, shader);
        }
    }
    r_render_o(object, stack, shader)
    {
        object.transform.getModel();
        stack.push(object.transform.getModel());

        this.renderObject(object, stack, shader)
        for(let i = 0; i < object.children.length; i++)
        {
            var child = object.children[i];
            this.r_render_o(child, stack, shader);
        }

        stack.pop();

    }
    renderObject(current, stack, shader)
    {
        if(!current.display) return;
        var result = stack.get();
        let mesh = current.mesh;
        let meshMeta = current.meshMeta;
        shader.setTriangles(mesh.tb);
        shader.setColorAttr(meshMeta.colors);
        shader.setPositionAttr(mesh.vb);
        shader.setModelAttr(result);
        this.drawArrays(meshMeta.draw_type, mesh.vertices_count, mesh.triangles_count);
    }

    drawArrays(type, vcount, tcount)
    {
        if(type == 0) 
            gl.drawArrays(gl.POINTS, 0, vcount);
        else if (type == 1 && tcount == 0) 
            gl.drawArrays(gl.LINE_LOOP, 0, vcount);
        else if (type == 1 && tcount > 0)
            gl.drawElements(gl.LINE_STRIP, tcount * 3 , gl.UNSIGNED_SHORT, 0);
        else if (type == 2)
            gl.drawElements(gl.TRIANGLES, tcount * 3 , gl.UNSIGNED_SHORT, 0);
        else if (type == 3){
            gl.drawElements(gl.TRIANGLES, tcount * 3, gl.UNSIGNED_SHORT, 0);
            gl.drawElements(gl.POINTS, tcount * 3, gl.UNSIGNED_SHORT, 0);
        }
    }
}

class MatrixStack
{
    constructor(projection, view)
    {
        this.stack = [mat4.identity()];
        this.pv = mat4.multiply(projection, view);
    }

    model()
    {
        return this.stack[this.stack.length - 1];
    }

    get()
    {
        let model = this.model();
        return mat4.multiply(this.pv, model);
    }

    push(matrix)
    {
        let last = this.model();
        let toAdd = mat4.multiply(last, matrix);
        this.stack.push(toAdd);
    }

    pop()
    {
        this.stack.pop();
    }
}
