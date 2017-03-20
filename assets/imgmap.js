/*
 *	Image map dynamic resizing script
 *	Written by Trevor J Hoglund
 *	2017.02.28
 *
 *	based on http://stackoverflow.com/a/13322059
 *	main form of changes:
 *		generalized initial size to be that of actual image (not hardcoded)
 *		changed all local variables to be variables of the object
 *		changed on* functions to addEventListeners
 *	this is terribly written bc im tired af ^
 */

var ImageMap	= function(map){
	this.areas	= map.getElementsByTagName('area');
	this.coords	= [];
	this.img	= map.mapOf();
	if(this.img==null) return !1;
	this.width0	= 1;
	this.ni		= new Image();
	this.ni.src = this.img.src;
	this.ni.onload = (function(){this.width0 = this.ni.width;}).bind(this)
	for(var n=0;n<this.areas.length;n++)
		this.coords[n] = this.areas[n].coords.split(',');
	this.resize = function(){
		var r = this.img.clientWidth / this.width0;
		for(let n in this.coords){
			for(let m in this.coords[n])
				this.coords[n][m] *= r;
			this.areas[n].coords = this.coords[n].join(',');
		}
		this.width0 = this.img.clientWidth;
		return !0;
	};
	window.addEventListener('resize',(this.resize).bind(this));
	window.setTimeout((this.resize).bind(this),100)
};
Element.prototype.mapOf = function(){
	var imgs = document.getElementsByTagName('img');
	for(let i of imgs)
		if(document.querySelector(i.getAttribute('usemap'))==this)
			return i;
}
window.addEventListener('load',()=>{
    var maps = document.getElementsByTagName('map');
	for(let m of maps)
		new ImageMap(m);
})