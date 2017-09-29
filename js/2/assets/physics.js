/**
 *  physics.js
 *  A general vector based physics library for consistency across small simula-
 *  -tions on https://trew.moe.
 *
 *  @author Trevor Hoglund <trewbot@gmail.com>
 *  @version 0.1.0
 *  2017.09.29
 */

const phys	= {
    centerOfMass(){
        var sum		= 0,
            com		= new Vector();
        for(let o of phys.objects){
            com.x  += o.position.x*o.mass;
            com.y  += o.position.y*o.mass;
            sum	   += o.mass;
        }
        com.x	   /= sum;
        com.y	   /= sum;
        phys.totalMass = sum;
        return com;
    },
    collisions	(){
        //	my life is a fucking mess
    },
    G			: 6.67e-11,
    gravity		(){
        for(let o of phys.objects){
            var g = new Vector();
            if(phys.objects.length > 1)
                for(let i of phys.objects){
                    if(o == i) continue;
                    let s   = new Vector(o.position.x-i.position.x,o.position.y-
                                i.position.y,0),
                        a   = i.mass/(s.magnitude()**2);
                    g.x	   += s.cos()*a;
                    g.y	   += s.sin()*a;
                }
            o.velocity.x   += g.x*(-phys.G)*scale.time;
            o.velocity.y   += g.y*(-phys.G)*scale.time;
        };
        phys.step.next().value();
    },
    init        (callback=()=>{}){
        phys.steps = [
            phys.gravity,
            phys.move
        ];
        window.scale = phys.scale;
        callback();
    },
    move		(){
        for(let o of phys.objects){
            o.position.x   += o.velocity.x*scale.time;
            o.position.y   += o.velocity.y*scale.time;
        };
        //E_.step.next().value();
    },
    objects		: [],
    object      : function(e){
        this.birth		= +new Date;
        this.mass		= +e.mass;
        this.name		= e.name ? e.name : null;
        this.position	= new Vector(e.p.x,e.p.y,0);
        this.velocity	= new Vector(e.v.x,e.v.y,0);
        phys.objects[phys.objects.length] = this;
    },
    scale		: {
        diamRate	: 0.80e-7,	//	pixels per kg
        massRate	: 1.05,		//	growth per 100ms
        space		: 0.30e7,	//	meters per pixel
        time		: 0.50e3,	//	seconds per tick
        velocity	: 55.7		//	meters per second per pixel
    },
    tick		(){
        if(!E_.running) return !1;
        phys.step = (function*(s){
            for(let i of s)
                yield i;
        })(phys.steps);
        phys.step.next().value();
    },
    totalMass	: 0
};
