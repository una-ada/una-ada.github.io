/*
 *	Graphene Color Picker
 *	Written by Trewbot
 *	Jun 13, 2015
 *
 *	Version:				Date:				Description:
 *		v0.0.0.0001				Sep 20, 2014		-
 *		v0.0.0.0002				Oct 03, 2014		-
 *		v0.1.0.0003				Jun 13, 2015		Updated format to Graphene w0.4.0 standards
 *		v0.1.0.0004				Jun 13, 2015		Fixed typo on line 115 >> 118
 *		v0.1.0.0005				Jun 13, 2015		Fixed innerHTML setting in elements
 *		v0.1.0.0006				Jun 13, 2015		Fixed className setting in elements
 *		v0.1.0.0007				Jun 14, 2015		Fixed _g not being defined for external uses
 *		v0.1.0.0008				Jun 14, 2015		Added _i, _c, and Element.prototype._c
 */
	function _i(i){return document.getElementById(i);}
	function _c(c){return document.getElementsByClassName(c);}
	Element.prototype._c = function(c){return this.getElementsByClassName(c);}
	Element.prototype.set = function(a) {
		for (var i in a) {
			if(~['styles','style'].indexOf(i) && typeof a[i] === 'object')
				for(var p in a[i])
					this.style[p] = a[i][p];
			else if(i === 'html')
				this.innerHTML = a[i];
			else
				this.setAttribute(i, a[i]);
		}
		return this;
	};

	if(typeof Graphene !== 'object'){
		var Graphene = new(function(){
			this.pop = true;
			this.v = '';
			this.url = 'http://gra.phene.co';
		})(),
			_g = Graphene;
	}
	
	_g.cl = (_g.color = {
		ids		: 0,
		hue		: function(h) {
			var r,g,b,
				m = Math.floor(h*6),
				f = h*6-m,
				q = 1-f,
				t = 1-q;
			switch(m%6){
				case 0:r=1,g=t,b=0;break;
				case 1:r=q,g=1,b=0;break;
				case 2:r=0,g=1,b=t;break;
				case 3:r=0,g=q,b=1;break;
				case 4:r=t,g=0,b=1;break;
				case 5:r=1,g=0,b=q;break;
			}
			return{
				r:Math.floor(r*255),
				g:Math.floor(g*255),
				b:Math.floor(b*255)
			};
		},
		rth		: function(r,g,b) {
				r  /= 255,
				g  /= 255,
				b  /= 255;
			var max = Math.max(r,g,b),
				min = Math.min(r,g,b),
				d   = max - min,
				h,
				s   = max==0?0:d/max,
				v   = max,
				d   = max-min;
				if(max==min){h=0;}
				else{switch(max){
					case r:h=(g-b)/d+(g<b?6:0);break;
					case g:h=(b-r)/d+2;break;
					case b:h=(r-g)/d+4;break;
				}
				h/=6;
			}
			return[h,s,v];
		},
		htr		: function(h,s,v) {
			var r,g,b,
				i=Math.floor(h*6),
				f=h*6-i,
				p=v*(1-s),
				q=v*(1-f*s),
				t=v*(1-(1-f)*s);
			switch(i%6){
				case 0:r=v,g=t,b=p;break;
				case 1:r=q,g=v,b=p;break;
				case 2:r=p,g=v,b=t;break;
				case 3:r=p,g=q,b=v;break;
				case 4:r=t,g=p,b=v;break;
				case 5:r=v,g=p,b=q;break;
			}
			return[r*255,g*255,b*255];
		},
		thx		: function(n) {
			n = parseInt(n,10);
			if(isNaN(n)) return "00";
			n = Math.max(0,Math.min(n,255));
			return "0123456789ABCDEF".charAt((n-n%16)/16)+"0123456789ABCDEF".charAt(n%16);
		},
		hxr		: function(h) {
			return {
				r: (parseInt(((h.charAt(0)=="#") ? h.substring(1,7):h).substring(0,2),16)),
				g: (parseInt(((h.charAt(0)=="#") ? h.substring(1,7):h).substring(2,4),16)),
				b: (parseInt(((h.charAt(0)=="#") ? h.substring(1,7):h).substring(4,6),16))
			}
		},
		picker	: function(p, o){
			var o 		= o || {};
			
			this.int	 = ++_g.cl.ids;
			this.input	= typeof o.input=='object'?o.input:{};
			this.color	= typeof o.color=='string'?o.color:'#FF0000';
			this.func	= typeof o.func=='function'?o.func:function(){return false;};
			
			this.elem	= document.createElement('table').set({
				id		: 'gra_clr-' + this.int,
				style	: {
					position		: 'relative',
					padding			: '10px',
					paddingRight	: '16px',
					background		: '#fff',
					border			: '1px solid #ccc',
					borderSpacing	: 0
				}
			});
			
			this.row	= this.elem.insertRow();
			p.appendChild(this.elem);
			
			
			this.ds		= false;	//	Dragging Saturation
			this.satel	= document.createElement('div').set({
				id			: 'gra_clr-sat-' + this.int,
				class		: 'gra_clr-sat',
				html		: '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gd" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#000000" stop-opacity="1"></stop><stop offset="100%" stop-color="#000000" stop-opacity="0"></stop></linearGradient><linearGradient id="gs" x1="0%" y1="100%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffffff" stop-opacity="1"></stop><stop offset="100%" stop-color="#ffffff" stop-opacity="0"></stop></linearGradient></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#gs)"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#gd)"></rect></svg>',
				style		: {
					position	: 'relative',
					width		: '116px',
					height		: '116px',
					marginRight	: '10px',
					cursor		: 'pointer',
					background	: '#f00'
				}
			});
			this.satsl	= document.createElement('div').set({
				id			: 'gra_clr-sat-selector-' + this.int,
				class		: 'gra_clr-sat-selector',
				style		: {
					position	: 'absolute',
					left		: 'calc(100% - 6px)',
					top			: '-6px',
					width		: '9px',
					height		: '9px',
					border		: '1px solid #111',
					borderRadius: '50%'
				}
			});
			this.satel.appendChild(this.satsl);
			
			this.satmf	= function(e) {
				e.preventDefault();
				var r	= this.satel.getBoundingClientRect(),
					t,
					y	= e.pageY - ((t = document.documentElement.scrollTop)?t:scrollY),
					x	= e.pageX - ((t = document.documentElement.scrollLeft)?t:scrollX),
					t	= y - r.top,
					l	= x - r.left;
				if(t > r.height) t = r.height;
				if(l > r.width)  l = r.width;
				if(t < 0) t = 0;
				if(l < 0) l = 0;
				this.s = parseInt(l,10)/r.width;
				this.v = 1-(parseInt(t,10)/r.height);
				this.satsl.style.top  = t - 6 + "px";
				this.satsl.style.left = l - 6 + "px";
				this.update()
			}
			this.satmd                   = function(e) {
				this.ds = true;
				this.satmf(e);
			}
			this.satmm                   = function(e) {
				if(this.ds) this.satmf(e);
			}
			this.satel.addEventListener('mousedown', this.satmd.bind(this));
			document.addEventListener('mousemove', this.satmm.bind(this));
			this.row.insertCell().appendChild(this.satel);
			
			
			this.dh		= false;	//	Dragging Hue
			_g.cl.hueel	= document.createElement('div').set({
				id			: 'gra_clr-hue-' + this.int,
				class		: 'gra_clr-hue',
				html		: '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gh" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="00.000%" stop-color="#ff0000" stop-opacity="1"></stop><stop offset="16.666%" stop-color="#ff00ff" stop-opacity="1"></stop><stop offset="33.333%" stop-color="#0000ff" stop-opacity="1"></stop><stop offset="50.000%" stop-color="#00ffff" stop-opacity="1"></stop><stop offset="66.666%" stop-color="#00ff00" stop-opacity="1"></stop><stop offset="83.333%" stop-color="#ffff00" stop-opacity="1"></stop><stop offset="100.00%" stop-color="#ff0000" stop-opacity="1"></stop></linearGradient></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#gh)"></rect></svg>',
				style		: {
					position	: 'relative',
					width		: '10px',
					height		: '116px',
					cursor		: 'pointer'
				}
			});
			_g.cl.huesl	= document.createElement('div').set({
				id			: 'gra_clr-hue-selector-' + this.int,
				class		: 'gra_clr-hue-selector',
				style		: {
					position	: 'absolute',
					left		: '100%',
					top			: '-4px',
					width		: '0px',
					height		: '0px',
					borderStyle	: 'solid',
					borderWidth	: '5.5px 9.5px 5.5px 0',
					borderColor	: 'transparent #111 transparent transparent'
				}
			});
			_g.cl.hueel.appendChild(_g.cl.huesl);
			_g.cl.huemd	= function(e) {
				e.preventDefault();
				this.dh = true;
				var r            = _g.cl.hueel.getBoundingClientRect(),
					t,
					y            = e.pageY - ((t = document.documentElement.scrollTop)?t:scrollY),
					t            = (y - r.top);
				if(t > r.height) t = r.height;
				if(t < 0) t = 0;
				var h            = _g.cl.hue(t / r.height);
				this.satel.style.background = "rgb("+h.r+","+h.g+","+h.b+")";
				_g.cl.huesl.style.top        = t - 4 + "px";
				this.h = parseInt(t,10)/r.height;
				this.update();
			}
			_g.cl.huemm                   = function(e) {
				e.preventDefault();
				var r            = _g.cl.hueel.getBoundingClientRect(),
					t,
					y            = e.pageY - ((t = document.documentElement.scrollTop)?t:scrollY),
					t            = (y - r.top);
				if(t > r.height) t = r.height;
				if(t < 0) t = 0;
				var h            = _g.cl.hue(t / r.height);
				if(this.dh) {
					this.satel.style.background = "rgb("+h.r+","+h.g+","+h.b+")";
					_g.cl.huesl.style.top        = t - 4 + "px";
					this.h = parseInt(t,10)/r.height;
					this.update();
				}
			}
			_g.cl.hueel.addEventListener('mousedown', _g.cl.huemd.bind(this));
			_g.cl.hueel.addEventListener('mousemove', _g.cl.huemm.bind(this));
			this.row.insertCell().appendChild(_g.cl.hueel);
			
			this.undrag	= function(){this.dh = false;this.ds = false;}
			document.addEventListener('mouseup', this.undrag.bind(this));
			
			this.update	= function() {
				var r = _g.cl.htr(this.h,this.s,this.v);
				this.color = '#'+_g.cl.thx(r[0])+_g.cl.thx(r[1])+_g.cl.thx(r[2]);
				this.input.value = this.color;
				this.func(this.color);
			}
			this.updateSelectors = function(clr) {
				var elf = false;
				if(typeof clr !== 'string' && typeof this.input == 'object') elf = true, clr = this.input.value;
				var rgb = _g.cl.hxr(clr),
					hsv = _g.cl.rth(rgb.r,rgb.g,rgb.b);
				if(typeof hsv[0] == 'number' && !isNaN(hsv[0])) {
					this.h = hsv[0]; this.s = hsv[1]; this.v = hsv[2];
					var r = _g.cl.hueel.getBoundingClientRect(),
						t = r.height * hsv[0],
						h = _g.cl.hue(hsv[0]);
					this.satel.style.background = "rgb("+h.r+","+h.g+","+h.b+")";
					_g.cl.huesl.style.top        = t - 4 + "px";
					var r = this.satel.getBoundingClientRect(),
						l = r.width * hsv[1];
						t = r.height * (1 - hsv[2]);
					this.satsl.style.top  = t - 6 + "px";
					this.satsl.style.left = l - 6 + "px";
					if(!elf) this.update();
					else {
						var r = _g.cl.htr(this.h,this.s,this.v);
						this.color = '#'+_g.cl.thx(r[0])+_g.cl.thx(r[1])+_g.cl.thx(r[2]);
						this.func(this.color);
					}
				}
			}
			this.updateSelectors(this.color);
			if(typeof this.input == 'object') this.input.addEventListener('keyup', this.updateSelectors.bind(this));
		}
	});