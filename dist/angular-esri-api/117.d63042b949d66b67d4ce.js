(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{CBYW:function(e,t,n){"use strict";n.r(t),n.d(t,"registerFunctions",function(){return A});var r=n("9MzC"),a=n("idrm"),i=n("D5C5"),l=n("Xfxc"),s=n("ofM5"),o=n("hTzF"),c=n("Xrjs"),u=n("kqd7"),f=n("lNzE"),d=n("ZqIb"),b=n("B8fU"),m=n("nC36"),p=n("LK1Z"),y=n("lq8Q"),O=n("Xbkg"),g=n("GN9X"),h=n("YP08"),j=n("W9Wu"),F=n("OAJp"),I=n("4zW0");function E(e,t,n){const a=e.getVariables();if(a.length>0){const i=[];for(let e=0;e<a.length;e++)i.push(t.evaluateIdentifier(n,{name:a[e]}));return Object(r.b)(i).then(t=>{const n={};for(let e=0;e<a.length;e++)n[a[e]]=t[e];return e.parameters=n,e})}return Object(r.u)(e)}function w(e,t,n=null){for(const r in e)if(r.toLowerCase()===t.toLowerCase())return e[r];return n}function D(e){if(null===e)return null;const t={type:w(e,"type",""),name:w(e,"name","")};if("range"===t.type)t.range=w(e,"range",[]);else{t.codedValues=[];for(const n of w(e,"codedValues",[]))t.codedValues.push({name:w(n,"name",""),code:w(n,"code",null)})}return t}function N(e){if(null===e)return null;const t={},n=w(e,"wkt",null);null!==n&&(t.wkt=n);const r=w(e,"wkid",null);return null!==r&&(t.wkid=r),t}function x(e){if(null===e)return null;const t={hasZ:w(e,"hasz",!1),hasM:w(e,"hasm",!1)},n=w(e,"spatialreference",null);n&&(t.spatialReference=N(n));const r=w(e,"x",null);if(null!==r)return t.x=r,t.y=w(e,"y",null),t;const a=w(e,"rings",null);if(null!==a)return t.rings=a,t;const i=w(e,"paths",null);if(null!==i)return t.paths=i,t;const l=w(e,"points",null);if(null!==l)return t.points=l,t;for(const s of["xmin","xmax","ymin","ymax","zmin","zmax","mmin","mmax"]){const n=w(e,s,null);null!==n&&(t[s]=n)}return t}function A(e){"async"===e.mode&&(e.functions.getuser=function(t,n){return e.standardFunctionAsync(t,n,(e,n,r)=>{Object(a.J)(r,1,2);let s=Object(a.c)(r[1],""),o=!0===s;if(s=!0===s||!1===s?"":Object(a.y)(s),r[0]instanceof l.a){let e=null;return t.services&&t.services.portal&&(e=t.services.portal),e=Object(I.getPortal)(r[0],e),Object(I.lookupUser)(e,s,o).then(e=>{if(e){const t=JSON.parse(JSON.stringify(e));for(const e of["lastLogin","created","modified"])null!=t[e]&&(t[e]=new Date(t[e]));return i.a.convertObjectToArcadeDictionary(t)}return null})}let c=null;if(Object(a.T)(r[0])&&(c=r[0]),c)return o=!1,s?null:c.load().then(()=>c.getOwningSystemUrl()).then(e=>{if(!e)return s?null:c.getIdentityUser().then(e=>e?i.a.convertObjectToArcadeDictionary({username:e}):null);let n=null;return t.services&&t.services.portal&&(n=t.services.portal),n=Object(I.getPortal)(new l.a(e),n),Object(I.lookupUser)(n,s,o).then(e=>{if(e){const t=JSON.parse(JSON.stringify(e));for(const e of["lastLogin","created","modified"])null!=t[e]&&(t[e]=new Date(t[e]));return i.a.convertObjectToArcadeDictionary(t)}return null})});throw new Error("Invalid Parameter")})},e.signatures.push({name:"getuser",min:"1",max:"2"}),e.functions.featuresetbyid=function(t,n){return e.standardFunctionAsync(t,n,(e,t,n)=>{if(Object(a.J)(n,2,4),n[0]instanceof f.a){const e=Object(a.y)(n[1]);let t=Object(a.c)(n[2],null);const r=Object(a.x)(Object(a.c)(n[3],!0));if(null===t&&(t=["*"]),!1===Object(a.B)(t))throw new Error("Invalid Parameter");return n[0].featureSetById(e,r,t)}throw new Error("Invalid Parameter")})},e.signatures.push({name:"featuresetbyid",min:"2",max:"4"}),e.functions.featuresetbyportalitem=function(t,n){return e.standardFunctionAsync(t,n,(e,n,r)=>{if(Object(a.J)(r,2,5),null===r[0])throw new Error("Portal is required");if(r[0]instanceof l.a){const e=Object(a.y)(r[1]),n=Object(a.y)(r[2]);let i=Object(a.c)(r[3],null);const l=Object(a.x)(Object(a.c)(r[4],!0));if(null===i&&(i=["*"]),!1===Object(a.B)(i))throw new Error("Invalid Parameter");let s=null;return t.services&&t.services.portal&&(s=t.services.portal),s=Object(I.getPortal)(r[0],s),Object(I.constructFeatureSetFromPortalItem)(e,n,t.spatialReference,i,l,s,t.lrucache)}if(!1===Object(a.v)(r[0]))throw new Error("Portal is required");const i=Object(a.y)(r[0]),s=Object(a.y)(r[1]);let o=Object(a.c)(r[2],null);const c=Object(a.x)(Object(a.c)(r[3],!0));if(null===o&&(o=["*"]),!1===Object(a.B)(o))throw new Error("Invalid Parameter");if(t.services&&t.services.portal)return Object(I.constructFeatureSetFromPortalItem)(i,s,t.spatialReference,o,c,t.services.portal,t.lrucache);throw new Error("Portal is required")})},e.signatures.push({name:"featuresetbyportalitem",min:"2",max:"5"}),e.functions.featuresetbyname=function(t,n){return e.standardFunctionAsync(t,n,(e,t,n)=>{if(Object(a.J)(n,2,4),n[0]instanceof f.a){const e=Object(a.y)(n[1]);let t=Object(a.c)(n[2],null);const r=Object(a.x)(Object(a.c)(n[3],!0));if(null===t&&(t=["*"]),!1===Object(a.B)(t))throw new Error("Invalid Parameter");return n[0].featureSetByName(e,r,t)}throw new Error("Invalid Parameter")})},e.signatures.push({name:"featuresetbyname",min:"2",max:"4"}),e.functions.featureset=function(t,n){return e.standardFunction(t,n,(e,n,r)=>{Object(a.J)(r,1,1);let l=r[0];const s={layerDefinition:{geometryType:"",objectIdField:"",globalIdField:"",typeIdField:"",fields:[]},featureSet:{geometryType:"",features:[]}};if(Object(a.v)(l))l=JSON.parse(l),void 0!==l.layerDefinition?(s.layerDefinition=l.layerDefinition,s.featureSet=l.featureSet,l.layerDefinition.spatialReference&&(s.layerDefinition.spatialReference=l.layerDefinition.spatialReference)):(s.featureSet.features=l.features,s.featureSet.geometryType=l.geometryType,s.layerDefinition.geometryType=s.featureSet.geometryType,s.layerDefinition.objectIdField=l.objectIdFieldName,s.layerDefinition.typeIdField=l.typeIdFieldName,s.layerDefinition.globalIdField=l.globalIdFieldName,s.layerDefinition.fields=l.fields,l.spatialReference&&(s.layerDefinition.spatialReference=l.spatialReference));else{if(!(r[0]instanceof i.a))throw new Error("Invalid Parameter");{l=JSON.parse(r[0].castToText());const e=w(l,"layerdefinition");if(null!==e){s.layerDefinition.geometryType=w(e,"geometrytype",""),s.featureSet.geometryType=s.layerDefinition.geometryType,s.layerDefinition.globalIdField=w(e,"globalidfield",""),s.layerDefinition.objectIdField=w(e,"objectidfield",""),s.layerDefinition.typeIdField=w(e,"typeidfield","");const t=w(e,"spatialreference",null);t&&(s.layerDefinition.spatialReference=N(t));for(const r of w(e,"fields",[])){const e={name:w(r,"name",""),alias:w(r,"alias",""),type:w(r,"type",""),nullable:w(r,"nullable",!0),editable:w(r,"editable",!0),length:w(r,"length",null),domain:D(w(r,"domain"))};s.layerDefinition.fields.push(e)}const n=w(l,"featureset",null);if(n){const e={};for(const t of s.layerDefinition.fields)e[t.name.toLowerCase()]=t.name;for(const t of w(n,"features",[])){const n={},r=w(t,"attributes",{});for(const t in r)n[e[t.toLowerCase()]]=r[t];s.featureSet.features.push({attributes:n,geometry:x(w(t,"geometry",null))})}}}else{s.layerDefinition.geometryType=w(l,"geometrytype",""),s.featureSet.geometryType=s.layerDefinition.geometryType,s.layerDefinition.objectIdField=w(l,"objectidfieldname",""),s.layerDefinition.typeIdField=w(l,"typeidfieldname","");const e=w(l,"spatialreference",null);e&&(s.layerDefinition.spatialReference=N(e));for(const n of w(l,"fields",[])){const e={name:w(n,"name",""),alias:w(n,"alias",""),type:w(n,"type",""),nullable:w(n,"nullable",!0),editable:w(n,"editable",!0),length:w(n,"length",null),domain:D(w(n,"domain"))};s.layerDefinition.fields.push(e)}const t={};for(const n of s.layerDefinition.fields)t[n.name.toLowerCase()]=n.name;for(const n of w(l,"features",[])){const e={},r=w(n,"attributes",{});for(const n in r)e[t[n.toLowerCase()]]=r[n];s.featureSet.features.push({attributes:e,geometry:x(w(n,"geometry",null))})}}}}if(0==(!!(o=s).layerDefinition&&!!o.featureSet&&!1!==function(e,t){for(const n of["","esriGeometryPoint","esriGeometryPolyline","esriGeometryPolygon","esriGeometryMultipoint","esriGeometryEnvelope"])if(n===e)return!0;return!1}(o.layerDefinition.geometryType)&&null!==o.layerDefinition.objectIdField&&""!==o.layerDefinition.objectIdField&&!1!==Object(a.B)(o.layerDefinition.fields)&&!1!==Object(a.B)(o.featureSet.features)))throw new Error("Invalid Parameter");var o;return F.a.create(s,t.spatialReference)})},e.signatures.push({name:"featureset",min:"1",max:"1"}),e.functions.filter=function(t,n){return e.standardFunctionAsync(t,n,(n,i,l)=>(Object(a.J)(l,2,2),Object(a.T)(l[0])?l[0].load().then(n=>{const a=d.WhereClause.create(l[1],n.getFieldsIndex()),i=a.getVariables();if(i.length>0){const n=[];for(let r=0;r<i.length;r++)n.push(e.evaluateIdentifier(t,{name:i[r]}));return Object(r.b)(n).then(e=>{const t={};for(let n=0;n<i.length;n++)t[i[n]]=e[n];return a.parameters=t,new m.a({parentfeatureset:l[0],whereclause:a})})}return Object(r.u)(new m.a({parentfeatureset:l[0],whereclause:a}))}):e.failDefferred("Filter cannot accept this parameter type")))},e.signatures.push({name:"filter",min:"2",max:"2"}),e.functions.orderby=function(t,n){return e.standardFunctionAsync(t,n,(t,n,i)=>{if(Object(a.J)(i,2,2),Object(a.T)(i[0])){const e=new y.a(i[1]);return Object(r.u)(new O.a({parentfeatureset:i[0],orderbyclause:e}))}return e.failDefferred("Order cannot accept this parameter type")})},e.signatures.push({name:"orderby",min:"2",max:"2"}),e.functions.top=function(t,n){return e.standardFunctionAsync(t,n,(t,n,i)=>(Object(a.J)(i,2,2),Object(a.T)(i[0])?Object(r.u)(new h.a({parentfeatureset:i[0],topnum:i[1]})):Object(a.B)(i[0])?Object(a.w)(i[1])>=i[0].length?i[0].slice(0):i[0].slice(0,Object(a.w)(i[1])):Object(a.I)(i[0])?Object(a.w)(i[1])>=i[0].length()?i[0].slice(0):i[0].slice(0,Object(a.w)(i[1])):e.failDefferred("Top cannot accept this parameter type")))},e.signatures.push({name:"top",min:"2",max:"2"}),e.functions.first=function(t,n){return e.standardFunctionAsync(t,n,(e,t,n)=>(Object(a.J)(n,1,1),Object(a.T)(n[0])?n[0].first(e.abortSignal).then(e=>{if(null!==e){const t=c.a.createFromGraphicLikeObject(e.geometry,e.attributes,n[0]);t._underlyingGraphic=e,e=t}return e}):Object(a.B)(n[0])?0===n[0].length?Object(r.u)(null):Object(r.u)(n[0][0]):Object(a.I)(n[0])?0===n[0].length()?Object(r.u)(null):Object(r.u)(n[0].get(0)):null))},e.signatures.push({name:"first",min:"1",max:"1"}),e.functions.attachments=function(t,n){return e.standardFunctionAsync(t,n,(e,n,r)=>{Object(a.J)(r,1,2);const l={minsize:-1,maxsize:-1,types:null};if(r.length>1)if(r[1]instanceof i.a){if(r[1].hasField("minsize")&&(l.minsize=Object(a.w)(r[1].field("minsize"))),r[1].hasField("maxsize")&&(l.maxsize=Object(a.w)(r[1].field("maxsize"))),r[1].hasField("types")){const e=Object(a.t)(r[1].field("types"),!1);e.length>0&&(l.types=e)}}else if(null!==r[1])throw new Error("Invalid Parameter");if(r[0]instanceof c.a){let e=r[0]._layer;return e instanceof j.default&&(e=Object(I.constructFeatureSet)(e,t.spatialReference,["*"],!0,t.lrucache)),null===e||!1===Object(a.T)(e)?[]:e.load().then(()=>e.queryAttachments(r[0].field(e.objectIdField),l.minsize,l.maxsize,l.types))}if(null===r[0])return[];throw new Error("Invalid Parameter")})},e.signatures.push({name:"attachments",min:"1",max:"2"}),e.functions.featuresetbyrelationshipname=function(t,n){return e.standardFunctionAsync(t,n,(e,n,r)=>{Object(a.J)(r,2,4);const i=r[0],l=Object(a.y)(r[1]);let s=Object(a.c)(r[2],null);const o=Object(a.x)(Object(a.c)(r[3],!0));if(null===s&&(s=["*"]),!1===Object(a.B)(s))throw new Error("Invalid Parameter");if(null===r[0])return null;if(!(r[0]instanceof c.a))throw new Error("Invalid Parameter");let u=i._layer;return u instanceof j.default&&(u=Object(I.constructFeatureSet)(u,t.spatialReference,["*"],!0,t.lrucache)),null===u||!1===Object(a.T)(u)?null:u.load().then(e=>{const n=e.relationshipMetaData().filter(e=>e.name===l);if(0===n.length)return null;if(null!=n[0].relationshipTableId&&n[0].relationshipTableId>-1)return Object(I.constructFeatureSetFromRelationship)(e,n[0],i.field(e.objectIdField),e.spatialReference,s,o,t.lrucache);let r=e.serviceUrl();return r?(r="/"===r.charAt(r.length-1)?r+n[0].relatedTableId.toString():r+"/"+n[0].relatedTableId.toString(),Object(I.constructFeatureSetFromUrl)(r,e.spatialReference,s,o,t.lrucache).then(t=>t.load().then(()=>t.relationshipMetaData()).then(r=>{if(r=r.filter(e=>e.id===n[0].id),!1===i.hasField(n[0].keyField)||null===i.field(n[0].keyField))return e.getFeatureByObjectId(i.field(e.objectIdField),[n[0].keyField]).then(e=>{if(e){const a=d.WhereClause.create(r[0].keyField+"= @id",t.getFieldsIndex());return a.parameters={id:e.attributes[n[0].keyField]},t.filter(a)}return new g.a({parentfeatureset:t})});const a=d.WhereClause.create(r[0].keyField+"= @id",t.getFieldsIndex());return a.parameters={id:i.field(n[0].keyField)},t.filter(a)}))):null})})},e.signatures.push({name:"featuresetbyrelationshipname",min:"2",max:"4"}),e.functions.featuresetbyassociation=function(t,n){return e.standardFunctionAsync(t,n,(e,n,r)=>{Object(a.J)(r,2,3);const i=r[0],l=Object(a.y)(Object(a.c)(r[1],"")).toLowerCase(),u=Object(a.v)(r[2])?Object(a.y)(r[2]):null;if(null===r[0])return null;if(!(r[0]instanceof c.a))throw new Error("Invalid Parameter");let f=i._layer;return f instanceof j.default&&(f=Object(I.constructFeatureSet)(f,t.spatialReference,["*"],!0,t.lrucache)),null===f||!1===Object(a.T)(f)?null:f.load().then(()=>{const e=f.serviceUrl();return Object(I.constructAssociationMetaDataFeatureSetFromUrl)(e,t.spatialReference)}).then(e=>{let t=null,n=null,r=!1;if(null!==u&&""!==u&&void 0!==u){for(const t of e.terminals)t.terminalName===u&&(n=t.terminalId);null===n&&(r=!0)}const c=e.associations.getFieldsIndex(),b=c.get("TOGLOBALID").name,m=c.get("FROMGLOBALID").name,y=c.get("TOTERMINALID").name,O=c.get("FROMTERMINALID").name,g=c.get("FROMNETWORKSOURCEID").name,h=c.get("TONETWORKSOURCEID").name,j=c.get("ASSOCIATIONTYPE").name,F=c.get("ISCONTENTVISIBLE").name,I=c.get("OBJECTID").name;for(const a of f.fields)if("global-id"===a.type){t=i.field(a.name);break}let E=null,w=new p.d(new s.a({name:"percentalong",alias:"percentalong",type:"double"}),d.WhereClause.create("0",e.associations.getFieldsIndex())),D=new p.d(new s.a({name:"side",alias:"side",type:"string"}),d.WhereClause.create("''",e.associations.getFieldsIndex()));const N="globalid",x="globalId",A={};for(const a in e.lkp)A[a]=e.lkp[a].sourceId;const S=new p.e(new s.a({name:"classname",alias:"classname",type:"string"}),null,A);let T="";switch(l){case"midspan":{T=`((${b}='${t}') OR ( ${m}='${t}')) AND (${j} IN (5))`,S.codefield=d.WhereClause.create(`CASE WHEN (${b}='${t}') THEN ${g} ELSE ${h} END`,e.associations.getFieldsIndex());const n=Object(o.c)(p.a.findField(e.associations.fields,m));n.name=N,n.alias=N,E=new p.d(n,d.WhereClause.create(`CASE WHEN (${m}='${t}') THEN ${b} ELSE ${m} END`,e.associations.getFieldsIndex())),w=e.unVersion>=4?new p.c(p.a.findField(e.associations.fields,c.get("PERCENTALONG").name)):new p.d(new s.a({name:"percentalong",alias:"percentalong",type:"double"}),d.WhereClause.create("0",e.associations.getFieldsIndex()));break}case"junctionedge":{T=`((${b}='${t}') OR ( ${m}='${t}')) AND (${j} IN (4,6))`,S.codefield=d.WhereClause.create(`CASE WHEN (${b}='${t}') THEN ${g} ELSE ${h} END`,e.associations.getFieldsIndex());const n=Object(o.c)(p.a.findField(e.associations.fields,m));n.name=N,n.alias=N,E=new p.d(n,d.WhereClause.create(`CASE WHEN (${m}='${t}') THEN ${b} ELSE ${m} END`,e.associations.getFieldsIndex())),D=new p.d(new s.a({name:"side",alias:"side",type:"string"}),d.WhereClause.create(`CASE WHEN (${j}=4) THEN 'from' ELSE 'to' END`,e.associations.getFieldsIndex()));break}case"connected":{let r=b+"='@T'",i=m+"='@T'";null!==n&&(r+=` AND ${y}=@A`,i+=` AND ${O}=@A`),T="(("+r+") OR ("+i+"))",T=Object(a.g)(T,"@T",t),r=Object(a.g)(r,"@T",t),null!==n&&(r=Object(a.g)(r,"@A",n.toString()),T=Object(a.g)(T,"@A",n.toString())),S.codefield=d.WhereClause.create("CASE WHEN "+r+` THEN ${g} ELSE ${h} END`,e.associations.getFieldsIndex());const l=Object(o.c)(p.a.findField(e.associations.fields,m));l.name=N,l.alias=N,E=new p.d(l,d.WhereClause.create("CASE WHEN "+r+` THEN ${m} ELSE ${b} END`,e.associations.getFieldsIndex()));break}case"container":T=`${b}='${t}' AND ${j} = 2`,null!==n&&(T+=` AND ${y} = `+n.toString()),S.codefield=g,T="( "+T+" )",E=new p.b(p.a.findField(e.associations.fields,m),N,N);case"content":T=`(${m}='${t}' AND ${j} = 2)`,null!==n&&(T+=` AND ${O} = `+n.toString()),S.codefield=h,T="( "+T+" )",E=new p.b(p.a.findField(e.associations.fields,b),N,N);break;case"structure":T=`(${b}='${t}' AND ${j} = 3)`,null!==n&&(T+=` AND ${y} = `+n.toString()),S.codefield=g,T="( "+T+" )",E=new p.b(p.a.findField(e.associations.fields,m),N,x);break;case"attached":T=`(${m}='${t}' AND ${j} = 3)`,null!==n&&(T+=` AND ${O} = `+n.toString()),S.codefield=h,T="( "+T+" )",E=new p.b(p.a.findField(e.associations.fields,b),N,x);break;default:throw new Error("Invalid Parameter")}return r&&(T="1 <> 1"),new p.a({parentfeatureset:e.associations,adaptedFields:[new p.c(p.a.findField(e.associations.fields,I)),new p.c(p.a.findField(e.associations.fields,F)),E,D,S,w],extraFilter:T?d.WhereClause.create(T,e.associations.getFieldsIndex()):null})})})},e.signatures.push({name:"featuresetbyassociation",min:"2",max:"6"}),e.functions.groupby=function(t,n){return e.standardFunctionAsync(t,n,(n,l,s)=>(Object(a.J)(s,3,3),Object(a.T)(s[0])?s[0].load().then(n=>{const l=[],o=[];let c=!1,u=[];if(Object(a.v)(s[1]))u.push(s[1]);else if(s[1]instanceof i.a)u.push(s[1]);else if(Object(a.B)(s[1]))u=s[1];else{if(!Object(a.I)(s[1]))return e.failDefferred("Illegal Value: GroupBy");u=s[1].toArray()}for(const t of u)if(Object(a.v)(t)){const e=d.WhereClause.create(Object(a.y)(t),n.getFieldsIndex()),r=!0===Object(b.c)(e)?Object(a.y)(t):"%%%%FIELDNAME";l.push({name:r,expression:e}),"%%%%FIELDNAME"===r&&(c=!0)}else{if(!(t instanceof i.a))return e.failDefferred("Illegal Value: GroupBy");{const r=t.hasField("name")?t.field("name"):"%%%%FIELDNAME",a=t.hasField("expression")?t.field("expression"):"";if("%%%%FIELDNAME"===r&&(c=!0),!r)return e.failDefferred("Illegal Value: GroupBy");l.push({name:r,expression:d.WhereClause.create(a||r,n.getFieldsIndex())})}}if(u=[],Object(a.v)(s[2]))u.push(s[2]);else if(Object(a.B)(s[2]))u=s[2];else if(Object(a.I)(s[2]))u=s[2].toArray();else{if(!(s[2]instanceof i.a))return e.failDefferred("Illegal Value: GroupBy");u.push(s[2])}for(const t of u){if(!(t instanceof i.a))return e.failDefferred("Illegal Value: GroupBy");{const r=t.hasField("name")?t.field("name"):"",a=t.hasField("statistic")?t.field("statistic"):"",i=t.hasField("expression")?t.field("expression"):"";if(!r||!a||!i)return e.failDefferred("Illegal Value: GroupBy");o.push({name:r,statistic:a.toLowerCase(),expression:d.WhereClause.create(i,n.getFieldsIndex())})}}if(c){const e={};for(const r of n.fields)e[r.name.toLowerCase()]=1;for(const n of l)"%%%%FIELDNAME"!==n.name&&(e[n.name.toLowerCase()]=1);for(const n of o)"%%%%FIELDNAME"!==n.name&&(e[n.name.toLowerCase()]=1);let t=0;for(const n of l)if("%%%%FIELDNAME"===n.name){for(;1===e["field_"+t.toString()];)t++;e["field_"+t.toString()]=1,n.name="FIELD_"+t.toString()}}const f=[];for(const r of l)f.push(E(r.expression,e,t));for(const r of o)f.push(E(r.expression,e,t));return f.length>0?Object(r.b)(f).then(()=>Object(r.u)(s[0].groupby(l,o))):Object(r.u)(s[0].groupby(l,o))}):e.failDefferred("Illegal Value: GroupBy")))},e.signatures.push({name:"groupby",min:"3",max:"3"}),e.functions.distinct=function(t,n){return e.standardFunctionAsync(t,n,(n,l,s)=>Object(a.T)(s[0])?(Object(a.J)(s,2,2),s[0].load().then(n=>{const l=[];let o=[];if(Object(a.v)(s[1]))o.push(s[1]);else if(s[1]instanceof i.a)o.push(s[1]);else if(Object(a.B)(s[1]))o=s[1];else{if(!Object(a.I)(s[1]))return e.failDefferred("Illegal Value: GroupBy");o=s[1].toArray()}let c=!1;for(const t of o)if(Object(a.v)(t)){const e=d.WhereClause.create(Object(a.y)(t),n.getFieldsIndex()),r=!0===Object(b.c)(e)?Object(a.y)(t):"%%%%FIELDNAME";l.push({name:r,expression:e}),"%%%%FIELDNAME"===r&&(c=!0)}else{if(!(t instanceof i.a))return e.failDefferred("Illegal Value: GroupBy");{const r=t.hasField("name")?t.field("name"):"%%%%FIELDNAME",a=t.hasField("expression")?t.field("expression"):"";if("%%%%FIELDNAME"===r&&(c=!0),!r)return e.failDefferred("Illegal Value: GroupBy");l.push({name:r,expression:d.WhereClause.create(a||r,n.getFieldsIndex())})}}if(c){const e={};for(const r of n.fields)e[r.name.toLowerCase()]=1;for(const n of l)"%%%%FIELDNAME"!==n.name&&(e[n.name.toLowerCase()]=1);let t=0;for(const n of l)if("%%%%FIELDNAME"===n.name){for(;1===e["field_"+t.toString()];)t++;e["field_"+t.toString()]=1,n.name="FIELD_"+t.toString()}}const u=[];for(const r of l)u.push(E(r.expression,e,t));return u.length>0?Object(r.b)(u).then(()=>Object(r.u)(s[0].groupby(l,[]))):Object(r.u)(s[0].groupby(l,[]))})):function(e,t,n,r){if(1===r.length){if(Object(a.B)(r[0]))return Object(u.a)(e,r[0],-1);if(Object(a.I)(r[0]))return Object(u.a)(e,r[0].toArray(),-1)}return Object(u.a)(e,r,-1)}("distinct",0,0,s))})}}}]);