(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{"1kEK":function(t,e,n){"use strict";n.d(e,"a",function(){return i});const i={convertToGEGeometry:function(t,e){return null==e?null:t.convertJSONToGeometry(e)},exportPoint:function(t,e,n){const i=new r(t.getPointX(e),t.getPointY(e),n),s=t.hasZ(e),a=t.hasM(e);return s&&(i.z=t.getPointZ(e)),a&&(i.m=t.getPointM(e)),i},exportPolygon:function(t,e,n){return new s(t.exportPaths(e),n,t.hasZ(e),t.hasM(e))},exportPolyline:function(t,e,n){return new a(t.exportPaths(e),n,t.hasZ(e),t.hasM(e))},exportMultipoint:function(t,e,n){return new o(t.exportPoints(e),n,t.hasZ(e),t.hasM(e))},exportExtent:function(t,e,n){const i=t.hasZ(e),r=t.hasM(e),s=new u(t.getXMin(e),t.getYMin(e),t.getXMax(e),t.getYMax(e),n);if(i){const n=t.getZExtent(e);s.zmin=n.vmin,s.zmax=n.vmax}if(r){const n=t.getMExtent(e);s.mmin=n.vmin,s.mmax=n.vmax}return s}};class r{constructor(t,e,n){this.x=t,this.y=e,this.spatialReference=n,this.z=void 0,this.m=void 0}}class s{constructor(t,e,n,i){this.rings=t,this.spatialReference=e,this.hasZ=void 0,this.hasM=void 0,n&&(this.hasZ=n),i&&(this.hasM=i)}}class a{constructor(t,e,n,i){this.paths=t,this.spatialReference=e,this.hasZ=void 0,this.hasM=void 0,n&&(this.hasZ=n),i&&(this.hasM=i)}}class o{constructor(t,e,n,i){this.points=t,this.spatialReference=e,this.hasZ=void 0,this.hasM=void 0,n&&(this.hasZ=n),i&&(this.hasM=i)}}class u{constructor(t,e,n,i,r){this.xmin=t,this.ymin=e,this.xmax=n,this.ymax=i,this.spatialReference=r,this.zmin=void 0,this.zmax=void 0,this.mmin=void 0,this.mmax=void 0}}},"2X7Z":function(t,e,n){"use strict";function i(t,e){return t?e?4:3:e?3:2}function r(t,e,n,r,o){if(!e||!e.lengths.length)return null;const u="upperLeft"===(null==o?void 0:o.originPosition)?-1:1;t.lengths.length&&(t.lengths.length=0),t.coords.length&&(t.coords.length=0);const l=t.coords,c=[],h=n?[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY]:[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY],{lengths:f,coords:d}=e,m=i(n,r);let p=0;for(const i of f){const t=s(h,d,p,i,n,r,u);t&&c.push(t),p+=i*m}if(c.sort((t,e)=>{let i=u*t[2]-u*e[2];return 0===i&&n&&(i=t[4]-e[4]),i}),c.length){let t=6*c[0][2];l[0]=c[0][0]/t,l[1]=c[0][1]/t,n&&(t=6*c[0][4],l[2]=0!==t?c[0][3]/t:0),(l[0]<h[0]||l[0]>h[1]||l[1]<h[2]||l[1]>h[3]||n&&(l[2]<h[4]||l[2]>h[5]))&&(l.length=0)}if(!l.length){const t=e.lengths[0]?a(d,0,f[0],n,r):null;if(!t)return null;l[0]=t[0],l[1]=t[1],n&&t.length>2&&(l[2]=t[2])}return t}function s(t,e,n,r,s,a,o=1){const u=i(s,a);let l=n,c=n+u,h=0,f=0,d=0,m=0,p=0;for(let i=0,y=r-1;i<y;i++,l+=u,c+=u){const n=e[l],i=e[l+1],r=e[l+2],a=e[c],o=e[c+1],u=e[c+2];let g=n*o-a*i;m+=g,h+=(n+a)*g,f+=(i+o)*g,s&&(g=n*u-a*r,d+=(r+u)*g,p+=g),n<t[0]&&(t[0]=n),n>t[1]&&(t[1]=n),i<t[2]&&(t[2]=i),i>t[3]&&(t[3]=i),s&&(r<t[4]&&(t[4]=r),r>t[5]&&(t[5]=r))}if(m*o>0&&(m*=-1),p*o>0&&(p*=-1),!m)return null;const g=[h,f,.5*m];return s&&(g[3]=d,g[4]=.5*p),g}function a(t,e,n,r,s){const a=i(r,s);let h=e,f=e+a,d=0,m=0,p=0,g=0;for(let i=0,y=n-1;i<y;i++,h+=a,f+=a){const e=t[h],n=t[h+1],i=t[h+2],s=t[f],a=t[f+1],y=t[f+2],x=r?u(e,n,i,s,a,y):o(e,n,s,a);if(x)if(d+=x,r){const t=c(e,n,i,s,a,y);m+=x*t[0],p+=x*t[1],g+=x*t[2]}else{const t=l(e,n,s,a);m+=x*t[0],p+=x*t[1]}}return d>0?r?[m/d,p/d,g/d]:[m/d,p/d]:n>0?r?[t[e],t[e+1],t[e+2]]:[t[e],t[e+1]]:null}function o(t,e,n,i){const r=n-t,s=i-e;return Math.sqrt(r*r+s*s)}function u(t,e,n,i,r,s){const a=i-t,o=r-e,u=s-n;return Math.sqrt(a*a+o*o+u*u)}function l(t,e,n,i){return[t+.5*(n-t),e+.5*(i-e)]}function c(t,e,n,i,r,s){return[t+.5*(i-t),e+.5*(r-e),n+.5*(s-n)]}n.d(e,"a",function(){return r})},AIxD:function(t,e,n){"use strict";n.d(e,"a",function(){return b}),n.d(e,"b",function(){return g}),n.d(e,"c",function(){return o}),n.d(e,"d",function(){return I}),n.d(e,"e",function(){return _}),n.d(e,"f",function(){return j}),n.d(e,"g",function(){return M});var i=n("qatw");const r=(t,e,n)=>[e,n],s=(t,e,n)=>[e,n,t[2]],a=(t,e,n)=>[e,n,t[2],t[3]];function o(t){return t?{originPosition:"upper-left"===t.originPosition?"upperLeft":"lower-left"===t.originPosition?"lowerLeft":t.originPosition,scale:[t.tolerance,t.tolerance],translate:[t.extent.xmin,t.extent.ymax]}:null}function u({scale:t,translate:e},n){return Math.round((n-e[0])/t[0])}function l({scale:t,translate:e},n){return Math.round((e[1]-n)/t[1])}function c(t,e,n){const i=[];let r,s,a,o;for(let c=0;c<n.length;c++){const h=n[c];c>0?(a=u(t,h[0]),o=l(t,h[1]),a===r&&o===s||(i.push(e(h,a-r,o-s)),r=a,s=o)):(r=u(t,h[0]),s=l(t,h[1]),i.push(e(h,r,s)))}return i.length>0?i:null}function h({scale:t,translate:e},n){return n*t[0]+e[0]}function f({scale:t,translate:e},n){return e[1]-n*t[1]}function d(t,e,n){const i=new Array(n.length);if(!n.length)return i;const[r,s]=t.scale;let a=h(t,n[0][0]),o=f(t,n[0][1]);i[0]=e(n[0],a,o);for(let u=1;u<n.length;u++){const t=n[u];a+=t[0]*r,o-=t[1]*s,i[u]=e(t,a,o)}return i}function m(t,e,n){const i=new Array(n.length);for(let r=0;r<n.length;r++)i[r]=d(t,e,n[r]);return i}function p(t,e,n,i,o){return e.points=function(t,e,n,i){return c(t,n?i?a:s:i?s:r,e)}(t,n.points,i,o),e}function g(t,e,n,i,r){return e.x=u(t,n.x),e.y=l(t,n.y),e!==n&&(i&&(e.z=n.z),r&&(e.m=n.m)),e}function y(t,e,n,i,o){const u=function(t,e,n,i){const o=[],u=n?i?a:s:i?s:r;for(let r=0;r<e.length;r++){const n=c(t,u,e[r]);n&&n.length>=3&&o.push(n)}return o.length?o:null}(t,n.rings,i,o);return u?(e.rings=u,e):null}function x(t,e,n,i,o){const u=function(t,e,n,i){const o=[],u=n?i?a:s:i?s:r;for(let r=0;r<e.length;r++){const n=c(t,u,e[r]);n&&n.length>=2&&o.push(n)}return o.length?o:null}(t,n.paths,i,o);return u?(e.paths=u,e):null}function b(t,e){return t&&e?Object(i.f)(e)?g(t,{},e,!1,!1):Object(i.h)(e)?x(t,{},e,!1,!1):Object(i.g)(e)?y(t,{},e,!1,!1):Object(i.e)(e)?p(t,{},e,!1,!1):Object(i.d)(e)?((r={}).xmin=u(n=t,(s=e).xmin),r.ymin=l(n,s.ymin),r.xmax=u(n,s.xmax),r.ymax=l(n,s.ymax),r):null:null;var n,r,s}function I(t,e,n,i,o){return e.points=function(t,e,n,i){return d(t,n?i?a:s:i?s:r,e)}(t,n.points,i,o),e}function _(t,e,n,i,r){return e.x=h(t,n.x),e.y=f(t,n.y),e!==n&&(i&&(e.z=n.z),r&&(e.m=n.m)),e}function j(t,e,n,i,o){return e.rings=function(t,e,n,i){return m(t,n?i?a:s:i?s:r,e)}(t,n.rings,i,o),e}function M(t,e,n,i,o){return e.paths=function(t,e,n,i){return m(t,n?i?a:s:i?s:r,e)}(t,n.paths,i,o),e}},Glky:function(t,e,n){"use strict";n.r(e);var i=n("zlDU"),r=n("9MzC"),s=n("f4Nx"),a=n("qatw"),o=n("wdpY"),u=n("Z4F+"),l=n("ZlUD"),c=n("gLc9"),h=n("HsO1"),f=n("iNG6"),d=n("ZRfE"),m=n("ZBG3"),p=n("IcpP");const g=s.a,y={xmin:-180,ymin:-90,xmax:180,ymax:90,spatialReference:s.a},x={hasAttachments:!1,capabilities:"query, editing, create, delete, update",useStandardizedQueries:!0,supportsCoordinatesQuantization:!0,supportsReturningQueryGeometry:!0,advancedQueryCapabilities:{supportsQueryAttachments:!1,supportsStatistics:!0,supportsPercentileStatistics:!0,supportsReturningGeometryCentroid:!0,supportsQueryWithDistance:!0,supportsDistinct:!0,supportsReturningQueryExtent:!0,supportsReturningGeometryProperties:!1,supportsHavingClause:!0,supportsOrderBy:!0,supportsPagination:!0,supportsQueryWithResultType:!1,supportsSqlExpression:!0,supportsDisjointSpatialRel:!0}};function b(t){return Object(a.f)(t)?null!=t.z:!!t.hasZ}function I(t){return Object(a.f)(t)?null!=t.m:!!t.hasM}e.default=class{constructor(){this._queryEngine=null,this._nextObjectId=null}destroy(){this._queryEngine&&this._queryEngine&&this._queryEngine.destroy(),this._queryEngine=this._requiredFields=this._fieldsIndex=this._createDefaultAttributes=null}async load(t){const e=[],{features:n}=t,r=this._inferLayerProperties(n,t.fields),s=t.fields||[],a=null!=t.hasM?t.hasM:r.hasM,l=null!=t.hasZ?t.hasZ:r.hasZ,p=!t.spatialReference&&!r.spatialReference,b=p?g:t.spatialReference||r.spatialReference,I=p?y:null,_=t.geometryType||r.geometryType;let j=t.objectIdField||r.objectIdField,M=t.timeInfo;if(_&&(p&&e.push({name:"feature-layer:spatial-reference-not-found",message:"Spatial reference not provided or found in features. Defaults to WGS84"}),!_))throw new i.a("feature-layer:missing-property","geometryType not set and couldn't be inferred from the provided features");if(!j)throw new i.a("feature-layer:missing-property","objectIdField not set and couldn't be found in the provided fields");if(r.objectIdField&&j!==r.objectIdField&&(e.push({name:"feature-layer:duplicated-oid-field",message:`Provided objectIdField "${j}" doesn't match the field name "${r.objectIdField}", found in the provided fields`}),j=r.objectIdField),j&&!r.objectIdField){let t=null;s.some(e=>e.name===j&&(t=e,!0))?(t.type="esriFieldTypeOID",t.editable=!1,t.nullable=!1):s.unshift({alias:j,name:j,type:"esriFieldTypeOID",editable:!1,nullable:!1})}for(const o of s){if(null==o.name&&(o.name=o.alias),null==o.alias&&(o.alias=o.name),!o.name)throw new i.a("feature-layer:invalid-field-name","field name is missing",{field:o});if(o.name===j&&(o.type="esriFieldTypeOID"),-1===u.a.jsonValues.indexOf(o.type))throw new i.a("feature-layer:invalid-field-type",`invalid type for field "${o.name}"`,{field:o})}const O={};this._requiredFields=[];for(const i of s)if("esriFieldTypeOID"!==i.type&&"esriFieldTypeGlobalID"!==i.type){i.editable=null==i.editable||!!i.editable,i.nullable=null==i.nullable||!!i.nullable;const t=Object(o.o)(i);i.nullable||void 0!==t?O[i.name]=t:this._requiredFields.push(i)}if(this._fieldsIndex=new c.a(s),this._createDefaultAttributes=Object(f.a)(O,j),M){if(M.startTimeField){const t=this._fieldsIndex.get(M.startTimeField);t?(M.startTimeField=t.name,t.type="esriFieldTypeDate"):M.startTimeField=null}if(M.endTimeField){const t=this._fieldsIndex.get(M.endTimeField);t?(M.endTimeField=t.name,t.type="esriFieldTypeDate"):M.endTimeField=null}if(M.trackIdField){const t=this._fieldsIndex.get(M.trackIdField);t?M.trackIdField=t.name:(M.trackIdField=null,e.push({name:"feature-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:M}}))}M.startTimeField||M.endTimeField||(e.push({name:"feature-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing or invalid",details:{timeInfo:M}}),M=null)}const v={warnings:e,featureErrors:[],layerDefinition:{...x,drawingInfo:Object(f.c)(_),templates:Object(f.b)(O),extent:I,geometryType:_,objectIdField:j,fields:s,hasZ:!!l,hasM:!!a,timeInfo:M},assignedObjectIds:{}};if(this._queryEngine=new m.a({fields:s,geometryType:_,hasM:a,hasZ:l,objectIdField:j,spatialReference:b,featureStore:new d.a({geometryType:_,hasM:a,hasZ:l}),timeInfo:M}),!n||!n.length)return this._nextObjectId=1,v;const F=n.reduce((t,e)=>{const n=e.attributes&&e.attributes[j];return null==n||isNaN(n)||!isFinite(n)?t:Math.max(t,n)},0);return this._nextObjectId=1+F,await Object(h.a)(n,b),this._loadInitialFeatures(v,n)}async applyEdits(t){const{spatialReference:e,geometryType:n}=this._queryEngine;return await Object(r.b)([Object(p.c)(e,n),Object(h.a)(t.adds,e),Object(h.a)(t.updates,e)]),this._applyEdits(t)}async queryFeatures(t,e={}){return this._queryEngine.executeQuery(t,e.signal)}async queryFeatureCount(t,e={}){return this._queryEngine.executeQueryForCount(t,e.signal)}async queryObjectIds(t,e={}){return this._queryEngine.executeQueryForIds(t,e.signal)}async queryExtent(t,e={}){return this._queryEngine.executeQueryForExtent(t,e.signal)}_inferLayerProperties(t,e){let n,i,r=null,s=null,o=null;for(const u of t){const t=u.geometry;if(t&&(r||(r=Object(a.c)(t)),s||(s=t.spatialReference),null==n&&(n=b(t)),null==i&&(i=I(t)),r&&s&&null!=n&&null!=i))break}if(e&&e.length){let t=null;e.some(e=>{const n="esriFieldTypeOID"===e.type,i=!e.type&&e.name&&"objectid"===e.name.toLowerCase();return t=e,n||i})&&(o=t.name)}return{geometryType:r,spatialReference:s,objectIdField:o,hasM:i,hasZ:n}}_loadInitialFeatures(t,e){const{geometryType:n,hasM:i,hasZ:r,objectIdField:s,spatialReference:o,featureStore:u}=this._queryEngine,c=[];for(const l of e){if(null!=l.uid&&(t.assignedObjectIds[l.uid]=-1),l.geometry&&n!==Object(a.c)(l.geometry)){t.featureErrors.push(Object(p.a)("Incorrect geometry type."));continue}const e=this._createDefaultAttributes(),i=Object(p.d)(this._fieldsIndex,this._requiredFields,e,l.attributes,!0,t.warnings);i?t.featureErrors.push(i):(this._assignObjectId(e,l.attributes,!0),l.attributes=e,null!=l.uid&&(t.assignedObjectIds[l.uid]=l.attributes[s]),l.geometry&&(l.geometry=Object(h.b)(l.geometry,l.geometry.spatialReference,o)),c.push(l))}if(u.addMany(Object(l.c)([],c,n,r,i,s)),t.layerDefinition.extent=this._queryEngine.fullExtent,t.layerDefinition.timeInfo){const{start:e,end:n}=this._queryEngine.timeExtent;t.layerDefinition.timeInfo.timeExtent=[e,n]}return t}_applyEdits(t){const{adds:e,updates:n,deletes:i}=t,r={addResults:[],deleteResults:[],updateResults:[],uidToObjectId:{}};if(e&&e.length&&this._applyAddEdits(r,e),n&&n.length&&this._applyUpdateEdits(r,n),i&&i.length){for(const t of i)r.deleteResults.push(Object(p.b)(t));this._queryEngine.featureStore.removeManyById(i)}return{fullExtent:this._queryEngine.fullExtent,featureEditResults:r}}_applyAddEdits(t,e){const{addResults:n}=t,{geometryType:i,hasM:r,hasZ:s,objectIdField:o,spatialReference:u,featureStore:c}=this._queryEngine,f=[];for(const l of e){if(l.geometry&&i!==Object(a.c)(l.geometry)){n.push(Object(p.a)("Incorrect geometry type."));continue}const e=this._createDefaultAttributes(),r=Object(p.d)(this._fieldsIndex,this._requiredFields,e,l.attributes);r?n.push(r):(this._assignObjectId(e,l.attributes),l.attributes=e,null!=l.uid&&(t.uidToObjectId[l.uid]=l.attributes[o]),l.geometry&&(l.geometry=Object(h.b)(Object(p.e)(l.geometry,u),l.geometry.spatialReference,u)),f.push(l),n.push(Object(p.b)(l.attributes[o])))}c.addMany(Object(l.c)([],f,i,s,r,o))}_applyUpdateEdits({updateResults:t},e){const{geometryType:n,hasM:i,hasZ:r,objectIdField:s,spatialReference:o,featureStore:u}=this._queryEngine;for(const c of e){const{attributes:e,geometry:f}=c,d=e&&e[s];if(null==d){t.push(Object(p.a)(`Identifier field ${s} missing`));continue}if(!u.has(d)){t.push(Object(p.a)(`Feature with object id ${d} missing`));continue}const m=Object(l.i)(u.getFeature(d),n,r,i);if(f){if(n!==Object(a.c)(f)){t.push(Object(p.a)("Incorrect geometry type."));continue}m.geometry=Object(h.b)(Object(p.e)(f,o),f.spatialReference,o)}if(e){const n=Object(p.d)(this._fieldsIndex,this._requiredFields,m.attributes,e);if(n){t.push(n);continue}}u.add(Object(l.a)(m,n,r,i,s)),t.push(Object(p.b)(d))}}_assignObjectId(t,e,n=!1){const i=this._queryEngine.objectIdField;t[i]=n&&e&&isFinite(e[i])?e[i]:this._nextObjectId++}}},HsO1:function(t,e,n){"use strict";n.d(e,"a",function(){return f}),n.d(e,"b",function(){return p}),n.d(e,"c",function(){return y});var i=n("9MzC"),r=n("f4Nx"),s=n("l4ZG"),a=n("gYg2"),o=n("1kEK");const u=[0,0];function l(t,e){if(!e)return null;if("x"in e){const n={x:0,y:0};return[n.x,n.y]=t(e.x,e.y,u),null!=e.z&&(n.z=e.z),null!=e.m&&(n.m=e.m),n}if("xmin"in e){const n={xmin:0,ymin:0,xmax:0,ymax:0};return[n.xmin,n.ymin]=t(e.xmin,e.ymin,u),[n.xmax,n.ymax]=t(e.xmax,e.ymax,u),e.hasZ&&(n.zmin=e.zmin,n.zmax=e.zmax,n.hasZ=!0),e.hasM&&(n.mmin=e.mmin,n.mmax=e.mmax,n.hasM=!0),n}return"rings"in e?{rings:c(e.rings,t),hasM:e.hasM,hasZ:e.hasZ}:"paths"in e?{paths:c(e.paths,t),hasM:e.hasM,hasZ:e.hasZ}:"points"in e?{points:h(e.points,t),hasM:e.hasM,hasZ:e.hasZ}:void 0}function c(t,e){const n=[];for(const i of t)n.push(h(i,e));return n}function h(t,e){const n=[];for(const i of t){const t=e(i[0],i[1],[0,0]);n.push(t),i.length>2&&t.push(i[2]),i.length>3&&t.push(i[3])}return n}async function f(t,e){if(!e)return;const n=Array.isArray(t)?t.map(t=>{var e;return null==(e=t.geometry)?void 0:e.spatialReference}):[t];await Object(a.b)(n.map(t=>({source:t,dest:e})))}const d=l.bind(null,s.c),m=l.bind(null,s.f);function p(t,e,n){return t?(n||(n=e,e=t.spatialReference),Object(r.i)(e)&&Object(r.i)(n)&&!Object(r.c)(e,n)?Object(s.a)(e,n)?Object(r.m)(n)?d(t):m(t):Object(a.h)(o.a,[t],e,n,null)[0]:t):t}const g=new class{constructor(){this._jobs=[],this._timer=null,this._process=this._process.bind(this)}async push(t,e,n){!t||!t.length||!e||!n||Object(r.c)(e,n);const s={geometries:t,inSpatialReference:e,outSpatialReference:n,resolve:null};return this._jobs.push(s),Object(i.c)(t=>{s.resolve=t,null===this._timer&&(this._timer=setTimeout(this._process,10))})}_process(){this._timer=null;const t=this._jobs.shift();if(!t)return;const{geometries:e,inSpatialReference:n,outSpatialReference:i,resolve:u}=t;Object(s.a)(n,i)?Object(r.m)(i)?u(e.map(d)):u(e.map(m)):u(Object(a.h)(o.a,e,n,i,null)),this._jobs.length>0&&(this._timer=setTimeout(this._process,10))}};async function y(t,e,n){return g.push(t,e,n)}},RjdO:function(t,e,n){"use strict";n.d(e,"a",function(){return r});var i=n("X2wA"),r=Object(i.b)(function(t){var e;void 0!==(e=function(){function t(n,i,r,s,a){for(;s>r;){if(s-r>600){var o=s-r+1,u=i-r+1,l=Math.log(o),c=.5*Math.exp(2*l/3),h=.5*Math.sqrt(l*c*(o-c)/o)*(u-o/2<0?-1:1);t(n,i,Math.max(r,Math.floor(i-u*c/o+h)),Math.min(s,Math.floor(i+(o-u)*c/o+h)),a)}var f=n[i],d=r,m=s;for(e(n,r,i),a(n[s],f)>0&&e(n,r,s);d<m;){for(e(n,d,m),d++,m--;a(n[d],f)<0;)d++;for(;a(n[m],f)>0;)m--}0===a(n[r],f)?e(n,r,m):e(n,++m,s),m<=i&&(r=m+1),i<=m&&(s=m-1)}}function e(t,e,n){var i=t[e];t[e]=t[n],t[n]=i}function n(t,e){return t<e?-1:t>e?1:0}return function(e,i,r,s,a){t(e,i,r||0,s||e.length-1,a||n)}}())&&(t.exports=e)})},"kB+0":function(t,e,n){"use strict";n.d(e,"a",function(){return r});var i=n("RjdO");function r(t,e){if(!(this instanceof r))return new r(t,e);this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),e&&("function"==typeof e?this.toBBox=e:this._initFormat(e)),this.clear()}function s(t,e,n){if(!n)return e.indexOf(t);for(var i=0;i<e.length;i++)if(n(t,e[i]))return i;return-1}function a(t,e){o(t,0,t.children.length,e,t)}function o(t,e,n,i,r){r||(r=p(null)),r.minX=1/0,r.minY=1/0,r.maxX=-1/0,r.maxY=-1/0;for(var s,a=e;a<n;a++)s=t.children[a],u(r,t.leaf?i(s):s);return r}function u(t,e){return t.minX=Math.min(t.minX,e.minX),t.minY=Math.min(t.minY,e.minY),t.maxX=Math.max(t.maxX,e.maxX),t.maxY=Math.max(t.maxY,e.maxY),t}function l(t,e){return t.minX-e.minX}function c(t,e){return t.minY-e.minY}function h(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function f(t){return t.maxX-t.minX+(t.maxY-t.minY)}function d(t,e){return t.minX<=e.minX&&t.minY<=e.minY&&e.maxX<=t.maxX&&e.maxY<=t.maxY}function m(t,e){return e.minX<=t.maxX&&e.minY<=t.maxY&&e.maxX>=t.minX&&e.maxY>=t.minY}function p(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function g(t,e,n,r,s){for(var a,o=[e,n];o.length;)(n=o.pop())-(e=o.pop())<=r||(a=e+Math.ceil((n-e)/r/2)*r,Object(i.a)(t,a,e,n,s),o.push(e,a,a,n))}r.prototype={all:function(){return this._all(this.data,[])},search:function(t){var e=this.data,n=[],i=this.toBBox;if(!m(t,e))return n;for(var r,s,a,o,u=[];e;){for(r=0,s=e.children.length;r<s;r++)a=e.children[r],m(t,o=e.leaf?i(a):a)&&(e.leaf?n.push(a):d(t,o)?this._all(a,n):u.push(a));e=u.pop()}return n},collides:function(t){var e=this.data,n=this.toBBox;if(!m(t,e))return!1;for(var i,r,s,a,o=[];e;){for(i=0,r=e.children.length;i<r;i++)if(s=e.children[i],m(t,a=e.leaf?n(s):s)){if(e.leaf||d(t,a))return!0;o.push(s)}e=o.pop()}return!1},load:function(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(var e=0,n=t.length;e<n;e++)this.insert(t[e]);return this}var i=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===i.height)this._splitRoot(this.data,i);else{if(this.data.height<i.height){var r=this.data;this.data=i,i=r}this._insert(i,this.data.height-i.height-1,!0)}else this.data=i;return this},insert:function(t){return t&&this._insert(t,this.data.height-1),this},clear:function(){return this.data=p([]),this},remove:function(t,e){if(!t)return this;for(var n,i,r,a,o=this.data,u=this.toBBox(t),l=[],c=[];o||l.length;){if(o||(o=l.pop(),i=l[l.length-1],n=c.pop(),a=!0),o.leaf&&-1!==(r=s(t,o.children,e)))return o.children.splice(r,1),l.push(o),this._condense(l),this;a||o.leaf||!d(o,u)?i?(n++,o=i.children[n],a=!1):o=null:(l.push(o),c.push(n),n=0,i=o,o=o.children[0])}return this},toBBox:function(t){return t},compareMinX:l,compareMinY:c,toJSON:function(){return this.data},fromJSON:function(t){return this.data=t,this},_all:function(t,e){for(var n=[];t;)t.leaf?e.push.apply(e,t.children):n.push.apply(n,t.children),t=n.pop();return e},_build:function(t,e,n,i){var r,s=n-e+1,o=this._maxEntries;if(s<=o)return a(r=p(t.slice(e,n+1)),this.toBBox),r;i||(i=Math.ceil(Math.log(s)/Math.log(o)),o=Math.ceil(s/Math.pow(o,i-1))),(r=p([])).leaf=!1,r.height=i;var u,l,c,h,f=Math.ceil(s/o),d=f*Math.ceil(Math.sqrt(o));for(g(t,e,n,d,this.compareMinX),u=e;u<=n;u+=d)for(g(t,u,c=Math.min(u+d-1,n),f,this.compareMinY),l=u;l<=c;l+=f)h=Math.min(l+f-1,c),r.children.push(this._build(t,l,h,i-1));return a(r,this.toBBox),r},_chooseSubtree:function(t,e,n,i){for(var r,s,a,o,u,l,c,f,d,m;i.push(e),!e.leaf&&i.length-1!==n;){for(c=f=1/0,r=0,s=e.children.length;r<s;r++)u=h(a=e.children[r]),d=t,m=a,(l=(Math.max(m.maxX,d.maxX)-Math.min(m.minX,d.minX))*(Math.max(m.maxY,d.maxY)-Math.min(m.minY,d.minY))-u)<f?(f=l,c=u<c?u:c,o=a):l===f&&u<c&&(c=u,o=a);e=o||e.children[0]}return e},_insert:function(t,e,n){var i=n?t:(0,this.toBBox)(t),r=[],s=this._chooseSubtree(i,this.data,e,r);for(s.children.push(t),u(s,i);e>=0&&r[e].children.length>this._maxEntries;)this._split(r,e),e--;this._adjustParentBBoxes(i,r,e)},_split:function(t,e){var n=t[e],i=n.children.length,r=this._minEntries;this._chooseSplitAxis(n,r,i);var s=this._chooseSplitIndex(n,r,i),o=p(n.children.splice(s,n.children.length-s));o.height=n.height,o.leaf=n.leaf,a(n,this.toBBox),a(o,this.toBBox),e?t[e-1].children.push(o):this._splitRoot(n,o)},_splitRoot:function(t,e){this.data=p([t,e]),this.data.height=t.height+1,this.data.leaf=!1,a(this.data,this.toBBox)},_chooseSplitIndex:function(t,e,n){var i,r,s,a,u,l,c,f,d,m,p,g,y,x;for(l=c=1/0,i=e;i<=n-e;i++)d=r=o(t,0,i,this.toBBox),m=s=o(t,i,n,this.toBBox),p=Math.max(d.minX,m.minX),g=Math.max(d.minY,m.minY),y=Math.min(d.maxX,m.maxX),x=Math.min(d.maxY,m.maxY),a=Math.max(0,y-p)*Math.max(0,x-g),u=h(r)+h(s),a<l?(l=a,f=i,c=u<c?u:c):a===l&&u<c&&(c=u,f=i);return f},_chooseSplitAxis:function(t,e,n){var i=t.leaf?this.compareMinX:l,r=t.leaf?this.compareMinY:c;this._allDistMargin(t,e,n,i)<this._allDistMargin(t,e,n,r)&&t.children.sort(i)},_allDistMargin:function(t,e,n,i){t.children.sort(i);var r,s,a=this.toBBox,l=o(t,0,e,a),c=o(t,n-e,n,a),h=f(l)+f(c);for(r=e;r<n-e;r++)s=t.children[r],u(l,t.leaf?a(s):s),h+=f(l);for(r=n-e-1;r>=e;r--)s=t.children[r],u(c,t.leaf?a(s):s),h+=f(c);return h},_adjustParentBBoxes:function(t,e,n){for(var i=n;i>=0;i--)u(e[i],t)},_condense:function(t){for(var e,n=t.length-1;n>=0;n--)0===t[n].children.length?n>0?(e=t[n-1].children).splice(e.indexOf(t[n]),1):this.clear():a(t[n],this.toBBox)},_initFormat:function(t){var e=["return a"," - b",";"];this.compareMinX=new Function("a","b",e.join(t[0])),this.compareMinY=new Function("a","b",e.join(t[1])),this.toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")}}}}]);