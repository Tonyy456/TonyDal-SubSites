/*
 * Gives functionality to each shape and function that can act on them.
 */

class GameObject 
{
    constructor() {
        this.position = {};
        this.position.x = 0.0;
        this.position.y = 0.0;
        this.position.z = 0.0;
        this.scale = 1;
        this.angle = 0.0;
        this.model = IdentityMatrix()
        this.color = new Color(1,1,1);
        this.draw_type = 2;
    }
    getModel() {
        return this.model
    }
    updateModel(mat, local = true)
    {
        var identity = IdentityMatrix()
        if(local)
        {
            this.model = this.model.multiply(mat)
        } else 
        {
            this.model = mat.multiply(this.model)
        }
    }
    Scale(scale, local = true) {
        var mat = ScalingMatrix(1/this.scale, 1/this.scale, 1/this.scale)
        this.updateModel(mat, local)
        if(scale == 0)
            scale = 0.000000001
        this.scale = scale
        mat = ScalingMatrix(this.scale, this.scale, this.scale)
        this.updateModel(mat, local)
    }
    translate(dx,dy, local = false){
        this.position.x += dx;
        this.position.y += dy;
        mat = TranslationMatrix(dx, dy,0)
        this.updateModel(mat, local)
    }
    setPosition(x,y){
        this.position.x = y;
        this.position.y = x;
        var mat = TranslationMatrix(y,x,0) 
        this.model = mat.multiply(this.model) 
    }
    setAngle(theta)
    {
        this.angle = theta;
        var mat = RotationMatrixZ(this.angle)
    }
    rotate(da, local = true)
    {
        this.angle += da;
        var mat = RotationMatrixZ(da)
        this.updateModel(mat, local)
    }
    getRotation(){
        mvMatrix = mat4.rotate(mvMatrix, degToRad(this.zAngle * Math.PI / 180), [0, 0, 1]); 
        return mvMatrix;
    }
    checkCollision(mouseP)
    {
        //construct the vertices and their translation
        var vertices = gl.pipeline.get_vertices(this);
        var position = helper.worldToCanvas(this.position);
        var polygon = [];
        var matrix = this.model
        for(let i = 0; i < vertices.length; i+=3)
        {
            var coor = new HCoor(vertices[i], vertices[i+1], vertices[i+2]);
            var newCoor = matrix.multiplyPoint(coor);
            polygon.push([newCoor.data[0], newCoor.data[1]]);
        }

        var point = [mouseP.x, mouseP.y];
        var result = helper.pointInPolygon(polygon, point);
        return result;
    }
}

class Square extends GameObject{
    constructor(scale, color){
        super();
        this.type = "square";
        this.buffer = 0;
        this.color = color;
        super.Scale(scale);
    } 
}
class Triangle extends GameObject{
    constructor(scale, color){
        super();
        this.type = "Triangle";
        this.buffer = 1;
        this.color = color;
        super.Scale(scale);
    } 
}
class HLine extends GameObject{
    constructor(scale, color){
        super();
        this.type = "HLine";
        this.buffer = 2;
        this.color = color;
        this.draw_type = 1;
        super.Scale(scale);
    } 
}
class VLine extends GameObject{
    constructor(scale, color){
        super();
        this.type = "VLine";
        this.buffer=3;
        this.color = color;
        this.draw_type = 1;
        super.Scale(scale);
    } 
}
class Point extends GameObject{
    constructor(scale, color){
        super();
        this.type = "Point";
        this.buffer=4;
        this.color = color;
        this.draw_type = 0;
        super.Scale(scale);
    } 
}
class Circle extends GameObject{
    constructor(scale, color){
        super();
        this.type = "Circle";
        this.buffer=5;
        this.color = color;
        this.draw_type = 2;
        super.Scale(scale);
    } 
}
