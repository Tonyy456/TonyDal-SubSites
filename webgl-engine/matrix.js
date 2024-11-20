// glMatrix v0.9.5 create
glMatrixArrayType = typeof Float32Array != "undefined" ? Float32Array : typeof WebGLFloatArray != "undefined" ? WebGLFloatArray : Array;

var mat4 = {};
mat4.create = function(a) {
    var b = new glMatrixArrayType(16);
    if(a)
    {
        b[ 0] = a[ 0]
        b[ 1] = a[ 1]
        b[ 2] = a[ 2]
        b[ 3] = a[ 3]
        b[ 4] = a[ 4]
        b[ 5] = a[ 5]
        b[ 6] = a[ 6]
        b[ 7] = a[ 7]
        b[ 8] = a[ 8]
        b[ 9] = a[ 9]
        b[10] = a[10]
        b[11] = a[11]
        b[12] = a[12]
        b[13] = a[13]
        b[14] = a[14]
        b[15] = a[15]
    }
    return b;
};
mat4.rotateBasis = function(q, u, v, w)
{
    var B = mat4.create([ u[0], u[1], u[2], 0, v[0], v[1], v[2], 0,
        w[0], w[1], w[2], 0, 0, 0,0,1 ]);
    var R = quat4.toMat4(q);
    var a = mat4.multiply(R, B);
    u[0] = a[0]; 
    u[1] = a[1];
    u[2] = a[2];

    v[0] = a[4];
    v[1] = a[5];
    v[2] = a[6];

    w[0] = a[8];
    w[1] = a[9];
    w[2] = a[10];
}

mat4.identity = function() {
    var a = mat4.create([
        1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1
    ]);
    return a;
};
mat4.multiply3 = function(a,b,c)
{
    return mat4.multiply(mat4.multiply(a,b), c);
}
mat4.multiply = function(a,b) {
    let o = mat4.create();
    o[ 0] = a[0]*b[0] + a[4]*b[1] + a[8]*b[2] + a[12]*b[3];
    o[ 1] = a[1]*b[0] + a[5]*b[1] + a[9]*b[2] + a[13]*b[3];
    o[ 2] = a[2]*b[0] + a[6]*b[1] + a[10]*b[2] + a[14]*b[3];
    o[ 3] = a[3]*b[0] + a[7]*b[1] + a[11]*b[2] + a[15]*b[3];
    o[ 4] = a[0]*b[4] + a[4]*b[5] + a[8]*b[6] + a[12]*b[7];
    o[ 5] = a[1]*b[4] + a[5]*b[5] + a[9]*b[6] + a[13]*b[7];
    o[ 6] = a[2]*b[4] + a[6]*b[5] + a[10]*b[6] + a[14]*b[7];
    o[ 7] = a[3]*b[4] + a[7]*b[5] + a[11]*b[6] + a[15]*b[7];
    o[ 8] = a[0]*b[8] + a[4]*b[9] + a[8]*b[10] + a[12]*b[11];
    o[ 9] = a[1]*b[8] + a[5]*b[9] + a[9]*b[10] + a[13]*b[11];
    o[10] = a[2]*b[8] + a[6]*b[9] + a[10]*b[10] + a[14]*b[11];
    o[11] = a[3]*b[8] + a[7]*b[9] + a[11]*b[10] + a[15]*b[11];
    o[12] = a[0]*b[12] + a[4]*b[13] + a[8]*b[14] + a[12]*b[15];
    o[13] = a[1]*b[12] + a[5]*b[13] + a[9]*b[14] + a[13]*b[15];
    o[14] = a[2]*b[12] + a[6]*b[13] + a[10]*b[14] + a[14]*b[15];
    o[15] = a[3]*b[12] + a[7]*b[13] + a[11]*b[14] + a[15]*b[15];
    return o;
};
mat4.multiplyVec3 = function(a,b) {
    let o = vec3.create();
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = 1;
    o[0] = a[0]*b0 + a[4]*b1 + a[ 8]*b2 + a[12]*b3;
    o[1] = a[1]*b0 + a[5]*b1 + a[ 9]*b2 + a[13]*b3;
    o[2] = a[2]*b0 + a[6]*b1 + a[10]*b2 + a[14]*b3;
    o[3] = a[3]*b0 + a[7]*b1 + a[11]*b2 + a[15]*b3;
    return o;
}; 
mat4.multiplyVec4 = function(a,b) {
    let o = vec4.create();
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    o[0] = a[0]*b0 + a[4]*b1 + a[ 8]*b2 + a[12]*b3;
    o[1] = a[1]*b0 + a[5]*b1 + a[ 9]*b2 + a[13]*b3;
    o[2] = a[2]*b0 + a[6]*b1 + a[10]*b2 + a[14]*b3;
    o[3] = a[3]*b0 + a[7]*b1 + a[11]*b2 + a[15]*b3;
    return o;
};
mat4.translate = function(vec) {
    let o = mat4.create();
    o[ 0] = 1;
    o[ 1] = 0;
    o[ 2] = 0;
    o[ 3] = 0;
    o[ 4] = 0;
    o[ 5] = 1;
    o[ 6] = 0;
    o[ 7] = 0;
    o[ 8] = 0;
    o[ 9] = 0;
    o[10] = 1;
    o[11] = 0;
    o[12] = vec[0];
    o[13] = vec[1];
    o[14] = vec[2];
    o[15] = 1;
    return o;
};
mat4.translation = function(vec) { return mat4.translate(vec); }
mat4.scale = function(vec) {
    let o = mat4.create();
    o[ 0] = vec[0];
    o[ 1] = 0;
    o[ 2] = 0;
    o[ 3] = 0;
    o[ 4] = 0;
    o[ 5] = vec[1];
    o[ 6] = 0;
    o[ 7] = 0;
    o[ 8] = 0;
    o[ 9] = 0;
    o[10] = vec[2];
    o[11] = 0;
    o[12] = 0;
    o[13] = 0;
    o[14] = 0;
    o[15] = 1;
    return o;
};
mat4.rotate = function(axis, angle) {
    let q = quat4.axisAngle(axis, angle);
    
    return quat4.toMat4(q);
};
mat4.rotation = function(axis, angle) {
    return mat4.rotate(axis, angle); 
};
mat4.projection = function(near, far, fovy, aspect) {
    let f = Math.tan(fovy*Math.PI / 180);
    let o = mat4.create();
    o[ 0] = f/aspect;
    o[ 1] = 0;
    o[ 2] = 0;
    o[ 3] = 0;
    o[ 4] = 0;
    o[ 5] = f;
    o[ 6] = 0;
    o[ 7] = 0;
    o[ 8] = 0;
    o[ 9] = 0;
    o[10] = -(far+near)/(far-near);
    o[11] = -1;
    o[12] = 0;
    o[13] = 0;
    o[14] = -(2*near*(far+near))/(far-near);
    o[15] = 0;
    return o;
};

mat4.view = function(eye, up, coi, delta) {
    var axis = vec3.create([0,0,1]);
    var mata = mat4.rotation(axis, -delta);

    var n = vec3.subtract(eye, coi);
    n = vec3.normalize(n);
    var u = vec3.cross(up, n);
    u = vec3.normalize(u);
    var v = vec3.cross(n, u);
    var matb = mat4.create([
        u[0], v[0], n[0], 0, u[1], v[1], n[1], 0,
        u[2], v[2], n[2], 0, 0, 0, 0, 1
    ]);

    var newEye = vec3.scale(eye, -1);
    var matc = mat4.translate(newEye);

    var result = mat4.multiply(mata, matb);
    result = mat4.multiply(result, matc);

    return result;

};

mat4.str = function(a) {
    var s = "";
    for(let r = 0; r < 4; r++)
    {
        for(let c = 0; c < 4; c++)
        {
            let n = a[4*c + r];
            if(n >= 0){ s += " "; } 
            s += n.toFixed(9)+", ";
        }
        s += "\n";
    }
    return s;
};



