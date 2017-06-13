/*
 *  Basic functions for DOM interaction/code shortening
 */

function _i(i){return document.getElementById(i);}
function _c(c){return document.getElementsByClassName(c);}
Element.prototype._c=function(c){return this.getElementsByClassName(c);}

/*
 *	Curve class
 *	based on _handlers from https://dschool.stanford.edu/scripts/index.js
 *	replaced Victor.js class w default Vector class calls
 */

function Curve(p0,p1,p2,p3){
    var argc = arguments.length;
    if(argc===4){
        this.p0 = new Vector(arguments[0]);
        this.p1 = new Vector(arguments[1]);
        this.p2 = new Vector(arguments[2]);
        this.p3 = new Vector(arguments[3]);
    }
    else if(argc===1){
        this.p0 = new Vector(arguments[0].p0);
        this.p1 = new Vector(arguments[0].p1);
        this.p2 = new Vector(arguments[0].p2);
        this.p3 = new Vector(arguments[0].p3);
    }
    else {
        this.p0		= new Vector();
        this.p1		= new Vector();
        this.p2		= new Vector();
        this.p3		= new Vector();
    }
    this.interpolate = function(c1,c2,factor){
        this.p0.set(c1.p0);this.p0.mix(c2.p0,factor);
        this.p1.set(c1.p1);this.p1.mix(c2.p1,factor);
        this.p2.set(c1.p2);this.p2.mix(c2.p2,factor);
        this.p3.set(c1.p3);this.p3.mix(c2.p3,factor);
    }
    this.multiply = function(scale){
        this.p0.multiply(scale);
        this.p1.multiply(scale);
        this.p2.multiply(scale);
        this.p3.multiply(scale);
        return this;
    }
}

/*
 *  Vector class taken from traer.js
 *  Supposedly from THREE.js
 */

function Vector() {
	var argc = arguments.length;
	if (argc === 3) {
		this.x = arguments[0];
		this.y = arguments[1];
		this.z = arguments[2];
	}
	else if (argc === 1) {
		this.x = arguments[0].x;
		this.y = arguments[0].y;
		this.z = arguments[0].z;
	}
	else {
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}
}
Vector.prototype.set = function() {
	var argc = arguments.length;
	if (argc === 3) {
		this.x = arguments[0];
		this.y = arguments[1];
		this.z = arguments[2];
	}
	else if (argc === 1) {
		this.x = arguments[0].x;
		this.y = arguments[0].y;
		this.z = arguments[0].z;
	}
};
Vector.prototype.add = function(v) {
	var argc = arguments.length;
	if (argc === 3) {
		this.x += arguments[0];
		this.y += arguments[1];
		this.z += arguments[2];
	}
	else if (argc === 1) {
		this.x += arguments[0].x;
		this.y += arguments[0].y;
		this.z += arguments[0].z;
	}
};
Vector.prototype.substract = function(v) {
	var argc = arguments.length;
	if (argc === 3) {
		this.x -= arguments[0];
		this.y -= arguments[1];
		this.z -= arguments[2];
	}
	else if (argc === 1) {
		this.x -= arguments[0].x;
		this.y -= arguments[0].y;
		this.z -= arguments[0].z;
	}
};
Vector.prototype.scale = function(f) { this.x *= f; this.y *= f; this.z *= f; };
Vector.prototype.distanceTo = function() {
	var argc = arguments.length;
	if (argc === 3) {
		var dx = this.x - arguments[0];
		var dy = this.y - arguments[1];
		var dz = this.z - arguments[2];
		return Math.sqrt(dx*dx + dy*dy + dz*dz);
	}
	else if (argc === 1) {
		return Math.sqrt(this.distanceSquaredTo(arguments[0]));
	}
};
Vector.prototype.distanceSquaredTo = function(v) {
	var dx = this.x - v.x;
	var dy = this.y - v.y;
	var dz = this.z - v.z;
	return dx*dx + dy*dy + dz*dz;
};
Vector.prototype.dot = function(v) { return this.x*v.x + this.y*v.y + this.z*v.z; };
Vector.prototype.length = function() { return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z); };
Vector.prototype.lengthSquared = function() { return this.x*this.x + this.y*this.y + this.z*this.z; };
Vector.prototype.clear = function() { this.x = 0; this.y = 0; this.z = 0; };
Vector.prototype.toString = function() { return '('+this.x+','+this.y+','+this.z+')'; };
Vector.prototype.cross = function(v) {
	return new Vector(
		this.y*v.z - this.z*v.y,
		this.x*v.z - this.z*v.x,
		this.x*v.y - this.y*v.x
	);
};
Vector.prototype.isZero = function() {
	return this.x === 0 && this.y === 0 && this.z === 0;
};

/*
 *	Extensions to Vector class
 *	based on Victor.js
 *	at some point it almost makes more sense to just use Victor.js
 */

Vector.prototype.mixX = function(v,a=0.5) {
    this.x = (1-a)*this.x+a*v.x;
    return this;
};
Vector.prototype.mixY = function(v,a=0.5) {
    this.y = (1-a)*this.y+a*v.y;
    return this;
};
Vector.prototype.mix = function(v,a=0.5) {
    return this.mixX(v,a).mixY(v,a);
};
Vector.prototype.multiply = function(v){
    this.x *= v.x;
    this.y *= v.y;
    return this;
};
