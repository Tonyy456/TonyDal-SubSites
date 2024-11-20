class Time
{
    constructor()
    {
        this.elapsed = 0;
        this.last = Date.now();
        this.current = Date.now();  
        this.dt = 0;
        this.fps = 0;
    }
    update()
    {
        this.last = this.current;
        this.current = Date.now();
        let dt = this.current - this.last;
        this.totalTime += dt;
        this.dt = dt / 1000;
        this.fps = (1000/dt);
    }
}
