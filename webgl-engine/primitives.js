function initPrimitives()
{
    let point = new Mesh();
    point.addVertex(0,0,0);
    Engine.InitMesh("point", point);
    initGraph();
    initPlane(100,100,0.2);
    initCube("cube");
    initCylinder("cylinder" ,
        0.5, 1, 
        2, 
        8, 8);
    initCylinder("axis" ,
        0.1,0.1, 
        4, 
        8, 8);
    initCylinder("cue" ,
        0.05, 0.1, 
        6, 
        8, 2);
    initSphere("sphere10", 10, 10);
    initSphere("sphere50", 100, 100);
}
function initPlane(width, height, sep)
{
    let plane = new Mesh();
    for(let i = 0; i < width; i++)
    {
        for(let j = 0; j < height; j++)
        {
            let x = sep * (i - (width - 1) / 2);
            let z = sep * (j - (height - 1) / 2);
            plane.addVertex(x, 0, z);
        }
    }
    for(let i = 0; i < width - 1; i++)
    {
        for(let j = 0; j < height - 1; j++)
        {
            let p1 = width * i + j;
            let p2 = p1 + 1;
            let p3 = p1 + width;
            let p4 = p1 + width + 1;
            plane.addQuad(p1, p2, p4, p3);
        }
    }
    Engine.InitMesh("plane", plane);
}

function initGraph()
{
    let graph = new Mesh();
    let distance = 100000;
    graph.addVertex(0,0,distance);
    graph.addVertex(0,0,-distance);
//    graph.addVertex(0,0,0);
    graph.addVertex(distance,0,0);
    graph.addVertex(-distance,0,0);
//    graph.addVertex(0,0,0);
    graph.addVertex(0,distance,0);
    graph.addVertex(0,-distance,0);

    Engine.InitMesh("graph", graph);
}

function initCube(name)
{
    let cube = new Mesh();

    cube.addVertex(0.5,  0.5,  -.5)
    cube.addVertex(-0.5,  0.5,  -.5)
    cube.addVertex(-0.5,  -0.5,  -.5)
    cube.addVertex(0.5,  -0.5,  -.5)
    cube.addVertex(0.5,  0.5,  .5)
    cube.addVertex(-0.5,  0.5,  .5)
    cube.addVertex(-0.5,  -0.5,  .5)
    cube.addVertex(0.5,  -0.5,  .5)

    cube.addTriangle(0,1,2);
    cube.addTriangle(0,2,3);
    cube.addTriangle(0,3,7);
    cube.addTriangle(0,7,4);
    cube.addTriangle(6,2,3);
    cube.addTriangle(6,3,7);
    cube.addTriangle(5,1,2);
    cube.addTriangle(5,2,6);
    cube.addTriangle(5,1,0);
    cube.addTriangle(5,0,4);
    cube.addTriangle(5,6,7);
    cube.addTriangle(5,7,4);

    Engine.InitMesh(name, cube);
}

function initCylinder(name,b_radius, t_radius, height, n_slices, n_stacks)
{
    let cylinder = new Mesh();
    cylinder.addVertex(0,-height/2,0);
    for (let j = 0; j < n_stacks - 1; ++j)
    {
        let polar = Math.PI * (j+1) / n_stacks;
        let radius = util.LERP(b_radius, t_radius, j / (n_stacks - 2));
        let c_height = util.LERP(-height/2, height/2, j / (n_stacks - 2));
        for(let i = 0; i < n_slices; ++i)
        {
            let azimuth = 2 * Math.PI * i / n_slices;
            let sa = Math.sin(azimuth);
            let ca = Math.cos(azimuth);
            let x = radius*ca;
            let y = c_height;
            let z = radius*sa;
            cylinder.addVertex(x,y,z);
        }
    }
    let bottomIdx = cylinder.addVertex(0,height/2,0);

    for(let i = 0; i < n_slices; ++i)
    {
        let a = i + 1;
        let b = (i + 1) % n_slices + 1;
        cylinder.addTriangle(0, b, a);
    }

    for(let j = 0; j < n_stacks - 2; ++j)
    {
        let aStart = j * n_slices + 1;
        let bStart = (j + 1) * n_slices + 1;
        for(let i = 0; i < n_slices; ++i)
        {
            let a = aStart + i;
            let a1 = aStart + (i + 1) % n_slices;
            let b = bStart + i;
            let b1 = bStart + (i + 1) % n_slices;
            cylinder.addQuad(a,a1,b1,b);
        }
    }

    for(let i = 0; i < n_slices; ++i)
    {
        let a = i + n_slices * (n_stacks - 2) + 1;
        let b = (i + 1) % n_slices + n_slices * (n_stacks - 2) + 1;
        cylinder.addTriangle(bottomIdx, a, b);
    }

    Engine.InitMesh(name, cylinder);
}

function initSphere(name, n_slices, n_stacks)
{
    let sphere = new Mesh();

    sphere.addVertex(0,1,0);
    for (let j = 0; j < n_stacks - 1; ++j)
    {
        let polar = Math.PI * (j+1) / n_stacks;
        let sp = Math.sin(polar);
        let cp = Math.cos(polar);
        for(let i = 0; i < n_slices; ++i)
        {
            let azimuth = 2 * Math.PI * i / n_slices;
            let sa = Math.sin(azimuth);
            let ca = Math.cos(azimuth);
            let x = sp * ca;
            let y = cp;
            let z = sp * sa;
            sphere.addVertex(x,y,z);
        }
    }
    let bottomIdx = sphere.addVertex(0,-1,0);

    for(let i = 0; i < n_slices; ++i)
    {
        let a = i + 1;
        let b = (i + 1) % n_slices + 1;
        sphere.addTriangle(0, b, a);
    }

    for(let j = 0; j < n_stacks - 2; ++j)
    {
        let aStart = j * n_slices + 1;
        let bStart = (j + 1) * n_slices + 1;
        for(let i = 0; i < n_slices; ++i)
        {
            let a = aStart + i;
            let a1 = aStart + (i + 1) % n_slices;
            let b = bStart + i;
            let b1 = bStart + (i + 1) % n_slices;
            sphere.addQuad(a,a1,b1,b);
        }
    }

    for(let i = 0; i < n_slices; ++i)
    {
        let a = i + n_slices * (n_stacks - 2) + 1;
        let b = (i + 1) % n_slices + n_slices * (n_stacks - 2) + 1;
        sphere.addTriangle(bottomIdx, a, b);
    }

    Engine.InitMesh(name, sphere);
}
