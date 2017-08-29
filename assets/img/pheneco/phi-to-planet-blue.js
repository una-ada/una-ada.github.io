(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != null && cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != null && cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != null && cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



// stage content:
(lib.phitoplanetblue = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Frame 30
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A2CAEC").s().p("Au6O7QhxhxBHjoQA3iwCbjnIAFgIIAHgHIBHBHIBTA4QiKDNguCWQgkB0AcAbQAbAcB0gkQCWguDNiKIADgCQD8irD+j9QEAkBCqj8IACgCQCJjMAtiVQAjh0gbgbQgbgch0AkQiWAujNCKIg4hTIhHhHIAHgHIAIgFQDnibCwg3QDnhHByBxQBxBxhHDmQg1CwibDmIgDAFIgCADQi3EMkJEJQkQEQkKCzIgDACQleDrjXAAQhzAAhFhFg");
	this.shape.setTransform(102.6,135);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(29).to({_off:false},0).wait(1));

	// Frame 29
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A2CAEC").s().p("Au5O7QhxhxBHjoQA2iwCbjnIAHgKIAKgJIBCBLIBTA4QiKDNguCWQgkBzAcAcQAbAcB0gkQCWguDNiKIAEgCQD9irD8j9QD/j/Cqj8IAGgKQCHjJAtiUQAihygbgbQgbgch0AkQiWAujNCKIg4hTIhHhHIAHgGIAIgGQDnibCwg3QDnhHBxBxQByBxhHDoQg2CwicDnIgGAIQizEIkKEKQkNENkNC2IgFAEQleDpjVAAQhyAAhFhFg");
	this.shape_1.setTransform(102.6,135);
	this.shape_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(28).to({_off:false},0).to({_off:true},1).wait(1));

	// Frame 28
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A2CAEC").s().p("Au5O7QhxhxBHjnQA2iwCcjnICmBwQiKDNguCWQgkB0AcAbQAbAbB0gjQCVgvDNiKIACgBQD+isD8j+QD9j7Cqj8IAFgIQCJjMAuiVQAjh0gcgbQgbgbh0AjQiVAvjNCKIhwimQDnicCwg2QDnhHBxBxQBwBwhFDlQg1CuiaDnIgFAHQi0EKkNEOQkKELkMC3IgJAGIgEACQlaDojUAAQhyAAhGhGg");
	this.shape_2.setTransform(102.6,135);
	this.shape_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(27).to({_off:false},0).to({_off:true},1).wait(2));

	// Frame 27
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A2CAEC").s().p("Au3O+QhxhxBHjnQA1iwCbjnICnBvQiKDNguCWQgjBzAbAcQAcAbBzgkQCWgvDMiLIABAAQD+itD8j/QD9j+Crj+IABgCQCKjNAuiWQAjhzgbgcQgcgbhzAkQiWAvjMCLIhwimQDmicCwg3QDnhIBxBwQBxBxhHDmQg1CwibDnIgBACQi3EPkKEMQkLENkNC4QliDvjXAAQhwAAhGhEg");
	this.shape_3.setTransform(102.6,135);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(26).to({_off:false},0).to({_off:true},1).wait(3));

	// Frame 26
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A2CAEC").s().p("AuyPCQhxhwBFjnQA1ivCajoICnBvQiJDNgtCVQgjB0AbAaQAbAbBzglQCVgwDLiLIABgBQD8isD9kCQD+kDCpj9IAAgBQCJjNAtiVQAkhzgcgbQgbgbhzAlQiUAwjMCLIhxilQDlidCvg4QDmhJBxBvQByBwhGDnQg1CviaDoIgBABQi1EPkKEOQkMEQkKC3IgCABQlgDyjXAAQhwAAhDhDg");
	this.shape_4.setTransform(102.6,135);
	this.shape_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(25).to({_off:false},0).to({_off:true},1).wait(4));

	// Frame 25
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A2CAEC").s().p("AusPIQhxhuBFjmQA0iwCYjoICnBuQiIDPgsCWQghBxAaAYQAZAZBwgkQCVgwDLiOIACgCQD+iyD3kBQD8kBCokBIACgCQCIjPAsiWQAhhxgagYQgZgZhwAkQiVAwjLCOIhyikQDkifCtg4QDlhLBxBtQBxBuhFDnQg0CviYDoIgCADQizEOkIERQkKESkIC5IgCABQibBsiDA+QikBNh2AAQhsAAhEhBg");
	this.shape_5.setTransform(102.6,135);
	this.shape_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(24).to({_off:false},0).to({_off:true},1).wait(5));

	// Frame 24
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A2CAEC").s().p("AuhPSQhxhrBCjmQAzivCVjpICpBtQiFDPgsCVQggBwAZAXQAYAYBugmQCTgzDIiPIAEgDQD5iyD4kHQD5kFCmkBIACgEQCFjPAsiVQAghwgZgXQgYgYhuAmQiTAzjICPIh1iiQDgihCtg8QDihNBxBrQBxBrhCDmQgzCuiVDqIgDAEQivEPkHEUQkEERkJDBIgEADQliD8jVAAQhoAAhBg+g");
	this.shape_6.setTransform(102.6,135);
	this.shape_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(23).to({_off:false},0).to({_off:true},1).wait(6));

	// Frame 23
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A2CAEC").s().p("AuTPgQhwhoA/jlQAxivCSjpICpBqQiJDbgmCVQgZBkAVAUQAVATBighQCRgxDQibIAGgEQD2i4DzkJQD2kKCjkCIAEgGQCJjbAmiVQAZhkgVgUQgVgThiAhQiRAyjQCaIh3ihQDdikCqg+QDfhSBxBoQBxBohADlQgxCviSDpIgEAHQitERkCEXQkBEXkDDDIgHAFQiaByiDBCQijBSh1AAQhiAAhAg6g");
	this.shape_7.setTransform(102.6,135);
	this.shape_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(22).to({_off:false},0).to({_off:true},1).wait(7));

	// Frame 22
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#A2CAEC").s().p("At/PyQhwhkA8jkQAuiuCNjqICrBoQiADVgmCSQgbBkAUAXQAZARBggmQCNg4DEiZIAJgGQDti6DzkSQDvkNCgkGIAGgKQCAjVAmiSQAbhkgUgXQgZgRhgAmQiNA4jECZIh7ieQDXioCnhDQDbhWBxBjQBxBkg9DkQguCtiNDrIgGAKQioETj9EdQj8Ebj+DJIgJAHQiaB4iCBFQijBWh0AAQhbAAg8g1g");
	this.shape_8.setTransform(102.6,135);
	this.shape_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(21).to({_off:false},0).to({_off:true},1).wait(8));

	// Frame 21
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A2CAEC").s().p("AtlQIQhwheA4jjQAqisCIjsICtBkQh2DNgmCPQgaBiAQAeQAgAKBcgqQCGg9C3iXIALgKQDtjGDmkUQDokRCckLIAIgNQB2jNAmiPQAahigQgeQgggKhcAqQiGA9i3CXIh/iaQDRitCjhHQDVhdBwBeQBwBfg4DiQgqCsiIDsIgIAOQijEXj1EhQjzEhj4DRIgNALQiYB+iBBJQijBbhzAAQhTAAg3gvg");
	this.shape_9.setTransform(102.6,135);
	this.shape_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(20).to({_off:false},0).to({_off:true},1).wait(9));

	// Frame 20
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#A2CAEC").s().p("AtEQjQhjhOAbi1QAai1CYkYICwBfQhpDCgmCKQgbBiANAlQAmAEBZgxQB+hECliUIAPgOQDkjPDekbQDhkbCUkMIAKgSQBpjDAmiJQAbhigNglQgngDhYAwQh+BFilCTIiFiVQDujUCphEQCqhEBjBPQBjBNgbC1QgaC1iYEYIgLAUQidEcjqEmQjsErjtDXIgQAPQldE4jJAAQhKAAg0gqg");
	this.shape_10.setTransform(102.6,135);
	this.shape_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(19).to({_off:false},0).to({_off:true},1).wait(10));

	// Frame 19
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#A2CAEC").s().p("AsbRCQjEiPEdo3ICzBaQhcC3glCFQgaBfAIAsQAsgGBTg2QBzhLCSiPIATgTQDXjXDXkmQDWkmCMkPIALgXQBci3AliFQAahfgIgsQgsAGhTA2QhzBLiSCPIiMiOQHFm8DECPQBiBHgXCyQgWCziOEaIgNAZQiSEcjgEzQjiE1jgDgIgUATQlWFQjFAAQg+AAgwgjg");
	this.shape_11.setTransform(102.6,135);
	this.shape_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(18).to({_off:false},0).to({_off:true},1).wait(11));

	// Frame 18
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#A2CAEC").s().p("AroRmQhhhBARitQARitCEkgIC2BTQhOCrgiB+QgZBdADAxQAugQBMg7QBnhRB+iLIAWgYQDNjlDGkvQDKkvCBkUIAOgdQBPirAhh+QAZhcgDgyQguAQhMA7QhnBRh+CLIiUiHQDVjqCZhTQCYhTBiBAQBhBAgRCtQgRCtiEEgIgPAfQiHEhjSE8QjPE5jWDxIgXAaQlMFti8AAQg1AAgrgcg");
	this.shape_12.setTransform(102.6,135);
	this.shape_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(17).to({_off:false},0).to({_off:true},1).wait(12));

	// Frame 17
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#A2CAEC").s().p("AqpSMQhJgqgMhqQgGg4AOhTQAaigBijuIC5BMQg/CageB1QgYBZgCA4QAwgdBChAQBYhVBniBIAYgfQC8jyC3k6QC2k2B5keIAPgkQA/iaAeh1QAYhZACg4QgwAdhCBAQhYBVhnCBIich8QChjLB9hkQBBg0A1gWQBhgqBJArQBJArAMBpQAGA4gOBTQgaCghiDuIgQAmQh9Eqi9FBQi/FFjDD9IgaAgQigDKh+BlQguAlglAVQhDAlg6AAQgrAAglgWg");
	this.shape_13.setTransform(102.6,135);
	this.shape_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(16).to({_off:false},0).to({_off:true},1).wait(13));

	// Frame 16
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#A2CAEC").s().p("ApeS2QhIglgOhmQgIg4AMhSQAWibBUjvIC9BDQhWDygOCKQBjhZCTjaIAZgmQCpkBCjlFQCmlKBnkbIAPgrQBWjyAOiKQhjBZiTDaIimhwQCMjPBxhwQCdidBzA6QBIAkAOBnQAIA3gMBSQgWCbhUDvIgQAtQhvEtioFNQirFUisEGIgaAoQiNDRhwBvQhzByhcAAQgiAAgfgPg");
	this.shape_14.setTransform(102.6,135);
	this.shape_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(15).to({_off:false},0).to({_off:true},1).wait(14));

	// Frame 15
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#A2CAEC").s().p("AoETfQhIgegQhiQgJg2AKhUQARiXBGjuIDAA4Qg4C/gTB/QBMhnBgivIAZguQCRkSCKlOQCKlMBbkrIAPgyQA4i/ATh/QhMBnhgCvIivhhQB2jWBfh5QA2hDAsgfQBRg7BIAeQBIAeAQBiQAJA2gKBUQgRCXhGDuIgPA0QhdEviPFaQiOFXiWEbIgaAxQh2DYhfB3QgrA2gjAeQhAA1g7AAQgZAAgZgKg");
	this.shape_15.setTransform(102.6,135);
	this.shape_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(14).to({_off:false},0).to({_off:true},1).wait(15));

	// Frame 14
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#A2CAEC").s().p("AmnUBQhIgXgRhcQgKg0AIhbQANiRA4juIDCAuQgZBsgRBeQArhUAshnIAXg2QB4keBxlZQBxlWBLkwIAOg4QAZhsARheQgrBUgsBnIi3hPQBfjdBOh/QAwhOAmgjQBFg/BIAXQBIAYARBcQAKAzgIBbQgNCRg4DuIgOA6QhKExh2FkQh2Flh6EhIgXA3QhgDehNB/QgqBDgfAgQg4A8g7AAQgTAAgUgHg");
	this.shape_16.setTransform(102.6,135);
	this.shape_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(13).to({_off:false},0).to({_off:true},1).wait(16));

	// Frame 13
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#A2CAEC").s().p("AlUUaQhIgSgShXQgLgxAHhhQAJiHAtj0IDBAkIAUg7QBgkjBclkQBdlhA7kwIAMg9Ii6g/QBNjkA9iAQAqhZAhglQA6hCBHASQBIATASBWQALAygHBhQgJCGgtD0IgMA+Qg7EyhfFrQhhFyhgEiIgUA8QhNDmg9B/QgmBPgbAjQgyA/g7AAQgNAAgRgEg");
	this.shape_17.setTransform(102.6,135);
	this.shape_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(12).to({_off:false},0).to({_off:true},1).wait(17));

	// Frame 12
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#A2CAEC").s().p("AkNUrQhGgPgThRQgLgvAFhoQAHiIAjjvICYAWIARhBQBKkeBMl0QBJlqAukvIAKhCIiUgoQA7jlAwiEQAkhhAcgnQAyhEBHAPQBGAOATBSQALAugFBoQgHCIgjDvIgJBBQgwE2hKFsQhMFzhMEqIgRBAQg8DngvCCQghBZgZAmQgrBBg7AAQgOAAgLgCg");
	this.shape_18.setTransform(102.6,135);
	this.shape_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(11).to({_off:false},0).to({_off:true},1).wait(18));

	// Frame 11
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#A2CAEC").s().p("AjPU1QglgFgXgaQgfghgFhAQgEgoADhLQAGiHAajtIB2ANIANhEQA+lAA2lbQA5lsAjkyIAIhFIhzgYQAsjkAmiIQAUhHAQgmQAYg7AogWQAegRAkAFQAlAGAXAZQAfAhAFBBQAEAogDBKQgGCHgaDtIgHBDQgnFJg3FcQg7F3g7EsIgNBCQgtDlglCHQgUBHgQAmQgnBfhJAAg");
	this.shape_19.setTransform(102.6,135);
	this.shape_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(10).to({_off:false},0).to({_off:true},1).wait(19));

	// Frame 10
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#A2CAEC").s().p("AicU8QglgEgYgZQggghgEhDQgDgmADhKQAEiKATjnIBZAHIAKhGQAsklAsl7QArl/AakjIAGhHIhXgNQAjjrAaiCQAOhFAMgnQAUhAAmgZQAdgTAmAEQAlAEAYAaQAgAhAEBDQADAlgDBKQgECKgTDnIgGBEQgaEogsGAQgsF0gtEyIgKBDQgjDsgaCBQgOBGgMAmQghBphOAAg");
	this.shape_20.setTransform(102.6,135);
	this.shape_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(9).to({_off:false},0).to({_off:true},1).wait(20));

	// Frame 9
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#A2CAEC").s().p("AhxVBQgggCgZgVQgegZgHgrQgEgSAAgWQgCgjABhJQADiBAOjvIBBADIAAgDIAIhDQAgksAgl3QAelmAVk/IAEhEIAAgDIhAgHQAYjeAViPQALhHAIgkQADgVAGgRQAPgqAigTQAcgQAfACQAgADAZAVQAeAZAHArQAEARAAAWQACAkgBBJQgDCBgODuIgFBFQgUFAgfFoQgiGNgeEbIgIBEQgYDggVCOQgLBHgIAjQgEAWgFARQgOAmgeAUQgaAQgeAAg");
	this.shape_21.setTransform(102.6,135);
	this.shape_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_21).wait(8).to({_off:false},0).to({_off:true},1).wait(21));

	// Frame 8
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#A2CAEC").s().p("AhPVEQgigCgagWQgfgagGgvIgCgkQgBggABhKQACiOAKjhIAtACIAAgCIAGhEQAWkuAXl3QAXmNAMkaIADhEIABgDIgugDQARjiAPiLQAIhPAFgaIAGgkQAMgtAhgWQAbgTAiACQAiACAaAWQAfAaAGAuIACAkQABAggBBKQgCCOgKDhIgDBEQgNEwgXF5QgXGJgWEfIgFBFQgRDkgPCKQgIBPgFAaIgGAjQgLAsgfAWQgaATghAAg");
	this.shape_22.setTransform(102.6,135);
	this.shape_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_22).wait(7).to({_off:false},0).to({_off:true},1).wait(22));

	// Frame 7
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#A2CAEC").s().p("Ag1VFQgggBgagVQgjgbgEg0QgCgMAAgUQgBg0ABg1QABhsAHkBIAeAAIAEhGQAPkrAPl7QAQmTAIkVIAChGIgegCQANkDAIhqIANiIQAIgzAlgYQAagTAhACQAgABAbAVQAiAbAEAzQACAMAAAVQABA0gBA0QgBBsgHEBIgCBFQgJExgPF4QgOFfgQFKIgEBFQgNEFgIBoIgNCJQgIAxgiAYQgaATggAAg");
	this.shape_23.setTransform(102.6,135);
	this.shape_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(6).to({_off:false},0).to({_off:true},1).wait(23));

	// Frame 6
	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#A2CAEC").s().p("AghVGQgigBgagWQgkgcgCg1IgBgeIAAhnQABieAEjPIATAAIAChGQAJkmAKmBQAIkjAHmFIABhGIgTgBQAIj5AGhzIAHiGQAGg1AkgaQAbgUAiABQAiABAaAVQAkAcACA2IABAeQABAkgBBDQgBCcgEDQIgBBGQgHGEgIEkQgKGAgJEpIgCBFQgID7gGByIgHCFQgGA1gjAaQgbAUghAAg");
	this.shape_24.setTransform(102.6,135);
	this.shape_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_24).wait(5).to({_off:false},0).to({_off:true},1).wait(24));

	// Frame 5
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#A2CAEC").s().p("AgTVGQghgBgcgVQgkgdgCg3IAAiDQAAiJADjjIALAAIABhGQAEjgAHnHQAHn+ACirIAAhFIgLgBIAIlsIAEiCQAEg3AlgcQAcgVAhABQAhAAAcAWQAkAdACA3IAACCQAACIgDDkIgJLuQgHHKgEDfIgBBFIgIFsIgECDQgEA2gkAcQgcAVghAAg");
	this.shape_25.setTransform(102.6,135);
	this.shape_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_25).wait(4).to({_off:false},0).to({_off:true},1).wait(25));

	// Frame 4
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#A2CAEC").s().p("AgyVGIgdgeQgUgUgGgZQgEgRAAgsIACnRIAFAAIAL3bIgFAAIAGntQABg4AmgcQAcgWAhABQAiAAAcAWQAlAdABA4MgATAm1QgBA4glAcQgcAWghAAg");
	this.shape_26.setTransform(102.6,135);
	this.shape_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_26).wait(3).to({_off:false},0).to({_off:true},1).wait(26));

	// Frame 3
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#A2CAEC").s().p("AgDVFQgqAAgdgdQgdgeAAgpMAAIgnCQAAgpAegdQAdgeAoAAQAqAAAdAeQAdAdAAAqMgAIAnCQAAApgeAeQgcAdgoAAIgBgBg");
	this.shape_27.setTransform(102.6,135);
	this.shape_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_27).wait(2).to({_off:false},0).to({_off:true},1).wait(27));

	// Frame 2
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#A2CAEC").s().p("AhGUoQgdgcAAgqMAAAgnDQAAgpAdgdQAdgeApAAQAqAAAcAeQAeAdAAApMAAAAnDQAAAqgeAcQgcAegqAAQgpAAgdgeg");
	this.shape_28.setTransform(102.6,135);
	this.shape_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_28).wait(1).to({_off:false},0).to({_off:true},1).wait(28));

	// Frame 1
	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#A2CAEC").s().p("AhGUoQgdgcAAgqMAAAgnDQAAgpAdgdQAdgeApAAQAqAAAcAeQAeAdAAApMAAAAnDQAAAqgeAcQgcAegqAAQgpAAgdgeg");
	this.shape_29.setTransform(102.6,135);

	this.timeline.addTween(cjs.Tween.get(this.shape_29).to({_off:true},1).wait(29));

	// Layer 1
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#A2CAEC").s().p("AklMeQivhBiEiDQiEiFhBivQhVjoA1jzQA2j0CvivQCvivDzg1QDzg2DpBWQCvBBCECDQCECFBBCvQBVDog1DzQg2D0ivCvQh4B4ieBBQicA/inAAQiXAAiOg0gAj1pYQh5AyhdBcQiGCGgoC6QgpC5BBCyQAxCFBlBmQBmBlCFAxQCyBCC6gpQC6gpCGiGQCGiGApi6QAoi5hBiyQgxiFhlhmQhmhliFgxQhsgoh0AAQh/AAh3Awg");
	this.shape_30.setTransform(102.6,134.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_30).wait(30));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(120.1,135,170,270);
// library properties:
lib.properties = {
	id: '2CB8BA98E2A7CC4DAEB1C54A4EE2F2D6',
	width: 205,
	height: 270,
	fps: 24,
	color: "#FFFFFF",
	opacity: 0.00,
	webfonts: {},
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['2CB8BA98E2A7CC4DAEB1C54A4EE2F2D6'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;