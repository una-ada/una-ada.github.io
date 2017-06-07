/*
 *	Graphene Modal
 *	Written by Trevor J Hoglund
 *	2017.01.27
 *
 *	REQUIRES ECMASCRIPT 2015+
 */

function _i(i){return document.getElementById(i);}
function _c(c){return document.getElementsByClassName(c);}
Element.prototype._c = function(c){return this.getElementsByClassName(c);}
Element.prototype.parentAnchor = function () {
	var t = this;
	if (t == null)
		return false;
	while (t.tagName.toLowerCase() !== 'html') {
		if (typeof t.href == 'string')
			return t;
		t = t.parentElement;
	}
	return false;
}
Element.prototype.set = function(o){
	for(var i in o)
		if(~['styles','style'].indexOf(i) && typeof o[i] === 'object') for(var p in o[i]) this.style[p] = o[i][p];
		else if(i === 'html') this.innerHTML = o[i];
		else this.setAttribute(i, o[i]);
	return this;
};
Object.collect		= function(){
	var ret = {},
		len = arguments.length;
	for(var i = 0; i < len; i++)
		for(p in arguments[i])
			if(arguments[i].hasOwnProperty(p))
				ret[p] = arguments[i][p];
	return ret;
};
ajax = function(url, type, header, ops){
	var r = new XMLHttpRequest(),
	o = ops || {};
	r.open(type, url, !0);
	r.withCredentials = typeof o.cred == 'boolean' ? o.cred : !0;
	r.setRequestHeader("Content-type", o.type || "application/x-www-form-urlencoded");
	r.send(header);
	typeof o.load == 'function' && r.addEventListener('load', function(){o.load(r);});
	typeof o.change == 'function' && (r.onreadystatechange = o.change);
	return r;
}

if(typeof Graphene !== 'object'){
	var Graphene = new(function(){
		this.pop = true;
		this.v = '';
		this.url = 'http://gra.phene.co';
	})(),
		_g = Graphene;
}

(POPUP_STYLE = document.createElement("style")).innerHTML
	= '#popup-confirm		{position:relative;width:410px;margin:20px auto auto;}'
	+ '#popup-yes			{background:#444444;margin-right:10px;}'
	+ '#popup-no			{background:#ddd;}'
	+ '.popup-option		{cursor:pointer;padding:8px;width:184px;text-align:center;color:#FFF;display:inline-block;}'
	+ '.popup-button		{padding:6px;width:200px;background:#444444;color:#fff;margin:auto;margin-top:10px;font-weight:bold;text-align:center;cursor:pointer;}';
document.documentElement.appendChild(POPUP_STYLE);

_g.mo = (_g.modal = {
	lbOpen		: !1,
	lbBase		: document.URL.split('://')[0] + '://' + document.domain,
	lbBack		: document.URL,
	lbSrc		: '',
	lbLayt		: '',
	lbInfo		: {},
	lbList		: [],
	lbIndx		: 0,
	idFarm		: {
		modal	: (function*(){
			var i = 0;
			for(;;) yield (++i)+'_'+(+new Date());
		})()
	},
	style		: {
		modal	: {
			approve	: {
				background		: '#444'
			},
			body	: {
				background		: '#fff',
				boxShadow		: '0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)',
				height			: 'auto',
				margin			: 'auto',
				position		: 'relative',
				verticalAlign	: 'middle',
				width			: '350px',
				zIndex			: 200
			},
			button	: {
				border			: 0,
				boxShadow		: '0 1px 5px 0 rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12)',
				color			: '#fff',
				cursor			: 'pointer',
				display			: 'inline-block',
				outline			: 0,
				padding			: '3px',
				textAlign		: 'center',
				width			: '75px'
			},
			confirm	: {
				padding			: '0 10px 10px 10px',
				textAlign		: 'right'
			},
			container: {
				display			: 'inline-flex',
				height			: '100%',
				left			: 0,
				position		: 'fixed',
				top				: 0,
				width			: '100%',
				zIndex			: 2400
			},
			content	: {
				padding			: '10px'
			},
			reject	: {
				background		: '#ccc',
				marginRight		: '10px'
			},
			shade	: {
				background		: 'rgba(0,0,0,0.6)',
				height			: '100%',
				left			: 0,
				position		: 'absolute',
				top				: 0,
				width			: '100%',
				zIndex			: 100
			},
			title	: {
				background		: '#f8f8f8',
				color			: '#111',
				padding			: '6px',
				textAlign		: 'center',
				width			: 'calc(100% - 12px)'
			}
		},
		lightbox: {
			body	: {
				background		: '#fff',
				height			: 'auto',
				position		: 'relative',
				margin			: 'auto',
				minWidth		: '500px',
				verticalAlign	: 'middle'
			},
			comments: {
				textAlign		: 'top',
				width			: '300px'
			},
			image	: {
				display			: 'block',
				margin			: 'auto',
				verticalAlign	: 'middle'
			},
			next	: {
				cursor			: 'pointer',
				height			: '100%',
				left			: 0,
				position		: 'absolute',
				top				: 0,
				width			: '150px',
				zIndex			: 1
			},
			prev	: {
				cursor			: 'pointer',
				height			: '100%',
				position		: 'absolute',
				right			: 0,
				top				: 0,
				zIndex			: 1
			},
			shade	: {
				background		: 'rgba(0,0,0,0.6)',
				display			: 'inline-flex',
				height			: '100%',
				left			: 0,
				position		: 'fixed',
				top				: 0,
				width			: '100%',
				zIndex			: 2400
			},
			table	: {
				border			: 0,
				padding			: 0,
				margin			: 0
			},
			td		: {
				border			: 0,
				fontSize		: 0,
				padding			: 0
			},
			tr		: {
				border			: 0,
				padding			: 0
			},
			view	: {
				background		: '#000',
				display			: 'inline-flex',
				position		: 'relative',
				minHeight		: '500px',
				minWidth		: '500px'
			}
		}
	},
	open		: function(ops){
		var id			= _g.mo.idFarm.modal.next().value,
			modal		= document.createElement('div').set({
			class		: 'modal',
			id			: 'modal-' + id,
			style		: _g.mo.style.modal.container
		}),
			modalShade	= document.createElement('div').set({
			class		: 'modal-shade',
			id			: 'modal-shade-' + id,
			style		: _g.mo.style.modal.shade
		}),
			modalBody	= document.createElement('div').set({
			class		: 'modal-body',
			id			: 'modal-body-' + id,
			style		: Object.collect({
				width		: typeof ops.width == 'string'			? ops.width				: _g.mo.style.modal.body.width
			},_g.mo.style.modal.body)
		}),
			modalTitle	= document.createElement('div').set({
			class		: 'modal-title',
			html		: typeof ops.title == 'string' ? ops.title : '',
			id			: 'modal-title-' + id,
			style		: Object.collect(_g.mo.style.modal.title,{
				background	: typeof ops.titleColor == 'string'		? ops.titleColor		: _g.mo.style.modal.title.background,
				color		: typeof ops.titleTextColor == 'string'	? ops.titleTextColor	: _g.mo.style.modal.title.color,
				display		: typeof ops.title == 'string'			? 'block'				: 'none'
			})
		}),
			modalContent= document.createElement('div').set({
			class		: 'modal-content',
			html		: ops.text,
			id			: 'modal-content-' + id,
			style		: Object.collect(_g.mo.style.modal.content,{
				textAlign	: typeof ops.textCenter == 'boolean' && ops.textCenter ? 'center' : ''
			})
		});
		
		modalBody.appendChild(modalTitle);
		modalBody.appendChild(modalContent);
		
		if(typeof ops.confirm == 'boolean' && ops.confirm){
			var modalConfirm= document.createElement('div').set({
				class		: 'modal-confirm',
				id			: 'modal-confirm-' + id,
				style		: _g.mo.style.modal.confirm
			}),
				modalApprove= document.createElement('div').set({
				class		: 'modal-approve',
				html		: 'Yes',
				id			: 'modal-approve-' + id,
				style		: Object.collect(
					_g.mo.style.modal.button,
					_g.mo.style.modal.approve
				)
			}),
				modalReject	= document.createElement('div').set({
				class		: 'modal-reject',
				html		: 'No',
				id			: 'modal-reject-' + id,
				style		: Object.collect(
					_g.mo.style.modal.button,
					_g.mo.style.modal.reject
				)
			});
			modalConfirm.appendChild(modalReject);
			modalConfirm.appendChild(modalApprove);
			modalBody.appendChild(modalConfirm);
		}
		
		modal.appendChild(modalShade);
		modal.appendChild(modalBody);
		
		document.body.insertBefore(modal, document.body.children[0]);
		
		window.dispatchEvent(new Event('MODAL_OPEN'));
		
		window.setTimeout(function(){
			_c('modal-shade')[0].addEventListener('click',_g.mo.close);
		}, 0);
		
		if(typeof ops.confirm == 'boolean' && ops.confirm)
			return new Promise(function(resolve,reject){
				_c('modal-approve')[0].addEventListener('click',resolve);
				_c('modal-approve')[0].addEventListener('click',_g.mo.close);
				
				_c('modal-reject')[0].addEventListener('click',reject);
				_c('modal-shade')[0].addEventListener('click',reject);
				_c('modal-reject')[0].addEventListener('click',_g.mo.close);
			});
	},
	close		: function(){
		if(_c('modal')){
			_c('modal')[0].remove();
			window.dispatchEvent(new Event('MODAL_CLOSE'));
		}
	},
	lightbox	: function(type,source,layout,index){
		_g.mo.lbBack = document.URL;
		_g.mo.lbIndx = index;
		_g.mo.lbSrc  = source;
		_g.mo.lbLayt = layout;
		var open = function(){
			layout = layout.split('.');
			for(var i = 0, click = !1, list = JSON.parse(JSON.stringify(_g.mo.lbInfo[source])); i < layout.length; i++){
				if(!click && layout[i] !== '*') list = list[layout[i]];
				else {
					click = !0;
					if(layout[i] == '*'){if(list.length == null) list = Object.keys(list).map(function(k){return list[k]});}
					else for(var j = 0; j < list.length; j++) list[j] = list[j][layout[i]];
				}
			}
			_g.mo.lbList = list;
			if(typeof _g.mo.lbIndx == "string") _g.mo.lbIndx = list.indexOf(_g.mo.lbIndx);
			if(_g.mo.lbIndx < 0) _g.mo.lbIndx = 0;
			if(_g.mo.lbIndx >= list.length) _g.mo.lbIndx = list.length - 1;
			var img = new Image();
			img.src = _g.mo.lbList[_g.mo.lbIndx];
			img.onload = function(){
				var wh = window.innerHeight,
					ww = window.innerWidth,
					ih = img.height,
					iw = img.width,
					lbw,
					lbh,
					j,
					lbe = _c('lightbox')[0],
					lbv = _c('lightbox-view')[0];
				
				if(iw > (j = Math.max(500, ww - 100))) lbw = j, lbh = (j / iw) * ih;
				else lbw = iw, lbh = ih;
				
				if(lbh > (j = wh - 100)) lbw = (j / ih) * iw, lbh = j;

				var olbi = _c('lightbox-image')[0];
				if(olbi !== void(0)) olbi.remove();

				if(lbv.style.width == '' || parseInt(lbv.style.width) < lbw) lbv.style.width = lbw + "px";
				if(lbv.style.height == '' || parseInt(lbv.style.height) < lbh) lbv.style.height = lbh + "px";
				_c('lightbox-prev')[0].style.width = parseInt(lbv.style.width) - 150 + "px";
				_c('lightbox-prev')[0].parentAnchor().onclick = function(){_g.mo.lightbox('api',_g.mo.lbSrc,_g.mo.lbLayt,++_g.mo.lbIndx)};
				_c('lightbox-next')[0].parentAnchor().onclick = function(){_g.mo.lightbox('api',_g.mo.lbSrc,_g.mo.lbLayt,--_g.mo.lbIndx)};
				
				var lbm = document.createElement('img').set({
					class 	: 'lightbox-image',
					src		: img.src,
					style	: Object.collect({
							height	: lbh + 'px',
							width	: lbw + 'px'
						},_g.mo.style.lightbox.image)
				});
				lbv.insertBefore(lbm, lbv.children[0]);
			}
		};
		
		if(!_g.mo.lbOpen){
			var id			= _g.mo.idFarm.modal.next().value,
				lbox		= document.createElement('div').set({
				class		: 'lightbox-shade',
				id			: 'lightbox-shade-' + id,
				style		: _g.mo.style.lightbox.shade
			}),
				lboxBodt	= lbox.appendChild(
				document.createElement('table').set({
					class		: 'lightbox',
					id			: 'lightbox-' + id,
					style		: _g.mo.style.lightbox.body
				})
			),
				lboxTable	= lboxBodt.appendChild(
				document.createElement('table').set({
					class		: 'lightbox-table',
					id			: 'lightbox-table-' + id,
					style		: _g.mo.style.lightbox.table
				})
			),
				lboxRow		= lboxTable.appendChild(
				document.createElement('tr').set({
					class		: 'lightbox-row',
					id			: 'lightbox-row-' + id,
					style		: _g.mo.style.lightbox.tr
				})
			),
				lboxCell	= lboxRow.appendChild(
				document.createElement('td').set({
					class		: 'lightbox-cell',
					id			: 'lightbox-cell-' + id,
					style		: _g.mo.style.lightbox.td
				})
			),
				lboxView	= lboxCell.appendChild(
				document.createElement('div').set({
					class		: 'lightbox-view',
					id			: 'lightbox-view-' + id,
					style		: _g.mo.style.lightbox.view
				})
			),
				lboxNextA	= lboxView.appendChild(
				document.createElement('a').set({
					lightbox	: true
				})
			),
				lboxNext	= lboxNextA.appendChild(
				document.createElement('div').set({
					class		: 'lightbox-next',
					id			: 'lightbox-next-' + id,
					style		: _g.mo.style.lightbox.next
				})
			),
				lboxPrevA	= lboxView.appendChild(
				document.createElement('a').set({
					lightbox	: true
				})
			),
				lboxPrev	= lboxPrevA.appendChild(
				document.createElement('div').set({
					class		: 'lightbox-prev',
					id			: 'lightbox-prev-' + id,
					style		: _g.mo.style.lightbox.prev
				})
			);

			
			document.body.insertBefore(lbox, document.body.children[0]);
			window.setTimeout(function(){
				window.addEventListener('click', _g.mo.lbClick);
			}, 500);
			_g.mo.lbOpen = !0;
		} else var lb = _c('lightbox-shade')[0];
		
		if(type == 'api'){
			if(typeof _g.mo.lbInfo[source] == 'undefined') new ajax(source, 'GET', '', {cred:false,load:function(res){
				_g.mo.lbInfo[source] = JSON.parse(res.response);
				open();
			}}); else open();
		} else {
			_g.mo.lbInfo[source] = JSON.parse(source);
			open();
		}
	},
	lbClick 	: function(e){
		if(_c('lightbox')[0] == null){
			window.removeEventListener('click', _g.mo.lbClick);
			return;
		}
		var rect = _c('lightbox')[0].getBoundingClientRect();
		if(e.clientY > rect.bottom || e.clientY < rect.top || e.pageX > rect.right || e.pageX < rect.left){
			_g.mo.lbOpen = !1;
			_g.mo.lbList = [];
			_c('lightbox-shade')[0].remove();
			window.removeEventListener('click', _g.mo.lbClick);
		}
	},
	tutorial	: function(steps, ops){
		this.steps = steps;
		this.ops = ops || {};
		this.step = 0;
		this.next = function(){
			if(_i('popup-shade')) _i('popup-shade').remove();
			if(this.step >= this.steps.length) return 0;
			step = this.steps[this.step];
			if(step.type.toLowerCase() == "popup"){
				_g.mo.open(_g.mo.collect(this.ops,{
					title	: step.title || "Step " + this.step,
					text	: step.text +
						'<div id="popup-confirm"><div style="' + 
						(typeof ops.titleColor == 'string'
							? 'background:' + this.ops.titleColor + ';'
							: '') +
						'" id="popup-yes" class="popup-option" onclick="_i(\'popup-shade\').remove();">Okay</div>' + 
						(typeof step.showExitButton == 'boolean' && step.showExitButton
							? '<div id="popup-no" class="popup-option">Exit Tutorial</div>'
							: '') +
						'</div>'
				}));
				_i('popup-yes').onclick = this.next.bind(this);
				if(typeof step.showExitButton == 'boolean' && step.showExitButton) _i('popup-no').onclick = this.exit.bind(this);
			}
			else if(step.type.toLowerCase() == "pointer"){
				
			}
			this.step++;
		}
		this.exit = function(){
			this.step = this.steps.length;
			if(typeof this.ops.onExit == "function") this.ops.onExit();
			if(_i('popup-shade')) _i('popup-shade').remove();
		}
		this.next();
		return this;
	},
	collect		: function(){
		var ret = {},
			len = arguments.length;
		for(var i = 0; i < len; i++)
			for(p in arguments[i])
				if(arguments[i].hasOwnProperty(p))
					ret[p] = arguments[i][p];
		return ret;
	},
	changes		: [
		["v0.1.0.0001","Mar 23, 2015","Moved popup script to separate file."],
		["v0.1.0.0002","Mar 23, 2015","Added lightbox framework."],
		["v0.1.0.0003","Mar 23, 2015","Added lightbox base url."],
		["v0.1.0.0004","Mar 23, 2015","Added lightbox default back URL."],
		["v0.1.0.0005","Mar 23, 2015","Added AJAX to Graphene."],
		["v0.1.0.0006","Mar 23, 2015","Added lightbox parameters."],
		["v0.1.0.0007","Mar 23, 2015","Added lightbox AJAX calling to get lists."],
		["v0.1.0.0008","Mar 24, 2015","Added lightbox layout parsing."],
		["v0.1.0.0009","Mar 24, 2015","Added lightbox opening script."],
		["v0.1.0.0010","Mar 24, 2015","Fixed API calls having credentials set to true."],
		["v0.1.0.0010","Mar 24, 2015","Added lightbox navigation."],
		["v0.1.0.0010","Mar 24, 2015","Fixed _g.mo.lbIndx being below 0."],
		["v0.1.0.0010","Mar 24, 2015","Fixed lightbox navigation direction."],
		["v0.1.0.0011","Mar 24, 2015","Added lightbox closing script."],
		["v0.1.0.0012","May 15, 2015","Changed lightbox naviagtion links' actions to onclick rather than href."],
		["v0.1.0.0012","May 15, 2015","Added lightbox keyboard navigation (a,d,up,down,left,right)."],
		["v0.1.0.0012","May 15, 2015","Fixed lightbox behavior varying between Chrome and Firefox."],
		["v0.1.0.0012","May 15, 2015","Fixed lightbox naviagtion keys not including a preventDefault() clause."],
		["v0.1.0.0013","Nov 14, 2015","Fixed key commands for back."],
		["v0.1.1.0014","Nov 15, 2015","Added styling"],
		["v0.1.1.0015","Dec 22, 2015","Added required functions for standalone"],
		["v0.1.1.0016","Dec 22, 2015","Fixed references to document.body for standalone"],
		["v0.1.1.0017","Dec 22, 2015","Added lightbox styling"],
		["v0.1.1.0018","Dec 31, 2015","Removed extraneous details"],
		["p0.1.1.0019","Apr 25, 2016","Added changelog as array"],
		["p0.2.0.0020","May 30, 2016","Added tutorial framework (popups only)"],
		["p0.2.0.0021","May 30, 2016","Added a return to the tutorial command"],
		["p0.2.0.0022","Jun 27, 2016","Fixed object source lightboxes (must be JSON string)"],
		["p0.2.0.0023","Jun 29, 2016","Fixed layouts with names after * failing"],
		["p0.2.0.0024","Jun 29, 2016","Added option to set index based on url of image"],
		["p0.2.0.0025","Jan 22, 2017","Refactoring"],
		["l0.3.0.0026","Jan 27, 2017","Ranamed to Modal"],
		["l0.3.0.0027","Jan 27, 2017","Moved modal styling to _g.mo.style.modal"],
		["l0.3.0.0028","Jan 27, 2017","Added Promise for confirm"],
		["l0.3.0.0029","Jan 28, 2017","Added Event for MODAL_OPEN and MODAL_CLOSE"],
		["l0.3.0.0030","Jan 29, 2017","Moved lightbox styling to _g.mo.style.lightbox"],
		["l0.3.0.0031","Jan 29, 2017","Bugfix"],
		["l0.3.0.0032","Feb 02, 2017","Fixed width option"]
	]
});

window.addEventListener('keyup', function(e){
	if(_g.mo.lbOpen){
		e.preventDefault();
		~[39,40,68].indexOf(e.keyCode) ? _g.mo.lightbox('api',_g.mo.lbSrc,_g.mo.lbLayt,++_g.mo.lbIndx) : ~[37,38,65].indexOf(e.keyCode) ? _g.mo.lightbox('api',_g.mo.lbSrc,_g.mo.lbLayt,--_g.mo.lbIndx) : !1;
	}
});