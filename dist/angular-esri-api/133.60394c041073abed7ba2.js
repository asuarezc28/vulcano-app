(window.webpackJsonp=window.webpackJsonp||[]).push([[133],{soW6:function(e,t,r){"use strict";r.r(t);var o=r("pO5D"),a=(r("wSAH"),r("6S2I"),r("zqDF"),r("WbKI")),l=r("r88o"),n=r("04ZG"),i=(r("4EHJ"),r("ju1D"),r("9AIY"),r("9MzC")),s=r("LE9a"),c=r("pqNC"),u=r("5pQd"),p=r("uRH/"),d=r("DbUH"),b=r("W9Wu");let O=class extends(Object(p.a)(Object(d.a)(Object(u.a)(c.a)))){constructor(...e){super(...e),this.type="route"}get barrierLines(){return this._getNamedFeatureLayer("PolylineBarriers")}get barrierPoints(){return this._getNamedFeatureLayer("Barriers")}get barrierPolygons(){return this._getNamedFeatureLayer("PolygonBarriers")}get directionLines(){return this._getNamedFeatureLayer("DirectionLines")}get directionPoints(){return this._getNamedFeatureLayer("DirectionPoints")}readFeatureCollectionsFromItem(e,t,r){return this.revert("featureCollections","portal-item"),t.layers.map(e=>{const t=new b.default;return t.read(e,r),t})}readFeatureCollectionsFromWebMap(e,t,r){return t.featureCollection.layers.map(e=>{const t=new b.default;return t.read(e,r),t})}get fullExtent(){return this.featureCollections?this.featureCollections.reduce((e,t)=>e?e.union(t.fullExtent):t.fullExtent,null):null}get maxScale(){return this.featureCollections?this.featureCollections.reduce((e,t)=>null==e?t.maxScale:Math.min(e,t.maxScale),null):0}set maxScale(e){this.featureCollections.forEach(t=>{t.maxScale=e}),this._set("maxScale",e)}get minScale(){return this.featureCollections?this.featureCollections.reduce((e,t)=>null==e?t.minScale:Math.min(e,t.minScale),null):0}set minScale(e){this.featureCollections.forEach(t=>{t.minScale=e}),this._set("minScale",e)}get routeInfo(){return this._getNamedFeatureLayer("RouteInfo")}get stops(){return this._getNamedFeatureLayer("Stops")}load(e){return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Feature Collection"]},e)),Object(i.u)(this)}_getNamedFeatureLayer(e){if(this.featureCollections)return this.featureCollections.find(t=>t.title===e)}};Object(o.a)([Object(a.b)({dependsOn:["featureCollections"]})],O.prototype,"barrierLines",null),Object(o.a)([Object(a.b)({dependsOn:["featureCollections"]})],O.prototype,"barrierPoints",null),Object(o.a)([Object(a.b)({dependsOn:["featureCollections"]})],O.prototype,"barrierPolygons",null),Object(o.a)([Object(a.b)({dependsOn:["featureCollections"]})],O.prototype,"directionLines",null),Object(o.a)([Object(a.b)({dependsOn:["featureCollections"]})],O.prototype,"directionPoints",null),Object(o.a)([Object(a.b)({type:s.a.ofType(b.default)})],O.prototype,"featureCollections",void 0),Object(o.a)([Object(l.a)("portal-item","featureCollections",["layers"])],O.prototype,"readFeatureCollectionsFromItem",null),Object(o.a)([Object(l.a)("web-map","featureCollections",["featureCollection.layers"])],O.prototype,"readFeatureCollectionsFromWebMap",null),Object(o.a)([Object(a.b)({dependsOn:["featureCollections"],readOnly:!0})],O.prototype,"fullExtent",null),Object(o.a)([Object(a.b)({type:["show","hide"]})],O.prototype,"listMode",void 0),Object(o.a)([Object(a.b)({dependsOn:["featureCollections"]})],O.prototype,"maxScale",null),Object(o.a)([Object(a.b)({dependsOn:["featureCollections"]})],O.prototype,"minScale",null),Object(o.a)([Object(a.b)({dependsOn:["featureCollections"]})],O.prototype,"routeInfo",null),Object(o.a)([Object(a.b)({dependsOn:["featureCollections"]})],O.prototype,"stops",null),Object(o.a)([Object(a.b)({readOnly:!0,json:{read:!1}})],O.prototype,"type",void 0),O=Object(o.a)([Object(n.a)("esri.layers.RouteLayer")],O),t.default=O}}]);