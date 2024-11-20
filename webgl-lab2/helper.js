/*
 * Sets up a global variable that allows access to useful functions anywhere
 */

var helper = {};

helper.worldToCanvas = function (position)
{
    var canvasPos = {};
    canvasPos.x = position.y;
    canvasPos.y = position.x;
    return canvasPos;
}

helper.pointInPolygon = function (polygon, point) {
    let odd = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) // One point needs to be above, one below our y coordinate
            && (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
            odd = !odd;
        }
        j = i;

    }
    return odd;
};

helper.getMousePosition = function (event)
{
    rect = project.canvas.getBoundingClientRect();
    center = [(rect.left + rect.right) / 2,
               (rect.bottom + rect.top) / 2];
    x = (event.pageX-center[0])
    y = -1*(event.pageY-center[1]) + (event.pageY - event.clientY)
    x = 2 * x / rect.width;
    y = 2 * y / rect.height;

    mouseP = {};
    mouseP.x = x;
    mouseP.y = y;

    return mouseP;
}

//https://www.algorithms-and-technologies.com/point_in_polygon/javascript
helper.pointInsidePolygon = function (point, vs) {
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};

helper.pointInCanvas = function (pos)
{
    return !(pos.x > 1 || pos.x < -1 || pos.y > 1 || pos.y < -1) 
}
