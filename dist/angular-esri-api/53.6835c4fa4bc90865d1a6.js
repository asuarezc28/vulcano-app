(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{NloG:function(e,t,i){"use strict";var s=i("pO5D"),n=(i("wSAH"),i("6S2I")),a=(i("zqDF"),i("WbKI")),r=i("04ZG"),l=(i("4EHJ"),i("ju1D"),i("9AIY"),i("/CmD")),o=i("zm0L"),h=i("pdg3"),p=i("+rMe"),c=i("kJYu");let d=class extends(Object(c.b)(Object(h.a)(Object(p.b)(o.a.EventedMixin(l.a))))){constructor(e){super(e),this.layer=null,this.parent=null}initialize(){this.when().catch(e=>{if("layerview:create-error"!==e.name){const t=this.layer&&this.layer.id||"no id",i=this.layer&&this.layer.title||"no title";throw n.a.getLogger(this.declaredClass).error("#resolve()",`Failed to resolve layer view (layer title: '${i}', id: '${t}')`,e),e}})}get fullOpacity(){const e=e=>null==e?1:e;return e(this.get("layer.opacity"))*e(this.get("parent.fullOpacity"))}get suspended(){return!this.canResume()}get suspendInfo(){return this.getSuspendInfo()}get legendEnabled(){return!this.suspended&&!0===this.layer.legendEnabled}get updating(){return!!(this.updatingHandles&&this.updatingHandles.updating||this.isUpdating())}get visible(){return!0===this.get("layer.visible")}set visible(e){void 0!==e?this._override("visible",e):this._clearOverride("visible")}canResume(){return!this.get("parent.suspended")&&this.get("view.ready")&&this.get("layer.loaded")&&this.visible||!1}getSuspendInfo(){const e=this.parent&&this.parent.suspended?this.parent.suspendInfo:{};return this.view&&this.view.ready||(e.viewNotReady=!0),this.layer&&this.layer.loaded||(e.layerNotLoaded=!0),this.visible||(e.layerInvisible=!0),e}isUpdating(){return!1}};Object(s.a)([Object(a.b)({dependsOn:["layer.opacity","parent.fullOpacity"]})],d.prototype,"fullOpacity",null),Object(s.a)([Object(a.b)()],d.prototype,"layer",void 0),Object(s.a)([Object(a.b)()],d.prototype,"parent",void 0),Object(s.a)([Object(a.b)({readOnly:!0,dependsOn:["visible","layer.loaded","parent.suspended","view?.ready"]})],d.prototype,"suspended",null),Object(s.a)([Object(a.b)({readOnly:!0,dependsOn:["visible","layer.loaded","parent.suspended","view?.ready"]})],d.prototype,"suspendInfo",null),Object(s.a)([Object(a.b)({readOnly:!0,dependsOn:["suspended","layer.legendEnabled?"]})],d.prototype,"legendEnabled",null),Object(s.a)([Object(a.b)({type:Boolean,dependsOn:["updatingHandles.updating"],readOnly:!0})],d.prototype,"updating",null),Object(s.a)([Object(a.b)({dependsOn:["layer.visible"]})],d.prototype,"visible",null),d=Object(s.a)([Object(r.a)("esri.views.layers.LayerView")],d),t.a=d},QmHG:function(e,t,i){"use strict";i.d(t,"a",function(){return O}),i.d(t,"b",function(){return n}),i.d(t,"c",function(){return u}),i.d(t,"d",function(){return g}),i.d(t,"e",function(){return r}),i.d(t,"f",function(){return o}),i.d(t,"g",function(){return l}),i.d(t,"h",function(){return b}),i.d(t,"i",function(){return a}),i.d(t,"j",function(){return d}),i.d(t,"k",function(){return c}),i.d(t,"l",function(){return p}),i.d(t,"m",function(){return h});var s=i("srIe");function n(e=v){return[e[0],e[1],e[2],e[3],e[4],e[5]]}function a(e,t,i,s,a,r,l=n()){return l[0]=e,l[1]=t,l[2]=i,l[3]=s,l[4]=a,l[5]=r,l}function r(e,t){e[0]=Math.min(e[0],t[0]),e[1]=Math.min(e[1],t[1]),e[2]=Math.min(e[2],t[2]),e[3]=Math.max(e[3],t[3]),e[4]=Math.max(e[4],t[4]),e[5]=Math.max(e[5],t[5])}function l(e,t){e[0]=Math.min(e[0],t[0]),e[1]=Math.min(e[1],t[1]),e[2]=Math.min(e[2],t[2]),e[3]=Math.max(e[3],t[0]),e[4]=Math.max(e[4],t[1]),e[5]=Math.max(e[5],t[2])}function o(e,t,i){const s=t.length;let n=e[0],a=e[1],r=e[2],l=e[3],o=e[4],h=e[5];if(i)for(let p=0;p<s;p++){const e=t[p];n=Math.min(n,e[0]),a=Math.min(a,e[1]),r=Math.min(r,e[2]),l=Math.max(l,e[0]),o=Math.max(o,e[1]),h=Math.max(h,e[2])}else for(let p=0;p<s;p++){const e=t[p];n=Math.min(n,e[0]),a=Math.min(a,e[1]),l=Math.max(l,e[0]),o=Math.max(o,e[1])}e[0]=n,e[1]=a,e[2]=r,e[3]=l,e[4]=o,e[5]=h}function h(e,t=[0,0,0]){return t[0]=function(e){return e[0]>=e[3]?0:e[3]-e[0]}(e),t[1]=function(e){return e[1]>=e[4]?0:e[4]-e[1]}(e),t[2]=function(e){return e[2]>=e[5]?0:e[5]-e[2]}(e),t}function p(e,t,i=e){return i[0]=t[0],i[1]=t[1],i[2]=t[2],i!==e&&(i[3]=e[3],i[4]=e[4],i[5]=e[5]),i}function c(e,t,i=e){return i[3]=t[0],i[4]=t[1],i[5]=t[2],i!==e&&(i[0]=e[0],i[1]=e[1],i[2]=e[2]),e}function d(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e}function u(e){return e?d(e,O):n(O)}function b(e,t){return e[0]=t[0],e[1]=t[1],e[2]=Number.NEGATIVE_INFINITY,e[3]=t[2],e[4]=t[3],e[5]=Number.POSITIVE_INFINITY,e}function y(e){return 6===e.length}function g(e,t,i){if(Object(s.g)(e)||Object(s.g)(t))return e===t;if(!y(e)||!y(t))return!1;if(i){for(let s=0;s<e.length;s++)if(!i(e[s],t[s]))return!1}else for(let s=0;s<e.length;s++)if(e[s]!==t[s])return!1;return!0}i("OvF4"),i("kYAx");const O=[1/0,1/0,1/0,-1/0,-1/0,-1/0],v=[0,0,0,0,0,0];n()},Vm2Q:function(e,t,i){"use strict";i.d(t,"a",function(){return I});var s=i("pO5D"),n=(i("wSAH"),i("6S2I"),i("zqDF"),i("WbKI")),a=i("04ZG"),r=(i("4EHJ"),i("ju1D"),i("9AIY"),i("LE9a")),l=i("fX31"),o=i("N5XI"),h=i("ag7Y");let p=class extends h.a{};p=Object(s.a)([Object(a.a)("esri.views.layers.support.ClipArea")],p);var c,d=p;let u=c=class extends d{constructor(){super(...arguments),this.type="rect",this.left=null,this.right=null,this.top=null,this.bottom=null}clone(){return new c({left:this.left,right:this.right,top:this.top,bottom:this.bottom})}get version(){return(this._get("version")||0)+1}};Object(s.a)([Object(n.b)({type:[Number,String],json:{write:!0}})],u.prototype,"left",void 0),Object(s.a)([Object(n.b)({type:[Number,String],json:{write:!0}})],u.prototype,"right",void 0),Object(s.a)([Object(n.b)({type:[Number,String],json:{write:!0}})],u.prototype,"top",void 0),Object(s.a)([Object(n.b)({type:[Number,String],json:{write:!0}})],u.prototype,"bottom",void 0),Object(s.a)([Object(n.b)({readOnly:!0,dependsOn:["left","right","top","bottom"]})],u.prototype,"version",null),u=c=Object(s.a)([Object(a.a)("esri.views.layers.support.ClipRect")],u);var b,y=u,g=i("AMBt"),O=i("N2DF"),v=i("OvF4"),w=i("Ehki"),m=i("qatw");i("4GrV");const j={base:O.a,key:"type",typeMap:{extent:v.a,polygon:w.a}};let f=b=class extends d{constructor(){super(...arguments),this.type="geometry",this.geometry=null}get version(){return(this._get("version")||0)+1}clone(){return new b({geometry:this.geometry.clone()})}};Object(s.a)([Object(n.b)({types:j,json:{read:m.a,write:!0}})],f.prototype,"geometry",void 0),Object(s.a)([Object(n.b)({readOnly:!0,dependsOn:["geometry"]})],f.prototype,"version",null),f=b=Object(s.a)([Object(a.a)("esri.views.layers.support.Geometry")],f);var _=f;let V=class extends d{constructor(){super(...arguments),this.type="path",this.path=[]}get version(){return(this._get("version")||0)+1}};Object(s.a)([Object(n.b)({type:[[[Number]]],json:{write:!0}})],V.prototype,"path",void 0),Object(s.a)([Object(n.b)({readOnly:!0,dependsOn:["path"]})],V.prototype,"version",null),V=Object(s.a)([Object(a.a)("esri.views.layers.support.Path")],V);const M=r.a.ofType({key:"type",base:d,typeMap:{rect:y,path:V,geometry:_}}),I=e=>{let t=class extends e{constructor(){super(...arguments),this.clips=new M,this.moving=!1,this.attached=!1,this.lastUpdateId=-1,this.updateRequested=!1}initialize(){var e;this.container||(this.container=new g.a),this.container.fadeTransitionEnabled=!0,this.container.opacity=0,this.container.clips=this.clips,this.handles.add([Object(o.a)(this,"suspended",e=>{this.container&&(this.container.visible=!e),this.view&&!e&&this.updateRequested&&this.view.requestUpdate()},!0),Object(o.a)(this,["layer.opacity","container"],()=>{var e,t;this.container&&(this.container.opacity=null!=(e=null==(t=this.layer)?void 0:t.opacity)?e:1)},!0),Object(o.a)(this,["layer.blendMode"],e=>{this.container&&(this.container.blendMode=e)},!0),Object(o.a)(this,["layer.effect"],e=>{this.container&&(this.container.effect=e)},!0),this.clips.on("change",()=>{this.container.clips=this.clips,this.notifyChange("clips")})]),null!=(e=this.view)&&e.whenLayerView?this.view.whenLayerView(this.layer).then(e=>{e!==this||this.attached||this.destroyed||(this.attach(),this.requestUpdate(),this.attached=!0)},()=>{}):this.when().then(()=>{this.attached||this.destroyed||(this.attach(),this.requestUpdate(),this.attached=!0)},()=>{})}destroy(){this.attached&&(this.detach(),this.attached=!1),this.handles.remove("initialize"),this.updateRequested=!1}get updating(){return!this.attached||!this.suspended&&(this.updateRequested||this.isUpdating())}isVisibleAtScale(e){let t=!0;const i=this.layer,s=i.minScale,n=i.maxScale;if(null!=s&&null!=n){let i=!s,a=!n;!i&&e<=s&&(i=!0),!a&&e>=n&&(a=!0),t=i&&a}return t}requestUpdate(){this.updateRequested||(this.updateRequested=!0,this.suspended||this.view.requestUpdate())}processUpdate(e){!this.isFulfilled()||this.isResolved()?(this._set("updateParameters",e),this.updateRequested&&!this.suspended&&(this.updateRequested=!1,this.update(e))):this.updateRequested=!1}isUpdating(){return!1}isRendering(){return!1}canResume(){return!!super.canResume()&&this.isVisibleAtScale(this.view.scale)}};return Object(s.a)([Object(n.b)({type:M,set(e){const t=Object(l.b)(e,this._get("clips"),M);this._set("clips",t)}})],t.prototype,"clips",void 0),Object(s.a)([Object(n.b)()],t.prototype,"moving",void 0),Object(s.a)([Object(n.b)()],t.prototype,"attached",void 0),Object(s.a)([Object(n.b)()],t.prototype,"container",void 0),Object(s.a)([Object(n.b)({dependsOn:["view.scale","layer.minScale","layer.maxScale"]})],t.prototype,"suspended",void 0),Object(s.a)([Object(n.b)({readOnly:!0})],t.prototype,"updateParameters",void 0),Object(s.a)([Object(n.b)()],t.prototype,"updateRequested",void 0),Object(s.a)([Object(n.b)({dependsOn:["attached","updateRequested","suspended"]})],t.prototype,"updating",null),Object(s.a)([Object(n.b)()],t.prototype,"view",void 0),t=Object(s.a)([Object(a.a)("esri.views.2d.layers.LayerView2D")],t),t}},oM7z:function(e,t,i){"use strict";i.r(t);var s=i("pO5D"),n=(i("wSAH"),i("6S2I"),i("zqDF"),i("WbKI")),a=i("04ZG"),r=(i("4EHJ"),i("ju1D"),i("9AIY"),i("9MzC")),l=i("WBXD"),o=i("l4ZG"),h=i("OvF4"),p=i("LE9a"),c=i("Lqtk"),d=i("r0DZ"),u=i("N5XI"),b=i("9iar"),y=i("BGvB"),g=i("NloG"),O=i("Vh9r"),v=i("xzrc"),w=i("LTnl"),m=i("Vm2Q");let j=class extends(Object(m.a)(g.a)){constructor(){super(...arguments),this._handles=new d.a,this._bitmapIndex=new Map,this._mapImageContainer=new w.a,this._featuresMap=new Map,this.allVisiblePoints=new b.a,this.allVisiblePolylines=new b.a,this.allVisiblePolygons=new b.a,this.allVisibleMapImages=new p.a}hitTest(e,t){if(this.suspended||!this._pointsView&&!this._polylinesView&&!this._polygonsView)return Object(r.u)(null);const i=[this._pointsView.hitTest(e,t),this._polylinesView.hitTest(e,t),this._polygonsView.hitTest(e,t)];return Object(r.b)(i).then(e=>e.filter(e=>(e&&(e.layer=this.layer,e.sourceLayer=this.layer),!!e))[0]||null)}update(e){this._polygonsView&&this._polygonsView.processUpdate(e),this._polylinesView&&this._polylinesView.processUpdate(e),this._pointsView&&this._pointsView.processUpdate(e)}attach(){this._handles.add([this.allVisibleMapImages.on("change",e=>{e.added.forEach(e=>this._addMapImage(e)),e.removed.forEach(e=>this._removeMapImage(e))})]),this.container.addChild(this._mapImageContainer),this._polygonsView=new O.a({view:this.view,graphics:this.allVisiblePolygons,requestUpdateCallback:()=>this.requestUpdate()}),this.container.addChild(this._polygonsView.container),this._polylinesView=new O.a({view:this.view,graphics:this.allVisiblePolylines,requestUpdateCallback:()=>this.requestUpdate()}),this.container.addChild(this._polylinesView.container),this._pointsView=new O.a({view:this.view,graphics:this.allVisiblePoints,requestUpdateCallback:()=>this.requestUpdate()}),this.container.addChild(this._pointsView.container),this.watch("layer.visibleSublayers",()=>this._refreshCollections()),this._fetchingPromise=this._fetchService().then(()=>{this._fetchingPromise=null,this.notifyChange("updating")})}detach(){this._handles.removeAll(),this._mapImageContainer.removeAllChildren(),this.container.removeAllChildren(),this._bitmapIndex.clear(),this._polygonsView&&(this._polygonsView.destroy(),this._polygonsView=null),this._polylinesView&&(this._polylinesView.destroy(),this._polylinesView=null),this._pointsView&&(this._pointsView.destroy(),this._pointsView=null)}moveStart(){}viewChange(){this._polygonsView.viewChange(),this._polylinesView.viewChange(),this._pointsView.viewChange()}moveEnd(){}isUpdating(){return null!=this._fetchingPromise||this._pointsView.updating||this._polygonsView.updating||this._polylinesView.updating}_addMapImage(e){(this.view.spatialReference.isWGS84||this.view.spatialReference.isWebMercator)&&Object(c.default)(e.href,{responseType:"image"}).then(({data:t})=>{let i=h.a.fromJSON(e.extent);Object(o.a)(i,this.view.spatialReference)&&(i=Object(o.d)(i,this.view.spatialReference));const s=new v.a(t);s.x=i.xmin,s.y=i.ymax,s.resolution=i.width/t.naturalWidth,s.rotation=e.rotation,this._mapImageContainer.addChild(s),this._bitmapIndex.set(e,s)})}_fetchService(){return this._handles.remove("refresh-collections"),this._getParsedKML().then(e=>this._fetchSublayerService(this.layer,e))}_fetchSublayerService(e,t){const i=e.sublayers;if(!i||0===i.length)return Object(r.u)();const s=[];return i.forEach(e=>{const i=Object(u.k)(e,"visible").then(()=>e.load()).then(()=>this._getGraphicsForSublayer(e,t)).then(t=>Object(r.c)(i=>{e.networkLink?i():(this._featuresMap.set(e,t),this._handles.add(Object(l.b)(()=>{this._refreshCollections(),i()}),"refresh-collections"))})).then(()=>this._fetchSublayerService(e,e.sourceJSON||t));e.visible&&s.push(i)}),Object(r.b)(s).then(()=>{})}_getParsedKML(){return Object(y.b)(this.layer.url,this.view.spatialReference,this.layer.refreshInterval).then(e=>Object(y.d)(e.data))}async _getGraphicsForSublayer(e,t){let i=null;return t.sublayers.some(t=>(i=t,t.id===e.id))?{points:i.points&&await Object(y.c)(i.points),polylines:i.polylines&&await Object(y.c)(i.polylines),polygons:i.polygons&&await Object(y.c)(i.polygons),mapImages:i.mapImages}:null}_refreshCollections(){const e=this.get("layer.visibleSublayers");this.allVisiblePoints.removeAll(),this.allVisiblePolylines.removeAll(),this.allVisiblePolygons.removeAll(),this.allVisibleMapImages.removeAll(),e&&e.length&&e.forEach(e=>{const t=this._featuresMap.get(e);t&&(this.allVisiblePoints.addMany(t.points),this.allVisiblePolylines.addMany(t.polylines),this.allVisiblePolygons.addMany(t.polygons),this.allVisibleMapImages.addMany(t.mapImages))})}_removeMapImage(e){const t=this._bitmapIndex.get(e);t&&(this._mapImageContainer.removeChild(t),this._bitmapIndex.delete(e))}};Object(s.a)([Object(n.b)()],j.prototype,"_pointsView",void 0),Object(s.a)([Object(n.b)()],j.prototype,"_polylinesView",void 0),Object(s.a)([Object(n.b)()],j.prototype,"_polygonsView",void 0),Object(s.a)([Object(n.b)()],j.prototype,"_fetchingPromise",void 0),Object(s.a)([Object(n.b)({dependsOn:["_fetchingPromise","_pointsView.updating","_polygonsView.updating","_polylinesView.updating"]})],j.prototype,"updating",void 0),j=Object(s.a)([Object(a.a)("esri.views.2d.layers.KMLLayerView2D")],j),t.default=j}}]);