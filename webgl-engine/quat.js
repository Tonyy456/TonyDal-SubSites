quat4 = {};
quat4.create = function(a) {
    var b = new glMatrixArrayType(4);
    if (a) {
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
    }
    return b
};

/*
 * all credits to this link for the following function.
 * I had an almost working solution but it proved to be very challenging.
 *
 * my original concept was to take the cross product of the current forward direction
 * and the goal forward direction and then rotate it by the angle bewtween the two.
 *
 * ultimately the angle I was getting was never right and there was always some sort of sign
 * error even when I got the angle by using the cross product so it could be negative or
 * positive.
 */
//https://stackoverflow.com/questions/1171849/finding-quaternion-representing-the-rotation-from-one-vector-to-another#:~:text=One%20solution%20is%20to%20compute,all%20the%20way%20to%20v!
quat4.rotateTo = function(u, v)
{
    let kct = vec3.dot(u, v);
    let ul = vec3.length(u), vl = vec3.length(v);
    let k = Math.sqrt(ul*ul * vl*vl);
    if(kct / k == -1)
    {
        let o = vec3.normalize(vec3.orthogonal(u));
        return quat4.create([
            0, o[0], o[1], o[2]]);
    }
    let ucv = vec3.cross(u,v);
    let q =  quat4.create([
        kct + k, ucv[0], ucv[1], ucv[2]
    ]);
    let result = quat4.normalize(q);
    return result;
}
quat4.identity = function()
{
    return quat4.create([0,0,0,1]);
}
quat4.set = function(a, b) {
    a[0]=b[0];
    a[1]=b[1];
    a[2]=b[2];
    a[3]=b[3];
};

quat4.axisAngle = function(axis, angle)
{
    let theta = angle * Math.PI / 180;
    let ct = Math.cos(theta / 2);
    let st = Math.sin(theta / 2);

    var n = quat4.create();
    n[0] = ct;
    n[1] = axis[0] * st;
    n[2] = axis[1] * st;
    n[3] = axis[2] * st;
    return n;
}
quat4.fromEuler = function(eulers)
{
    let radians = vec3.scale(eulers,Math.PI / 180);
    let cr = Math.cos(radians[0] * 0.5);
    let sr = Math.sin(radians[0] * 0.5);
    let cp = Math.cos(radians[1] * 0.5);
    let sp = Math.sin(radians[1] * 0.5);
    let cy = Math.cos(radians[2] * 0.5);
    let sy = Math.sin(radians[2] * 0.5);

    var q = quat4.create();
    q[0] = cr * cp * cy + sr * sp * sy;
    q[1] = sr * cp * cy - cr * sp * sy;
    q[2] = cr * sp * cy + sr * cp * sy;
    q[3] = cr * cp * sy - sr * sp * cy;
    return q;
}
quat4.toMat4 = function(q) {
    var mat = mat4.create();
    var n = quat4.normalize(q);
    var s = n[0], x = n[1], y = n[2], z = n[3];
    mat[ 0] = 1 - 2*y*y - 2*z*z;
    mat[ 1] = 2*x*y + 2*s*z;
    mat[ 2] = 2*x*z - 2*s*y; 
    mat[ 3] = 0;
    mat[ 4] = 2*x*y - 2*s*z; 
    mat[ 5] = 1 - 2*x*x - 2*z*z;
    mat[ 6] = 2*y*z + 2*s*x; 
    mat[ 7] = 0; 
    mat[ 8] = 2*x*z + 2*s*y; 
    mat[ 9] = 2*y*z - 2*s*x; 
    mat[10] = 1 - 2*x*x - 2*y*y; 
    mat[11] = 0;
    mat[12] = 0;
    mat[13] = 0;
    mat[14] = 0;
    mat[15] = 1;
    return mat;
};
quat4.multiply = function(a, b) {
    var r = quat4.create();
    r[0] = a[0]*b[0] - a[1]*b[1] - a[2]*b[2] - a[3]*b[3];
    r[1] = a[0]*b[1] + a[1]*b[0] + a[2]*b[3] - a[3]*b[2];
    r[2] = a[0]*b[2] - a[1]*b[3] + a[2]*b[0] + a[3]*b[1];
    r[3] = a[0]*b[3] + a[1]*b[2] - a[2]*b[1] + a[3]*b[0];
    return r;
};
quat4.normalize = function(a) {
    let len = quat4.length(a);
    let q = quat4.create();
    q[0] = a[0]/len;
    q[1] = a[1]/len;
    q[2] = a[2]/len;
    q[3] = a[3]/len;
    return q;
};
quat4.length = function(a) {
    let num = 0;
    num += a[0]*a[0];
    num += a[1]*a[1];
    num += a[2]*a[2];
    num += a[3]*a[3];
    return Math.sqrt(num);
};

quat4.calculateW = function(a, b) {};
quat4.inverse = function(a, b) {};
quat4.multiplyVec3 = function(a, b, c) {};
quat4.str = function(a) {
    var s = `${a[0]}\n${a[1]}\n${a[2]}\n${a[3]}\n`;
    return s;
};

