class GameObject 
{
    constructor() {
        this.position = [0.0,0.0];
        this.scale = 1;
        this.zAngle = 0;
        this.draw_type = 2;
    }
    scale(s) {
        this.scale = s;
        for(var i in this.vertices) {
            this.vertices[i] *= this.scale;
        }
    }
    translate(x,y){
        this.position[0] += x;
        this.position[1] += y;
    }
    setPosition(x,y){
        this.position = [x,y];
    }
    getRotation(){
        mvMatrix = mat4.rotate(mvMatrix, degToRad(this.zAngle * Math.PI / 180), [0, 0, 1]); 
        return mvMatrix;
    }
}

class Square extends GameObject{
    constructor(scale, color){
        super();
        this.type = "square";
        this.vertices = [
            0.5,  0.5,  0.0,
            -0.5,  0.5,  0.0, 
            -0.5, -0.5,  0.0,
            0.5, -0.5,  0.0,

        ];
        this.colors = [
            color.r, color.g, color.b,
            color.r, color.g, color.b,
            color.r, color.g, color.b,
            color.r, color.g, color.b,
        ];
        this.vertexSize = 3;
        this.colorSize = 3;
        this.numVertices = 4;
        super.scale(scale);
    } 
}
class Triangle extends GameObject{
    constructor(scale, color){
        super();
        this.type = "Triangle";
        this.vertices = [
            0.5,  0.5,  0.0,
            -0.5,  0.5,  0.0, 
            -0.5, -0.5,  0.0,

        ];
        this.colors = [
            color.r, color.g, color.b,
            color.r, color.g, color.b,
            color.r, color.g, color.b,
        ];
        this.vertexSize = 3;
        this.colorSize = 3;
        this.numVertices = 3;
        super.scale(scale);
    } 
}
class HLine extends GameObject{
    constructor(scale, color){
        super();
        this.type = "HLine";
        this.vertices = [
            0.5,  0,  0.0,
            -0.5,  0,  0.0, 
        ];
        this.colors = [
            color.r, color.g, color.b,
            color.r, color.g, color.b,
        ];
        this.numVertices = 2;
        this.vertexSize = 3;
        this.colorSize = 3;
        this.draw_type = 1;
        super.scale(scale);
    } 
}
class VLine extends GameObject{
    constructor(scale, color){
        super();
        this.type = "VLine";
        this.vertices = [
            0,  0.5,  0.0,
            0,  -0.5,  0.0, 
        ];
        this.colors = [
            color.r, color.g, color.b,
            color.r, color.g, color.b,
        ];
        this.numVertices = 2;
        this.vertexSize = 3;
        this.colorSize = 3;
        this.draw_type = 1;
        super.scale(scale);
    } 
}
class Point extends GameObject{
    constructor(scale, color){
        super();
        this.type = "Point";
        this.vertices = [
            0.0,0.0,0.0
        ];
        this.colors = [
            color.r, color.g, color.b,
        ];
        this.numVertices = 1;
        this.vertexSize = 3;
        this.colorSize = 3;
        this.draw_type = 0;
        super.scale(scale);
    } 
}
class Circle extends GameObject{
    constructor(res, scale, color){
        super();
        this.type = "Circle";
        this.vertices = [0.0,0.0,0.0];
        let dA = 2 * Math.PI / res; 
        let a = 0;
        for(let i = 0; i < res + 1; i++) {
            var width = Math.cos(a) * 0.5;
            var height = Math.sin(a) * 0.5;
            this.vertices.push(width);
            this.vertices.push(height);
            this.vertices.push(0);
            a += dA;
        }

        this.colors = [];
        for(var i in this.vertices) {
            this.colors.push(color.r);
            this.colors.push(color.g);
            this.colors.push(color.b);
        }
        this.numVertices = res + 2;
        this.vertexSize = 3;
        this.colorSize = 3;
        this.draw_type = 2;
        super.scale(scale);
    } 
}
