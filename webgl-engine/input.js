class Input
{
    constructor()
    {
        this.isdown = [];
        this.shift = false;
        document.addEventListener('keydown', function(e)
            {
                Engine.input._DOWN(e);
            });
        document.addEventListener('keyup', function(e)
            {
                Engine.input._UP(e);
            });
    }
    _DOWN(e)
    {
        let code = e.key;

        if(!this.isdown.includes(code)){
            this.isdown.push(code);
        }   
    }
    _UP(e)
    {
        let code = e.key;
        this._remove(code);
        this._remove(code.toUpperCase());
    }
    _remove(key)
    {
        const index = this.isdown.indexOf(key);
        if(index !== -1)
        {
            this.isdown.splice(index, 1);
        }
    }
    down()
    {
       return this.isdown; 
    }
    isDown(key)
    {
        let rv = false;
        const index = this.isdown.indexOf(key);
        if(index !== -1)
        {
            rv = true;
        }
        return rv;

    }
}
