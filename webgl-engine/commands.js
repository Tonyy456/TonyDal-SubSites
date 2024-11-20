function initInput()
{
    game.commands = {};
    game.commands['y'] = function()
    {
        let d = 30 * Engine.time.dt;
        game.cam.rotate([0,1,0],d);
    }
    game.commands['Y'] = function()
    {
        let d = -30 * Engine.time.dt;
        game.cam.rotate([0,1,0],d);
    }
    game.commands['p'] = function()
    {
        let d = 30 * Engine.time.dt;
        game.cam.rotate([1,0,0],d);
    }
    game.commands['P'] = function()
    {
        let d = -30 * Engine.time.dt;
        game.cam.rotate([1,0,0],d);
    }
    game.commands['r'] = function()
    {
        let d = 30 * Engine.time.dt;
        game.cam.rotate([0,0,1],d);
    }
    game.commands['R'] = function()
    {

        let d = -30 * Engine.time.dt;
        game.cam.rotate([0,0,1],d);
    }
    game.commands['w'] = function () // w
    {
        let d = 10*Engine.time.dt;
        game.axis.translate([0,0,d], false);
    }
    game.commands['s'] = function () // s
    {
        let d = -10*Engine.time.dt;
        game.axis.translate([0,0,d], false);
    }
    game.commands['a'] = function () // a
    {
        let d = 10*Engine.time.dt;
        game.axis.translate([d,0,0], false);
    }
    game.commands['d'] = function () // d
    {
        let d = -10*Engine.time.dt;
        game.axis.translate([d,0,0], false);
    }
    game.commands['ArrowUp'] = function () // up
    {
        let d = -60*Engine.time.dt;
        game.scene.rotateEulers([d,0,0], false);
    }
    game.commands['ArrowDown'] = function () // down
    {
        let d = 60*Engine.time.dt;
        game.scene.rotateEulers([d,0,0], false);
    }
    game.commands['ArrowRight'] = function () // right
    {
        let d = 60*Engine.time.dt;
        game.scene.rotateEulers([0,d,0], false);
    }
    game.commands['ArrowLeft'] = function () // left
    {
        let d = -60*Engine.time.dt;
        game.scene.rotateEulers([0,d,0], false);
    }
}   
