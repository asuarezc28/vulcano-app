(window.webpackJsonp=window.webpackJsonp||[]).push([[146],{t0D6:function(e,t,r){"use strict";r.r(t);var i=r("pO5D"),s=(r("wSAH"),r("6S2I"),r("zqDF"),r("WbKI")),a=r("04ZG"),o=(r("4EHJ"),r("ju1D"),r("9AIY"),r("9MzC")),n=r("Lqtk"),l=r("qNUd"),c=r("kglp"),u=r("o6Le"),p=r("OvWd"),b=r("srIe"),y=r("r88o"),d=r("ag7Y"),O=r("WZb1"),f=r("SuVq"),j=r("Ehki"),m=r("UhwK"),h=(r("4GrV"),r("jWBI")),B=r("8prj"),g=r("eKLr"),v=r("54nt");function k(e){return B.default.fromJSON(e).features.map(e=>e.geometry)}let S=class extends d.a{constructor(e){super(e),this.directions=null,this.facilities=null,this.incidents=null,this.messages=null,this.pointBarriers=null,this.polylineBarriers=null,this.polygonBarriers=null,this.routes=null}readFacilities(e){return k(e)}readIncidents(e){return k(e)}readPointBarriers(e,t){return k(t.barriers)}readPolylineBarriers(e){return k(e)}readPolygonBarriers(e){return k(e)}readRoutes(e){return function(e){return e.features.map(t=>{const r=O.a.fromJSON(e.spatialReference),i=h.a.fromJSON(t);return Object(b.h)(i.geometry)&&(i.geometry.spatialReference=r),i})}(e)}};Object(i.a)([Object(s.b)({type:[g.a]})],S.prototype,"directions",void 0),Object(i.a)([Object(s.b)({type:[f.a]})],S.prototype,"facilities",void 0),Object(i.a)([Object(y.a)("facilities")],S.prototype,"readFacilities",null),Object(i.a)([Object(s.b)({type:[f.a]})],S.prototype,"incidents",void 0),Object(i.a)([Object(y.a)("incidents")],S.prototype,"readIncidents",null),Object(i.a)([Object(s.b)({type:[v.a]})],S.prototype,"messages",void 0),Object(i.a)([Object(s.b)({type:[f.a]})],S.prototype,"pointBarriers",void 0),Object(i.a)([Object(y.a)("pointBarriers",["barriers"])],S.prototype,"readPointBarriers",null),Object(i.a)([Object(s.b)({type:[m.a]})],S.prototype,"polylineBarriers",void 0),Object(i.a)([Object(y.a)("polylineBarriers")],S.prototype,"readPolylineBarriers",null),Object(i.a)([Object(s.b)({type:[j.a]})],S.prototype,"polygonBarriers",void 0),Object(i.a)([Object(y.a)("polygonBarriers")],S.prototype,"readPolygonBarriers",null),Object(i.a)([Object(s.b)({type:[h.a]})],S.prototype,"routes",void 0),Object(i.a)([Object(y.a)("routes")],S.prototype,"readRoutes",null),S=Object(i.a)([Object(a.a)("esri.tasks.support.ClosestFacilitySolveResult")],S);var A=S;const w=Object(u.a)({accumulateAttributes:{name:"accumulateAttributeNames"},attributeParameterValues:!0,directionsTimeAttribute:{name:"directionsTimeAttributeName"},impedanceAttribute:{name:"impedanceAttributeName"},facilities:!0,incidents:!0,outSpatialReference:{name:"outSR",getter:e=>e.outSpatialReference.wkid},pointBarriers:{name:"barriers"},polylineBarriers:!0,polygonBarriers:!0,restrictionAttributes:{name:"restrictionAttributeNames"},returnPointBarriers:{name:"returnBarriers"},returnRoutes:{name:"returnCFRoutes"},travelMode:!0});let G=class extends(Object(p.a)(c.a)){constructor(e){super(e),this.url=null}solve(e,t){const r=[],i=[],s={},a={};return e.incidents&&e.incidents.features&&this._collectGeometries(e.incidents.features,i,"incidents.features",s),e.facilities&&e.facilities.features&&this._collectGeometries(e.facilities.features,i,"facilities.features",s),e.pointBarriers&&e.pointBarriers.features&&this._collectGeometries(e.pointBarriers.features,i,"pointBarriers.features",s),e.polylineBarriers&&e.polylineBarriers.features&&this._collectGeometries(e.polylineBarriers.features,i,"polylineBarriers.features",s),e.polygonBarriers&&e.polygonBarriers.features&&this._collectGeometries(e.polygonBarriers.features,i,"polygonBarriers.features",s),Object(l.a)(i).then(e=>{for(const t in s){const i=s[t];r.push(t),a[t]=e.slice(i[0],i[1])}return this._isInputGeometryZAware(a,r)?this.getServiceDescription():Object(o.u)({dontCheck:!0})}).then(i=>{("dontCheck"in i?i.dontCheck:i.hasZ)||this._dropZValuesOffInputGeometry(a,r);for(const t in a)a[t].forEach((r,i)=>{e.get(t)[i].geometry=r});let s={query:{...this.parsedUrl.query,f:"json",...w.toQueryParams(e)}};return(this.requestOptions||t)&&(s={...this.requestOptions,...t,...s}),Object(n.default)(this.parsedUrl.path+"/solveClosestFacility",s)}).then(e=>A.fromJSON(e.data))}_collectGeometries(e,t,r,i){i[r]=[t.length,t.length+e.length],e.forEach(e=>{t.push(e.geometry)})}};Object(i.a)([Object(s.b)()],G.prototype,"url",void 0),G=Object(i.a)([Object(a.a)("esri.tasks.ClosestFacilityTask")],G),t.default=G}}]);