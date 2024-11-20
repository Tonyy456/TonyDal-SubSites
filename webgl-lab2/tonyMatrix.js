/*
 * Functions that create the matrices needed in order
 * to make certain affine transformations to a point/vertex
 */
function IdentityMatrix()
{
    return new SMat4([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
}

function TranslationMatrix (dx, dy, dz) {
    return new SMat4([1,0,0,dy,0,1,0,dx,0,0,1,dz,0,0,0,1]); 
}

function ScalingMatrix(sx,sy,sz){
    return new SMat4([sx,0,0,0,0,sy,0,0,0,0,sz,0,0,0,0,1]);
}

function ShearingMatrixX(h)
{
    return new SMat4([1,h,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
}

function ShearingMatrixX(h)
{
    return new SMat4([1,0,0,0,h,1,0,0,0,0,1,0,0,0,0,1]);
}
function RotationMatrixZ(theta)
{
    let rad = theta * Math.PI / 180;
    return new SMat4([Math.cos(rad),-Math.sin(rad),0,0,Math.sin(rad),Math.cos(rad),0,0,0,0,1,0,0,0,0,1]);
}

/*
 * HCoor (Homogenous Coordinate)
 * Represented as a single row matrix but can be 
 * used as a column matrix.
 */
class HCoor {
    // array = [x,y,z,1];
    constructor (x,y,z) {
        this.data = [x,y,z,1];
    }
    index(i) {
        return this.data[i];
    }
    log() {
        let result = "";
        for(let i = 0; i < 3; i++)
        {
            result += this.data[i] + " ";
        }
        console.log(result);
    }

}

/*
 * SMat4 (Square Matrix 4x4)
 * Represnted as an array that is in row major order.
 * iterates through each row in order.
 */
class SMat4 {
    //row major order
    constructor(array)
    {
        this.data = array;
    }
    index(r,c)
    {
        return this.data[4*r + c];
    }
    multiplyPoint(rhs)
    {
        let array = [];
        for(let gcol = 0; gcol < 4; gcol++)
        {
            let result = 0;
            for(let i = 0; i < 4; i++)
            {
                result += (this.index(gcol, i) * rhs.index(i));
            }
            array.push(result);
        }
        return new HCoor(array[0], array[1], array[2]);
    }
    multiply(rhs)
    {
        let array = [];
        for(let frow = 0; frow < 4; frow++)
        {
            for(let gcol = 0; gcol < 4; gcol++)
            {
                let result = 0;
                for(let i = 0; i < 4; i++)
                {
                    result += (this.index(frow, i) * rhs.index(i, gcol));
                }
                array.push(result);
            }
        }
        return new SMat4(array);
    }
    array() {
        return this.data;
    }
    columnMajorArray(){
        let d = this.data;
        let newData = [  
            d[0], d[4], d[8], d[12],
            d[1], d[5], d[9], d[13],
            d[2], d[6], d[10], d[14],
            d[3], d[7], d[11], d[15]
        ];
        return newData;
    }
    log(){
        let rep = "";
        for(let column = 0; column < 4; column++)
        {
            for (let row = 0; row < 4; row++){
                rep += this.data[column * 4 + row] + " ";
            }
            rep += "\n";
        }
        console.log(rep);
    }
}
