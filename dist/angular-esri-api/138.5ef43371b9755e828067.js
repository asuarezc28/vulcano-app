(window.webpackJsonp=window.webpackJsonp||[]).push([[138],{GN2T:function(e,t,r){"use strict";r.r(t);var o=r("pO5D"),s=(r("wSAH"),r("f/qv")),p=(r("6S2I"),r("zqDF"),r("WbKI")),i=r("04ZG"),n=r("zlDU"),c=(r("4EHJ"),r("ju1D"),r("9AIY"),r("9MzC")),a=r("WBXD"),d=r("pqNC"),u=r("5pQd"),l=r("DbUH");let b=class extends(Object(l.a)(Object(u.a)(d.a))){constructor(e){super(e),this.resourceInfo=null,this.type="unsupported"}initialize(){this.addResolvingPromise(Object(c.c)((e,t)=>{Object(a.b)(()=>{const e=this.resourceInfo&&(this.resourceInfo.layerType||this.resourceInfo.type);let r="Unsupported layer type";e&&(r+=" "+e),t(new n.a("layer:unsupported-layer-type",r,{layerType:e}))})}))}read(e,t){const r={resourceInfo:e};null!=e.id&&(r.id=e.id),null!=e.title&&(r.title=e.title),super.read(r,t)}write(e){return Object(s.d)(e||{},this.resourceInfo,{id:this.id})}};Object(o.a)([Object(p.b)({readOnly:!0})],b.prototype,"resourceInfo",void 0),Object(o.a)([Object(p.b)({type:["show","hide"]})],b.prototype,"listMode",void 0),Object(o.a)([Object(p.b)({json:{read:!1},readOnly:!0,value:"unsupported"})],b.prototype,"type",void 0),b=Object(o.a)([Object(i.a)("esri.layers.UnsupportedLayer")],b),t.default=b}}]);