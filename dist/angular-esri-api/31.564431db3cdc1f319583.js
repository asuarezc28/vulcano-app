(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{"U/i9":function(e,t,r){"use strict";r.r(t);var a=r("pO5D"),i=(r("wSAH"),r("srIe")),s=(r("6S2I"),r("zqDF")),o=r("WbKI"),c=r("r88o"),n=r("04ZG"),l=r("Cduq"),p=r("zlDU"),b=(r("4EHJ"),r("ju1D"),r("ku/q")),u=(r("9AIY"),r("9MzC")),y=r("OvF4"),h=r("Lqtk"),d=r("GFPt"),m=r("pqNC"),O=r("ZYtI"),j=r("5pQd"),g=r("IvSi"),v=r("uRH/"),f=r("PVlI"),S=r("mXvl"),x=r("iyhF"),w=r("DbUH"),I=r("jhcG"),q=r("WmKv"),M=r("YBpl"),J=r("kJYu"),F=r("SaAm"),E=r("MD9Z"),N=r("6dDx"),L=r("Ilhi"),P=r("1Ana"),R=r("cM4j");let D=class extends(Object(S.a)(Object(M.a)(Object(q.a)(Object(I.a)(Object(P.a)(Object(E.a)(Object(f.a)(Object(v.a)(Object(w.a)(Object(j.a)(Object(x.a)(Object(J.b)(m.a))))))))))))){constructor(...e){super(...e),this.alwaysRefetch=!1,this.dpi=96,this.gdbVersion=null,this.imageFormat="png24",this.imageMaxHeight=2048,this.imageMaxWidth=2048,this.imageTransparency=!0,this.labelsVisible=!1,this.isReference=null,this.operationalLayerType="ArcGISMapServiceLayer",this.sourceJSON=null,this.sublayers=null,this.type="map-image",this.url=null}normalizeCtorArgs(e,t){return"string"==typeof e?{url:e,...t}:e}load(e){const t=Object(i.h)(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).then(()=>this._fetchService(t),()=>this._fetchService(t))),Object(u.u)(this)}readImageFormat(e,t){const r=t.supportedImageFormatTypes;return r&&r.indexOf("PNG32")>-1?"png32":"png24"}writeSublayers(e,t,r,a){if(!this.loaded||!e)return;const i=e.slice().reverse().flatten(({sublayers:e})=>e&&e.toArray().reverse()).toArray();let s=!1;if(this.capabilities&&this.capabilities.operations.supportsExportMap&&this.capabilities.exportMap.supportsDynamicLayers){const e=Object(b.d)(a.origin);if(3===e){const e=this.createSublayersForOrigin("service").sublayers;s=Object(L.c)(i,e,2)}else if(e>3){const e=this.createSublayersForOrigin("portal-item");s=Object(L.c)(i,e.sublayers,Object(b.d)(e.origin))}}const o=[],c={writeSublayerStructure:s,...a};let n=s;i.forEach(e=>{const t=e.write({},c);o.push(t),n=n||"user"===e.originOf("visible")}),o.some(e=>Object.keys(e).length>1)&&(t.layers=o),n&&(t.visibleLayers=i.filter(e=>e.visible).map(e=>e.id))}createExportImageParameters(e,t,r,a){const i=a&&a.pixelRatio||1;e&&this.version>=10&&(e=e.clone().shiftCentralMeridian());const s=new R.a({layer:this,scale:Object(F.a)({extent:e,width:t})*i}),o=s.toJSON();s.destroy();const c=!a||!a.rotation||this.version<10.3?{}:{rotation:-a.rotation},n=e&&e.spatialReference,l=n.wkid||JSON.stringify(n.toJSON());o.dpi*=i;const p={};if(null!=a&&a.timeExtent){const{start:e,end:t}=a.timeExtent.toJSON();p.time=e&&t&&e===t?""+e:`${null==e?"null":e},${null==t?"null":t}`}else this.timeInfo&&!this.timeInfo.hasLiveData&&(p.time="null,null");return{bbox:e&&e.xmin+","+e.ymin+","+e.xmax+","+e.ymax,bboxSR:l,imageSR:l,size:t+","+r,...o,...c,...p}}async fetchImage(e,t,r,a){const i={responseType:"image"};a&&a.timestamp&&(i.query={...i.query,_ts:a.timestamp}),a&&a.signal&&(i.signal=a.signal),this.customParameters&&Object.keys(this.customParameters).length&&(i.query={...this.customParameters,...i.query});const s=this.parsedUrl.path+"/export",o={...this.parsedUrl.query,...this.createExportImageParameters(e,t,r,a),f:"image",_ts:this.alwaysRefetch?Date.now():null};return null==o.dynamicLayers||this.capabilities.exportMap.supportsDynamicLayers?(i.query=i.query?{...o,...i.query}:o,Object(h.default)(s,i).then(e=>e.data).catch(e=>{if(Object(u.n)(e))throw e;throw new p.a("mapimagelayer:image-fetch-error","Unable to load image: "+s,{error:e})})):Object(u.t)(new p.a("mapimagelayer:dynamiclayer-not-supported",`service ${this.url} doesn't support dynamic layers, which is required to be able to change the sublayer's order, rendering, labeling or source.`,{query:o}))}async fetchRecomputedExtents(e={}){const t={...e,query:{returnUpdates:!0,f:"json"}},{data:r}=await Object(h.default)(this.url,t),{extent:a,fullExtent:i,timeExtent:s}=r,o=a||i;return{fullExtent:o&&y.a.fromJSON(o),timeExtent:s&&O.a.fromJSON({start:s[0],end:s[1]})}}loadAll(){return Object(d.a)(this,e=>{e(this.allSublayers)})}async _fetchService(e){if(this.sourceJSON)return void this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl});const{data:t,ssl:r}=await Object(h.default)(this.parsedUrl.path,{query:{f:"json",...this.parsedUrl.query,...this.customParameters},signal:e});r&&(this.url=this.url.replace(/^http:/i,"https:")),this.sourceJSON=t,this.read(t,{origin:"service",url:this.parsedUrl})}};Object(a.a)([Object(o.b)()],D.prototype,"alwaysRefetch",void 0),Object(a.a)([Object(o.b)()],D.prototype,"dpi",void 0),Object(a.a)([Object(o.b)()],D.prototype,"gdbVersion",void 0),Object(a.a)([Object(o.b)({json:{read:!1,write:!1}})],D.prototype,"popupEnabled",void 0),Object(a.a)([Object(o.b)()],D.prototype,"imageFormat",void 0),Object(a.a)([Object(c.a)("imageFormat",["supportedImageFormatTypes"])],D.prototype,"readImageFormat",null),Object(a.a)([Object(o.b)({json:{origins:{service:{read:{source:"maxImageHeight"}}}}})],D.prototype,"imageMaxHeight",void 0),Object(a.a)([Object(o.b)({json:{origins:{service:{read:{source:"maxImageWidth"}}}}})],D.prototype,"imageMaxWidth",void 0),Object(a.a)([Object(o.b)()],D.prototype,"imageTransparency",void 0),Object(a.a)([Object(o.b)({json:{read:!1,write:!1}})],D.prototype,"labelsVisible",void 0),Object(a.a)([Object(o.b)({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],D.prototype,"isReference",void 0),Object(a.a)([Object(o.b)({type:["ArcGISMapServiceLayer"]})],D.prototype,"operationalLayerType",void 0),Object(a.a)([Object(o.b)()],D.prototype,"sourceJSON",void 0),Object(a.a)([Object(o.b)({json:{write:{ignoreOrigin:!0}}})],D.prototype,"sublayers",void 0),Object(a.a)([Object(l.a)("sublayers",{layers:{type:[N.a]},visibleLayers:{type:[s.a]}})],D.prototype,"writeSublayers",null),Object(a.a)([Object(o.b)({type:["show","hide","hide-children"]})],D.prototype,"listMode",void 0),Object(a.a)([Object(o.b)({json:{read:!1},readOnly:!0,value:"map-image"})],D.prototype,"type",void 0),Object(a.a)([Object(o.b)(g.j)],D.prototype,"url",void 0),D=Object(a.a)([Object(n.a)("esri.layers.MapImageLayer")],D),t.default=D}}]);