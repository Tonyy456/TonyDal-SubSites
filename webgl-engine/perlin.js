/*
 * SOURCE = https://www.youtube.com/watch?v=SoakEoUQ7Rg
 * https://developer.nvidia.com/gpugems/gpugems2/part-iii-high-quality-rendering/chapter-26-implementing-improved-perlin-noise
 */

var PERLIN_PERM = [
        151,160,137, 91, 90, 15,131, 13,201, 95, 96, 53,194,233,  7,225,
        140, 36,103, 30, 69,142,  8, 99, 37,240, 21, 10, 23,190,  6,148,
        247,120,234, 75,  0, 26,197, 62, 94,252,219,203,117, 35, 11, 32,
         57,177, 33, 88,237,149, 56, 87,174, 20,125,136,171,168, 68,175,
         74,165, 71,134,139, 48, 27,166, 77,146,158,231, 83,111,229,122,
         60,211,133,230,220,105, 92, 41, 55, 46,245, 40,244,102,143, 54,
         65, 25, 63,161,  1,216, 80, 73,209, 76,132,187,208, 89, 18,169,
        200,196,135,130,116,188,159, 86,164,100,109,198,173,186,  3, 64,
         52,217,226,250,124,123,  5,202, 38,147,118,126,255, 82, 85,212,
        207,206, 59,227, 47, 16, 58, 17,182,189, 28, 42,223,183,170,213,
        119,248,152,  2, 44,154,163, 70,221,153,101,155,167, 43,172,  9,
        129, 22, 39,253, 19, 98,108,110, 79,113,224,232,178,185,112,104,
        218,246, 97,228,251, 34,242,193,238,210,144, 12,191,179,162,241,
         81, 51,145,235,249, 14,239,107, 49,192,214, 31,181,199,106,157,
        184, 84,204,176,115,121, 50, 45,127,  4,150,254,138,236,205, 93,
        222,114, 67, 29, 24, 72,243,141,128,195, 78, 66,215, 61,156,180,

        151,160,137, 91, 90, 15,131, 13,201, 95, 96, 53,194,233,  7,225,
        140, 36,103, 30, 69,142,  8, 99, 37,240, 21, 10, 23,190,  6,148,
        247,120,234, 75,  0, 26,197, 62, 94,252,219,203,117, 35, 11, 32,
         57,177, 33, 88,237,149, 56, 87,174, 20,125,136,171,168, 68,175,
         74,165, 71,134,139, 48, 27,166, 77,146,158,231, 83,111,229,122,
         60,211,133,230,220,105, 92, 41, 55, 46,245, 40,244,102,143, 54,
         65, 25, 63,161,  1,216, 80, 73,209, 76,132,187,208, 89, 18,169,
        200,196,135,130,116,188,159, 86,164,100,109,198,173,186,  3, 64,
         52,217,226,250,124,123,  5,202, 38,147,118,126,255, 82, 85,212,
        207,206, 59,227, 47, 16, 58, 17,182,189, 28, 42,223,183,170,213,
        119,248,152,  2, 44,154,163, 70,221,153,101,155,167, 43,172,  9,
        129, 22, 39,253, 19, 98,108,110, 79,113,224,232,178,185,112,104,
        218,246, 97,228,251, 34,242,193,238,210,144, 12,191,179,162,241,
         81, 51,145,235,249, 14,239,107, 49,192,214, 31,181,199,106,157,
        184, 84,204,176,115,121, 50, 45,127,  4,150,254,138,236,205, 93,
        222,114, 67, 29, 24, 72,243,141,128,195, 78, 66,215, 61,156,180
];

var PERLIN_DIR = [
    [1,1,0],
    [-1,1,0],
    [1,-1,0],
    [-1,-1,0],
    [1,0,1],
    [-1,0,1],
    [1,0,-1],
    [-1,0,-1],
    [0,1,1],
    [0,-1,1],
    [0,1,-1],
    [0,-1,-1],

    [1,1,0],
    [-1,1,0],
    [0,-1,1],
    [0,-1,-1]
];
var directionCount = 15;
function scalar(a,b)
{
    return vec3.dot(a,b);
}
function smoothDistance(d)
{
    return d * d * d * ( d * (d * 6 - 15) + 10)
}
function perlin3D(point, frequency)
{
    point = vec3.scale(point, frequency);

    let flooredPointX0 = Math.floor(point[0]);
    let flooredPointY0 = Math.floor(point[1]);
    let flooredPointZ0 = Math.floor(point[2]);

    let distanceX0 = point[0] - flooredPointX0;
    let distanceY0 = point[1] - flooredPointY0;
    let distanceZ0 = point[2] - flooredPointZ0;

    let distanceX1 = distanceX0 - 1;
    let distanceY1 = distanceY0 - 1;
    let distanceZ1 = distanceZ0 - 1;

    flooredPointX0 &= 255;
    flooredPointY0 &= 255;
    flooredPointZ0 &= 255;

    let flooredPointX1 = flooredPointX0 + 1;
    let flooredPointY1 = flooredPointY0 + 1;
    let flooredPointZ1 = flooredPointZ0 + 1;

    let permutationX0 = PERLIN_PERM[flooredPointX0];
    let permutationX1 = PERLIN_PERM[flooredPointX1];

    let permutationY00 = PERLIN_PERM[permutationX0 + flooredPointY0];
    let permutationY10 = PERLIN_PERM[permutationX1 + flooredPointY0];
    let permutationY01 = PERLIN_PERM[permutationX0 + flooredPointY1];
    let permutationY11 = PERLIN_PERM[permutationX1 + flooredPointY1];

    let direction000 = PERLIN_DIR[PERLIN_PERM[permutationY00 + flooredPointZ0] & directionCount];
    let direction100 = PERLIN_DIR[PERLIN_PERM[permutationY10 + flooredPointZ0] & directionCount];
    let direction010 = PERLIN_DIR[PERLIN_PERM[permutationY01 + flooredPointZ0] & directionCount];
    let direction110 = PERLIN_DIR[PERLIN_PERM[permutationY11 + flooredPointZ0] & directionCount];
    let direction001 = PERLIN_DIR[PERLIN_PERM[permutationY00 + flooredPointZ1] & directionCount];
    let direction101 = PERLIN_DIR[PERLIN_PERM[permutationY10 + flooredPointZ1] & directionCount];
    let direction011 = PERLIN_DIR[PERLIN_PERM[permutationY01 + flooredPointZ1] & directionCount];
    let direction111 = PERLIN_DIR[PERLIN_PERM[permutationY11 + flooredPointZ1] & directionCount];

    let value000 = scalar(direction000, [distanceX0, distanceY0, distanceZ0]);
    let value100 = scalar(direction100, [distanceX1, distanceY0, distanceZ0]);
    let value010 = scalar(direction010, [distanceX0, distanceY1, distanceZ0]);
    let value110 = scalar(direction110, [distanceX1, distanceY1, distanceZ0]);
    let value001 = scalar(direction001, [distanceX0, distanceY0, distanceZ1]);
    let value101 = scalar(direction101, [distanceX1, distanceY0, distanceZ1]);
    let value011 = scalar(direction011, [distanceX0, distanceY1, distanceZ1]);
    let value111 = scalar(direction111, [distanceX1, distanceY1, distanceZ1]);

    let smoothDistanceX = smoothDistance(distanceX0);
    let smoothDistanceY = smoothDistance(distanceY0);
    let smoothDistanceZ = smoothDistance(distanceZ0);
    return util.LERP(
        util.LERP(util.LERP(value000, value100, smoothDistanceX), util.LERP(value010, value110, smoothDistanceX), smoothDistanceY),
        util.LERP(util.LERP(value001, value101, smoothDistanceX), util.LERP(value011, value111, smoothDistanceX), smoothDistanceY),
        smoothDistanceZ);
}
