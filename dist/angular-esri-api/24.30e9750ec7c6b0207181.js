(window.webpackJsonp=window.webpackJsonp||[]).push([[24,120,121],{"1F90":function(t,e,i){"use strict";i.d(e,"a",function(){return o}),i.d(e,"b",function(){return n});var r=i("jjdI");function n(t){let e="";for(const i in t){const r=t[i];if("boolean"==typeof r)r&&(e+=`#define ${i}\n`);else if("number"==typeof r)e+=`#define ${i} ${r.toFixed()}\n`;else if("object"==typeof r){const t=r.options;let n=0;for(const i in t)e+=`#define ${t[i]} ${(n++).toFixed()}\n`;e+=`#define ${i} ${t[r.value]}\n`}}return e}function o(t,e,i,n){i=i||{},n=n||"";const o="function"==typeof e.shaders?e.shaders(i):e.shaders;return new r.a(t,n+o.vertexShader,n+o.fragmentShader,e.attributes)}},D6bk:function(t,e,i){"use strict";var r=i("hTmG");let n=0;e.a=class{constructor(t,e,i,r,o){this._context=t,this._locations=e,this._layout=i,this._buffers=r,this._indexBuffer=o,this._glName=null,this.id=n++,this._initialized=!1,t.instanceCounter.increment(2,this)}get glName(){return this._glName}get vertexBuffers(){return this._buffers}get indexBuffer(){return this._indexBuffer}get size(){return Object.keys(this._buffers).reduce((t,e)=>t+this._buffers[e].size,this._indexBuffer?this._indexBuffer.size:0)}get layout(){return this._layout}get locations(){return this._locations}dispose(t=!0){if(!this._context)return;const e=this._context.capabilities.vao;if(e&&this._glName&&(e.deleteVertexArray(this._glName),this._glName=null),this._context.getBoundVAO()===this&&this._context.bindVAO(null),t){for(const t in this._buffers)this._buffers[t].dispose(),delete this._buffers[t];this._indexBuffer&&(this._indexBuffer.dispose(),this._indexBuffer=null)}this._context.instanceCounter.decrement(2,this),this._context=null}initialize(){if(this._initialized)return;const t=this._context.capabilities.vao;if(t){const e=t.createVertexArray();t.bindVertexArray(e),this._bindLayout(),t.bindVertexArray(null),this._glName=e}this._initialized=!0}bind(){this.initialize();const t=this._context.capabilities.vao;t?t.bindVertexArray(this.glName):(this._context.bindVAO(null),this._bindLayout())}_bindLayout(){const t=this._buffers,e=!!this._context.capabilities.vao,i=this._layout,n=this._indexBuffer;t||console.error("Vertex buffer dictionary is empty!");const o=this._context.gl;for(const s in t){const e=t[s];e||console.error("Vertex buffer is uninitialized!");const n=i[s];n||console.error("Vertex element descriptor is empty!"),Object(r.a)(this._context,this._locations,e,n)}n&&(e?o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,n.glName):this._context.bindBuffer(n))}unbind(){this.initialize();const t=this._context.capabilities.vao;t?t.bindVertexArray(null):this._unbindLayout()}_unbindLayout(){const t=this._buffers,e=this._layout;t||console.error("Vertex buffer dictionary is empty!");for(const n in t){const i=t[n];i||console.error("Vertex buffer is uninitialized!");const o=e[n];Object(r.b)(this._context,this._locations,i,o)}const i=this._indexBuffer;i&&this._context.unbindBuffer(i.bufferType)}}},SfCL:function(t,e,i){"use strict";e.a=class{constructor(t){this.readFile=t}resolveIncludes(t){return this.resolve(t)}resolve(t,e=new Map){if(e.has(t))return e.get(t);const i=this.read(t);if(!i)throw new Error("cannot find shader file "+t);const r=/^[^\S\n]*#include\s+<(\S+)>[^\S\n]?/gm;let n=r.exec(i);const o=[];for(;null!=n;)o.push({path:n[1],start:n.index,length:n[0].length}),n=r.exec(i);let s=0,a="";return o.forEach(t=>{a+=i.slice(s,t.start),a+=e.has(t.path)?"":this.resolve(t.path,e),s=t.start+t.length}),a+=i.slice(s),e.set(t,a),a}read(t){return this.readFile(t)}}},X2wA:function(t,e,i){"use strict";function r(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function n(t,e,i){return t(i={path:e,exports:{},require:function(t,e){return o()}},i.exports),i.exports}function o(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}i.d(e,"a",function(){return o}),i.d(e,"b",function(){return n}),i.d(e,"c",function(){return r}),"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self},fOQB:function(t,e,i){"use strict";var r=i("ohva");class n{constructor(t,e,i,r,n){this._context=null,this._glName=null,this._bufferType=void 0,this._usage=35044,this._size=-1,this._indexType=void 0,this.id=o++,t.instanceCounter.increment(1,this),this._context=t,this._bufferType=e,this._usage=i,this._glName=this._context.gl.createBuffer(),r&&this.setData(r,n)}static createIndex(t,e,i,r){return new n(t,34963,e,i,r)}static createVertex(t,e,i){return new n(t,34962,e,i)}get glName(){return this._glName}get size(){return this._size}get usage(){return this._usage}get bufferType(){return this._bufferType}get indexType(){return this._indexType}get byteSize(){return 34962===this._bufferType?this._size:5125===this._indexType?4*this._size:2*this._size}dispose(){this._context&&(this._glName&&(this._context.gl.deleteBuffer(this._glName),this._glName=null),this._context.instanceCounter.decrement(1,this),this._context=null)}setData(t,e){if(!t)return;if("number"==typeof t){if(t<0&&console.error("Buffer size cannot be negative!"),34963===this._bufferType&&e)switch(this._indexType=e,this._size=t,e){case 5123:t*=2;break;case 5125:t*=4}}else{let e=t.byteLength;Object(r.i)(t)&&(e/=2,this._indexType=5123),Object(r.j)(t)&&(e/=4,this._indexType=5125),this._size=e}const i=this._context.getBoundVAO();this._context.bindVAO(null),this._context.bindBuffer(this),this._context.gl.bufferData(this._bufferType,t,this._usage),this._context.bindVAO(i)}setSubData(t,e=0,i=0,n){if(!t)return;(e<0||e>=this._size)&&console.error("offset is out of range!");let o=e,s=i,a=n,f=t.byteLength;Object(r.i)(t)&&(f/=2,o*=2,s*=2,a*=2),Object(r.j)(t)&&(f/=4,o*=4,s*=4,a*=4),void 0===n&&(n=f-1),i>=n&&console.error("end must be bigger than start!"),e+i-n>this._size&&console.error("An attempt to write beyond the end of the buffer!");const c=this._context.getBoundVAO();this._context.bindVAO(null),this._context.bindBuffer(this);const h=this._context.gl,u=ArrayBuffer.isView(t)?t.buffer:t;h.bufferSubData(this._bufferType,o,u.slice(s,a)),this._context.bindVAO(c)}}let o=0;e.a=n},hTmG:function(t,e,i){"use strict";function r(t,e){return t.vertexBuffers[e].size/function(t){return t[0].stride}(t.layout[e])}function n(t,e,i,r,n){const o=t.gl,s=t.capabilities.instancing;t.bindBuffer(i);for(const a of r){const t=e[a.name],i=(n||(0+a.baseInstance?a.baseInstance:0))*a.stride;if(void 0===t&&console.error(`There is no location for vertex attribute '${a.name}' defined.`),a.baseInstance&&!a.divisor&&console.error(`Vertex attribute '${a.name}' uses baseInstanceOffset without divisor.`),a.count<=4)o.vertexAttribPointer(t,a.count,a.type,a.normalized,a.stride,a.offset+i),o.enableVertexAttribArray(t),a.divisor&&a.divisor>0&&s&&s.vertexAttribDivisor(t,a.divisor);else if(9===a.count)for(let e=0;e<3;e++)o.vertexAttribPointer(t+e,3,a.type,a.normalized,a.stride,a.offset+12*e+i),o.enableVertexAttribArray(t+e),a.divisor&&a.divisor>0&&s&&s.vertexAttribDivisor(t+e,a.divisor);else if(16===a.count)for(let e=0;e<4;e++)o.vertexAttribPointer(t+e,4,a.type,a.normalized,a.stride,a.offset+16*e+i),o.enableVertexAttribArray(t+e),a.divisor&&a.divisor>0&&s&&s.vertexAttribDivisor(t+e,a.divisor);else console.error("Unsupported vertex attribute element count: "+a.count)}}function o(t,e,i,r){const n=t.gl,o=t.capabilities.instancing;t.bindBuffer(i);for(const s of r){const t=e[s.name];if(s.count<=4)n.disableVertexAttribArray(t),s.divisor&&s.divisor>0&&o&&o.vertexAttribDivisor(t,0);else if(9===s.count)for(let e=0;e<3;e++)n.disableVertexAttribArray(t+e),s.divisor&&s.divisor>0&&o&&o.vertexAttribDivisor(t+e,0);else if(16===s.count)for(let e=0;e<4;e++)n.disableVertexAttribArray(t+e),s.divisor&&s.divisor>0&&o&&o.vertexAttribDivisor(t+e,0);else console.error("Unsupported vertex attribute element count: "+s.count)}t.unbindBuffer(34962)}i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o}),i.d(e,"c",function(){return r}),i("wSAH"),i("srIe")},jjdI:function(t,e,i){"use strict";i("wSAH");var r=i("srIe"),n=["layout","centroid","smooth","case","mat2x2","mat2x3","mat2x4","mat3x2","mat3x3","mat3x4","mat4x2","mat4x3","mat4x4","uint","uvec2","uvec3","uvec4","samplerCubeShadow","sampler2DArray","sampler2DArrayShadow","isampler2D","isampler3D","isamplerCube","isampler2DArray","usampler2D","usampler3D","usamplerCube","usampler2DArray","coherent","restrict","readonly","writeonly","resource","atomic_uint","noperspective","patch","sample","subroutine","common","partition","active","filter","image1D","image2D","image3D","imageCube","iimage1D","iimage2D","iimage3D","iimageCube","uimage1D","uimage2D","uimage3D","uimageCube","image1DArray","image2DArray","iimage1DArray","iimage2DArray","uimage1DArray","uimage2DArray","image1DShadow","image2DShadow","image1DArrayShadow","image2DArrayShadow","imageBuffer","iimageBuffer","uimageBuffer","sampler1DArray","sampler1DArrayShadow","isampler1D","isampler1DArray","usampler1D","usampler1DArray","isampler2DRect","usampler2DRect","samplerBuffer","isamplerBuffer","usamplerBuffer","sampler2DMS","isampler2DMS","usampler2DMS","sampler2DMSArray","isampler2DMSArray","usampler2DMSArray","trunc","round","roundEven","isnan","isinf","floatBitsToInt","floatBitsToUint","intBitsToFloat","uintBitsToFloat","packSnorm2x16","unpackSnorm2x16","packUnorm2x16","unpackUnorm2x16","packHalf2x16","unpackHalf2x16","outerProduct","transpose","determinant","inverse","texture","textureSize","textureProj","textureLod","textureOffset","texelFetch","texelFetchOffset","textureProjOffset","textureLodOffset","textureProjLod","textureProjLodOffset","textureGrad","textureGradOffset","textureProjGrad","textureProjGradOffset"],o=i("n4uK"),s=["block-comment","line-comment","preprocessor","operator","integer","float","ident","builtin","keyword","whitespace","eof","integer"];const a=["GL_OES_standard_derivatives","GL_EXT_frag_depth","GL_EXT_draw_buffers","GL_EXT_shader_texture_lod"];function f(t,e){for(let i=e-1;i>=0;i--){const e=t[i];if("whitespace"!==e.type&&"block-comment"!==e.type){if("keyword"!==e.type)break;if("attribute"===e.data||"in"===e.data)return!0}}return!1}function c(t,e,i,r){r=r||i;for(const n of t)if("ident"===n.type&&n.data===i)return r in e?e[r]++:e[r]=0,c(t,e,r+"_"+e[r],r);return i}function h(t,e,i="afterVersion"){function r(t,e){for(let i=e;i<t.length;i++){const e=t[i];if("operator"===e.type&&";"===e.data)return i}return null}const n={data:"\n",type:"whitespace"},o=e=>e<t.length&&/[^\r\n]$/.test(t[e].data);let s=function(t){let e=-1,n=0,o=-1;for(let s=0;s<t.length;s++){const a=t[s];if("preprocessor"===a.type&&(a.data.match(/\#(if|ifdef|ifndef)\s+.+/)?++n:a.data.match(/\#endif\s*.*/)&&--n),"afterVersion"!==i&&"afterPrecision"!==i||"preprocessor"===a.type&&/^#version/.test(a.data)&&(o=Math.max(o,s)),"afterPrecision"===i&&"keyword"===a.type&&"precision"===a.data){const e=r(t,s);if(null===e)throw new Error("precision statement not followed by any semicolons!");o=Math.max(o,e)}e<o&&0===n&&(e=s)}return e+1}(t);o(s-1)&&t.splice(s++,0,n);for(const a of e)t.splice(s++,0,a);o(s-1)&&o(s)&&t.splice(s,0,n)}function u(t,e,i,r="lowp"){h(t,[{type:"keyword",data:"out"},{type:"whitespace",data:" "},{type:"keyword",data:r},{type:"whitespace",data:" "},{type:"keyword",data:i},{type:"whitespace",data:" "},{type:"ident",data:e},{type:"operator",data:";"}],"afterPrecision")}function d(t,e,i,r,n="lowp"){h(t,[{type:"keyword",data:"layout"},{type:"operator",data:"("},{type:"keyword",data:"location"},{type:"whitespace",data:" "},{type:"operator",data:"="},{type:"whitespace",data:" "},{type:"integer",data:r.toString()},{type:"operator",data:")"},{type:"whitespace",data:" "},{type:"keyword",data:"out"},{type:"whitespace",data:" "},{type:"keyword",data:n},{type:"whitespace",data:" "},{type:"keyword",data:i},{type:"whitespace",data:" "},{type:"ident",data:e},{type:"operator",data:";"}],"afterPrecision")}function l(t,e){let i,r,n=-1;for(let o=e;o<t.length;o++){const e=t[o];if("operator"===e.type&&("["===e.data&&(i=o),"]"===e.data)){r=o;break}"integer"===e.type&&(n=parseInt(e.data,10))}return i&&r&&t.splice(i,r-i+1),n}class m{constructor(t,e,i,r,n={}){if(this._context=null,this._glName=null,this._locations={},this.id=p++,this._initialized=!1,this._vShader=null,this._fShader=null,this._defines={},this._nameToUniformLocation={},this._nameToAttribLocation={},this._nameToUniform1={},this._nameToUniform1v={},this._nameToUniform2={},this._nameToUniform3={},this._nameToUniform4={},this._nameToUniformMatrix3={},this._nameToUniformMatrix4={},t||console.error("RenderingContext isn't initialized!"),0===e.length&&console.error("Shaders source should not be empty!"),t.instanceCounter.increment(3,this),this._context=t,this._vertexShaderSource=e,this._fragmentShaderSource=i,Array.isArray(n))for(const o of n)this._defines[o]="1";else this._defines=n;this._locations=r}get glName(){return this._glName}get locations(){return this._locations}getDefine(t){return this._defines[t]}dispose(){if(!this._context)return;const t=this._context.gl;this._vShader&&(t.deleteShader(this._vShader),this._vShader=null),this._fShader&&(t.deleteShader(this._fShader),this._fShader=null),this._glName&&(t.deleteProgram(this._glName),this._glName=null),this._context.instanceCounter.decrement(3,this),this._context=null}initialize(){if(this._initialized)return;this._vShader=this._loadShader(35633),this._fShader=this._loadShader(35632),this._vShader&&this._fShader||console.error("Error loading shaders!");const t=this._context.gl,e=t.createProgram();t.attachShader(e,this._vShader),t.attachShader(e,this._fShader);for(const i in this._locations)t.bindAttribLocation(e,this._locations[i],i);t.linkProgram(e),this._glName=e,this._initialized=!0}getUniformLocation(t){return this.initialize(),void 0===this._nameToUniformLocation[t]&&(this._nameToUniformLocation[t]=this._context.gl.getUniformLocation(this._glName,t)),this._nameToUniformLocation[t]}hasUniform(t){return null!==this.getUniformLocation(t)}getAttribLocation(t){return this.initialize(),void 0===this._nameToAttribLocation[t]&&(this._nameToAttribLocation[t]=this._context.gl.getAttribLocation(this._glName,t)),this._nameToAttribLocation[t]}setUniform1i(t,e){const i=this._nameToUniform1[t];void 0!==i&&e===i||(this._context.bindProgram(this),this._context.gl.uniform1i(this.getUniformLocation(t),e),this._nameToUniform1[t]=e)}setUniform1iv(t,e){const i=this._nameToUniform1v[t];_(i,e)&&(this._context.bindProgram(this),this._context.gl.uniform1iv(this.getUniformLocation(t),e),void 0===i?this._nameToUniform1v[t]=m._arrayCopy(e):m._arrayAssign(e,i))}setUniform2iv(t,e){const i=this._nameToUniform2[t];_(i,e)&&(this._context.bindProgram(this),this._context.gl.uniform2iv(this.getUniformLocation(t),e),void 0===i?this._nameToUniform2[t]=m._arrayCopy(e):m._arrayAssign(e,i))}setUniform3iv(t,e){const i=this._nameToUniform3[t];_(i,e)&&(this._context.bindProgram(this),this._context.gl.uniform3iv(this.getUniformLocation(t),e),void 0===i?this._nameToUniform3[t]=m._arrayCopy(e):m._arrayAssign(e,i))}setUniform4iv(t,e){const i=this._nameToUniform4[t];_(i,e)&&(this._context.bindProgram(this),this._context.gl.uniform4iv(this.getUniformLocation(t),e),void 0===i?this._nameToUniform4[t]=m._arrayCopy(e):m._arrayAssign(e,i))}setUniform1f(t,e){const i=this._nameToUniform1[t];void 0!==i&&e===i||(this._context.bindProgram(this),this._context.gl.uniform1f(this.getUniformLocation(t),e),this._nameToUniform1[t]=e)}setUniform1fv(t,e){const i=this._nameToUniform1v[t];_(i,e)&&(this._context.bindProgram(this),this._context.gl.uniform1fv(this.getUniformLocation(t),e),void 0===i?this._nameToUniform1v[t]=m._arrayCopy(e):m._arrayAssign(e,i))}setUniform2f(t,e,i){const r=this._nameToUniform2[t];void 0!==r&&e===r[0]&&i===r[1]||(this._context.bindProgram(this),this._context.gl.uniform2f(this.getUniformLocation(t),e,i),void 0===r?this._nameToUniform2[t]=[e,i]:(r[0]=e,r[1]=i))}setUniform2fv(t,e){const i=this._nameToUniform2[t];_(i,e)&&(this._context.bindProgram(this),this._context.gl.uniform2fv(this.getUniformLocation(t),e),void 0===i?this._nameToUniform2[t]=m._arrayCopy(e):m._arrayAssign(e,i))}setUniform3f(t,e,i,r){const n=this._nameToUniform3[t];void 0!==n&&e===n[0]&&i===n[1]&&r===n[2]||(this._context.bindProgram(this),this._context.gl.uniform3f(this.getUniformLocation(t),e,i,r),void 0===n?this._nameToUniform3[t]=[e,i,r]:(n[0]=e,n[1]=i,n[2]=r))}setUniform3fv(t,e){const i=this._nameToUniform3[t];_(i,e)&&(this._context.bindProgram(this),this._context.gl.uniform3fv(this.getUniformLocation(t),e),void 0===i?this._nameToUniform3[t]=m._arrayCopy(e):m._arrayAssign(e,i))}setUniform4f(t,e,i,r,n){const o=this._nameToUniform4[t];void 0!==o&&e===o[0]&&i===o[1]&&r===o[2]&&n===o[3]||(this._context.bindProgram(this),this._context.gl.uniform4f(this.getUniformLocation(t),e,i,r,n),void 0===o?this._nameToUniform4[t]=[e,i,r,n]:(o[0]=e,o[1]=i,o[2]=r,o[3]=n))}setUniform4fv(t,e){const i=this._nameToUniform4[t];_(i,e)&&(this._context.bindProgram(this),this._context.gl.uniform4fv(this.getUniformLocation(t),e),void 0===i?this._nameToUniform4[t]=m._arrayCopy(e):m._arrayAssign(e,i))}setUniformMatrix3fv(t,e,i=!1){const n=this._nameToUniformMatrix3[t];(function(t,e){return!!Object(r.g)(t)||(9!==t.length?_(t,e):9!==t.length||t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||t[3]!==e[3]||t[4]!==e[4]||t[5]!==e[5]||t[6]!==e[6]||t[7]!==e[7]||t[8]!==e[8])})(n,e)&&(this._context.bindProgram(this),this._context.gl.uniformMatrix3fv(this.getUniformLocation(t),i,e),void 0===n?this._nameToUniformMatrix3[t]=m._arrayCopy(e):m._arrayAssign(e,n))}setUniformMatrix4fv(t,e,i=!1){const n=this._nameToUniformMatrix4[t];(function(t,e){return!!Object(r.g)(t)||(16!==t.length?_(t,e):16!==t.length||t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||t[3]!==e[3]||t[4]!==e[4]||t[5]!==e[5]||t[6]!==e[6]||t[7]!==e[7]||t[8]!==e[8]||t[9]!==e[9]||t[10]!==e[10]||t[11]!==e[11]||t[12]!==e[12]||t[13]!==e[13]||t[14]!==e[14]||t[15]!==e[15])})(n,e)&&(this._context.bindProgram(this),this._context.gl.uniformMatrix4fv(this.getUniformLocation(t),i,e),void 0===n?this._nameToUniformMatrix4[t]=m._arrayCopy(e):m._arrayAssign(e,n))}assertCompatibleVertexAttributeLocations(t){const e=t.locations===this.locations;return e||console.error("VertexAttributeLocations are incompatible"),e}static _padToThree(t){let e=t.toString();return t<1e3&&(e=("  "+t).slice(-3)),e}_addLineNumbers(t){let e=2;return t.replace(/\n/g,()=>"\n"+m._padToThree(e++)+":")}_loadShader(t){const e=35633===t;let i=e?this._vertexShaderSource:this._fragmentShaderSource,r="";for(const n in this._defines)r+=`#define ${n} ${this._defines[n]}\n`;i=r+i,"webgl2"===this._context.contextVersion&&(i=function(t,e){const i=function(t){return e=t,i=function(){var t,e,i,r=0,n=0,a=999,f=[],c=[],h=1,u=0,d=0,l=!1,m=!1,_="";return function(o){return c=[],null!==o?function(o){var s;for(r=0,i=(_+=o).length;t=_[r],r<i;){switch(s=r,a){case 0:r="/"===t&&"*"===e?(f.push(t),p(f.join("")),a=999,r+1):(f.push(t),e=t,r+1);break;case 1:case 2:r="\r"!==t&&"\n"!==t||"\\"===e?(f.push(t),e=t,r+1):(p(f.join("")),a=999,r);break;case 3:r=g();break;case 4:r="."===t||/[eE]/.test(t)?(f.push(t),a=5,e=t,r+1):"x"===t&&1===f.length&&"0"===f[0]?(a=11,f.push(t),e=t,r+1):/[^\d]/.test(t)?(p(f.join("")),a=999,r):(f.push(t),e=t,r+1);break;case 11:r=/[^a-fA-F0-9]/.test(t)?(p(f.join("")),a=999,r):(f.push(t),e=t,r+1);break;case 5:"f"===t&&(f.push(t),e=t,r+=1),r=/[eE]/.test(t)||"-"===t&&/[eE]/.test(e)?(f.push(t),e=t,r+1):/[^\d]/.test(t)?(p(f.join("")),a=999,r):(f.push(t),e=t,r+1);break;case 9999:r=b();break;case 9:r=/[^\s]/g.test(t)?(p(f.join("")),a=999,r):(f.push(t),e=t,r+1);break;case 999:f=f.length?[]:f,r="/"===e&&"*"===t?(d=n+r-1,a=0,e=t,r+1):"/"===e&&"/"===t?(d=n+r-1,a=1,e=t,r+1):"#"===t?(a=2,d=n+r,r):/\s/.test(t)?(a=9,d=n+r,r):(l=/\d/.test(t),m=/[^\w_]/.test(t),d=n+r,a=l?4:m?3:9999,r)}if(s!==r)switch(_[s]){case"\n":u=0,++h;break;default:++u}}return n+=r,_=_.slice(r),c}(o.replace?o.replace(/\r\n/g,"\n"):o):(f.length&&p(f.join("")),a=10,p("(eof)"),c)};function p(t){t.length&&c.push({type:s[a],data:t,position:d,line:h,column:u})}function g(){if("."===e&&/\d/.test(t))return a=5,r;if("/"===e&&"*"===t)return a=0,r;if("/"===e&&"/"===t)return a=1,r;if("."===t&&f.length){for(;x(f););return a=5,r}if(";"===t||")"===t||"("===t){if(f.length)for(;x(f););return p(t),a=999,r+1}var i=2===f.length&&"="!==t;if(/[\w_\d\s]/.test(t)||i){for(;x(f););return a=999,r}return f.push(t),e=t,r+1}function x(t){for(var e,i,r=0;;){if(e=o.c.indexOf(t.slice(0,t.length+r).join("")),i=o.c[e],-1===e){if(r--+t.length>0)continue;i=t.slice(0,1).join("")}return p(i),d+=i.length,(f=f.slice(i.length)).length}}function b(){if(/[^\d\w_]/.test(t)){var i=f.join("");return a=o.b.indexOf(i)>-1?8:o.a.indexOf(i)>-1?7:6,p(f.join("")),a=999,r}return f.push(t),e=t,r+1}}(),[].concat(i(e)).concat(i(null));var e,i}(t);if("300 es"===function(t,e="100",i="300 es"){const r=/^\s*\#version\s+([0-9]+(\s+[a-zA-Z]+)?)\s*/;for(const n of t)if("preprocessor"===n.type){const t=r.exec(n.data);if(t){const r=t[1].replace(/\s\s+/g," ");if(r===i)return r;if(r===e)return n.data="#version "+i,e;throw new Error("unknown glsl version: "+r)}}return t.splice(0,0,{type:"preprocessor",data:"#version "+i},{type:"whitespace",data:"\n"}),null}(i,"100","300 es"))throw new Error("shader is already glsl 300 es");let r=null,h=null;const m={},_={};for(let o=0;o<i.length;++o){const t=i[o];switch(t.type){case"keyword":"vertex"===e&&"attribute"===t.data?t.data="in":"varying"===t.data&&(t.data="vertex"===e?"out":"in");break;case"builtin":if(/^texture(2D|Cube)(Proj)?(Lod|Grad)?(EXT)?$/.test(t.data.trim())&&(t.data=t.data.replace(/(2D|Cube|EXT)/g,"")),"fragment"===e&&"gl_FragColor"===t.data&&(r||(r=c(i,m,"fragColor"),u(i,r,"vec4")),t.data=r),"fragment"===e&&"gl_FragData"===t.data){const e=l(i,o+1),r=c(i,m,"fragData");d(i,r,"vec4",e,"mediump"),t.data=r}else"fragment"===e&&"gl_FragDepthEXT"===t.data&&(h||(h=c(i,m,"gl_FragDepth")),t.data=h);break;case"ident":if(n.indexOf(t.data)>=0){if("vertex"===e&&f(i,o))throw new Error("attribute in vertex shader uses a name that is a reserved word in glsl 300 es");t.data in _||(_[t.data]=c(i,m,t.data)),t.data=_[t.data]}}}for(let n=i.length-1;n>=0;--n){const t=i[n];if("preprocessor"===t.type){const e=t.data.match(/\#extension\s+(.*)\:/);if(e&&e[1]&&a.indexOf(e[1].trim())>=0){const t=i[n+1];i.splice(n,t&&"whitespace"===t.type?2:1)}const r=t.data.match(/\#ifdef\s+(.*)/);r&&r[1]&&a.indexOf(r[1].trim())>=0&&(t.data="#if 1");const o=t.data.match(/\#ifndef\s+(.*)/);o&&o[1]&&a.indexOf(o[1].trim())>=0&&(t.data="#if 0")}}return i.map(t=>"eof"!==t.type?t.data:"").join("")}(i,e?"vertex":"fragment"));const h=this._context.gl,m=h.createShader(t);return h.shaderSource(m,i),h.compileShader(m),m}static _arrayCopy(t){const e=[];for(let i=0;i<t.length;++i)e.push(t[i]);return e}static _arrayAssign(t,e){for(let i=0;i<t.length;++i)e[i]=t[i]}}function _(t,e){if(Object(r.g)(t)||t.length!==e.length)return!0;for(let i=0;i<t.length;++i)if(t[i]!==e[i])return!0;return!1}let p=0;e.a=m},tpsn:function(t,e,i){"use strict";i.r(e);var r=i("zBXm");i.d(e,"createContextOrErrorHTML",function(){return r.b});var n=i("jjdI");i.d(e,"Program",function(){return n.a});var o=i("fOQB");i.d(e,"BufferObject",function(){return o.a});var s=i("of9L");i.d(e,"Texture",function(){return s.a});var a=i("D6bk");i.d(e,"VertexArrayObject",function(){return a.a});var f=i("kbDN");i.d(e,"Renderbuffer",function(){return f.a});var c=i("0meK");i.d(e,"FramebufferObject",function(){return c.a});var h=i("1F90");i.d(e,"createProgram",function(){return h.a}),i.d(e,"glslifyDefineMap",function(){return h.b});var u=i("kGdt");i.d(e,"ProgramCache",function(){return u.a});var d=i("bfJE");i.d(e,"RenderingContext",function(){return d.a});var l=i("SfCL");i.d(e,"ShaderCompiler",function(){return l.a})}}]);