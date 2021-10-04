(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"1kEK":function(t,e,i){"use strict";i.d(e,"a",function(){return s});const s={convertToGEGeometry:function(t,e){return null==e?null:t.convertJSONToGeometry(e)},exportPoint:function(t,e,i){const s=new n(t.getPointX(e),t.getPointY(e),i),r=t.hasZ(e),a=t.hasM(e);return r&&(s.z=t.getPointZ(e)),a&&(s.m=t.getPointM(e)),s},exportPolygon:function(t,e,i){return new r(t.exportPaths(e),i,t.hasZ(e),t.hasM(e))},exportPolyline:function(t,e,i){return new a(t.exportPaths(e),i,t.hasZ(e),t.hasM(e))},exportMultipoint:function(t,e,i){return new o(t.exportPoints(e),i,t.hasZ(e),t.hasM(e))},exportExtent:function(t,e,i){const s=t.hasZ(e),n=t.hasM(e),r=new h(t.getXMin(e),t.getYMin(e),t.getXMax(e),t.getYMax(e),i);if(s){const i=t.getZExtent(e);r.zmin=i.vmin,r.zmax=i.vmax}if(n){const i=t.getMExtent(e);r.mmin=i.vmin,r.mmax=i.vmax}return r}};class n{constructor(t,e,i){this.x=t,this.y=e,this.spatialReference=i,this.z=void 0,this.m=void 0}}class r{constructor(t,e,i,s){this.rings=t,this.spatialReference=e,this.hasZ=void 0,this.hasM=void 0,i&&(this.hasZ=i),s&&(this.hasM=s)}}class a{constructor(t,e,i,s){this.paths=t,this.spatialReference=e,this.hasZ=void 0,this.hasM=void 0,i&&(this.hasZ=i),s&&(this.hasM=s)}}class o{constructor(t,e,i,s){this.points=t,this.spatialReference=e,this.hasZ=void 0,this.hasM=void 0,i&&(this.hasZ=i),s&&(this.hasM=s)}}class h{constructor(t,e,i,s,n){this.xmin=t,this.ymin=e,this.xmax=i,this.ymax=s,this.spatialReference=n,this.zmin=void 0,this.zmax=void 0,this.mmin=void 0,this.mmax=void 0}}},"2AbE":function(t,e,i){"use strict";i.d(e,"b",function(){return b});var s=i("wSAH"),n=i("srIe"),r=i("6S2I"),a=i("zlDU"),o=i("9MzC"),h=i("OKTS"),u=i("DxxZ"),c=i("gLc9"),l=i("jIHu"),d=i("yN2G"),f=i("l8tk"),m=i("gzK8");const _=r.a.getLogger("esri.views.layers.2d.features.support.AttributeStore"),p=Object(f.b)(f.a,_),g=t=>(2147483648&t)>>>31,x=t=>2147483647&t;function b(t){return 1===g(t)}const y={sharedArrayBuffer:Object(s.a)("esri-shared-array-buffer"),atomics:Object(s.a)("esri-atomics")};function I(t,e){return i=>e(t(i))}class M{constructor(t,e,i,s){this.size=0,this.texelSize=4;const{pixelType:n,layout:r,textureOnly:a}=s;this.textureOnly=a||!1,this.pixelType=n,this._ctype=e,this.layout=r,this._resetRange(),this._shared=t,this.size=i,a||(this.data=this._initData(n,i,t,e))}get buffer(){return Object(n.a)(this.data,t=>t.buffer)}unsetComponentAllTexels(t,e){const i=Object(n.n)(this.data);for(let s=0;s<this.size*this.size;s++)i[s*this.texelSize+t]&=~e;this.dirtyStart=0,this.dirtyEnd=this.size*this.size-1}setComponentAllTexels(t,e){const i=Object(n.n)(this.data);for(let s=0;s<this.size*this.size;s++)i[s*this.texelSize+t]|=255&e;this.dirtyStart=0,this.dirtyEnd=this.size*this.size-1}setComponent(t,e,i){const s=Object(n.n)(this.data);for(const n of i)s[n*this.texelSize+t]|=e,this.dirtyStart=Math.min(this.dirtyStart,n),this.dirtyEnd=Math.max(this.dirtyEnd,n)}setComponentTexel(t,e,i){Object(n.n)(this.data)[i*this.texelSize+t]|=e,this.dirtyStart=Math.min(this.dirtyStart,i),this.dirtyEnd=Math.max(this.dirtyEnd,i)}unsetComponentTexel(t,e,i){Object(n.n)(this.data)[i*this.texelSize+t]&=~e,this.dirtyStart=Math.min(this.dirtyStart,i),this.dirtyEnd=Math.max(this.dirtyEnd,i)}getData(t,e){const i=x(t);return Object(n.n)(this.data)[i*this.texelSize+e]}setData(t,e,i){const s=x(t);0!=(this.layout&1<<e)?(this.data[s*this.texelSize+e]=i,this.dirtyStart=Math.min(this.dirtyStart,s),this.dirtyEnd=Math.max(this.dirtyEnd,s)):_.error("mapview-attributes-store","Tried to set a value for a texel's readonly component")}lock(){5121===this.pixelType&&this._shared&&y.atomics&&"local"!==this._ctype&&Atomics.store(this.data,0,1)}unlock(){5121===this.pixelType&&this._shared&&y.atomics&&"local"!==this._ctype&&Atomics.store(this.data,0,0)}expand(t){if(this.size=t,!this.textureOnly){const e=this._initData(this.pixelType,t,this._shared,this._ctype),i=Object(n.n)(this.data);e.set(i),this.data=e}}toMessage(){const t=this.dirtyStart,e=this.dirtyEnd,i=this.texelSize;if(t>e)return null;this._resetRange();const s=!(this._shared||"local"===this._ctype),r=this.pixelType,a=this.layout,o=Object(n.n)(this.data);return o.slice?{start:t,end:e,data:s&&o.slice(t*i,(e+1)*i)||null,pixelType:r,layout:a}:s?{start:t,end:e,data:new(Object(d.i)(this.pixelType))(Array.prototype.slice.call(this.data,t*i,(e+1)*i)),pixelType:r,layout:a}:{start:t,end:e,data:null,pixelType:r,layout:a}}_initData(t,e,i,s){const n=i&&"local"!==s?SharedArrayBuffer:ArrayBuffer,r=Object(d.i)(t),a=new r(new n(e*e*4*r.BYTES_PER_ELEMENT));for(let o=0;o<a.length;o+=4)a[o+1]=255;return a}_resetRange(){this.dirtyStart=2147483647,this.dirtyEnd=0}}e.a=class{constructor(t,e){this._client=t,this.config=e,this._attributeComputeMap=new Map,this._blocks=new Array,this._filters=new Array(l.o),this._targetType=0,this._abortController=Object(o.d)(),this._hasScaleExpr=!1,this._size=32,this._idsToHighlight=new Set;const i=e.supportsTextureFloat?5126:5121;p(`Creating AttributeStore ${y.sharedArrayBuffer?"with":"without"} shared memory`),this._blockDescriptors=[{pixelType:5121,layout:1},{pixelType:5121,layout:15,textureOnly:!0},{pixelType:i,layout:15},{pixelType:i,layout:15}],this._blocks=this._blockDescriptors.map(()=>null)}destroy(){this._abortController.abort()}get hasScaleExpr(){return this._hasScaleExpr}get _signal(){return this._abortController.signal}update(t,e){this.config=e;const i=e.schema.processors[0].storage,r=Object(u.a)(this._schema,i);if((t.targets.feature||t.targets.aggregate)&&(t.storage.data=!0),r&&(Object(s.a)("esri-2d-update-debug")&&console.debug("Applying Update - AttributeStore:",r),t.storage.data=!0,this._schema=i,this._attributeComputeMap.clear(),!Object(n.g)(i))){switch(i.target){case"feature":this._targetType=0;break;case"aggregate":this._targetType=1}for(const t of i.mapping)this._bindAttribute(t)}}onTileData(t,e){if(Object(n.g)(e.addOrUpdate))return;const i=e.addOrUpdate.getCursor();for(;i.next();){const t=i.getDisplayId();this.setAttributeData(t,i)}}invalidateResources(){this._createResourcesPromise=null,this._abortController.abort(),this._abortController=Object(o.d)()}async setHighlight(t,e){const i=this._getBlock(0),s=e.map(t=>x(t));i.lock(),i.unsetComponentAllTexels(0,1),i.setComponent(0,1,s),i.unlock(),this._idsToHighlight.clear();for(const n of t)this._idsToHighlight.add(n);await this.sendUpdates()}async updateFilters(t,e){const{config:i,service:n,spatialReference:r}=e,{filters:a}=i,h=a.map((t,e)=>this._updateFilter(t,e,n,r));(await Object(o.b)(h)).some(t=>t)&&(t.storage.filters=!0,Object(s.a)("esri-2d-update-debug")&&console.debug("Applying Update - AttributeStore:","Filters changed"))}setData(t,e,i,s){const n=x(t);this._ensureSizeForTexel(n),this._getBlock(e).setData(t,i,s)}getData(t,e,i){return this._getBlock(e).getData(t,i)}getHighlightFlag(t){return this._idsToHighlight.has(t)?l.l:0}unsetAttributeData(t){const e=x(t);this._getBlock(0).setData(e,0,0)}setAttributeData(t,e){const i=x(t);if(this._ensureSizeForTexel(i),this._getBlock(0).setData(i,0,this.getFilterFlags(e)),this._targetType!==g(t))return;const s=this._attributeComputeMap,n=this.config.supportsTextureFloat?1:2;s.size&&s.forEach((t,s)=>{const r=s*n%4,a=Math.floor(s*n/4),o=this._getBlock(a+l.b),u=t(e);if(this.config.supportsTextureFloat)o.setData(i,r,u);else if(u===l.p)o.setData(i,r,255),o.setData(i,r+1,255);else{const t=Object(h.c)(Math.round(u),-32767,32766)+32768,e=(65280&t)>>8;o.setData(i,r,255&t),o.setData(i,r+1,e)}})}sendUpdates(){if(this._nextUpdate)return this._nextUpdate.promise;if(this._currUpdate)return this._nextUpdate=Object(o.g)(),this._nextUpdate.promise;const t={blocks:this._blocks.map(t=>Object(n.h)(t)?t.toMessage():null)};return this._currUpdate=this._createResources().then(()=>{const e=()=>{if(this._currUpdate=null,this._nextUpdate){const t=this._nextUpdate;this._nextUpdate=null,this.sendUpdates().then(()=>t.resolve())}},i=this._client.update(t,this._signal).then(e).catch(e);return this._client.render(this._signal),i}).catch(t=>Object(o.n)(t)?(this._createResourcesPromise=null,this._createResources()):(_.error(new a.a("mapview-attribute-store","Encountered an error during client update",t)),Object(o.u)())),this._currUpdate}_ensureSizeForTexel(t){for(;t>=this._size*this._size;)if(this._expand())return}_bindAttribute(t){let e;if(null!=t.fieldIndex)t.normalizationField&&_.warn("mapview-arcade","Ignoring normalizationField specified with an arcade expression which is not supported."),e=e=>e.getComputedNumericAtIndex(t.fieldIndex);else{if(!t.field)return;e=t.normalizationField?e=>{const i=e.readAttribute(t.normalizationField);return i?e.readAttribute(t.field)/i:null}:e=>e.readAttribute(t.field)}t.valueRepresentation&&(e=I(e,e=>Object(m.b)(e,t.valueRepresentation))),this._attributeComputeMap.set(t.binding,I(e,t=>null===t||isNaN(t)||t===1/0?l.p:t))}_createResources(){if(Object(n.h)(this._createResourcesPromise))return this._createResourcesPromise;this._getBlock(l.a),p("Initializing AttributeStore");const t={shared:y.sharedArrayBuffer&&!("local"===this._client.type),size:this._size,blocks:Object(n.j)(this._blocks,t=>({textureOnly:t.textureOnly,buffer:t.buffer,pixelType:t.pixelType}))},e=this._client.initialize(t,this._signal).catch(t=>{Object(o.n)(t)?this._createResourcesPromise=null:_.error(new a.a("mapview-attribute-store","Encountered an error during client initialization",t))});return this._createResourcesPromise=e,e.then(()=>Object(n.g)(this._createResourcesPromise)?this._createResources():void 0),e}_getBlock(t){const e=this._blocks[t];if(Object(n.h)(e))return e;p("Initializing AttributeBlock at index "+t);const i=new M(y.sharedArrayBuffer,this._client.type,this._size,this._blockDescriptors[t]);return this._blocks[t]=i,this._createResourcesPromise=null,i}_expand(){if(this._size<this.config.maxTextureSize){const t=this._size<<=1;return p("Expanding block size to",t,this._blocks),Object(n.e)(this._blocks,e=>e.expand(t)),this._createResourcesPromise=null,this._size=t,0}return _.error(new a.a("mapview-limitations","Maximum number of onscreen features exceeded.")),-1}async _updateFilter(t,e,i,s){const r=this._filters[e],a=Object(n.h)(r)&&r.hash;if(!r&&!t)return!1;if(a===JSON.stringify(t))return!1;if(Object(n.g)(t)){const t=1<<e+1,i=this._getBlock(0);return this._filters[e]=null,i.setComponentAllTexels(0,t),this.sendUpdates(),!0}const o=await this._getFilter(e,i);return await o.update(t,s),!0}async _getFilter(t,e){const s=this._filters[t];if(Object(n.h)(s))return s;const{default:r}=await Promise.all([i.e(0),i.e(52)]).then(i.bind(null,"64Oa")),a=new r({geometryType:e.geometryType,hasM:!1,hasZ:!1,timeInfo:e.timeInfo,fieldsIndex:new c.a(e.fields)});return this._filters[t]=a,a}isVisible(t){return!!(2&this._getBlock(0).getData(t,0))}getFilterFlags(t){let e=0;const i=(s=t.getDisplayId(),1===g(s)?254:255);var s;for(let a=0;a<this._filters.length;a++){const s=this._filters[a];e|=(i&1<<a&&!Object(n.g)(s)&&!s.check(t)?0:1)<<a}let r=0;if(this._idsToHighlight.size){const e=t.getObjectId();r=this.getHighlightFlag(e)}return e<<1|r}}},"2X7Z":function(t,e,i){"use strict";function s(t,e){return t?e?4:3:e?3:2}function n(t,e,i,n,o){if(!e||!e.lengths.length)return null;const h="upperLeft"===(null==o?void 0:o.originPosition)?-1:1;t.lengths.length&&(t.lengths.length=0),t.coords.length&&(t.coords.length=0);const u=t.coords,c=[],l=i?[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY]:[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY],{lengths:d,coords:f}=e,m=s(i,n);let _=0;for(const s of d){const t=r(l,f,_,s,i,n,h);t&&c.push(t),_+=s*m}if(c.sort((t,e)=>{let s=h*t[2]-h*e[2];return 0===s&&i&&(s=t[4]-e[4]),s}),c.length){let t=6*c[0][2];u[0]=c[0][0]/t,u[1]=c[0][1]/t,i&&(t=6*c[0][4],u[2]=0!==t?c[0][3]/t:0),(u[0]<l[0]||u[0]>l[1]||u[1]<l[2]||u[1]>l[3]||i&&(u[2]<l[4]||u[2]>l[5]))&&(u.length=0)}if(!u.length){const t=e.lengths[0]?a(f,0,d[0],i,n):null;if(!t)return null;u[0]=t[0],u[1]=t[1],i&&t.length>2&&(u[2]=t[2])}return t}function r(t,e,i,n,r,a,o=1){const h=s(r,a);let u=i,c=i+h,l=0,d=0,f=0,m=0,_=0;for(let s=0,g=n-1;s<g;s++,u+=h,c+=h){const i=e[u],s=e[u+1],n=e[u+2],a=e[c],o=e[c+1],h=e[c+2];let p=i*o-a*s;m+=p,l+=(i+a)*p,d+=(s+o)*p,r&&(p=i*h-a*n,f+=(n+h)*p,_+=p),i<t[0]&&(t[0]=i),i>t[1]&&(t[1]=i),s<t[2]&&(t[2]=s),s>t[3]&&(t[3]=s),r&&(n<t[4]&&(t[4]=n),n>t[5]&&(t[5]=n))}if(m*o>0&&(m*=-1),_*o>0&&(_*=-1),!m)return null;const p=[l,d,.5*m];return r&&(p[3]=f,p[4]=.5*_),p}function a(t,e,i,n,r){const a=s(n,r);let l=e,d=e+a,f=0,m=0,_=0,p=0;for(let s=0,g=i-1;s<g;s++,l+=a,d+=a){const e=t[l],i=t[l+1],s=t[l+2],r=t[d],a=t[d+1],g=t[d+2],x=n?h(e,i,s,r,a,g):o(e,i,r,a);if(x)if(f+=x,n){const t=c(e,i,s,r,a,g);m+=x*t[0],_+=x*t[1],p+=x*t[2]}else{const t=u(e,i,r,a);m+=x*t[0],_+=x*t[1]}}return f>0?n?[m/f,_/f,p/f]:[m/f,_/f]:i>0?n?[t[e],t[e+1],t[e+2]]:[t[e],t[e+1]]:null}function o(t,e,i,s){const n=i-t,r=s-e;return Math.sqrt(n*n+r*r)}function h(t,e,i,s,n,r){const a=s-t,o=n-e,h=r-i;return Math.sqrt(a*a+o*o+h*h)}function u(t,e,i,s){return[t+.5*(i-t),e+.5*(s-e)]}function c(t,e,i,s,n,r){return[t+.5*(s-t),e+.5*(n-e),i+.5*(r-i)]}i.d(e,"a",function(){return n})},"7g5W":function(t,e,i){"use strict";i.d(e,"a",function(){return h});var s=i("VW+2"),n=i("OvF4"),r=i("kYAx"),a=i("AtWh"),o=i("rlSK");class h{constructor(t,e){this.key=new o.a(0,0,0,0),this.bounds=Object(r.d)(),this.objectIds=new Set,this.key.set(e);const i=t.getLODInfoAt(this.key);this.tileInfoView=t,this.tileInfoView.getTileBounds(this.bounds,this.key,!0),this.resolution=i.resolution,this.scale=i.scale,this.level=i.level,this.needsClear=!0}get id(){return this.key.id}get extent(){return n.a.fromBounds(this.bounds,this.tileInfoView.tileInfo.spatialReference)}get transform(){return{originPosition:"upperLeft",scale:[this.resolution,this.resolution],translate:[this.bounds[0],this.bounds[3]]}}get bbox(){const t=this.bounds;return{minX:t[0],minY:t[1],maxX:t[2],maxY:t[3]}}clone(){return new h(this.tileInfoView,this.key)}createChildTiles(){const t=this.key.getChildKeys(),e=s.a.acquire();for(let i=0;i<t.length;i++)e[i]=new h(this.tileInfoView,t[i]);return e}getQuantizationParameters(){return a.a.fromJSON({mode:"view",originPosition:"upperLeft",tolerance:this.resolution,extent:{xmin:this.bounds[0],ymin:this.bounds[1],xmax:this.bounds[2],ymax:this.bounds[3],spatialReference:this.tileInfoView.tileInfo.spatialReference}})}}},"8NDJ":function(t,e,i){"use strict";i.d(e,"a",function(){return h});var s=i("qatw"),n=(i("4GrV"),i("gVKr")),r=i("ZlUD"),a=i("2X7Z");let o=0;class h{constructor(t){this.type="FeatureSetReader",this.seen=!1,this.instance=0,this._tx=0,this._ty=0,this._xmin=-1,this._xmax=0,this._ymin=0,this._ymax=0,this._joined=[],this.instance=t}static createInstance(){return o++,o=o>65535?0:o,o}get _hasFilter(){return-1!==this._xmin}getQuantizationTransform(){throw new Error("Unable to find transform for featureSet")}getStorage(){return this._storage}getComputedNumeric(t){return this.getComputedNumericAtIndex(0)}setComputedNumeric(t,e){return this.setComputedNumericAtIndex(e,0)}getComputedString(t){return this.getComputedStringAtIndex(0)}setComputedString(t,e){return this.setComputedStringAtIndex(0,e)}getComputedNumericAtIndex(t){return this._storage.getComputedNumericAtIndex(this.getDisplayId(),t)}setComputedNumericAtIndex(t,e){this._storage.setComputedNumericAtIndex(this.getDisplayId(),t,e)}getComputedStringAtIndex(t){return this._storage.getComputedStringAtIndex(this.getDisplayId(),t)}setComputedStringAtIndex(t,e){return this._storage.setComputedStringAtIndex(this.getDisplayId(),t,e)}transform(t,e){const i=this.copy();return i._tx=t,i._ty=e,i}extent(t,e,i,s){const n=this.copy();return n._xmin=t,n._xmax=i,n._ymin=e,n._ymax=s,n}hasFilter(){return this._hasFilter}readAttribute(t,e=!1){const i=this._readAttribute(t,e);if(void 0!==i)return i;for(const s of this._joined){s.setIndex(this.getIndex());const i=s._readAttribute(t,e);if(void 0!==i)return i}}readAttributes(){return this._readAttributes()}joinAttributes(t){this._joined.push(t)}readArcadeFeature(){return this}geometry(){const t=this.readHydratedGeometry(),e=Object(r.k)(t,this.geometryType,this.hasZ,this.hasM),i=Object(s.a)(e);return i.spatialReference=this._arcadeSpatialReference,i}field(t){return this.readAttribute(t,!0)}hasField(t){return!0}setField(t,e){}keys(){return[]}castToText(){return""}_computeCentroid(){if("esriGeometryPolygon"!==this.geometryType)return null;const t=this.readUnquantizedGeometry();if(!t||t.hasIndeterminateRingOrder)return null;const e=this.getQuantizationTransform();return Object(a.a)(new n.a,t,this.hasM,this.hasZ,e)}copyInto(t){t.seen=this.seen,t._storage=this._storage,t._arcadeSpatialReference=this._arcadeSpatialReference,t._joined=this._joined,t._tx=this._tx,t._ty=this._ty,t._xmin=this._xmin,t._xmax=this._xmax,t._ymin=this._ymin,t._ymax=this._ymax}}},AIxD:function(t,e,i){"use strict";i.d(e,"a",function(){return b}),i.d(e,"b",function(){return p}),i.d(e,"c",function(){return o}),i.d(e,"d",function(){return y}),i.d(e,"e",function(){return I}),i.d(e,"f",function(){return M}),i.d(e,"g",function(){return S});var s=i("qatw");const n=(t,e,i)=>[e,i],r=(t,e,i)=>[e,i,t[2]],a=(t,e,i)=>[e,i,t[2],t[3]];function o(t){return t?{originPosition:"upper-left"===t.originPosition?"upperLeft":"lower-left"===t.originPosition?"lowerLeft":t.originPosition,scale:[t.tolerance,t.tolerance],translate:[t.extent.xmin,t.extent.ymax]}:null}function h({scale:t,translate:e},i){return Math.round((i-e[0])/t[0])}function u({scale:t,translate:e},i){return Math.round((e[1]-i)/t[1])}function c(t,e,i){const s=[];let n,r,a,o;for(let c=0;c<i.length;c++){const l=i[c];c>0?(a=h(t,l[0]),o=u(t,l[1]),a===n&&o===r||(s.push(e(l,a-n,o-r)),n=a,r=o)):(n=h(t,l[0]),r=u(t,l[1]),s.push(e(l,n,r)))}return s.length>0?s:null}function l({scale:t,translate:e},i){return i*t[0]+e[0]}function d({scale:t,translate:e},i){return e[1]-i*t[1]}function f(t,e,i){const s=new Array(i.length);if(!i.length)return s;const[n,r]=t.scale;let a=l(t,i[0][0]),o=d(t,i[0][1]);s[0]=e(i[0],a,o);for(let h=1;h<i.length;h++){const t=i[h];a+=t[0]*n,o-=t[1]*r,s[h]=e(t,a,o)}return s}function m(t,e,i){const s=new Array(i.length);for(let n=0;n<i.length;n++)s[n]=f(t,e,i[n]);return s}function _(t,e,i,s,o){return e.points=function(t,e,i,s){return c(t,i?s?a:r:s?r:n,e)}(t,i.points,s,o),e}function p(t,e,i,s,n){return e.x=h(t,i.x),e.y=u(t,i.y),e!==i&&(s&&(e.z=i.z),n&&(e.m=i.m)),e}function g(t,e,i,s,o){const h=function(t,e,i,s){const o=[],h=i?s?a:r:s?r:n;for(let n=0;n<e.length;n++){const i=c(t,h,e[n]);i&&i.length>=3&&o.push(i)}return o.length?o:null}(t,i.rings,s,o);return h?(e.rings=h,e):null}function x(t,e,i,s,o){const h=function(t,e,i,s){const o=[],h=i?s?a:r:s?r:n;for(let n=0;n<e.length;n++){const i=c(t,h,e[n]);i&&i.length>=2&&o.push(i)}return o.length?o:null}(t,i.paths,s,o);return h?(e.paths=h,e):null}function b(t,e){return t&&e?Object(s.f)(e)?p(t,{},e,!1,!1):Object(s.h)(e)?x(t,{},e,!1,!1):Object(s.g)(e)?g(t,{},e,!1,!1):Object(s.e)(e)?_(t,{},e,!1,!1):Object(s.d)(e)?((n={}).xmin=h(i=t,(r=e).xmin),n.ymin=u(i,r.ymin),n.xmax=h(i,r.xmax),n.ymax=u(i,r.ymax),n):null:null;var i,n,r}function y(t,e,i,s,o){return e.points=function(t,e,i,s){return f(t,i?s?a:r:s?r:n,e)}(t,i.points,s,o),e}function I(t,e,i,s,n){return e.x=l(t,i.x),e.y=d(t,i.y),e!==i&&(s&&(e.z=i.z),n&&(e.m=i.m)),e}function M(t,e,i,s,o){return e.rings=function(t,e,i,s){return m(t,i?s?a:r:s?r:n,e)}(t,i.rings,s,o),e}function S(t,e,i,s,o){return e.paths=function(t,e,i,s){return m(t,i?s?a:r:s?r:n,e)}(t,i.paths,s,o),e}},HsO1:function(t,e,i){"use strict";i.d(e,"a",function(){return d}),i.d(e,"b",function(){return _}),i.d(e,"c",function(){return g});var s=i("9MzC"),n=i("f4Nx"),r=i("l4ZG"),a=i("gYg2"),o=i("1kEK");const h=[0,0];function u(t,e){if(!e)return null;if("x"in e){const i={x:0,y:0};return[i.x,i.y]=t(e.x,e.y,h),null!=e.z&&(i.z=e.z),null!=e.m&&(i.m=e.m),i}if("xmin"in e){const i={xmin:0,ymin:0,xmax:0,ymax:0};return[i.xmin,i.ymin]=t(e.xmin,e.ymin,h),[i.xmax,i.ymax]=t(e.xmax,e.ymax,h),e.hasZ&&(i.zmin=e.zmin,i.zmax=e.zmax,i.hasZ=!0),e.hasM&&(i.mmin=e.mmin,i.mmax=e.mmax,i.hasM=!0),i}return"rings"in e?{rings:c(e.rings,t),hasM:e.hasM,hasZ:e.hasZ}:"paths"in e?{paths:c(e.paths,t),hasM:e.hasM,hasZ:e.hasZ}:"points"in e?{points:l(e.points,t),hasM:e.hasM,hasZ:e.hasZ}:void 0}function c(t,e){const i=[];for(const s of t)i.push(l(s,e));return i}function l(t,e){const i=[];for(const s of t){const t=e(s[0],s[1],[0,0]);i.push(t),s.length>2&&t.push(s[2]),s.length>3&&t.push(s[3])}return i}async function d(t,e){if(!e)return;const i=Array.isArray(t)?t.map(t=>{var e;return null==(e=t.geometry)?void 0:e.spatialReference}):[t];await Object(a.b)(i.map(t=>({source:t,dest:e})))}const f=u.bind(null,r.c),m=u.bind(null,r.f);function _(t,e,i){return t?(i||(i=e,e=t.spatialReference),Object(n.i)(e)&&Object(n.i)(i)&&!Object(n.c)(e,i)?Object(r.a)(e,i)?Object(n.m)(i)?f(t):m(t):Object(a.h)(o.a,[t],e,i,null)[0]:t):t}const p=new class{constructor(){this._jobs=[],this._timer=null,this._process=this._process.bind(this)}async push(t,e,i){!t||!t.length||!e||!i||Object(n.c)(e,i);const r={geometries:t,inSpatialReference:e,outSpatialReference:i,resolve:null};return this._jobs.push(r),Object(s.c)(t=>{r.resolve=t,null===this._timer&&(this._timer=setTimeout(this._process,10))})}_process(){this._timer=null;const t=this._jobs.shift();if(!t)return;const{geometries:e,inSpatialReference:i,outSpatialReference:s,resolve:h}=t;Object(r.a)(i,s)?Object(n.m)(s)?h(e.map(f)):h(e.map(m)):h(Object(a.h)(o.a,e,i,s,null)),this._jobs.length>0&&(this._timer=setTimeout(this._process,10))}};async function g(t,e,i){return p.push(t,e,i)}},NIRN:function(t,e,i){"use strict";i.d(e,"a",function(){return h});var s=i("6S2I"),n=i("zlDU"),r=i("yE7X"),a=i("yN2G");const o=s.a.getLogger("esri.views.2d.engine.webgl");function h(t){return Object(a.n)(t.minDataValue)&&Object(a.n)(t.maxDataValue)&&null!=t.minSize&&null!=t.maxSize?r.e.SIZE_MINMAX_VALUE:(t.expression&&"view.scale"===t.expression||t.valueExpression&&"$view.scale"===t.valueExpression)&&Array.isArray(t.stops)?r.e.SIZE_SCALE_STOPS:(null!=t.field||t.expression&&"view.scale"!==t.expression||t.valueExpression&&"$view.scale"!==t.valueExpression)&&(Array.isArray(t.stops)||"levels"in t&&t.levels)?r.e.SIZE_FIELD_STOPS:(null!=t.field||t.expression&&"view.scale"!==t.expression||t.valueExpression&&"$view.scale"!==t.valueExpression)&&null!=t.valueUnit?r.e.SIZE_UNIT_VALUE:(o.error(new n.a("mapview-bad-type","Found invalid size VisualVariable",t)),r.e.NONE)}},Q0oN:function(t,e,i){"use strict";i.d(e,"a",function(){return r});var s=i("ZlUD"),n=i("8NDJ");class r extends n.a{constructor(t,e,i){super(t),this._featureIndex=-1,this._dateFields=new Set,this._geometryType=i,this._features=e}static fromFeatures(t,e,i){const n=Object(s.c)([],t,e,!1,!1,i);for(let s=0;s<n.length;s++)n[s].displayId=t[s].displayId;return r.fromOptimizedFeatures(n,e)}static fromFeatureSet(t,e){const i=Object(s.b)(t,e);return r.fromOptimizedFeatureSet(i)}static fromOptimizedFeatureSet(t){const{features:e,geometryType:i}=t,s=r.fromOptimizedFeatures(e,i);s._exceededTransferLimit=t.exceededTransferLimit,s._transform=t.transform;for(const n of t.fields)"esriFieldTypeDate"===n.type&&s._dateFields.add(n.name);return s}static fromOptimizedFeatures(t,e,i){const s=n.a.createInstance(),a=new r(s,t,e);return a._transform=i,a}get _current(){return this._features[this._featureIndex]}get geometryType(){return this._geometryType}get hasFeatures(){return!!this._features.length}get hasNext(){return this._featureIndex+1<this._features.length}get exceededTransferLimit(){return this._exceededTransferLimit}get hasZ(){return!1}get hasM(){return!1}getApproximateSize(){return this._features.length}getCursor(){return this.copy()}getQuantizationTransform(){return this._transform}getAttributeHash(){let t="";for(const e in this._current.attributes)t+=this._current.attributes[e];return t}getIndex(){return this._featureIndex}setIndex(t){this._featureIndex=t}getObjectId(){return this._current.objectId}getDisplayId(){return this._current.displayId}setDisplayId(t){this._current.displayId=t}getGroupId(){return this._current.groupId}setGroupId(t){this._current.groupId=t}copy(){const t=new r(this.instance,this._features,this.geometryType);return this.copyInto(t),t}next(){if(!this._hasFilter)return++this._featureIndex<this._features.length;for(;++this._featureIndex<this._features.length&&!this._passesFilter(););return this._featureIndex<this._features.length}readLegacyFeature(){return Object(s.i)(this._current,this.geometryType,this.hasZ,this.hasM)}readOptimizedFeature(){return this._current}readLegacyPointGeometry(){const t=this.readGeometry();return t?{x:t.coords[0],y:t.coords[1]}:null}readLegacyGeometry(){const t=this.readGeometry();return Object(s.k)(t,this.geometryType,this.hasZ,this.hasM)}readLegacyCentroid(){const t=this.readCentroid();return t?{x:t.coords[0],y:t.coords[1]}:null}readGeometryArea(){return Object(s.s)(this._current.geometry,2)}readUnquantizedGeometry(){const t=this.readGeometry();if("esriGeometryPoint"===this.geometryType||!t)return t;const e=t.clone();return function({coords:t,lengths:e}){let i=0;for(const s of e){for(let e=1;e<s;e++)t[2*(i+e)]+=t[2*(i+e)-2],t[2*(i+e)+1]+=t[2*(i+e)-1];i+=s}}(e),e}readHydratedGeometry(){const t=this._current.geometry;if(!t)return null;const e=t.clone();return Object(s.y)(e,e,this.hasZ,this.hasM,this._transform),e}getXHydrate(){const t=this._current.geometry.coords[0]+this._tx,e=this.getQuantizationTransform();return t*e.scale[0]+e.translate[0]}getYHydrate(){const t=this._current.geometry.coords[1]+this._ty,e=this.getQuantizationTransform();return e.translate[1]-t*e.scale[1]}readGeometry(){if(!this._current.hasGeometry)return null;const t=this._current.geometry.clone();if(t.isPoint)return t.coords[0]+=this._tx,t.coords[1]+=this._ty,t;let e=0;for(const i of t.lengths)t.coords[2*e]+=this._tx,t.coords[2*e+1]+=this._ty,e+=i;return t}readCentroid(){if(!this._current.hasGeometry)return null;if(!this._current.centroid){const t=this._computeCentroid();if(!t)return null;t.coords[0]-=this._tx,t.coords[1]-=this._ty,this._current.centroid=t}const t=this._current.centroid.clone();return t.coords[0]+=this._tx,t.coords[1]+=this._ty,t}_readAttribute(t,e){const i=this._current.attributes[t];if(void 0!==i)return e&&this._dateFields.has(t)?new Date(i):i;const s=this.readAttributes(),n=t.toLocaleLowerCase().trim();for(const r in s)if(r.toLocaleLowerCase().trim()===n){const t=this._current.attributes[r];return this._dateFields.has(r)?new Date(t):t}}copyInto(t){super.copyInto(t),t._featureIndex=this._featureIndex,t._transform=this._transform,t._dateFields=this._dateFields}_readAttributes(){return this._current.attributes}_passesFilter(){if(!this._hasFilter)return!0;let t=0,e=0;switch(this.geometryType){case"esriGeometryPoint":{const i=this._current.geometry;if(!i)return!1;[t,e]=i.coords;break}case"esriGeometryPolygon":{const i=this.readCentroid();if(!i)return!1;[t,e]=i.coords,t-=this._tx,e-=this._ty;break}default:return!1}return t>=this._xmin&&t<=this._xmax&&e>=this._ymin&&e<=this._ymax}}},RjdO:function(t,e,i){"use strict";i.d(e,"a",function(){return n});var s=i("X2wA"),n=Object(s.b)(function(t){var e;void 0!==(e=function(){function t(i,s,n,r,a){for(;r>n;){if(r-n>600){var o=r-n+1,h=s-n+1,u=Math.log(o),c=.5*Math.exp(2*u/3),l=.5*Math.sqrt(u*c*(o-c)/o)*(h-o/2<0?-1:1);t(i,s,Math.max(n,Math.floor(s-h*c/o+l)),Math.min(r,Math.floor(s+(o-h)*c/o+l)),a)}var d=i[s],f=n,m=r;for(e(i,n,s),a(i[r],d)>0&&e(i,n,r);f<m;){for(e(i,f,m),f++,m--;a(i[f],d)<0;)f++;for(;a(i[m],d)>0;)m--}0===a(i[n],d)?e(i,n,m):e(i,++m,r),m<=s&&(n=m+1),s<=m&&(r=m-1)}}function e(t,e,i){var s=t[e];t[e]=t[i],t[i]=s}function i(t,e){return t<e?-1:t>e?1:0}return function(e,s,n,r,a){t(e,s,n||0,r||e.length-1,a||i)}}())&&(t.exports=e)})},Swtj:function(t,e,i){"use strict";i.d(e,"a",function(){return a});class s{constructor(){this._freeIds=[],this._idCounter=1}createId(t=!1){return function(t,e){return((e?2147483648:0)|t)>>>0}(this._getFreeId(),t)}releaseId(t){this._freeIds.push(t)}_getFreeId(){return this._freeIds.length?this._freeIds.pop():this._idCounter++}}class n{constructor(t,e){this._mask=0,this._buf=t,this._mask=e}static fromBuffer(t,e){return new n(t,e)}static create(t,e=4294967295){const i=new Uint32Array(Math.ceil(t/32));return new n(i,e)}_getIndex(t){return Math.floor(t/32)}has(t){const e=this._mask&t;return!!(this._buf[this._getIndex(e)]&1<<e%32)}set(t){const e=this._mask&t,i=this._getIndex(e);this._buf[i]|=1<<e%32}unset(t){const e=this._mask&t,i=this._getIndex(e);this._buf[i]&=4294967295^1<<e%32}resize(t){const e=this._buf,i=new Uint32Array(Math.ceil(t/32));i.set(e),this._buf=i}or(t){for(let e=0;e<this._buf.length;e++)this._buf[e]|=t._buf[e];return this}and(t){for(let e=0;e<this._buf.length;e++)this._buf[e]&=t._buf[e];return this}xor(t){for(let e=0;e<this._buf.length;e++)this._buf[e]^=t._buf[e];return this}ior(t){for(let e=0;e<this._buf.length;e++)this._buf[e]|=~t._buf[e];return this}iand(t){for(let e=0;e<this._buf.length;e++)this._buf[e]&=~t._buf[e];return this}ixor(t){for(let e=0;e<this._buf.length;e++)this._buf[e]^=~t._buf[e];return this}any(){for(let t=0;t<this._buf.length;t++)if(this._buf[t])return!0;return!1}copy(t){for(let e=0;e<this._buf.length;e++)this._buf[e]=t._buf[e];return this}clone(){return new n(this._buf.slice(),this._mask)}clear(){for(let t=0;t<this._buf.length;t++)this._buf[t]=0}forEachSet(t){for(let e=0;e<this._buf.length;e++){let i=this._buf[e],s=32*e;if(i)for(;i;)1&i&&t(s),i>>>=1,s++}}countSet(){let t=0;return this.forEachSet(e=>{t++}),t}}function r(t,e,i){if(!(t.length>e))for(;t.length<=e;)t.push(i)}class a{constructor(){this._numerics=[],this._strings=[],this._idGenerator=new s,this._allocatedSize=256,this._bitsets=[],this._instanceIds=[],this._bounds=[]}createBitset(){const t=this._bitsets.length;return this._bitsets.push(n.create(this._allocatedSize,2147483647)),t+1}getBitset(t){return this._bitsets[t-1]}_expand(){this._allocatedSize<<=1;for(const t of this._bitsets)t.resize(this._allocatedSize)}_ensureNumeric(t,e){this._numerics[t]||(this._numerics[t]=[]),r(this._numerics[t],e,0)}_ensureInstanceId(t){r(this._instanceIds,t,0)}_ensureString(t,e){this._strings[t]||(this._strings[t]=[]),r(this._strings[t],e,null)}createDisplayId(t=!1){const e=this._idGenerator.createId();return e>this._allocatedSize&&this._expand(),((t,e)=>((e?2147483648:0)|t)>>>0)(e,t)}releaseDisplayId(t){for(const e of this._bitsets)e.unset(t);return this._idGenerator.releaseId(2147483647&t)}getComputedNumeric(t,e){return this.getComputedNumericAtIndex(2147483647&t,0)}setComputedNumeric(t,e,i){return this.setComputedNumericAtIndex(2147483647&t,i,0)}getComputedString(t,e){return this.getComputedStringAtIndex(2147483647&t,0)}setComputedString(t,e,i){return this.setComputedStringAtIndex(2147483647&t,0,i)}getComputedNumericAtIndex(t,e){const i=2147483647&t;return this._ensureNumeric(e,i),this._numerics[e][i]}setComputedNumericAtIndex(t,e,i){const s=2147483647&t;this._ensureNumeric(e,s),this._numerics[e][s]=i}getInstanceId(t){const e=2147483647&t;return this._ensureInstanceId(e),this._instanceIds[e]}setInstanceId(t,e){const i=2147483647&t;this._ensureInstanceId(i),this._instanceIds[i]=e}getComputedStringAtIndex(t,e){const i=2147483647&t;return this._ensureString(e,i),this._strings[e][i]}setComputedStringAtIndex(t,e,i){const s=2147483647&t;this._ensureString(e,s),this._strings[e][s]=i}getXMin(t){return this._bounds[4*(2147483647&t)]}getYMin(t){return this._bounds[4*(2147483647&t)+1]}getXMax(t){return this._bounds[4*(2147483647&t)+2]}getYMax(t){return this._bounds[4*(2147483647&t)+3]}setBounds(t,e){const i=e.readHydratedGeometry();if(!i||!i.coords.length)return!1;let s=1/0,n=1/0,a=-1/0,o=-1/0;i.forEachVertex((t,e)=>{s=Math.min(s,t),n=Math.min(n,e),a=Math.max(a,t),o=Math.max(o,e)});const h=2147483647&t;return r(this._bounds,4*h+4,0),this._bounds[4*h]=s,this._bounds[4*h+1]=n,this._bounds[4*h+2]=a,this._bounds[4*h+3]=o,!0}}},"kB+0":function(t,e,i){"use strict";i.d(e,"a",function(){return n});var s=i("RjdO");function n(t,e){if(!(this instanceof n))return new n(t,e);this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),e&&("function"==typeof e?this.toBBox=e:this._initFormat(e)),this.clear()}function r(t,e,i){if(!i)return e.indexOf(t);for(var s=0;s<e.length;s++)if(i(t,e[s]))return s;return-1}function a(t,e){o(t,0,t.children.length,e,t)}function o(t,e,i,s,n){n||(n=_(null)),n.minX=1/0,n.minY=1/0,n.maxX=-1/0,n.maxY=-1/0;for(var r,a=e;a<i;a++)r=t.children[a],h(n,t.leaf?s(r):r);return n}function h(t,e){return t.minX=Math.min(t.minX,e.minX),t.minY=Math.min(t.minY,e.minY),t.maxX=Math.max(t.maxX,e.maxX),t.maxY=Math.max(t.maxY,e.maxY),t}function u(t,e){return t.minX-e.minX}function c(t,e){return t.minY-e.minY}function l(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function d(t){return t.maxX-t.minX+(t.maxY-t.minY)}function f(t,e){return t.minX<=e.minX&&t.minY<=e.minY&&e.maxX<=t.maxX&&e.maxY<=t.maxY}function m(t,e){return e.minX<=t.maxX&&e.minY<=t.maxY&&e.maxX>=t.minX&&e.maxY>=t.minY}function _(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function p(t,e,i,n,r){for(var a,o=[e,i];o.length;)(i=o.pop())-(e=o.pop())<=n||(a=e+Math.ceil((i-e)/n/2)*n,Object(s.a)(t,a,e,i,r),o.push(e,a,a,i))}n.prototype={all:function(){return this._all(this.data,[])},search:function(t){var e=this.data,i=[],s=this.toBBox;if(!m(t,e))return i;for(var n,r,a,o,h=[];e;){for(n=0,r=e.children.length;n<r;n++)a=e.children[n],m(t,o=e.leaf?s(a):a)&&(e.leaf?i.push(a):f(t,o)?this._all(a,i):h.push(a));e=h.pop()}return i},collides:function(t){var e=this.data,i=this.toBBox;if(!m(t,e))return!1;for(var s,n,r,a,o=[];e;){for(s=0,n=e.children.length;s<n;s++)if(r=e.children[s],m(t,a=e.leaf?i(r):r)){if(e.leaf||f(t,a))return!0;o.push(r)}e=o.pop()}return!1},load:function(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(var e=0,i=t.length;e<i;e++)this.insert(t[e]);return this}var s=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===s.height)this._splitRoot(this.data,s);else{if(this.data.height<s.height){var n=this.data;this.data=s,s=n}this._insert(s,this.data.height-s.height-1,!0)}else this.data=s;return this},insert:function(t){return t&&this._insert(t,this.data.height-1),this},clear:function(){return this.data=_([]),this},remove:function(t,e){if(!t)return this;for(var i,s,n,a,o=this.data,h=this.toBBox(t),u=[],c=[];o||u.length;){if(o||(o=u.pop(),s=u[u.length-1],i=c.pop(),a=!0),o.leaf&&-1!==(n=r(t,o.children,e)))return o.children.splice(n,1),u.push(o),this._condense(u),this;a||o.leaf||!f(o,h)?s?(i++,o=s.children[i],a=!1):o=null:(u.push(o),c.push(i),i=0,s=o,o=o.children[0])}return this},toBBox:function(t){return t},compareMinX:u,compareMinY:c,toJSON:function(){return this.data},fromJSON:function(t){return this.data=t,this},_all:function(t,e){for(var i=[];t;)t.leaf?e.push.apply(e,t.children):i.push.apply(i,t.children),t=i.pop();return e},_build:function(t,e,i,s){var n,r=i-e+1,o=this._maxEntries;if(r<=o)return a(n=_(t.slice(e,i+1)),this.toBBox),n;s||(s=Math.ceil(Math.log(r)/Math.log(o)),o=Math.ceil(r/Math.pow(o,s-1))),(n=_([])).leaf=!1,n.height=s;var h,u,c,l,d=Math.ceil(r/o),f=d*Math.ceil(Math.sqrt(o));for(p(t,e,i,f,this.compareMinX),h=e;h<=i;h+=f)for(p(t,h,c=Math.min(h+f-1,i),d,this.compareMinY),u=h;u<=c;u+=d)l=Math.min(u+d-1,c),n.children.push(this._build(t,u,l,s-1));return a(n,this.toBBox),n},_chooseSubtree:function(t,e,i,s){for(var n,r,a,o,h,u,c,d,f,m;s.push(e),!e.leaf&&s.length-1!==i;){for(c=d=1/0,n=0,r=e.children.length;n<r;n++)h=l(a=e.children[n]),f=t,m=a,(u=(Math.max(m.maxX,f.maxX)-Math.min(m.minX,f.minX))*(Math.max(m.maxY,f.maxY)-Math.min(m.minY,f.minY))-h)<d?(d=u,c=h<c?h:c,o=a):u===d&&h<c&&(c=h,o=a);e=o||e.children[0]}return e},_insert:function(t,e,i){var s=i?t:(0,this.toBBox)(t),n=[],r=this._chooseSubtree(s,this.data,e,n);for(r.children.push(t),h(r,s);e>=0&&n[e].children.length>this._maxEntries;)this._split(n,e),e--;this._adjustParentBBoxes(s,n,e)},_split:function(t,e){var i=t[e],s=i.children.length,n=this._minEntries;this._chooseSplitAxis(i,n,s);var r=this._chooseSplitIndex(i,n,s),o=_(i.children.splice(r,i.children.length-r));o.height=i.height,o.leaf=i.leaf,a(i,this.toBBox),a(o,this.toBBox),e?t[e-1].children.push(o):this._splitRoot(i,o)},_splitRoot:function(t,e){this.data=_([t,e]),this.data.height=t.height+1,this.data.leaf=!1,a(this.data,this.toBBox)},_chooseSplitIndex:function(t,e,i){var s,n,r,a,h,u,c,d,f,m,_,p,g,x;for(u=c=1/0,s=e;s<=i-e;s++)f=n=o(t,0,s,this.toBBox),m=r=o(t,s,i,this.toBBox),_=Math.max(f.minX,m.minX),p=Math.max(f.minY,m.minY),g=Math.min(f.maxX,m.maxX),x=Math.min(f.maxY,m.maxY),a=Math.max(0,g-_)*Math.max(0,x-p),h=l(n)+l(r),a<u?(u=a,d=s,c=h<c?h:c):a===u&&h<c&&(c=h,d=s);return d},_chooseSplitAxis:function(t,e,i){var s=t.leaf?this.compareMinX:u,n=t.leaf?this.compareMinY:c;this._allDistMargin(t,e,i,s)<this._allDistMargin(t,e,i,n)&&t.children.sort(s)},_allDistMargin:function(t,e,i,s){t.children.sort(s);var n,r,a=this.toBBox,u=o(t,0,e,a),c=o(t,i-e,i,a),l=d(u)+d(c);for(n=e;n<i-e;n++)r=t.children[n],h(u,t.leaf?a(r):r),l+=d(u);for(n=i-e-1;n>=e;n--)r=t.children[n],h(c,t.leaf?a(r):r),l+=d(c);return l},_adjustParentBBoxes:function(t,e,i){for(var s=i;s>=0;s--)h(e[s],t)},_condense:function(t){for(var e,i=t.length-1;i>=0;i--)0===t[i].children.length?i>0?(e=t[i-1].children).splice(e.indexOf(t[i]),1):this.clear():a(t[i],this.toBBox)},_initFormat:function(t){var e=["return a"," - b",";"];this.compareMinX=new Function("a","b",e.join(t[0])),this.compareMinY=new Function("a","b",e.join(t[1])),this.toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")}}},w5u1:function(t,e,i){"use strict";var s=i("wSAH"),n=i("zm0L"),r=i("rlSK"),a=i("umoc"),o=i("kB+0"),h=i("7g5W");const u={added:[],removed:[]},c=new Set,l=new r.a(0,0,0,0);e.a=class extends n.a{constructor(t){super(),this._tiles=new Map,this._index=Object(o.a)(9,Object(s.a)("csp-restrictions")?t=>({minX:t.bounds[0],minY:t.bounds[1],maxX:t.bounds[2],maxY:t.bounds[3]}):[".bounds[0]",".bounds[1]",".bounds[2]",".bounds[3]"]),this.tiles=[],this.tileScheme=t}destroy(){this.clear()}clear(){this.tiles.length=0,this._tiles.clear(),this._index.clear()}has(t){return this._tiles.has(t)}get(t){return this._tiles.get(t)}findByKey(t){return this._tiles.get(t.id)}intersections(t,e){const i="string"==typeof t?this.get(t):t;if(!i)return[];const s=e*i.resolution,n=i.bounds[0]-s,r=i.bounds[1]-s,a=i.bounds[2]+s,o=i.bounds[3]+s,h=[];for(const u of this._index.search({minX:n,minY:r,maxX:a,maxY:o})){const t=u.bounds.slice();t[0]=Math.max(t[0],n),t[1]=Math.max(t[1],r),t[2]=Math.min(t[2],a),t[3]=Math.min(t[3],o),t[2]-t[0]>0&&t[3]-t[1]>0&&h.push({bounds:t,tile:u})}return h}boundsIntersections(t){return this._index.search({minX:t[0],minY:t[1],maxX:t[2],maxY:t[3]})}updateTiles(t){const e={added:[],removed:[]};for(const i of t.added)if(!this.has(i)){const t=new h.a(this.tileScheme,i);this._tiles.set(i,t),this._index.insert(t),e.added.push(t)}for(const i of t.removed)if(this.has(i)){const t=this.get(i);this._tiles.delete(i),this._index.remove(t),e.removed.push(t)}this.tiles.length=0,this._tiles.forEach(t=>this.tiles.push(t)),(e.added.length||e.removed.length)&&this.emit("update",e)}setViewState(t){const e=this.tileScheme.getTileCoverage(t,0);if(!e)return;const{spans:i,lodInfo:s}=e,{level:n}=s;if(i.length>0)for(const{row:r,colFrom:a,colTo:o}of i)for(let t=a;t<=o;t++){const e=l.set(n,r,s.normalizeCol(t),s.getWorldForColumn(t)).id;if(c.add(e),!this.has(e)){const t=new h.a(this.tileScheme,e);this._tiles.set(e,t),this._index.insert(t),this.tiles.push(t),u.added.push(t)}}for(let r=this.tiles.length-1;r>=0;r--){const t=this.tiles[r];c.has(t.id)||(this._tiles.delete(t.id),this.tiles.splice(r,1),this._index.remove(t),u.removed.push(t))}(u.added.length||u.removed.length)&&this.emit("update",u),a.a.pool.release(e),c.clear(),u.added.length=0,u.removed.length=0}}}}]);