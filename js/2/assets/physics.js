/**
 *  physics.js
 *  A general vector based physics library for consistency across small simula-
 *  -tions on https://trew.moe.
 *
 *  @author Trevor Hoglund <trewbot@gmail.com>
 *  @version 0.1.0
 *  2017.09.29
 */

class Phys {
    /**
     *	Physics functions
     *  @param {number} [t=0.50e3] Amount of seconds in one tick
     *  @param {function} callback Callback function
     */
    constructor(t=0.50e3,callback=()=>{}){
        //  Declaration of physical constants
        this.G      = 6.67e-11; // N m^2 kg^-2
        this.ℏ		= 1.05e-34; // m^2 kg / s
        this.t      = t;        // s
        this.particles = [];
        this.steps = [
            this.gravity,
            this.move
        ];
        this.running= true;
        callback();
    }

    /**
     *  Find the center of mass of an array of particles
     *  @param {array} particles Array of particles to analyze
     */
    static centerOfMass(particles){
        var sum     = 0,
            com     = new Vector();
        for(let o of particles){
            com.x  += o.position.x*o.mass;
            com.y  += o.position.y*o.mass;
            sum    += o.mass;
        }
        com.x      /= sum;
        com.y      /= sum;
        return com;
    }

    /**
     *  Gravity calculations
     */
    gravity(){
        for(let o of this.particles){
            var g = new Vector();
            if(this.particles.length > 1)
                for(let i of this.particles){
                    if(o == i) continue;
                    let s   = new Vector(o.position.x-i.position.x,o.position.y-
                                i.position.y,0),
                        a   = i.mass/(s.magnitude()**2);
                    g.x	   += s.cos()*a;
                    g.y	   += s.sin()*a;
                }
            o.velocity.x   += g.x*(-this.G)*this.t;
            o.velocity.y   += g.y*(-this.G)*this.t;
        };
        this.step.next().value();
    }

    /**
     *  Move all particles forward according to their velocity
     */
    move(){
        for(let o of this.particles){
            o.position.x   += o.velocity.x*this.t;
            o.position.y   += o.velocity.y*this.t;
        }
    }

    /**
     *  Increment time forward one tick
     */
    tick(){
        if(!this.running) return !1;
        this.step = (function*(s){
            for(let i of s)
                yield i;
        })(this.steps);
        this.step.next().value();
    }
}

class Particle {}

class Vector {}



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
