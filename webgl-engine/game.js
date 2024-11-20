let Engine;
let running = true;
var game = {};
function stop() { running = false; }
function init()
{
    Engine = new GameEngine();
    let canvas = document.getElementById("code00-canvas");
    Engine.InitEngine(canvas);

    initialize();
    start();
    loop();
}

function loop()
{
    if(running) window.requestAnimationFrame(loop);
    Engine.time.update();
    update();
    Engine.Clear();
    Engine.Render();
}

function initialize()
{
    initInput();
    var myScene = Engine.CreateEmpty();
    //myScene.setChild(getGraph());
    var cam = Engine.GetCam();
    cam.translate([0,2,-8]);
    cam.lookAt([0,0,0]);
    game.scene = myScene;
    game.cam = cam;
    Engine.AddToScene(myScene);
}

function start()
{
    let scene = game.scene;
    createPlanet(scene);
}

function colorLERP(c1, c2, t)
{
    let r = util.LERP(c1[0], c2[0], t);
    let g = util.LERP(c1[1], c2[1], t);
    let b = util.LERP(c1[2], c2[2], t);
    return [r,g,b];
}

let wFreq = 1.75;
let wTH = 0.75;
let sTH = 0.51;
let waterLevel = 1;
let useLerp = false;
let minHeight = 0.8;
let maxHeight = 1.3;
function createPlanet(scene)
{
    let square = Engine.CreateAtPoint("cube", "c", [2,0,0]);
    square.meshMeta.setDrawType(1);
    square.setColor([0,0,1]);
    scene.setChild(square);
    let axis = Engine.CreateAtPoint("axis", "axis",[0,0,0]);
    scene.setChild(axis);
    axis.meshMeta.setDrawType(2);
    axis.setColor([1,0,0]);
    let sphere = Engine.CreateAtPoint("sphere50", "planet", [0,0,0]);
    sphere.meshMeta.setDrawType(2);
    axis.setChild(sphere);
    sphere.scale([1,1,1]);
    game.sphere = new CustomSphere(sphere);

    let water = Engine.CreateAtPoint("sphere50", "water",[0,0,0]);
    water.meshMeta.setDrawType(2);
    water.setColor([0,0.4,1]);
    sphere.setChild(water);
    game.water = water;
    game.axis = axis;

    calc();
}

function update()
{
    let d = 10*Engine.time.dt;
    game.axis.rotate([0,1,0], d);
    handleInput();
}

function handleInput()
{
    var down = Engine.input.down();
    for(let i = 0; i < down.length; i++)
    {
        var func = game.commands[down[i]];
        if(func)
        {
            func();
        }
    }
    return;

}

// ======== DEBUG ========== //
function getGraph()
{
    var c = Engine.CreateAtPoint("graph","graph",[0,0,0]);
    c.meshMeta.setDrawType(1);
    c.meshMeta.setColorByFunction(function(x,y,z){
        if(x != 0) return [1,0,0];
        if(y != 0) return [0,1,0];
        if(z != 0) return [0,0,1];
        else return [0,0,0]; 
    });
    return c;
}

function calc()
{
    game.water.scale(vec3.inv(game.water.transform._scale));
    game.water.scale(vec3.create([waterLevel, waterLevel, waterLevel]));
    game.sphere.setHeight(function (v)
        {
            let range = maxHeight - minHeight;
            let val = perlin3D (v, wFreq);
            //perlin = [-1,1] => [minHeight,maxHeight];
            val = (val + 1) * range / 2 + minHeight;
            return val;
        });
    game.sphere.setColor(function (v)
        {
            let length = vec3.length(v);
            let c1 = [0,0.7,0];
            let c2 = [1,1,1];
            let t = (length - minHeight)/(maxHeight - minHeight);
            if(t > wTH) return c2;
            if(t < sTH) return [.761, .698, .502];
            let cl;
            if(useLerp)
                cl = colorLERP(c1,c2,t);
            else
                cl = c1;
            return cl;
        });
}
