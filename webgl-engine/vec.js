var vec3 = {};
vec3.create = function(a) {
    var b = new glMatrixArrayType(3);
    if (a) {
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2]
    }
    return b
};

// https://stackoverflow.com/questions/1171849/finding-quaternion-representing-the-rotation-from-one-vector-to-another#:~:text=One%20solution%20is%20to%20compute,all%20the%20way%20to%20v!
vec3.orthogonal = function(a)
{
    let x = Math.abs(a[0]);
    let y = Math.abs(a[1]);
    let z = Math.abs(a[2]);

    let other = x < y ? ( x < z ? vec3.create([1,0,0]) : vec3.create([0,0,1])) : (y < z ? vec3.create([0,1,0]) : vec3.create([0,0,1]));
    return vec3.cross(a, other);
}
vec3.compare = function(a,b)
{
    if(Math.abs(a[0] - b[0]) > 0.000001)
    {
        return false;
    }
    if(Math.abs(a[1] - b[1]) > 0.000001)
    {
        return false;
    }
    if(Math.abs(a[2] - b[2]) > 0.000001)
    {
        return false;
    }
    return true;
}
vec3.elementScale = function(a,b)
{
    let c = vec3.create();
    c[0] = a[0]*b[0];
    c[1] = a[1]*b[1];
    c[2] = a[2]*b[2];
    return c;
}
vec3.inv = function(a)
{
    let b = vec3.create();
    b[0] = 1/a[0];
    b[1] = 1/a[1];
    b[2] = 1/a[2];
    return b;
}
vec3.angle = function(a,b)
{
    let c = vec3.dot(vec3.normalize(a),vec3.normalize(b));
    let degrees = Math.acos(c) * 180 / Math.PI;
    let result = c <= 0 ? degrees : -1 * degrees;
    console.log(result);
    return result;
}
vec3.set = function(a, b) {
    a[0]=b[0];
    a[1]=b[1];
    a[2]=b[2];
};
vec3.add = function(a,b) {
    var o = vec3.create();
    o[0]=a[0]+b[0];
    o[1]=a[1]+b[1];
    o[2]=a[2]+b[2];
    return o;
};
vec3.subtract = function(a, b) {
    var o = vec3.create();
    o[0]=a[0]-b[0];
    o[1]=a[1]-b[1];
    o[2]=a[2]-b[2];
    return o;
};
vec3.negate = function(a) {
    var o = vec3.create();
    o[0]=-1*a[0];
    o[1]=-1*a[1];
    o[2]=-1*a[2];
    return o;
};
vec3.scale = function(a, b) {
    var o = vec3.create();
    o[0]=a[0]*b;
    o[1]=a[1]*b;
    o[2]=a[2]*b;
    return o;
};
vec3.normalize = function(a) {
    var l = vec3.length(a);
    var o = vec3.create();
    o[0]=a[0]/l;
    o[1]=a[1]/l;
    o[2]=a[2]/l;
    return o;
};
vec3.cross = function(a, b) {
    var o = vec3.create();
    o[0] = a[1]*b[2] - a[2]*b[1];
    o[1] = a[2]*b[0] - a[0]*b[2];
    o[2] = a[0]*b[1] - a[1]*b[0];
    return o;
};
vec3.length = function(a) {
    let sum = vec3.dot(a,a);
    return Math.sqrt(sum);
};
vec3.dot = function(a, b) {
    return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
};
vec3.str = function(a) {
    var dp = 2;
    var str = "[" + a[0].toFixed(dp) + "," + a[1].toFixed(dp) + "," + a[2].toFixed(dp) + "]";
    return str;
};
