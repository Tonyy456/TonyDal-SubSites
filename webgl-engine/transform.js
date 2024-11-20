class Transform
{
    constructor()
    {
        this.position = vec3.create([0,0,0]);
        this._scale = vec3.create([1,1,1]);
        this.rotation = quat4.identity();

        this.forward = vec3.create([0,0,1]);
        this.up = vec3.create([0,1,0]);
        this.left = vec3.create([1,0,0]); 
       
        this.model = mat4.identity(); 
    }

    transformModel(matrix, local)
    {
        if(local) 
        {
            this.model = mat4.multiply(this.model, matrix);
        }
        else 
        {
            this.model = mat4.multiply(matrix, this.model);
        }
        this.position = mat4.multiplyVec3(this.model, vec3.create([0,0,0]));
    }
    lookAt(coi, local) {
        let newF = vec3.normalize(vec3.subtract(coi, this.position));
        let quat = quat4.rotateTo(this.forward, newF);
        this.rotateQuat(quat, local);
    }
    translate(dp, local)
    { 
        let vec = vec3.create(dp);
        this.position = vec3.add(this.position, vec);
        let dpMat = mat4.translation(vec);
        this.transformModel(dpMat, local);
    }
    scale(ds, local)
    { 
        let vec = vec3.create(ds);
        let dsMat = mat4.scale(vec);
        this._scale = vec3.elementScale(this._scale, vec);
        this.transformModel(dsMat, local);
    }
    rotateQuat(quat, local)
    {
        this.rotation = quat4.multiply(this.rotation, quat); // update this.rotation
        let daMat = quat4.toMat4(quat); // update model

        /* Update forward, up, and left? */
        mat4.rotateBasis(quat, this.left, this.up, this.forward);
        this.forward = vec3.normalize(this.forward);
        this.left = vec3.normalize(this.left);
        this.up = vec3.normalize(this.up);
        
        this.transformModel(daMat, local);
    }
    rotate(axis, angle, local)
    {
        let axisV = vec3.create(axis); // change to a vector
        let quat = quat4.axisAngle(axisV, angle); // change to a quaternion
        this.rotateQuat(quat, local);
    }
    rotateEulers(change, local)
    {
        let angles = vec3.create(change);
        let quat = quat4.fromEuler(angles);
        this.rotateQuat(quat, local);
    }
    getModel()
    {
        return this.model;
    }
}
