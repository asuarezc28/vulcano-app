(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{"5LEI":function(e,t,i){"use strict";i.d(t,"a",function(){return l}),i("wSAH");var s=i("HJJS"),r=i("rlSK"),a=i("jHF5"),n=i("fEsP");class l extends n.a{constructor(e,t,i,s=i){super(),this.triangleCountReportedInDebug=0,this.transforms={dvs:Object(a.b)(),tileMat3:Object(a.b)()},this.triangleCount=0,this.key=new r.a(e),this.bounds=t,this.size=i,this.coordRange=s}destroy(){this.texture&&(this.texture.dispose(),this.texture=null)}get coords(){return this._coords}get bounds(){return this._bounds}set bounds(e){this._coords=[e[0],e[3]],this._bounds=e}setTransform(e,t){const i=t/(e.resolution*e.pixelRatio),r=this.transforms.tileMat3,[a,n]=e.toScreenNoRotation([0,0],this.coords),l=this.size[0]/this.coordRange[0]*i,o=this.size[1]/this.coordRange[1]*i;Object(s.i)(r,l,0,0,0,o,0,a,n,1),Object(s.f)(this.transforms.dvs,e.displayViewMat3,r)}}},NloG:function(e,t,i){"use strict";var s=i("pO5D"),r=(i("wSAH"),i("6S2I")),a=(i("zqDF"),i("WbKI")),n=i("04ZG"),l=(i("4EHJ"),i("ju1D"),i("9AIY"),i("/CmD")),o=i("zm0L"),c=i("pdg3"),h=i("+rMe"),d=i("kJYu");let u=class extends(Object(d.b)(Object(c.a)(Object(h.b)(o.a.EventedMixin(l.a))))){constructor(e){super(e),this.layer=null,this.parent=null}initialize(){this.when().catch(e=>{if("layerview:create-error"!==e.name){const t=this.layer&&this.layer.id||"no id",i=this.layer&&this.layer.title||"no title";throw r.a.getLogger(this.declaredClass).error("#resolve()",`Failed to resolve layer view (layer title: '${i}', id: '${t}')`,e),e}})}get fullOpacity(){const e=e=>null==e?1:e;return e(this.get("layer.opacity"))*e(this.get("parent.fullOpacity"))}get suspended(){return!this.canResume()}get suspendInfo(){return this.getSuspendInfo()}get legendEnabled(){return!this.suspended&&!0===this.layer.legendEnabled}get updating(){return!!(this.updatingHandles&&this.updatingHandles.updating||this.isUpdating())}get visible(){return!0===this.get("layer.visible")}set visible(e){void 0!==e?this._override("visible",e):this._clearOverride("visible")}canResume(){return!this.get("parent.suspended")&&this.get("view.ready")&&this.get("layer.loaded")&&this.visible||!1}getSuspendInfo(){const e=this.parent&&this.parent.suspended?this.parent.suspendInfo:{};return this.view&&this.view.ready||(e.viewNotReady=!0),this.layer&&this.layer.loaded||(e.layerNotLoaded=!0),this.visible||(e.layerInvisible=!0),e}isUpdating(){return!1}};Object(s.a)([Object(a.b)({dependsOn:["layer.opacity","parent.fullOpacity"]})],u.prototype,"fullOpacity",null),Object(s.a)([Object(a.b)()],u.prototype,"layer",void 0),Object(s.a)([Object(a.b)()],u.prototype,"parent",void 0),Object(s.a)([Object(a.b)({readOnly:!0,dependsOn:["visible","layer.loaded","parent.suspended","view?.ready"]})],u.prototype,"suspended",null),Object(s.a)([Object(a.b)({readOnly:!0,dependsOn:["visible","layer.loaded","parent.suspended","view?.ready"]})],u.prototype,"suspendInfo",null),Object(s.a)([Object(a.b)({readOnly:!0,dependsOn:["suspended","layer.legendEnabled?"]})],u.prototype,"legendEnabled",null),Object(s.a)([Object(a.b)({type:Boolean,dependsOn:["updatingHandles.updating"],readOnly:!0})],u.prototype,"updating",null),Object(s.a)([Object(a.b)({dependsOn:["layer.visible"]})],u.prototype,"visible",null),u=Object(s.a)([Object(n.a)("esri.views.layers.LayerView")],u),t.a=u},QHIw:function(e,t,i){"use strict";i.r(t);var s=i("pO5D"),r=(i("wSAH"),i("6S2I"),i("zqDF"),i("WbKI")),a=i("04ZG"),n=(i("4EHJ"),i("ju1D"),i("9AIY"),i("9MzC")),l=i("l4ZG"),o=i("r0DZ"),c=i("bHqs"),h=i("AY31"),d=i("B81a"),u=i("0wLv"),p=i("NloG"),b=i("Vm2Q"),y=i("Fkrg");const f=[102113,102100,3857,3785,900913];let O=class extends(Object(c.a)(Object(y.a)(Object(b.a)(p.a)))){constructor(){super(...arguments),this._handles=new o.a,this._tileStrategy=null,this._fetchQueue=null,this._tileRequests=new Map,this.layer=null}get tileMatrixSet(){if(this.layer.activeLayer.tileMatrixSetId)return this.layer.activeLayer.tileMatrixSet;const e=this._getTileMatrixSetBySpatialReference(this.layer.activeLayer);return e?(this.layer.activeLayer.tileMatrixSetId=e.id,e):null}hitTest(){return null}update(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume(),this.notifyChange("updating")}attach(){const e=this.layer.activeLayer,t=this.tileMatrixSet;if(!t)return;const i=t.tileInfo.spatialReference;let s=e.fullExtent&&e.fullExtent.clone();i.isWebMercator?s=Object(l.b)(s):i.isWGS84||(s=t.fullExtent),this._tileInfoView=new h.a(t.tileInfo,s),this._fetchQueue=new d.a({tileInfoView:this._tileInfoView,process:e=>this.fetchTile(e)}),this._tileStrategy=new u.a({cachePolicy:"keep",acquireTile:e=>this.acquireTile(e),releaseTile:e=>this.releaseTile(e),tileInfoView:this._tileInfoView}),this._handles.add(this.watch(["layer.activeLayer.styleId","tileMatrixSet"],()=>this._refresh())),super.attach()}detach(){super.detach(),this._handles.removeAll(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.requestUpdate()}async doRefresh(){this.updateRequested||this.suspended||this._refresh()}isUpdating(){return this._fetchQueue.length>0}acquireTile(e){const t=this._bitmapView.createTile(e),i=t.bitmap;[i.x,i.y]=this._tileInfoView.getTileCoords([0,0],t.key),i.resolution=this._tileInfoView.getTileResolution(t.key),[i.width,i.height]=this._tileInfoView.tileInfo.size,this._tileInfoView.getTileCoords(i,t.key);const s={id:e.id,fulfilled:!1,promise:this._fetchQueue.push(t.key).then(e=>{t.bitmap.source=e,t.once("attach",()=>this.requestUpdate()),this._bitmapView.addChild(t)}).catch(e=>{Object(n.n)(e)||(t.bitmap.source=null,t.once("attach",()=>this.requestUpdate()),this._bitmapView.addChild(t))})};return s.promise.finally(()=>s.fulfilled=!0),this._tileRequests.set(t,s),this.requestUpdate(),t}releaseTile(e){const t=this._tileRequests.get(e);t.fulfilled||this._fetchQueue.abort(t.id),this._tileRequests.delete(e),this._bitmapView.removeChild(e),e.once("detach",()=>e.destroy()),this.requestUpdate()}async fetchTile(e){return this.layer.fetchTile(e.level,e.row,e.col)}canResume(){const e=super.canResume();return e?null!==this.tileMatrixSet:e}_refresh(){this._fetchQueue.reset(),this._tileStrategy.tiles.forEach(e=>{if(!e.bitmap.source)return;e.bitmap.source=null;const t={id:e.key.id,fulfilled:!1,promise:this._fetchQueue.push(e.key).then(t=>{e.bitmap.source=t,e.requestRender(),this.notifyChange("updating")})};t.promise.then(()=>t.fulfilled=!0,()=>t.fulfilled=!0),this._tileRequests.set(e,t)}),this.notifyChange("updating")}_getTileMatrixSetBySpatialReference(e){const t=this.view.spatialReference;if(!e.tileMatrixSets)return null;let i=e.tileMatrixSets.find(e=>e.tileInfo.spatialReference.wkid===t.wkid);return!i&&t.isWebMercator&&(i=e.tileMatrixSets.find(e=>f.indexOf(e.tileInfo.spatialReference.wkid)>-1)),i}};Object(s.a)([Object(r.b)({dependsOn:["tileMatrixSet"]})],O.prototype,"suspended",void 0),Object(s.a)([Object(r.b)({readOnly:!0,dependsOn:["view.spatialReference","layer.activeLayer"]})],O.prototype,"tileMatrixSet",null),O=Object(s.a)([Object(a.a)("esri.views.2d.layers.WMTSLayerView2D")],O),t.default=O},Vm2Q:function(e,t,i){"use strict";i.d(t,"a",function(){return I});var s=i("pO5D"),r=(i("wSAH"),i("6S2I"),i("zqDF"),i("WbKI")),a=i("04ZG"),n=(i("4EHJ"),i("ju1D"),i("9AIY"),i("LE9a")),l=i("fX31"),o=i("N5XI"),c=i("ag7Y");let h=class extends c.a{};h=Object(s.a)([Object(a.a)("esri.views.layers.support.ClipArea")],h);var d,u=h;let p=d=class extends u{constructor(){super(...arguments),this.type="rect",this.left=null,this.right=null,this.top=null,this.bottom=null}clone(){return new d({left:this.left,right:this.right,top:this.top,bottom:this.bottom})}get version(){return(this._get("version")||0)+1}};Object(s.a)([Object(r.b)({type:[Number,String],json:{write:!0}})],p.prototype,"left",void 0),Object(s.a)([Object(r.b)({type:[Number,String],json:{write:!0}})],p.prototype,"right",void 0),Object(s.a)([Object(r.b)({type:[Number,String],json:{write:!0}})],p.prototype,"top",void 0),Object(s.a)([Object(r.b)({type:[Number,String],json:{write:!0}})],p.prototype,"bottom",void 0),Object(s.a)([Object(r.b)({readOnly:!0,dependsOn:["left","right","top","bottom"]})],p.prototype,"version",null),p=d=Object(s.a)([Object(a.a)("esri.views.layers.support.ClipRect")],p);var b,y=p,f=i("AMBt"),O=i("N2DF"),g=i("OvF4"),v=i("Ehki"),j=i("qatw");i("4GrV");const w={base:O.a,key:"type",typeMap:{extent:g.a,polygon:v.a}};let m=b=class extends u{constructor(){super(...arguments),this.type="geometry",this.geometry=null}get version(){return(this._get("version")||0)+1}clone(){return new b({geometry:this.geometry.clone()})}};Object(s.a)([Object(r.b)({types:w,json:{read:j.a,write:!0}})],m.prototype,"geometry",void 0),Object(s.a)([Object(r.b)({readOnly:!0,dependsOn:["geometry"]})],m.prototype,"version",null),m=b=Object(s.a)([Object(a.a)("esri.views.layers.support.Geometry")],m);var _=m;let R=class extends u{constructor(){super(...arguments),this.type="path",this.path=[]}get version(){return(this._get("version")||0)+1}};Object(s.a)([Object(r.b)({type:[[[Number]]],json:{write:!0}})],R.prototype,"path",void 0),Object(s.a)([Object(r.b)({readOnly:!0,dependsOn:["path"]})],R.prototype,"version",null),R=Object(s.a)([Object(a.a)("esri.views.layers.support.Path")],R);const S=n.a.ofType({key:"type",base:u,typeMap:{rect:y,path:R,geometry:_}}),I=e=>{let t=class extends e{constructor(){super(...arguments),this.clips=new S,this.moving=!1,this.attached=!1,this.lastUpdateId=-1,this.updateRequested=!1}initialize(){var e;this.container||(this.container=new f.a),this.container.fadeTransitionEnabled=!0,this.container.opacity=0,this.container.clips=this.clips,this.handles.add([Object(o.a)(this,"suspended",e=>{this.container&&(this.container.visible=!e),this.view&&!e&&this.updateRequested&&this.view.requestUpdate()},!0),Object(o.a)(this,["layer.opacity","container"],()=>{var e,t;this.container&&(this.container.opacity=null!=(e=null==(t=this.layer)?void 0:t.opacity)?e:1)},!0),Object(o.a)(this,["layer.blendMode"],e=>{this.container&&(this.container.blendMode=e)},!0),Object(o.a)(this,["layer.effect"],e=>{this.container&&(this.container.effect=e)},!0),this.clips.on("change",()=>{this.container.clips=this.clips,this.notifyChange("clips")})]),null!=(e=this.view)&&e.whenLayerView?this.view.whenLayerView(this.layer).then(e=>{e!==this||this.attached||this.destroyed||(this.attach(),this.requestUpdate(),this.attached=!0)},()=>{}):this.when().then(()=>{this.attached||this.destroyed||(this.attach(),this.requestUpdate(),this.attached=!0)},()=>{})}destroy(){this.attached&&(this.detach(),this.attached=!1),this.handles.remove("initialize"),this.updateRequested=!1}get updating(){return!this.attached||!this.suspended&&(this.updateRequested||this.isUpdating())}isVisibleAtScale(e){let t=!0;const i=this.layer,s=i.minScale,r=i.maxScale;if(null!=s&&null!=r){let i=!s,a=!r;!i&&e<=s&&(i=!0),!a&&e>=r&&(a=!0),t=i&&a}return t}requestUpdate(){this.updateRequested||(this.updateRequested=!0,this.suspended||this.view.requestUpdate())}processUpdate(e){!this.isFulfilled()||this.isResolved()?(this._set("updateParameters",e),this.updateRequested&&!this.suspended&&(this.updateRequested=!1,this.update(e))):this.updateRequested=!1}isUpdating(){return!1}isRendering(){return!1}canResume(){return!!super.canResume()&&this.isVisibleAtScale(this.view.scale)}};return Object(s.a)([Object(r.b)({type:S,set(e){const t=Object(l.b)(e,this._get("clips"),S);this._set("clips",t)}})],t.prototype,"clips",void 0),Object(s.a)([Object(r.b)()],t.prototype,"moving",void 0),Object(s.a)([Object(r.b)()],t.prototype,"attached",void 0),Object(s.a)([Object(r.b)()],t.prototype,"container",void 0),Object(s.a)([Object(r.b)({dependsOn:["view.scale","layer.minScale","layer.maxScale"]})],t.prototype,"suspended",void 0),Object(s.a)([Object(r.b)({readOnly:!0})],t.prototype,"updateParameters",void 0),Object(s.a)([Object(r.b)()],t.prototype,"updateRequested",void 0),Object(s.a)([Object(r.b)({dependsOn:["attached","updateRequested","suspended"]})],t.prototype,"updating",null),Object(s.a)([Object(r.b)()],t.prototype,"view",void 0),t=Object(s.a)([Object(a.a)("esri.views.2d.layers.LayerView2D")],t),t}},ZyIX:function(e,t,i){"use strict";var s=i("yE7X"),r=i("b3VY"),a=i("7F7D"),n=i("mgI5");const l=(e,t)=>e.key.level-t.key.level!=0?e.key.level-t.key.level:e.key.row-t.key.row!=0?e.key.row-t.key.row:e.key.col-t.key.col;t.a=class extends n.a{constructor(e){super(),this._tileInfoView=e}renderChildren(e){this.sortChildren(l),this.setStencilReference(),super.renderChildren(e)}createRenderParams(e){const{state:t}=e;return{...super.createRenderParams(e),requiredLevel:this._tileInfoView.getClosestInfoForScale(t.scale).level,displayLevel:this._tileInfoView.tileInfo.scaleToZoom(t.scale)}}prepareRenderPasses(e){const t=e.registerRenderPass({name:"stencil",brushes:[a.a],drawPhase:s.c.DEBUG|s.c.MAP|s.c.HIGHLIGHT,target:()=>this.getStencilTarget()}),i=e.registerRenderPass({name:"tileInfo",brushes:[r.a],drawPhase:s.c.DEBUG,target:()=>this.children,has:"esri-tiles-debug"});return[...super.prepareRenderPasses(e),t,i]}getStencilTarget(){return this.children}updateTransforms(e){for(const t of this.children){const i=this._tileInfoView.getTileResolution(t.key);t.setTransform(e,i)}}setStencilReference(){let e=1;for(const t of this.children)t.stencilRef=e++}}}}]);