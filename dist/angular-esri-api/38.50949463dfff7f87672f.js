(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{"0BfS":function(e,t,r){"use strict";r.d(t,"a",function(){return a});var i,n=r("OIYib"),o=r("UBvB");function a(e){e.fragment.include(o.a),e.fragment.uniforms.add("depthTex","sampler2D"),e.fragment.uniforms.add("shadowMapNum","int"),e.fragment.uniforms.add("shadowMapDistance","vec4"),e.fragment.uniforms.add("shadowMapMatrix","mat4",4),e.fragment.uniforms.add("depthHalfPixelSz","float"),e.fragment.code.add(n.a`
    float readShadowMap(const in vec3 _vpos, float _linearDepth) {
      float halfPixelSize = depthHalfPixelSz;
      vec4 distance = shadowMapDistance;
      float depth = _linearDepth;

      //choose correct cascade
      int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;

      if (i >= shadowMapNum) { return 0.0; }

      mat4 mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];

      vec4 lv = mat * vec4(_vpos, 1.0);
      lv.xy /= lv.w;

      // vertex completely outside? -> no shadow
      vec3 lvpos = 0.5 * lv.xyz + vec3(0.5);
      if (lvpos.z >= 1.0) { return 0.0; }
      if (lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }

      // calc coord in cascade texture
      vec2 uv = vec2(float(i - 2 * (i / 2)) * 0.5, float(i / 2) * 0.5) + 0.5 * lvpos.xy;

      float texSize = 0.5 / halfPixelSize;

      // filter, offset by half pixels
      vec2 st = fract((vec2(halfPixelSize) + uv) * texSize);

      float s00 = rgba2float(texture2D(depthTex, uv + vec2(-halfPixelSize, -halfPixelSize))) < lvpos.z ? 1.0 : 0.0;
      float s10 = rgba2float(texture2D(depthTex, uv + vec2(halfPixelSize, -halfPixelSize))) < lvpos.z ? 1.0 : 0.0;
      float s11 = rgba2float(texture2D(depthTex, uv + vec2(halfPixelSize, halfPixelSize))) < lvpos.z ? 1.0 : 0.0;
      float s01 = rgba2float(texture2D(depthTex, uv + vec2(-halfPixelSize, halfPixelSize))) < lvpos.z ? 1.0 : 0.0;

      return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
    }
  `)}(i=a||(a={})).bindUniforms=function(e,t,r){t.shadowMappingEnabled&&(t.shadowMap.bind(e,r),t.shadowMap.bindView(e,t.origin))},i.bindViewCustomOrigin=function(e,t,r){t.shadowMappingEnabled&&t.shadowMap.bindView(e,r)},i.bindView=function(e,t){t.shadowMappingEnabled&&t.shadowMap.bindView(e,t.origin)}},"0nJL":function(e,t,r){"use strict";r.d(t,"a",function(){return c});var i,n=r("srIe"),o=r("Cy1f"),a=r("5DEt"),s=r("OIYib");function c(e,t){if(t.slicePlaneEnabled){e.extensions.add("GL_OES_standard_derivatives"),t.sliceEnabledForVertexPrograms&&(e.vertex.uniforms.add("slicePlaneOrigin","vec3"),e.vertex.uniforms.add("slicePlaneBasis1","vec3"),e.vertex.uniforms.add("slicePlaneBasis2","vec3")),e.fragment.uniforms.add("slicePlaneOrigin","vec3"),e.fragment.uniforms.add("slicePlaneBasis1","vec3"),e.fragment.uniforms.add("slicePlaneBasis2","vec3");const r=s.a`
      struct SliceFactors {
        float front;
        float side0;
        float side1;
        float side2;
        float side3;
      };

      SliceFactors calculateSliceFactors(vec3 pos) {
        vec3 rel = pos - slicePlaneOrigin;

        vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
        float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);

        float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
        float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);

        float basis1Dot = dot(slicePlaneBasis1, rel);
        float basis2Dot = dot(slicePlaneBasis2, rel);

        return SliceFactors(
          dot(slicePlaneNormal, pos) + slicePlaneW,
          -basis1Dot - basis1Len2,
          basis1Dot - basis1Len2,
          -basis2Dot - basis2Len2,
          basis2Dot - basis2Len2
        );
      }

      bool sliceByFactors(SliceFactors factors) {
        return factors.front < 0.0
          && factors.side0 < 0.0
          && factors.side1 < 0.0
          && factors.side2 < 0.0
          && factors.side3 < 0.0;
      }

      bool sliceEnabled() {
        // a slicePlaneBasis1 vector of zero length is used to disable slicing in the shader during draped rendering.
        return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
      }

      bool sliceByPlane(vec3 pos) {
        return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
      }

      #define rejectBySlice(_pos_) sliceByPlane(_pos_)
      #define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }
    `,i=s.a`
      vec4 applySliceHighlight(vec4 color, vec3 pos) {
        SliceFactors factors = calculateSliceFactors(pos);

        if (sliceByFactors(factors)) {
          return color;
        }

        const float HIGHLIGHT_WIDTH = 1.0;
        const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);

        factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);
        factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);
        factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);
        factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);
        factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);

        float highlightFactor = (1.0 - step(0.5, factors.front))
          * (1.0 - step(0.5, factors.side0))
          * (1.0 - step(0.5, factors.side1))
          * (1.0 - step(0.5, factors.side2))
          * (1.0 - step(0.5, factors.side3));

        return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);
      }
    `,n=t.sliceHighlightDisabled?s.a`#define highlightSlice(_color_, _pos_) (_color_)`:s.a`
        ${i}
        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))
      `;t.sliceEnabledForVertexPrograms&&e.vertex.code.add(r),e.fragment.code.add(r),e.fragment.code.add(n)}else{const r=s.a`
      #define rejectBySlice(_pos_) false
      #define discardBySlice(_pos_) {}
      #define highlightSlice(_color_, _pos_) (_color_)
    `;t.sliceEnabledForVertexPrograms&&e.vertex.code.add(r),e.fragment.code.add(r)}}(i=c||(c={})).bindUniformsWithOrigin=function(e,t,r){i.bindUniforms(e,t,r.slicePlane,r.origin)},i.bindUniforms=function(e,t,r,i){t.slicePlaneEnabled&&(Object(n.h)(r)?(i?(Object(a.g)(l,r.origin,i),e.setUniform3fv("slicePlaneOrigin",l)):e.setUniform3fv("slicePlaneOrigin",r.origin),e.setUniform3fv("slicePlaneBasis1",r.basis1),e.setUniform3fv("slicePlaneBasis2",r.basis2)):(e.setUniform3fv("slicePlaneBasis1",o.b),e.setUniform3fv("slicePlaneBasis2",o.b),e.setUniform3fv("slicePlaneOrigin",o.b)))};const l=Object(o.e)()},"1TnO":function(e,t,r){"use strict";r.d(t,"a",function(){return c});var i,n=r("Cy1f"),o=r("OIYib"),a=r("mmTy"),s=r("aiF/");function c(e,t){t.instanced&&t.instancedDoublePrecision&&(e.attributes.add("modelOriginHi","vec3"),e.attributes.add("modelOriginLo","vec3"),e.attributes.add("model","mat3"),e.attributes.add("modelNormal","mat3")),t.instancedDoublePrecision&&(e.vertex.include(s.a,t),e.vertex.uniforms.add("viewOriginHi","vec3"),e.vertex.uniforms.add("viewOriginLo","vec3"));const r=[o.a`
    vec3 calculateVPos() {
      ${t.instancedDoublePrecision?"return model * localPosition().xyz;":"return localPosition().xyz;"}
    }
    `,o.a`
    vec3 subtractOrigin(vec3 _pos) {
      ${t.instancedDoublePrecision?o.a`
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -modelOriginHi, -modelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `,o.a`
    vec3 dpNormal(vec4 _normal) {
      ${t.instancedDoublePrecision?"return normalize(modelNormal * _normal.xyz);":"return normalize(_normal.xyz);"}
    }
    `,o.a`
    vec3 dpNormalView(vec4 _normal) {
      ${t.instancedDoublePrecision?"return normalize((viewNormal * vec4(modelNormal * _normal.xyz, 1.0)).xyz);":"return normalize((viewNormal * _normal).xyz);"}
    }
    `,t.vertexTangets?o.a`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${t.instancedDoublePrecision?"return vec4(modelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}

    }
    `:o.a``];e.vertex.code.add(r[0]),e.vertex.code.add(r[1]),e.vertex.code.add(r[2]),2===t.output&&e.vertex.code.add(r[3]),e.vertex.code.add(r[4])}(i=c||(c={})).Uniforms=class{},i.bindCustomOrigin=function(e,t){Object(a.b)(t,l,u,3),e.setUniform3fv("viewOriginHi",l),e.setUniform3fv("viewOriginLo",u)};const l=Object(n.e)(),u=Object(n.e)()},"1W42":function(e,t,r){"use strict";r.d(t,"a",function(){return n}),r("wSAH");var i=r("OIYib");function n(e,t){i.a`
  /*
  *  ${t.name}
  *  ${0===t.output?"RenderOutput: Color":1===t.output?"RenderOutput: Depth":3===t.output?"RenderOutput: Shadow":2===t.output?"RenderOutput: Normal":4===t.output?"RenderOutput: Highlight":""}
  */
  `}},"368d":function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e,t){1===t.attributeTextureCoordinates&&(e.attributes.add("uv0","vec2"),e.varyings.add("vuv0","vec2"),e.vertex.code.add(i.a`
      void forwardTextureCoordinates() {
        vuv0 = uv0;
      }
    `)),2===t.attributeTextureCoordinates&&(e.attributes.add("uv0","vec2"),e.varyings.add("vuv0","vec2"),e.attributes.add("uvRegion","vec4"),e.varyings.add("vuvRegion","vec4"),e.vertex.code.add(i.a`
      void forwardTextureCoordinates() {
        vuv0 = uv0;
        vuvRegion = uvRegion;
      }
    `)),0===t.attributeTextureCoordinates&&e.vertex.code.add(i.a`
      void forwardTextureCoordinates() {}
    `)}},"69UF":function(e,t,r){"use strict";r.d(t,"a",function(){return a}),r.d(t,"b",function(){return n}),r.d(t,"c",function(){return o});var i=r("OIYib");const n=.1,o=.001;function a(e,t){const r=e.fragment;switch(t.alphaDiscardMode){case 0:r.code.add(i.a`
        #define discardOrAdjustAlpha(color) { if (color.a < ${i.a.float(.001)}) { discard; } }
      `);break;case 1:r.code.add(i.a`
        void discardOrAdjustAlpha(inout vec4 color) {
          color.a = 1.0;
        }
      `);break;case 2:r.uniforms.add("textureAlphaCutoff","float"),r.code.add(i.a`
        #define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }
      `);break;case 3:e.fragment.uniforms.add("textureAlphaCutoff","float"),e.fragment.code.add(i.a`
        #define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }
      `)}}},"6kvK":function(e,t,r){"use strict";r.d(t,"a",function(){return u});var i=r("OIYib"),n=r("xRv2"),o=r("0BfS"),a=r("XV/G"),s=r("cIib");function c(e,t){const r=e.fragment,n=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===n?(r.uniforms.add("lightingAmbientSH0","vec3"),r.code.add(i.a`
      vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
        vec3 ambientLight = 0.282095 * lightingAmbientSH0;
        return ambientLight * (1.0 - ambientOcclusion);
      }
    `)):1===n?(r.uniforms.add("lightingAmbientSH_R","vec4"),r.uniforms.add("lightingAmbientSH_G","vec4"),r.uniforms.add("lightingAmbientSH_B","vec4"),r.code.add(i.a`
      vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
        vec4 sh0 = vec4(
          0.282095,
          0.488603 * normal.x,
          0.488603 * normal.z,
          0.488603 * normal.y
        );
        vec3 ambientLight = vec3(
          dot(lightingAmbientSH_R, sh0),
          dot(lightingAmbientSH_G, sh0),
          dot(lightingAmbientSH_B, sh0)
        );
        return ambientLight * (1.0 - ambientOcclusion);
      }
    `)):2===n&&(r.uniforms.add("lightingAmbientSH0","vec3"),r.uniforms.add("lightingAmbientSH_R1","vec4"),r.uniforms.add("lightingAmbientSH_G1","vec4"),r.uniforms.add("lightingAmbientSH_B1","vec4"),r.uniforms.add("lightingAmbientSH_R2","vec4"),r.uniforms.add("lightingAmbientSH_G2","vec4"),r.uniforms.add("lightingAmbientSH_B2","vec4"),r.code.add(i.a`
      vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
        vec3 ambientLight = 0.282095 * lightingAmbientSH0;

        vec4 sh1 = vec4(
          0.488603 * normal.x,
          0.488603 * normal.z,
          0.488603 * normal.y,
          1.092548 * normal.x * normal.y
        );
        vec4 sh2 = vec4(
          1.092548 * normal.y * normal.z,
          0.315392 * (3.0 * normal.z * normal.z - 1.0),
          1.092548 * normal.x * normal.z,
          0.546274 * (normal.x * normal.x - normal.y * normal.y)
        );
        ambientLight += vec3(
          dot(lightingAmbientSH_R1, sh1),
          dot(lightingAmbientSH_G1, sh1),
          dot(lightingAmbientSH_B1, sh1)
        );
        ambientLight += vec3(
          dot(lightingAmbientSH_R2, sh2),
          dot(lightingAmbientSH_G2, sh2),
          dot(lightingAmbientSH_B2, sh2)
        );
        return ambientLight * (1.0 - ambientOcclusion);
      }
    `),1!==t.pbrMode&&2!==t.pbrMode||r.code.add(i.a`
        const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);

        vec3 calculateAmbientRadiance(float ambientOcclusion)
        {
          vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
          return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
        }
      `))}function l(e){const t=e.fragment;t.uniforms.add("lightingMainDirection","vec3"),t.uniforms.add("lightingMainIntensity","vec3"),t.uniforms.add("lightingFixedFactor","float"),t.code.add(i.a`
    vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
      float dotVal = clamp(-dot(normal_global, lightingMainDirection), 0.0, 1.0);

      // move lighting towards (1.0, 1.0, 1.0) if requested
      dotVal = mix(dotVal, 1.0, lightingFixedFactor);

      return lightingMainIntensity * ((1.0 - shadowing) * dotVal);
    }
  `)}function u(e,t){const r=e.fragment;e.include(l),e.include(s.a,t),0!==t.pbrMode&&e.include(a.a,t),e.include(c,t),t.receiveShadows&&e.include(o.a,t),r.uniforms.add("lightingGlobalFactor","float"),r.uniforms.add("ambientBoostFactor","float"),e.include(n.a),r.code.add(i.a`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${0===t.pbrMode?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),t.useOldSceneLightInterface?r.code.add(i.a`
    vec3 evaluateSceneLightingExt(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight) {
      // evaluate the main light
      #if defined(TREE_RENDERING)
        // Special case for tree rendering:
        // We shift the Lambert lobe to the back, allowing it to reach part of the hemisphere
        // facing away from the light. The idea is to get an effect where light is transmitted
        // through the tree.
        float minDot = -0.5;
        float dotRange = 1.0 - minDot;
        float dotNormalization = 0.66; // guessed & hand tweaked value, for an exact value we could precompute an integral over the sphere

        float dotVal = dotNormalization * (clamp(-dot(normal, lightingMainDirection), 1.0 - dotRange, 1.0) - minDot) * (1.0 / dotRange);
      #else
        float dotVal = clamp(-dot(normal, lightingMainDirection), 0.0, 1.0);
      #endif

      // move lighting towards (1.0, 1.0, 1.0) if requested
      dotVal = mix(dotVal, 1.0, lightingFixedFactor);

      vec3 mainLight = (1.0 - shadow) * lightingMainIntensity * dotVal;
      vec3 ambientLight = calculateAmbientIrradiance(normal, ssao);

      // inverse gamma correction on the albedo color
      vec3 albedoGammaC = pow(albedo, vec3(GAMMA_SRGB));

      // physically correct BRDF normalizes by PI
      vec3 totalLight = mainLight + ambientLight + additionalLight;
      totalLight = min(totalLight, vec3(PI));
      vec3 outColor = vec3((albedoGammaC / PI) * (totalLight));

      // apply gamma correction to the computed color
      outColor = pow(outColor, vec3(INV_GAMMA_SRGB));

      return outColor;
    }
  `):(r.code.add(1===t.viewingMode?i.a`
      float _oldHeuristicLighting(vec3 vPosWorld) {
        vec3 shadingNormalWorld = normalize(vPosWorld);
        float vndl = -dot(shadingNormalWorld, lightingMainDirection);

        return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
      }
    `:i.a`
      float _oldHeuristicLighting(vec3 vPosWorld) {
        float vndl = -dot(vec3(0.0, 0.0, 1.0), lightingMainDirection);
        return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
      }
    `),r.code.add(i.a`
      vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
        float additionalAmbientScale = _oldHeuristicLighting(vPosWorld);
        return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * lightingMainIntensity;
      }
    `),0===t.pbrMode||4===t.pbrMode?r.code.add(i.a`
      vec3 evaluateSceneLighting(vec3 normalWorld, vec3 baseColor, float mainLightShadow, float ambientOcclusion, vec3 additionalLight)
      {
        vec3 mainLighting = evaluateMainLighting(normalWorld, mainLightShadow);
        vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ambientOcclusion);
        // inverse gamma correction on the base color
        vec3 baseColorLinear = pow(baseColor, vec3(GAMMA_SRGB));

        // physically correct BRDF normalizes by PI
        vec3 totalLight = mainLighting + ambientLighting + additionalLight;
        totalLight = min(totalLight, vec3(PI));
        vec3 outColor = vec3((baseColorLinear / PI) * totalLight);

        // apply gamma correction to the computed color
        outColor = pow(outColor, vec3(INV_GAMMA_SRGB));

        return outColor;
      }
      `):1!==t.pbrMode&&2!==t.pbrMode||(r.code.add(i.a`
      const float fillLightIntensity = 0.25;
      const float horizonLightDiffusion = 0.4;
      const float additionalAmbientIrradianceFactor = 0.02;

      vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
      {
        // Calculate half vector between view and light direction
        vec3 viewDirection = -viewDir;
        vec3 mainLightDirection = -lightingMainDirection;
        vec3 h = normalize(viewDirection + mainLightDirection);

        PBRShadingInfo inputs;
        inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
        inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
        inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
        inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
        inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
        vec3 reflectedView = normalize(reflect(viewDirection, normal));
        inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);

        inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
        inputs.ssao = ssao;

        inputs.metalness = mrr[0];
        inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);
      `),r.code.add(i.a`
        inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
        inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0)); // more accurate then using  f90 = 1.0
        inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);
      `),r.code.add(i.a`
        vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
        ambientDir = ambientDir != vec3(0.0)? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));

        inputs.NdotAmbDir = abs(dot(normal, ambientDir));

        // Calculate the irradiance components: sun, fill lights and the sky.
        vec3 mainLightIrradianceComponent  = inputs.NdotL * (1.0 - shadow) * lightingMainIntensity;
        vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * lightingMainIntensity * fillLightIntensity;
        // calculateAmbientIrradiance for localView and additionalLight for gloabalView
        vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;

        // Assemble the overall irradiance of the sky that illuminates the surface
        inputs.skyIrradianceToSurface    = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
        // Assemble the overall irradiance of the ground that illuminates the surface. for this we use the simple model that changes only the sky irradiance by the groundReflectance
        inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
      `),r.code.add(i.a`
        vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
        vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
        inputs.NdotH_Horizon = dot(normal, horizonRingH);

        vec3 mainLightRadianceComponent  = normalDistribution(inputs.NdotH, inputs.roughness) * lightingMainIntensity * (1.0 - shadow);
        vec3 horizonLightRadianceComponent = normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * lightingMainIntensity * fillLightIntensity;
        vec3 ambientLightRadianceComponent = calculateAmbientRadiance(ssao) + additionalLight; // calculateAmbientRadiance for localView and additionalLight for gloabalView

        // Assemble the overall radiance of the sky that illuminates the surface
        inputs.skyRadianceToSurface    =  ambientLightRadianceComponent + mainLightRadianceComponent + horizonLightRadianceComponent;
        // Assemble the overall radiance of the ground that illuminates the surface. for this we use the simple model that changes only the sky radince by the groundReflectance
        inputs.groundRadianceToSurface = GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) + mainLightRadianceComponent;

        // Calculate average ambient radiance - this is used int the gamut mapping part to deduce the black level that is soft compressed
        inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);
        `),r.code.add(i.a`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${2===t.pbrMode?i.a`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`:i.a`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `)))}},AxBq:function(e,t,r){"use strict";r.d(t,"a",function(){return P}),r.d(t,"b",function(){return A});var i=r("OIYib"),n=r("Tbkp"),o=r("aQrP"),a=r("0nJL"),s=r("viRi"),c=r("69UF"),l=r("F7CJ"),u=r("bVvB"),d=r("0BfS"),f=r("vXUg"),h=r("XV/G"),m=r("1TnO"),p=r("368d"),b=r("p9cc"),g=r("F8o4"),v=r("wzLF"),x=r("sJp1"),O=r("bLIi"),y=r("fRF2"),_=r("fiGu"),w=r("DXpj"),j=r("cIib"),T=r("6kvK"),S=r("qrV2"),M=r("1W42"),C=r("NiZE");function A(e){const t=new o.a,r=t.vertex.code,A=t.fragment.code;return t.include(M.a,{name:"Default Material Shader",output:e.output}),t.vertex.uniforms.add("proj","mat4").add("view","mat4").add("camPos","vec3").add("localOrigin","vec3"),t.include(x.a),t.varyings.add("vpos","vec3"),t.include(s.a,e),t.include(m.a,e),t.include(l.a,e),0!==e.output&&7!==e.output||(t.include(v.a,e),t.include(n.a,{linearDepth:!1}),0===e.normalType&&e.offsetBackfaces&&t.include(g.a),t.include(w.a,e),t.include(y.a,e),e.instancedColor&&t.attributes.add("instanceColor","vec4"),t.varyings.add("localvpos","vec3"),t.include(p.a,e),t.include(f.a,e),t.include(O.a,e),t.include(u.a,e),t.vertex.uniforms.add("externalColor","vec4"),t.varyings.add("vcolorExt","vec4"),r.add(i.a`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${e.instancedColor?"vcolorExt *= instanceColor;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${i.a.float(c.c)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        }
        else {
          vpos = calculateVPos();
          localvpos = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${0===e.normalType?i.a`
          vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${e.vertexTangets?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, vpos);
          ${0===e.normalType&&e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, camPos);":""}
        }
        forwardLinearDepth();
        forwardTextureCoordinates();
      }
    `)),7===e.output&&(t.include(a.a,e),t.include(c.a,e),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("opacity","float").add("layerOpacity","float"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.fragment.include(C.a),A.add(i.a`
      void main() {
        discardBySlice(vpos);
        ${e.hasColorTexture?i.a`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:i.a`vec4 texColor = vec4(1.0);`}
        ${e.attributeColor?i.a`
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:i.a`
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        gl_FragColor = vec4(opacity_);
      }
    `)),0===e.output&&(t.include(a.a,e),t.include(T.a,e),t.include(j.a,e),t.include(c.a,e),e.receiveShadows&&t.include(d.a,e),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("ambient","vec3").add("diffuse","vec3").add("opacity","float").add("layerOpacity","float"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.include(b.a,e),t.include(h.a,e),t.fragment.include(C.a),t.include(S.a,e),A.add(i.a`
      void main() {
        discardBySlice(vpos);
        ${e.hasColorTexture?i.a`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:i.a`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - camPos);
        ${3===e.normalType?i.a`
        vec3 normal = screenDerivativeNormal(localvpos);`:i.a`
        shadingParams.normalView = vNormalWorld;
        vec3 normal = shadingNormal(shadingParams);`}
        ${1===e.pbrMode?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = _oldHeuristicLighting(vpos + localOrigin);
        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":1===e.viewingMode?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.attributeColor?i.a`
        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:i.a`
        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        ${e.hasNormalTexture?i.a`
              mat3 tangentSpace = ${e.vertexTangets?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
              vec3 shadedNormal = computeTextureNormal(tangentSpace, vuv0);`:"vec3 shadedNormal = normal;"}
        ${1===e.pbrMode||2===e.pbrMode?1===e.viewingMode?i.a`vec3 normalGround = normalize(vpos + localOrigin);`:i.a`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:i.a``}
        ${1===e.pbrMode||2===e.pbrMode?i.a`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];
            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:"vec3 shadedColor = evaluateSceneLighting(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight);"}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.OITEnabled?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
      }
    `)),t.include(_.a,e),t}var P=Object.freeze({__proto__:null,build:A})},D6bk:function(e,t,r){"use strict";var i=r("hTmG");let n=0;t.a=class{constructor(e,t,r,i,o){this._context=e,this._locations=t,this._layout=r,this._buffers=i,this._indexBuffer=o,this._glName=null,this.id=n++,this._initialized=!1,e.instanceCounter.increment(2,this)}get glName(){return this._glName}get vertexBuffers(){return this._buffers}get indexBuffer(){return this._indexBuffer}get size(){return Object.keys(this._buffers).reduce((e,t)=>e+this._buffers[t].size,this._indexBuffer?this._indexBuffer.size:0)}get layout(){return this._layout}get locations(){return this._locations}dispose(e=!0){if(!this._context)return;const t=this._context.capabilities.vao;if(t&&this._glName&&(t.deleteVertexArray(this._glName),this._glName=null),this._context.getBoundVAO()===this&&this._context.bindVAO(null),e){for(const e in this._buffers)this._buffers[e].dispose(),delete this._buffers[e];this._indexBuffer&&(this._indexBuffer.dispose(),this._indexBuffer=null)}this._context.instanceCounter.decrement(2,this),this._context=null}initialize(){if(this._initialized)return;const e=this._context.capabilities.vao;if(e){const t=e.createVertexArray();e.bindVertexArray(t),this._bindLayout(),e.bindVertexArray(null),this._glName=t}this._initialized=!0}bind(){this.initialize();const e=this._context.capabilities.vao;e?e.bindVertexArray(this.glName):(this._context.bindVAO(null),this._bindLayout())}_bindLayout(){const e=this._buffers,t=!!this._context.capabilities.vao,r=this._layout,n=this._indexBuffer;e||console.error("Vertex buffer dictionary is empty!");const o=this._context.gl;for(const a in e){const t=e[a];t||console.error("Vertex buffer is uninitialized!");const n=r[a];n||console.error("Vertex element descriptor is empty!"),Object(i.a)(this._context,this._locations,t,n)}n&&(t?o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,n.glName):this._context.bindBuffer(n))}unbind(){this.initialize();const e=this._context.capabilities.vao;e?e.bindVertexArray(null):this._unbindLayout()}_unbindLayout(){const e=this._buffers,t=this._layout;e||console.error("Vertex buffer dictionary is empty!");for(const n in e){const r=e[n];r||console.error("Vertex buffer is uninitialized!");const o=t[n];Object(i.b)(this._context,this._locations,r,o)}const r=this._indexBuffer;r&&this._context.unbindBuffer(r.bufferType)}}},D8Ta:function(e,t,r){"use strict";function i(){return[0,0,0,0]}function n(e,t,r,i){return[e,t,r,i]}function o(e,t){return new Float64Array(e,t,4)}function a(){return n(1,1,1,1)}function s(){return n(1,0,0,0)}function c(){return n(0,1,0,0)}function l(){return n(0,0,1,0)}function u(){return n(0,0,0,1)}r.d(t,"a",function(){return i}),r.d(t,"b",function(){return n}),r.d(t,"c",function(){return o});const d=a(),f=s(),h=c(),m=l(),p=u();Object.freeze({__proto__:null,create:i,clone:function(e){return[e[0],e[1],e[2],e[3]]},fromValues:n,fromArray:function(e){const t=[0,0,0,0],r=Math.min(4,e.length);for(let i=0;i<r;++i)t[i]=e[i];return t},createView:o,zeros:function(){return[0,0,0,0]},ones:a,unitX:s,unitY:c,unitZ:l,unitW:u,ZEROS:[0,0,0,0],ONES:d,UNIT_X:f,UNIT_Y:h,UNIT_Z:m,UNIT_W:p})},DXpj:function(e,t,r){"use strict";r.d(t,"a",function(){return o});var i=r("OIYib"),n=r("fLTx");function o(e,t){const r=e.fragment;r.uniforms.add("normalTexture","sampler2D"),r.uniforms.add("normalTextureSize","vec2"),t.vertexTangets?(e.attributes.add("tangent","vec4"),e.varyings.add("vTangent","vec4"),r.code.add(2===t.doubleSidedMode?i.a`
      mat3 computeTangentSpace(vec3 normal) {
        float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
        vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
        vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
        return mat3(tangent, bitangent, normal);
      }
    `:i.a`
      mat3 computeTangentSpace(vec3 normal) {
        float tangentHeadedness = vTangent.w;
        vec3 tangent = normalize(vTangent.xyz);
        vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
        return mat3(tangent, bitangent, normal);
      }
    `)):(e.extensions.add("GL_OES_standard_derivatives"),r.code.add(i.a`
    mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {

      vec3 Q1 = dFdx(pos);
      vec3 Q2 = dFdy(pos);

      vec2 stx = dFdx(st);
      vec2 sty = dFdy(st);

      float det = stx.t * sty.s - sty.t * stx.s;

      vec3 T = stx.t * Q2 - sty.t * Q1; // compute tangent
      T = T - normal * dot(normal, T); // orthogonalize tangent
      T *= inversesqrt(max(dot(T,T), 1.e-10)); // "soft" normalize - goes to 0 when T goes to 0
      vec3 B = sign(det) * cross(normal, T); // assume normal is normalized, B has the same lenght as B
      return mat3(T, B, normal); // T and B go to 0 when the tangent space is not well defined by the uv coordinates
    }
  `)),0!==t.attributeTextureCoordinates&&(e.include(n.a,t),r.code.add(i.a`
    vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
      vtc.uv = uv;
      ${t.supportsTextureAtlas?"vtc.size = normalTextureSize;":""}
      vec3 rawNormal = textureLookup(normalTexture, vtc).rgb * 2.0 - 1.0;
      return tangentSpace * rawNormal;
    }
  `))}},EVMh:function(e,t,r){"use strict";r.d(t,"a",function(){return o}),r.d(t,"b",function(){return a}),r.d(t,"c",function(){return s}),r.d(t,"d",function(){return c}),r.d(t,"e",function(){return l}),r("OKTS"),r("Cy1f"),r("15Hh"),r("AvGH");var i=r("D8Ta");r("M0lq"),r("dXfX"),Object(i.a)();class n{constructor(e){this.message=e}toString(){return"AssertException: "+this.message}}const o={POSITION:"position",NORMAL:"normal",UV0:"uv0",UVMAPSPACE:"uvMapSpace",MEANVERTEXPOSITION:"meanVertexPosition",AUXPOS1:"auxpos1",AUXPOS2:"auxpos2",BOUND1:"bound1",BOUND2:"bound2",BOUND3:"bound3",COLOR:"color",SYMBOLCOLOR:"symbolColor",SIZE:"size",TANGENT:"tangent"};function a(e,t){if(!e){t=t||"assert";const e=new Error(t);throw e.stack&&console.log(e.stack),new n(t)}}function s(e){return e[function(e){for(const t in e)return t}(e)]}function c(e,t,r,i){e[12]=t,e[13]=r,e[14]=i}function l(e,t=0){let r=0;for(let i=0;i<4;i++)r+=e[t+i]*u[i];return r}const u=[1/256,1/65536,1/16777216,1/4294967296];l(new Uint8ClampedArray([255,255,255,255]))},F7CJ:function(e,t,r){"use strict";r.d(t,"a",function(){return a});var i=r("OIYib"),n=r("fFEv");function o(e){e.vertex.code.add(i.a`
    float screenSizePerspectiveMinSize(float size, vec4 factor) {
      float nonZeroSize = 1.0 - step(size, 0.0);

      return (
        factor.z * (
          1.0 +
          // Multiply by nzs ensures if size is 0, then we ignore proportionally scaled padding
          nonZeroSize *
          2.0 * factor.w / (
            size + (1.0 - nonZeroSize) // Adding 1 - nzs ensures we divide either by size, or by 1
          )
        )
      );
    }
  `),e.vertex.code.add(i.a`
    float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
      return absCosAngle * absCosAngle * absCosAngle;
    }
  `),e.vertex.code.add(i.a`
    vec4 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec4 params) {
      return vec4(
        min(params.x / (distanceToCamera - params.y), 1.0),
        screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
        params.z,
        params.w
      );
    }
  `),e.vertex.code.add(i.a`
    float applyScreenSizePerspectiveScaleFactorFloat(float size, vec4 factor) {
      return max(mix(size * factor.x, size, factor.y), screenSizePerspectiveMinSize(size, factor));
    }
  `),e.vertex.code.add(i.a`
    float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec4 params) {
      return applyScreenSizePerspectiveScaleFactorFloat(
        size,
        screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
      );
    }
  `),e.vertex.code.add(i.a`
    vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec4 factor) {
      return mix(size * clamp(factor.x, screenSizePerspectiveMinSize(size.y, factor) / size.y, 1.0), size, factor.y);
    }
  `),e.vertex.code.add(i.a`
    vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec4 params) {
      return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
    }
  `)}function a(e,t){const r=e.vertex.code;t.verticalOffsetEnabled?(e.vertex.uniforms.add("verticalOffset","vec4"),t.screenSizePerspectiveEnabled&&(e.include(o),e.vertex.uniforms.add("screenSizePerspectiveAlignment","vec4")),r.add(i.a`
    vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
      float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
      ${1===t.viewingMode?i.a`vec3 worldNormal = normalize(worldPos + localOrigin);`:i.a`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
      ${t.screenSizePerspectiveEnabled?i.a`
          float cosAngle = dot(worldNormal, normalize(worldPos - camPos));
          float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:i.a`
          float verticalOffsetScreenHeight = verticalOffset.x;`}
      // Screen sized offset in world space, used for example for line callouts
      float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
      return worldNormal * worldOffset;
    }

    vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
      return worldPos + calculateVerticalOffset(worldPos, localOrigin);
    }
    `)):r.add(i.a`
    vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }
    `)}(o||(o={})).bindUniforms=function(e,t){if(t.screenSizePerspective){Object(n.a)(t.screenSizePerspective,e,"screenSizePerspective");const r=t.screenSizePerspectiveAlignment||t.screenSizePerspective;Object(n.a)(r,e,"screenSizePerspectiveAlignment")}},(a||(a={})).bindUniforms=function(e,t,r){if(!t.verticalOffset)return;const i=function(e,t,r,i=s){return i.screenLength=e.screenLength,i.perDistance=Math.tan(.5*t)/(.5*r),i.minWorldLength=e.minWorldLength,i.maxWorldLength=e.maxWorldLength,i}(t.verticalOffset,r.camera.fovY,r.camera.fullViewport[3]);e.setUniform4f("verticalOffset",i.screenLength*(r.camera.pixelRatio||1),i.perDistance,i.minWorldLength,i.maxWorldLength)};const s={screenLength:0,perDistance:0,minWorldLength:0,maxWorldLength:0}},F8o4:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e){e.vertex.code.add(i.a`
    vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
      vec3 camToVert = posWorld - camPosWorld;

      bool isBackface = dot(camToVert, normalWorld) > 0.0;
      if (isBackface) {
        posClip.z += 0.0000003 * posClip.w;
      }
      return posClip;
    }
  `)}},NiZE:function(e,t,r){"use strict";r.d(t,"a",function(){return o});var i=r("OIYib");function n(e){e.code.add(i.a`
    vec4 premultiplyAlpha(vec4 v) {
      return vec4(v.rgb * v.a, v.a);
    }

    // Note: the min in the last line has been added to fix an instability in chrome.
    // See https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/23911
    // With proper floating point handling, the value could never be >1.
    vec3 rgb2hsv(vec3 c) {
      vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
      vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
      vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);

      float d = q.x - min(q.w, q.y);
      float e = 1.0e-10;
      return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
    }

    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    float rgb2v(vec3 c) {
      return max(c.x, max(c.y, c.z));
    }
  `)}function o(e){e.include(n),e.code.add(i.a`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${i.a.int(1)}) {
        return allMixed;
      }
      else if (mode == ${i.a.int(2)}) {
        return internalMixed;
      }
      else if (mode == ${i.a.int(3)}) {
        return externalColor;
      }
      else {
        // tint (or something invalid)
        float vIn = rgb2v(internalMixed);
        vec3 hsvTint = rgb2hsv(externalColor);
        vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
        return hsv2rgb(hsvOut);
      }
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${i.a.int(2)}) {
        return internalMixed;
      }
      else if (mode == ${i.a.int(3)}) {
        return externalOpacity;
      }
      else {
        // multiply or tint (or something invalid)
        return allMixed;
      }
    }
  `)}},OIYib:function(e,t,r){"use strict";function i(e,...t){let r="";for(let i=0;i<t.length;i++)r+=e[i]+t[i];return r+=e[e.length-1],r}r.d(t,"a",function(){return i}),function(e){e.int=function(e){return Math.round(e).toString()},e.float=function(e){return e.toPrecision(8)}}(i||(i={}))},Tbkp:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e,t){e.vertex.code.add(t.linearDepth?i.a`
    vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
      vec4 eye = view * vec4(pos, 1.0);
      depth = (-eye.z - nearFar[0]) / (nearFar[1] - nearFar[0]) ;
      return proj * eye;
    }
    `:i.a`
    vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
      // Make sure the order of operations is the same as in transformPositionWithDepth.
      return proj * (view * vec4(pos, 1.0));
    }
    `)}},UBvB:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e){e.code.add(i.a`
    // This is the maximum float value representable as 32bit fixed point,
    // it is rgba2float(vec4(1)) inlined.
    const float MAX_RGBA_FLOAT =
      255.0 / 256.0 +
      255.0 / 256.0 / 256.0 +
      255.0 / 256.0 / 256.0 / 256.0 +
      255.0 / 256.0 / 256.0 / 256.0 / 256.0;

    // Factors to convert to fixed point, i.e. factors (256^0, 256^1, 256^2, 256^3)
    const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);

    vec4 float2rgba(const float value) {
      // Make sure value is in the domain we can represent
      float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);

      // Decompose value in 32bit fixed point parts represented as
      // uint8 rgba components. Decomposition uses the fractional part after multiplying
      // by a power of 256 (this removes the bits that are represented in the previous
      // component) and then converts the fractional part to 8bits.
      vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);

      // Convert uint8 values (from 0 to 255) to floating point representation for
      // the shader
      const float toU8AsFloat = 1.0 / 255.0;

      return fixedPointU8 * toU8AsFloat;
    }

    // Factors to convert rgba back to float
    const vec4 RGBA_2_FLOAT_FACTORS = vec4(
      255.0 / (256.0),
      255.0 / (256.0 * 256.0),
      255.0 / (256.0 * 256.0 * 256.0),
      255.0 / (256.0 * 256.0 * 256.0 * 256.0)
    );

    float rgba2float(vec4 rgba) {
      // Convert components from 0->1 back to 0->255 and then
      // add the components together with their corresponding
      // fixed point factors, i.e. (256^1, 256^2, 256^3, 256^4)
      return dot(rgba, RGBA_2_FLOAT_FACTORS);
    }
  `)}},"XV/G":function(e,t,r){"use strict";r.d(t,"a",function(){return a});var i=r("OIYib"),n=r("xRv2");function o(e){const t=e.fragment.code;t.add(i.a`
    vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
    {
      return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
    }
    `),t.add(i.a`
    float integratedRadiance(float cosTheta2, float roughness)
    {
      return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
    }
    `),t.add(i.a`
    vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
    {
      float cosTheta2 = 1.0 - RdotNG * RdotNG;
      float intRadTheta = integratedRadiance(cosTheta2, roughness);

      // Calculate the integrated directional radiance of the ground and the sky
      float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
      float sky = 2.0 - ground;
      return (ground * ambientGround + sky * ambientSky) * 0.5;
    }
    `)}function a(e,t){const r=e.fragment.code;e.include(n.a),3===t.pbrMode||4===t.pbrMode?(r.add(i.a`
    struct PBRShadingWater
    {
        float NdotL;   // cos angle between normal and light direction
        float NdotV;   // cos angle between normal and view direction
        float NdotH;   // cos angle between normal and half vector
        float VdotH;   // cos angle between view direction and half vector
        float LdotH;   // cos angle between light direction and half vector
        float VdotN;   // cos angle between view direction and normal vector
    };

    float dtrExponent = ${t.useCustomDTRExponentForWater?"2.2":"2.0"};
    `),r.add(i.a`
    vec3 fresnelReflection(float angle, vec3 f0, float f90) {
      return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
    }
    `),r.add(i.a`
    float normalDistributionWater(float NdotH, float roughness)
    {
      float r2 = roughness * roughness;
      float NdotH2 = NdotH * NdotH;
      float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
      return r2 / denom;
    }
    `),r.add(i.a`
    float geometricOcclusionKelemen(float LoH)
    {
        return 0.25 / (LoH * LoH);
    }
    `),r.add(i.a`
    vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max)
    {
      vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
      float dSun = normalDistributionWater(props.NdotH, roughness);
      float V = geometricOcclusionKelemen(props.LdotH);

      float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
      float strengthSunHaze  = 1.2;
      float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze)*strengthSunHaze;

      return ((dSun + dSunHaze) * V) * F;
    }

    vec3 tonemapACES(const vec3 x) {
      return (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
    }
    `)):1!==t.pbrMode&&2!==t.pbrMode||(e.include(o),r.add(i.a`
    struct PBRShadingInfo
    {
        float NdotL;                  // cos angle between normal and light direction
        float NdotV;                  // cos angle between normal and view direction
        float NdotH;                  // cos angle between normal and half vector
        float VdotH;                  // cos angle between view direction and half vector
        float LdotH;                  // cos angle between view light direction and half vector
        float NdotNG;                 // cos angle between normal and normal of the ground
        float RdotNG;                 // cos angle between view direction reflected of the normal and normal of the ground
        float NdotAmbDir;             // cos angle between view direction and the fill light in ambient illumination
        float NdotH_Horizon;          // cos angle between normal and half vector defined with horizon illumination
        vec3 skyRadianceToSurface;         // integrated radiance of the sky based on the surface roughness (used for specular reflection)
        vec3 groundRadianceToSurface;      // integrated radiance of the ground based on the surface roughness (used for specular reflection)
        vec3 skyIrradianceToSurface;       // irradiance of the sky (used for diffuse reflection)
        vec3 groundIrradianceToSurface;    // irradiance of the ground (used for diffuse reflection)

        float averageAmbientRadiance;      // average ambient radiance used to deduce black level in gamut mapping
        float ssao;                   // ssao coefficient
        vec3 albedoLinear;            // linear color of the albedo
        vec3 f0;                      // fresnel value at normal incident light
        vec3 f90;                     // fresnel value at 90o of incident light

        vec3 diffuseColor;            // diffuse color of the material used in environment illumination
        float metalness;              // metalness of the material
        float roughness;              // roughness of the material
    };
    `),r.add(i.a`
    float normalDistribution(float NdotH, float roughness)
    {
        float a = NdotH * roughness;
        float b = roughness / (1.0 - NdotH * NdotH + a * a);
        return b * b * INV_PI;
    }
    `),r.add(i.a`
    const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
    const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
    const vec2 c2 = vec2(-1.04, 1.04);

    vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
        vec4 r = roughness * c0 + c1;
        float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
        return c2 * a004 + r.zw;
    }
    `),r.add(i.a`
    vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
      vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
      vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);

      // From diffuse illumination calculate reflected color
      vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;

      // From specular illumination calculate reflected color
      vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
      vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
      vec3 specularComponent = specularColor * indirectSpecular;

      return (diffuseComponent + specularComponent);
    }
    `),r.add(i.a`
    float gamutMapChanel(float x, vec2 p){
      return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
    }`),r.add(i.a`
    vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
      vec3 outColor;
      vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
      outColor.x = gamutMapChanel(inColor.x, p) ;
      outColor.y = gamutMapChanel(inColor.y, p) ;
      outColor.z = gamutMapChanel(inColor.z, p) ;
      return outColor;
    }
    `))}},aQrP:function(e,t,r){"use strict";r.d(t,"a",function(){return o});const i=r("6S2I").a.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class n{constructor(){this.includedModules=new Map}include(e,t){this.includedModules.has(e)?this.includedModules.get(e)!==t&&i.error("Trying to include shader module multiple times with different sets of options."):(this.includedModules.set(e,t),e(this.builder,t))}}class o extends n{constructor(){super(...arguments),this.vertex=new c,this.fragment=new c,this.attributes=new l,this.varyings=new u,this.extensions=new d,this.defines=new f}get builder(){return this}generateSource(e){const t=this.extensions.generateSource(e),r=this.attributes.generateSource(e),i=this.varyings.generateSource(),n="vertex"===e?this.vertex:this.fragment,o=n.uniforms.generateSource(),a=n.code.generateSource(),s="vertex"===e?m:h,c=this.defines.generateSource().concat(n.defines.generateSource());return`\n${t.join("\n")}\n\n${c.join("\n")}\n\n${s}\n\n${o.join("\n")}\n\n${r.join("\n")}\n\n${i.join("\n")}\n\n${a.join("\n")}`}}class a{constructor(){this._entries=new Array,this._set=new Set}add(e,t,r){const i=`${e}_${t}_${r}`;return this._set.has(i)||(this._entries.push([e,t,r]),this._set.add(i)),this}generateSource(){return this._entries.map(e=>{return`uniform ${e[1]} ${e[0]}${t=e[2],t?`[${t}]`:""};`;var t})}}class s{constructor(){this._entries=new Array}add(e){this._entries.push(e)}generateSource(){return this._entries}}class c extends n{constructor(){super(...arguments),this.uniforms=new a,this.code=new s,this.defines=new f}get builder(){return this}}class l{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return"fragment"===e?[]:this._entries.map(e=>`attribute ${e[1]} ${e[0]};`)}}class u{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(){return this._entries.map(e=>`varying ${e[1]} ${e[0]};`)}}class d{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t="vertex"===e?d.ALLOWLIST_VERTEX:d.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter(e=>t.includes(e)).map(e=>`#extension ${e} : enable`)}}d.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],d.ALLOWLIST_VERTEX=[];class f{constructor(){this._entries=new Map}addInt(e,t){const r=t%1==0?t.toFixed(0):t.toString();this._entries.set(e,r)}addFloat(e,t){const r=t%1==0?t.toFixed(1):t.toString();this._entries.set(e,r)}generateSource(){return Array.from(this._entries,([e,t])=>`#define ${e} ${t}`)}}const h="#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  precision highp sampler2D;\n#else\n  precision mediump float;\n  precision mediump sampler2D;\n#endif",m="precision highp float;\nprecision highp sampler2D;"},agdK:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e){e.fragment.uniforms.add("depthTex","sampler2D"),e.fragment.uniforms.add("highlightViewportPixelSz","vec4"),e.fragment.code.add(i.a`
    void outputHighlight() {
      vec4 fragCoord = gl_FragCoord;

      float sceneDepth = texture2D(depthTex, (fragCoord.xy - highlightViewportPixelSz.xy) * highlightViewportPixelSz.zw).r;
      if (fragCoord.z > sceneDepth + 5e-7) {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
      }
      else {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
      }
    }
  `)}(n||(n={})).bindOutputHighlight=function(e,t,r){e.bindTexture(r.highlightDepthTexture,5),t.setUniform1i("depthTex",5),t.setUniform4f("highlightViewportPixelSz",0,0,r.inverseViewport[0],r.inverseViewport[1])}},"aiF/":function(e,t,r){"use strict";r.d(t,"a",function(){return b}),r.d(t,"b",function(){return g});var i=r("wSAH"),n=r("OIYib"),o=r("srIe"),a=(r("OKTS"),r("Cy1f")),s=r("jjdI"),c=r("EVMh"),l=r("fOQB"),u=r("D6bk"),d=r("mmTy"),f=r("0meK");r("bfJE");class h{constructor(e){this.context=e,this._doublePrecisionRequiresObfuscation=null}get doublePrecisionRequiresObfuscation(){if(Object(o.g)(this._doublePrecisionRequiresObfuscation)){const e=p(this.context,!1),t=p(this.context,!0);this._doublePrecisionRequiresObfuscation=0!==e&&(0===t||e/t>5)}return this._doublePrecisionRequiresObfuscation}}let m=null;function p(e,t){const r=new f.a(e,{colorTarget:0,depthStencilTarget:0},{target:3553,wrapMode:33071,pixelFormat:6408,dataType:5121,samplingMode:9728,width:1,height:1}),i=l.a.createVertex(e,35044,new Uint16Array([0,0,1,0,0,1,1,1])),n=new u.a(e,{a_pos:0},{geometry:[{name:"a_pos",count:2,type:5123,offset:0,stride:4,normalized:!1}]},{geometry:i}),o=Object(a.g)(5633261.287538229,2626832.878767164,1434988.0495278358),h=Object(a.g)(5633271.46742708,2626873.6381334523,1434963.231608387),m=function(r,i){const n=new s.a(e,`\n\n  precision highp float;\n\n  attribute vec2 a_pos;\n\n  uniform vec3 u_highA;\n  uniform vec3 u_lowA;\n  uniform vec3 u_highB;\n  uniform vec3 u_lowB;\n\n  varying vec4 v_color;\n\n  ${t?"#define DOUBLE_PRECISION_REQUIRES_OBFUSCATION":""}\n\n  #ifdef DOUBLE_PRECISION_REQUIRES_OBFUSCATION\n\n  vec3 dpPlusFrc(vec3 a, vec3 b) {\n    return mix(a, a + b, vec3(notEqual(b, vec3(0))));\n  }\n\n  vec3 dpMinusFrc(vec3 a, vec3 b) {\n    return mix(vec3(0), a - b, vec3(notEqual(a, b)));\n  }\n\n  vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {\n    vec3 t1 = dpPlusFrc(hiA, hiB);\n    vec3 e = dpMinusFrc(t1, hiA);\n    vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;\n    return t1 + t2;\n  }\n\n  #else\n\n  vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {\n    vec3 t1 = hiA + hiB;\n    vec3 e = t1 - hiA;\n    vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;\n    return t1 + t2;\n  }\n\n  #endif\n\n  const float MAX_RGBA_FLOAT =\n    255.0 / 256.0 +\n    255.0 / 256.0 / 256.0 +\n    255.0 / 256.0 / 256.0 / 256.0 +\n    255.0 / 256.0 / 256.0 / 256.0 / 256.0;\n\n  const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);\n\n  vec4 float2rgba(const float value) {\n    // Make sure value is in the domain we can represent\n    float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);\n\n    // Decompose value in 32bit fixed point parts represented as\n    // uint8 rgba components. Decomposition uses the fractional part after multiplying\n    // by a power of 256 (this removes the bits that are represented in the previous\n    // component) and then converts the fractional part to 8bits.\n    vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);\n\n    // Convert uint8 values (from 0 to 255) to floating point representation for\n    // the shader\n    const float toU8AsFloat = 1.0 / 255.0;\n\n    return fixedPointU8 * toU8AsFloat;\n  }\n\n  void main() {\n    vec3 val = dpAdd(u_highA, u_lowA, -u_highB, -u_lowB);\n\n    v_color = float2rgba(val.z / 25.0);\n\n    gl_Position = vec4(a_pos * 2.0 - 1.0, 0.0, 1.0);\n  }\n  `,"\n  precision highp float;\n\n  varying vec4 v_color;\n\n  void main() {\n    gl_FragColor = v_color;\n  }\n  ",{a_pos:0}),o=new Float32Array(6);Object(d.a)(r,o,3);const a=new Float32Array(6);return Object(d.a)(i,a,3),e.bindProgram(n),n.setUniform3f("u_highA",o[0],o[2],o[4]),n.setUniform3f("u_lowA",o[1],o[3],o[5]),n.setUniform3f("u_highB",a[0],a[2],a[4]),n.setUniform3f("u_lowB",a[1],a[3],a[5]),n}(o,h),p=e.getBoundFramebufferObject(),{x:b,y:g,width:v,height:x}=e.getViewport();e.bindFramebuffer(r),e.setViewport(0,0,1,1),e.bindVAO(n),e.drawArrays(5,0,4);const O=new Uint8Array(4);r.readPixels(0,0,1,1,6408,5121,O),m.dispose(),n.dispose(!1),i.dispose(),r.dispose(),e.setViewport(b,g,v,x),e.bindFramebuffer(p);const y=(o[2]-h[2])/25,_=Object(c.e)(O);return Math.abs(y-_)}function b({code:e},t){e.add(t.doublePrecisionRequiresObfuscation?n.a`
      vec3 dpPlusFrc(vec3 a, vec3 b) {
        return mix(a, a + b, vec3(notEqual(b, vec3(0))));
      }

      vec3 dpMinusFrc(vec3 a, vec3 b) {
        return mix(vec3(0), a - b, vec3(notEqual(a, b)));
      }

      // based on https://www.thasler.com/blog/blog/glsl-part2-emu
      vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
        vec3 t1 = dpPlusFrc(hiA, hiB);
        vec3 e = dpMinusFrc(t1, hiA);
        vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
        return t1 + t2;
      }
    `:n.a`
      vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
        vec3 t1 = hiA + hiB;
        vec3 e = t1 - hiA;
        vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
        return t1 + t2;
      }
    `)}function g(e){return!!Object(i.a)("force-double-precision-obfuscation")||(t=e,(Object(o.g)(m)||m.context!==t)&&(m=new h(t)),m).doublePrecisionRequiresObfuscation;var t}},bLIi:function(e,t,r){"use strict";r.d(t,"a",function(){return o});var i=r("OIYib");function n(e){e.vertex.code.add(i.a`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${i.a.int(1)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${i.a.int(3)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${i.a.int(4)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${i.a.int(1)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}function o(e,t){t.symbolColor?(e.include(n),e.attributes.add("symbolColor","vec4"),e.varyings.add("colorMixMode","mediump float")):e.fragment.uniforms.add("colorMixMode","int"),e.vertex.code.add(t.symbolColor?i.a`
    int symbolColorMixMode;

    vec4 getSymbolColor() {
      return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
    }

    void forwardColorMixMode() {
      colorMixMode = float(symbolColorMixMode) + 0.5;
    }
  `:i.a`
    vec4 getSymbolColor() { return vec4(1.0); }
    void forwardColorMixMode() {}
    `)}},bVvB:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e,t){t.attributeColor?(e.attributes.add("color","vec4"),e.varyings.add("vColor","vec4"),e.vertex.code.add(i.a`
      void forwardVertexColor() { vColor = color; }
    `),e.vertex.code.add(i.a`
      void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }
    `)):e.vertex.code.add(i.a`
      void forwardVertexColor() {}
      void forwardNormalizedVertexColor() {}
    `)}},cIib:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e,t){const r=e.fragment;t.receiveAmbientOcclusion?(r.uniforms.add("ssaoTex","sampler2D"),r.uniforms.add("viewportPixelSz","vec4"),r.code.add(i.a`
      float evaluateAmbientOcclusion() {
        return 1.0 - texture2D(ssaoTex, (gl_FragCoord.xy - viewportPixelSz.xy) * viewportPixelSz.zw).a;
      }

      float evaluateAmbientOcclusionInverse() {
        float ssao = texture2D(ssaoTex, (gl_FragCoord.xy - viewportPixelSz.xy) * viewportPixelSz.zw).a;
        return viewportPixelSz.z < 0.0 ? 1.0 : ssao;
      }
    `)):r.code.add(i.a`
      float evaluateAmbientOcclusion() { return 0.0; } // no occlusion
      float evaluateAmbientOcclusionInverse() { return 1.0; }
    `)}},fFEv:function(e,t,r){"use strict";r.d(t,"a",function(){return w}),r.d(t,"b",function(){return M}),r.d(t,"c",function(){return j}),r.d(t,"d",function(){return h}),r.d(t,"e",function(){return T}),r.d(t,"f",function(){return _});var i=r("srIe"),n=r("OKTS"),o=r("Cy1f"),a=r("5DEt"),s=r("QmHG"),c=r("EVMh"),l=r("tiP8");Object(n.d)(10),Object(n.d)(12),Object(n.d)(70),Object(n.d)(40);const u={scale:0,factor:0,minPixelSize:0,paddingPixels:0},d=Object(s.b)(),f=c.a;function h(e,t,r,i,n,o,a){const s=Object(l.b)(t),u=r.tolerance;if(!s)if(e.boundingInfo)Object(c.b)("triangle"===e.data.primitiveType),p(e.boundingInfo,i,n,u,o,a);else{const t=e.getIndices(f.POSITION),r=e.getAttribute(f.POSITION);v(i,n,0,t.length/3,t,r,void 0,o,a)}}const m=Object(o.e)();function p(e,t,r,n,o,c){const l=function(e,t,r){return Object(a.r)(r,1/(t[0]-e[0]),1/(t[1]-e[1]),1/(t[2]-e[2]))}(t,r,m);if(Object(s.l)(d,e.getBBMin()),Object(s.k)(d,e.getBBMax()),Object(i.h)(o)&&o.applyToAabb(d),function(e,t,r,i){return function(e,t,r,i,n){const o=(e[0]-i-t[0])*r[0],a=(e[3]+i-t[0])*r[0];let s=Math.min(o,a),c=Math.max(o,a);const l=(e[1]-i-t[1])*r[1],u=(e[4]+i-t[1])*r[1];if(c=Math.min(c,Math.max(l,u)),c<0)return!1;if(s=Math.max(s,Math.min(l,u)),s>c)return!1;const d=(e[2]-i-t[2])*r[2],f=(e[5]+i-t[2])*r[2];return c=Math.min(c,Math.max(d,f)),!(c<0)&&(s=Math.max(s,Math.min(d,f)),!(s>c)&&s<1/0)}(e,t,r,i)}(d,t,l,n)){const i=e.getPrimitiveIndices(),a=e.getIndices(),s=e.getPosition(),l=i?i.length:a.length/3;if(l>C){const i=e.getChildren();if(void 0!==i){for(let e=0;e<8;++e)void 0!==i[e]&&p(i[e],t,r,n,o,c);return}}v(t,r,0,l,a,s,i,o,c)}}const b=2**-52,g=Object(o.e)();function v(e,t,r,n,o,a,s,c,l){if(s)return function(e,t,r,n,o,a,s,c,l){const{data:u,offsetIdx:d,strideIdx:f}=a,h=e[0],m=e[1],p=e[2],v=t[0]-h,x=t[1]-m,O=t[2]-p;for(let _=r;_<n;++_){const e=s[_];let t=3*e,r=d+f*o[t++],n=u[r++],a=u[r++],w=u[r];r=d+f*o[t++];let j=u[r++],T=u[r++],S=u[r];r=d+f*o[t];let M=u[r++],C=u[r++],A=u[r];Object(i.h)(c)&&([n,a,w]=c.applyToVertex(n,a,w,_),[j,T,S]=c.applyToVertex(j,T,S,_),[M,C,A]=c.applyToVertex(M,C,A,_));const P=j-n,I=T-a,R=S-w,L=M-n,B=C-a,F=A-w,z=x*F-B*O,D=O*L-F*v,N=v*B-L*x,V=P*z+I*D+R*N;if(Math.abs(V)<=b)continue;const E=h-n,U=m-a,G=p-w,k=E*z+U*D+G*N;if(V>0){if(k<0||k>V)continue}else if(k>0||k<V)continue;const H=U*R-I*G,q=G*P-R*E,W=E*I-P*U,$=v*H+x*q+O*W;if(V>0){if($<0||k+$>V)continue}else if($>0||k+$<V)continue;const X=(L*H+B*q+F*W)/V;X>=0&&l(X,y(P,I,R,L,B,F,g),e)}}(e,t,r,n,o,a,s,c,l);const{data:u,offsetIdx:d,strideIdx:f}=a,h=e[0],m=e[1],p=e[2],v=t[0]-h,x=t[1]-m,O=t[2]-p;for(let _=r,w=3*r;_<n;++_){let e=d+f*o[w++],t=u[e++],r=u[e++],n=u[e];e=d+f*o[w++];let a=u[e++],s=u[e++],j=u[e];e=d+f*o[w++];let T=u[e++],S=u[e++],M=u[e];Object(i.h)(c)&&([t,r,n]=c.applyToVertex(t,r,n,_),[a,s,j]=c.applyToVertex(a,s,j,_),[T,S,M]=c.applyToVertex(T,S,M,_));const C=a-t,A=s-r,P=j-n,I=T-t,R=S-r,L=M-n,B=x*L-R*O,F=O*I-L*v,z=v*R-I*x,D=C*B+A*F+P*z;if(Math.abs(D)<=b)continue;const N=h-t,V=m-r,E=p-n,U=N*B+V*F+E*z;if(D>0){if(U<0||U>D)continue}else if(U>0||U<D)continue;const G=V*P-A*E,k=E*C-P*N,H=N*A-C*V,q=v*G+x*k+O*H;if(D>0){if(q<0||U+q>D)continue}else if(q>0||U+q<D)continue;const W=(I*G+R*k+L*H)/D;W>=0&&l(W,y(C,A,P,I,R,L,g),_)}}const x=Object(o.e)(),O=Object(o.e)();function y(e,t,r,i,n,o,s){return Object(a.r)(x,e,t,r),Object(a.r)(O,i,n,o),Object(a.d)(s,x,O),Object(a.o)(s,s),s}function _(e,t,r,i,o){let a=(r.screenLength||0)*e.pixelRatio;o&&(a=function(e,t,r,i){return function(e,t){return Math.max(Object(n.g)(e*t.scale,e,t.factor),function(e,t){return 0===e?t.minPixelSize:t.minPixelSize*(1+2*t.paddingPixels/e)}(e,t))}(e,function(e,t,r){const i=r.parameters,n=r.paddingPixelsOverride;return u.scale=Math.min(i.divisor/(t-i.offset),1),u.factor=function(e){return Math.abs(e*e*e)}(e),u.minPixelSize=i.minPixelSize,u.paddingPixels=n,u}(t,r,i))}(a,i,t,o));const s=a*Math.tan(.5*e.fovY)/(.5*e.fullHeight);return Object(n.e)(s*t,r.minWorldLength||0,null!=r.maxWorldLength?r.maxWorldLength:1/0)}function w(e,t,r){if(!e)return;const i=e.parameters;t.setUniform4f(r,i.divisor,i.offset,i.minPixelSize,e.paddingPixelsOverride)}function j(e,t){const r=t?j(t):{};for(const i in e){let t=e[i];t&&t.forEach&&(t=S(t)),null==t&&i in r||(r[i]=t)}return r}function T(e,t){let r=!1;for(const i in t){const n=t[i];void 0!==n&&(r=!0,e[i]=Array.isArray(n)?n.slice():n)}return r}function S(e){const t=[];return e.forEach(e=>t.push(e)),t}const M={multiply:1,ignore:2,replace:3,tint:4},C=1e3},fLTx:function(e,t,r){"use strict";r.d(t,"a",function(){return a});var i=r("OIYib"),n=r("368d");function o(e){e.extensions.add("GL_EXT_shader_texture_lod"),e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(i.a`
    #ifndef GL_EXT_shader_texture_lod
      float calcMipMapLevel(const vec2 ddx, const vec2 ddy) {
        float deltaMaxSqr = max(dot(ddx, ddx), dot(ddy, ddy));
        return max(0.0, 0.5 * log2(deltaMaxSqr));
      }
    #endif

    vec4 textureAtlasLookup(sampler2D texture, vec2 textureSize, vec2 textureCoordinates, vec4 atlasRegion) {
      //[umin, vmin, umax, vmax]
      vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
      vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;

      // calculate derivative of continuous texture coordinate
      // to avoid mipmapping artifacts caused by manual wrapping in shader
      vec2 dUVdx = dFdx(textureCoordinates) * atlasScale;
      vec2 dUVdy = dFdy(textureCoordinates) * atlasScale;

      #ifdef GL_EXT_shader_texture_lod
        return texture2DGradEXT(texture, uvAtlas, dUVdx, dUVdy);
      #else
        // use bias to compensate for difference in automatic vs desired mipmap level
        vec2 dUVdxAuto = dFdx(uvAtlas);
        vec2 dUVdyAuto = dFdy(uvAtlas);
        float mipMapLevel = calcMipMapLevel(dUVdx * textureSize, dUVdy * textureSize);
        float autoMipMapLevel = calcMipMapLevel(dUVdxAuto * textureSize, dUVdyAuto * textureSize);

        return texture2D(texture, uvAtlas, mipMapLevel - autoMipMapLevel);
      #endif
    }
  `)}function a(e,t){e.include(n.a,t),e.fragment.code.add(i.a`
  struct TextureLookupParameter {
    vec2 uv;
    ${t.supportsTextureAtlas?"vec2 size;":""}
  } vtc;
  `),1===t.attributeTextureCoordinates&&e.fragment.code.add(i.a`
      vec4 textureLookup(sampler2D tex, TextureLookupParameter params) {
        return texture2D(tex, params.uv);
      }
    `),2===t.attributeTextureCoordinates&&(e.include(o),e.fragment.code.add(i.a`
    vec4 textureLookup(sampler2D tex, TextureLookupParameter params) {
        return textureAtlasLookup(tex, params.size, params.uv, vuvRegion);
      }
    `))}},fOQB:function(e,t,r){"use strict";var i=r("ohva");class n{constructor(e,t,r,i,n){this._context=null,this._glName=null,this._bufferType=void 0,this._usage=35044,this._size=-1,this._indexType=void 0,this.id=o++,e.instanceCounter.increment(1,this),this._context=e,this._bufferType=t,this._usage=r,this._glName=this._context.gl.createBuffer(),i&&this.setData(i,n)}static createIndex(e,t,r,i){return new n(e,34963,t,r,i)}static createVertex(e,t,r){return new n(e,34962,t,r)}get glName(){return this._glName}get size(){return this._size}get usage(){return this._usage}get bufferType(){return this._bufferType}get indexType(){return this._indexType}get byteSize(){return 34962===this._bufferType?this._size:5125===this._indexType?4*this._size:2*this._size}dispose(){this._context&&(this._glName&&(this._context.gl.deleteBuffer(this._glName),this._glName=null),this._context.instanceCounter.decrement(1,this),this._context=null)}setData(e,t){if(!e)return;if("number"==typeof e){if(e<0&&console.error("Buffer size cannot be negative!"),34963===this._bufferType&&t)switch(this._indexType=t,this._size=e,t){case 5123:e*=2;break;case 5125:e*=4}}else{let t=e.byteLength;Object(i.i)(e)&&(t/=2,this._indexType=5123),Object(i.j)(e)&&(t/=4,this._indexType=5125),this._size=t}const r=this._context.getBoundVAO();this._context.bindVAO(null),this._context.bindBuffer(this),this._context.gl.bufferData(this._bufferType,e,this._usage),this._context.bindVAO(r)}setSubData(e,t=0,r=0,n){if(!e)return;(t<0||t>=this._size)&&console.error("offset is out of range!");let o=t,a=r,s=n,c=e.byteLength;Object(i.i)(e)&&(c/=2,o*=2,a*=2,s*=2),Object(i.j)(e)&&(c/=4,o*=4,a*=4,s*=4),void 0===n&&(n=c-1),r>=n&&console.error("end must be bigger than start!"),t+r-n>this._size&&console.error("An attempt to write beyond the end of the buffer!");const l=this._context.getBoundVAO();this._context.bindVAO(null),this._context.bindBuffer(this);const u=this._context.gl,d=ArrayBuffer.isView(e)?e.buffer:e;u.bufferSubData(this._bufferType,o,d.slice(a,s)),this._context.bindVAO(l)}}let o=0;t.a=n},fRF2:function(e,t,r){"use strict";r.d(t,"a",function(){return f});var i,n=r("OIYib"),o=r("wzLF"),a=r("Cy1f"),s=r("2uVf"),c=r("r+FG"),l=r("aiF/"),u=r("sJp1");function d(e,t){e.include(u.a),e.vertex.include(l.a,t),e.varyings.add("vPositionWorldCameraRelative","vec3"),e.varyings.add("vPosition_view","vec3"),e.vertex.uniforms.add("uTransform_WorldFromModel_RS","mat3"),e.vertex.uniforms.add("uTransform_WorldFromModel_TH","vec3"),e.vertex.uniforms.add("uTransform_WorldFromModel_TL","vec3"),e.vertex.uniforms.add("uTransform_WorldFromView_TH","vec3"),e.vertex.uniforms.add("uTransform_WorldFromView_TL","vec3"),e.vertex.uniforms.add("uTransform_ViewFromCameraRelative_RS","mat3"),e.vertex.uniforms.add("uTransform_ProjFromView","mat4"),e.vertex.code.add(n.a`
    // compute position in world space orientation, but relative to the camera position
    vec3 positionWorldCameraRelative() {
      vec3 rotatedModelPosition = uTransform_WorldFromModel_RS * positionModel();

      vec3 transform_CameraRelativeFromModel = dpAdd(
        uTransform_WorldFromModel_TL,
        uTransform_WorldFromModel_TH,
        -uTransform_WorldFromView_TL,
        -uTransform_WorldFromView_TH
      );

      return transform_CameraRelativeFromModel + rotatedModelPosition;
    }

    // position in view space, that is relative to the camera position and orientation
    vec3 position_view() {
      return uTransform_ViewFromCameraRelative_RS * positionWorldCameraRelative();
    }

    // compute gl_Position and forward related varyings to fragment shader
    void forwardPosition() {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      vPosition_view = position_view();
      gl_Position = uTransform_ProjFromView * vec4(vPosition_view, 1.0);
    }

    vec3 positionWorld() {
      return uTransform_WorldFromView_TL + vPositionWorldCameraRelative;
    }
  `),e.fragment.uniforms.add("uTransform_WorldFromView_TL","vec3"),e.fragment.code.add(n.a`
    vec3 positionWorld() {
      return uTransform_WorldFromView_TL + vPositionWorldCameraRelative;
    }
  `)}function f(e,t){0===t.normalType||1===t.normalType?(e.include(o.a,t),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("vNormalView","vec3"),e.vertex.uniforms.add("uTransformNormal_GlobalFromModel","mat3"),e.vertex.uniforms.add("uTransformNormal_ViewFromGlobal","mat3"),e.vertex.code.add(n.a`
      void forwardNormal() {
        vNormalWorld = uTransformNormal_GlobalFromModel * normalModel();
        vNormalView = uTransformNormal_ViewFromGlobal * vNormalWorld;
      }
    `)):2===t.normalType?(e.include(d,t),e.varyings.add("vNormalWorld","vec3"),e.vertex.code.add(n.a`
    void forwardNormal() {
      vNormalWorld = ${1===t.viewingMode?n.a`normalize(vPositionWorldCameraRelative);`:n.a`vec3(0.0, 0.0, 1.0);`}
    }
    `)):e.vertex.code.add(n.a`
      void forwardNormal() {}
    `)}(i=d||(d={})).ModelTransform=class{constructor(){this.worldFromModel_RS=Object(s.a)(),this.worldFromModel_TH=Object(a.e)(),this.worldFromModel_TL=Object(a.e)()}},i.ViewProjectionTransform=class{constructor(){this.worldFromView_TH=Object(a.e)(),this.worldFromView_TL=Object(a.e)(),this.viewFromCameraRelative_RS=Object(s.a)(),this.projFromView=Object(c.b)()}},i.bindModelTransform=function(e,t){e.setUniformMatrix3fv("uTransform_WorldFromModel_RS",t.worldFromModel_RS),e.setUniform3fv("uTransform_WorldFromModel_TH",t.worldFromModel_TH),e.setUniform3fv("uTransform_WorldFromModel_TL",t.worldFromModel_TL)},i.bindViewProjTransform=function(e,t){e.setUniform3fv("uTransform_WorldFromView_TH",t.worldFromView_TH),e.setUniform3fv("uTransform_WorldFromView_TL",t.worldFromView_TL),e.setUniformMatrix4fv("uTransform_ProjFromView",t.projFromView),e.setUniformMatrix3fv("uTransform_ViewFromCameraRelative_RS",t.viewFromCameraRelative_RS)},(f||(f={})).bindUniforms=function(e,t){e.setUniformMatrix4fv("viewNormal",t)}},fiGu:function(e,t,r){"use strict";r.d(t,"a",function(){return m});var i=r("OIYib"),n=r("Tbkp"),o=r("0nJL"),a=r("agdK"),s=r("viRi"),c=r("69UF"),l=r("UBvB");function u(e,t){e.fragment.include(l.a),3===t.output?(e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(i.a`
      float _calculateFragDepth(const in float depth) {
        // calc polygon offset
        const float SLOPE_SCALE = 2.0;
        const float BIAS = 2.0 * .000015259;    // 1 / (2^16 - 1)
        float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
        float result = depth + SLOPE_SCALE * m + BIAS;
        return clamp(result, .0, .999999);
      }

      void outputDepth(float _linearDepth) {
        gl_FragColor = float2rgba(_calculateFragDepth(_linearDepth));
      }
    `)):1===t.output&&e.fragment.code.add(i.a`
      void outputDepth(float _linearDepth) {
        gl_FragColor = float2rgba(_linearDepth);
      }
    `)}var d=r("368d"),f=r("wzLF"),h=r("fRF2");function m(e,t){const r=e.vertex.code,l=e.fragment.code;1!==t.output&&3!==t.output||(e.include(n.a,{linearDepth:!0}),e.include(d.a,t),e.include(s.a,t),e.include(u,t),e.include(o.a,t),e.vertex.uniforms.add("nearFar","vec2"),e.varyings.add("depth","float"),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),r.add(i.a`
      void main(void) {
        vpos = calculateVPos();
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
        forwardTextureCoordinates();
      }
    `),e.include(c.a,t),l.add(i.a`
      void main(void) {
        discardBySlice(vpos);
        ${t.hasColorTexture?i.a`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}
        outputDepth(depth);
      }
    `)),2===t.output&&(e.include(n.a,{linearDepth:!1}),e.include(f.a,t),e.include(h.a,t),e.include(d.a,t),e.include(s.a,t),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),e.vertex.uniforms.add("viewNormal","mat4"),e.varyings.add("vPositionView","vec3"),r.add(i.a`
      void main(void) {
        vpos = calculateVPos();
        vpos = subtractOrigin(vpos);
        ${0===t.normalType?i.a`
        vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:""}
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();
      }
    `),e.include(o.a,t),e.include(c.a,t),l.add(i.a`
      void main() {
        discardBySlice(vpos);
        ${t.hasColorTexture?i.a`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}

        ${3===t.normalType?i.a`
            vec3 normal = screenDerivativeNormal(vPositionView);`:i.a`
            vec3 normal = normalize(vNormalWorld);
            if (gl_FrontFacing == false) normal = -normal;`}
        gl_FragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);
      }
    `)),4===t.output&&(e.include(n.a,{linearDepth:!1}),e.include(d.a,t),e.include(s.a,t),t.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),r.add(i.a`
      void main(void) {
        vpos = calculateVPos();
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();
      }
    `),e.include(o.a,t),e.include(c.a,t),e.include(a.a),l.add(i.a`
      void main() {
        discardBySlice(vpos);
        ${t.hasColorTexture?i.a`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}
        outputHighlight();
      }
    `))}},hTmG:function(e,t,r){"use strict";function i(e,t){return e.vertexBuffers[t].size/function(e){return e[0].stride}(e.layout[t])}function n(e,t,r,i,n){const o=e.gl,a=e.capabilities.instancing;e.bindBuffer(r);for(const s of i){const e=t[s.name],r=(n||(0+s.baseInstance?s.baseInstance:0))*s.stride;if(void 0===e&&console.error(`There is no location for vertex attribute '${s.name}' defined.`),s.baseInstance&&!s.divisor&&console.error(`Vertex attribute '${s.name}' uses baseInstanceOffset without divisor.`),s.count<=4)o.vertexAttribPointer(e,s.count,s.type,s.normalized,s.stride,s.offset+r),o.enableVertexAttribArray(e),s.divisor&&s.divisor>0&&a&&a.vertexAttribDivisor(e,s.divisor);else if(9===s.count)for(let t=0;t<3;t++)o.vertexAttribPointer(e+t,3,s.type,s.normalized,s.stride,s.offset+12*t+r),o.enableVertexAttribArray(e+t),s.divisor&&s.divisor>0&&a&&a.vertexAttribDivisor(e+t,s.divisor);else if(16===s.count)for(let t=0;t<4;t++)o.vertexAttribPointer(e+t,4,s.type,s.normalized,s.stride,s.offset+16*t+r),o.enableVertexAttribArray(e+t),s.divisor&&s.divisor>0&&a&&a.vertexAttribDivisor(e+t,s.divisor);else console.error("Unsupported vertex attribute element count: "+s.count)}}function o(e,t,r,i){const n=e.gl,o=e.capabilities.instancing;e.bindBuffer(r);for(const a of i){const e=t[a.name];if(a.count<=4)n.disableVertexAttribArray(e),a.divisor&&a.divisor>0&&o&&o.vertexAttribDivisor(e,0);else if(9===a.count)for(let t=0;t<3;t++)n.disableVertexAttribArray(e+t),a.divisor&&a.divisor>0&&o&&o.vertexAttribDivisor(e+t,0);else if(16===a.count)for(let t=0;t<4;t++)n.disableVertexAttribArray(e+t),a.divisor&&a.divisor>0&&o&&o.vertexAttribDivisor(e+t,0);else console.error("Unsupported vertex attribute element count: "+a.count)}e.unbindBuffer(34962)}r.d(t,"a",function(){return n}),r.d(t,"b",function(){return o}),r.d(t,"c",function(){return i}),r("wSAH"),r("srIe")},jjdI:function(e,t,r){"use strict";r("wSAH");var i=r("srIe"),n=["layout","centroid","smooth","case","mat2x2","mat2x3","mat2x4","mat3x2","mat3x3","mat3x4","mat4x2","mat4x3","mat4x4","uint","uvec2","uvec3","uvec4","samplerCubeShadow","sampler2DArray","sampler2DArrayShadow","isampler2D","isampler3D","isamplerCube","isampler2DArray","usampler2D","usampler3D","usamplerCube","usampler2DArray","coherent","restrict","readonly","writeonly","resource","atomic_uint","noperspective","patch","sample","subroutine","common","partition","active","filter","image1D","image2D","image3D","imageCube","iimage1D","iimage2D","iimage3D","iimageCube","uimage1D","uimage2D","uimage3D","uimageCube","image1DArray","image2DArray","iimage1DArray","iimage2DArray","uimage1DArray","uimage2DArray","image1DShadow","image2DShadow","image1DArrayShadow","image2DArrayShadow","imageBuffer","iimageBuffer","uimageBuffer","sampler1DArray","sampler1DArrayShadow","isampler1D","isampler1DArray","usampler1D","usampler1DArray","isampler2DRect","usampler2DRect","samplerBuffer","isamplerBuffer","usamplerBuffer","sampler2DMS","isampler2DMS","usampler2DMS","sampler2DMSArray","isampler2DMSArray","usampler2DMSArray","trunc","round","roundEven","isnan","isinf","floatBitsToInt","floatBitsToUint","intBitsToFloat","uintBitsToFloat","packSnorm2x16","unpackSnorm2x16","packUnorm2x16","unpackUnorm2x16","packHalf2x16","unpackHalf2x16","outerProduct","transpose","determinant","inverse","texture","textureSize","textureProj","textureLod","textureOffset","texelFetch","texelFetchOffset","textureProjOffset","textureLodOffset","textureProjLod","textureProjLodOffset","textureGrad","textureGradOffset","textureProjGrad","textureProjGradOffset"],o=r("n4uK"),a=["block-comment","line-comment","preprocessor","operator","integer","float","ident","builtin","keyword","whitespace","eof","integer"];const s=["GL_OES_standard_derivatives","GL_EXT_frag_depth","GL_EXT_draw_buffers","GL_EXT_shader_texture_lod"];function c(e,t){for(let r=t-1;r>=0;r--){const t=e[r];if("whitespace"!==t.type&&"block-comment"!==t.type){if("keyword"!==t.type)break;if("attribute"===t.data||"in"===t.data)return!0}}return!1}function l(e,t,r,i){i=i||r;for(const n of e)if("ident"===n.type&&n.data===r)return i in t?t[i]++:t[i]=0,l(e,t,i+"_"+t[i],i);return r}function u(e,t,r="afterVersion"){function i(e,t){for(let r=t;r<e.length;r++){const t=e[r];if("operator"===t.type&&";"===t.data)return r}return null}const n={data:"\n",type:"whitespace"},o=t=>t<e.length&&/[^\r\n]$/.test(e[t].data);let a=function(e){let t=-1,n=0,o=-1;for(let a=0;a<e.length;a++){const s=e[a];if("preprocessor"===s.type&&(s.data.match(/\#(if|ifdef|ifndef)\s+.+/)?++n:s.data.match(/\#endif\s*.*/)&&--n),"afterVersion"!==r&&"afterPrecision"!==r||"preprocessor"===s.type&&/^#version/.test(s.data)&&(o=Math.max(o,a)),"afterPrecision"===r&&"keyword"===s.type&&"precision"===s.data){const t=i(e,a);if(null===t)throw new Error("precision statement not followed by any semicolons!");o=Math.max(o,t)}t<o&&0===n&&(t=a)}return t+1}(e);o(a-1)&&e.splice(a++,0,n);for(const s of t)e.splice(a++,0,s);o(a-1)&&o(a)&&e.splice(a,0,n)}function d(e,t,r,i="lowp"){u(e,[{type:"keyword",data:"out"},{type:"whitespace",data:" "},{type:"keyword",data:i},{type:"whitespace",data:" "},{type:"keyword",data:r},{type:"whitespace",data:" "},{type:"ident",data:t},{type:"operator",data:";"}],"afterPrecision")}function f(e,t,r,i,n="lowp"){u(e,[{type:"keyword",data:"layout"},{type:"operator",data:"("},{type:"keyword",data:"location"},{type:"whitespace",data:" "},{type:"operator",data:"="},{type:"whitespace",data:" "},{type:"integer",data:i.toString()},{type:"operator",data:")"},{type:"whitespace",data:" "},{type:"keyword",data:"out"},{type:"whitespace",data:" "},{type:"keyword",data:n},{type:"whitespace",data:" "},{type:"keyword",data:r},{type:"whitespace",data:" "},{type:"ident",data:t},{type:"operator",data:";"}],"afterPrecision")}function h(e,t){let r,i,n=-1;for(let o=t;o<e.length;o++){const t=e[o];if("operator"===t.type&&("["===t.data&&(r=o),"]"===t.data)){i=o;break}"integer"===t.type&&(n=parseInt(t.data,10))}return r&&i&&e.splice(r,i-r+1),n}class m{constructor(e,t,r,i,n={}){if(this._context=null,this._glName=null,this._locations={},this.id=b++,this._initialized=!1,this._vShader=null,this._fShader=null,this._defines={},this._nameToUniformLocation={},this._nameToAttribLocation={},this._nameToUniform1={},this._nameToUniform1v={},this._nameToUniform2={},this._nameToUniform3={},this._nameToUniform4={},this._nameToUniformMatrix3={},this._nameToUniformMatrix4={},e||console.error("RenderingContext isn't initialized!"),0===t.length&&console.error("Shaders source should not be empty!"),e.instanceCounter.increment(3,this),this._context=e,this._vertexShaderSource=t,this._fragmentShaderSource=r,Array.isArray(n))for(const o of n)this._defines[o]="1";else this._defines=n;this._locations=i}get glName(){return this._glName}get locations(){return this._locations}getDefine(e){return this._defines[e]}dispose(){if(!this._context)return;const e=this._context.gl;this._vShader&&(e.deleteShader(this._vShader),this._vShader=null),this._fShader&&(e.deleteShader(this._fShader),this._fShader=null),this._glName&&(e.deleteProgram(this._glName),this._glName=null),this._context.instanceCounter.decrement(3,this),this._context=null}initialize(){if(this._initialized)return;this._vShader=this._loadShader(35633),this._fShader=this._loadShader(35632),this._vShader&&this._fShader||console.error("Error loading shaders!");const e=this._context.gl,t=e.createProgram();e.attachShader(t,this._vShader),e.attachShader(t,this._fShader);for(const r in this._locations)e.bindAttribLocation(t,this._locations[r],r);e.linkProgram(t),this._glName=t,this._initialized=!0}getUniformLocation(e){return this.initialize(),void 0===this._nameToUniformLocation[e]&&(this._nameToUniformLocation[e]=this._context.gl.getUniformLocation(this._glName,e)),this._nameToUniformLocation[e]}hasUniform(e){return null!==this.getUniformLocation(e)}getAttribLocation(e){return this.initialize(),void 0===this._nameToAttribLocation[e]&&(this._nameToAttribLocation[e]=this._context.gl.getAttribLocation(this._glName,e)),this._nameToAttribLocation[e]}setUniform1i(e,t){const r=this._nameToUniform1[e];void 0!==r&&t===r||(this._context.bindProgram(this),this._context.gl.uniform1i(this.getUniformLocation(e),t),this._nameToUniform1[e]=t)}setUniform1iv(e,t){const r=this._nameToUniform1v[e];p(r,t)&&(this._context.bindProgram(this),this._context.gl.uniform1iv(this.getUniformLocation(e),t),void 0===r?this._nameToUniform1v[e]=m._arrayCopy(t):m._arrayAssign(t,r))}setUniform2iv(e,t){const r=this._nameToUniform2[e];p(r,t)&&(this._context.bindProgram(this),this._context.gl.uniform2iv(this.getUniformLocation(e),t),void 0===r?this._nameToUniform2[e]=m._arrayCopy(t):m._arrayAssign(t,r))}setUniform3iv(e,t){const r=this._nameToUniform3[e];p(r,t)&&(this._context.bindProgram(this),this._context.gl.uniform3iv(this.getUniformLocation(e),t),void 0===r?this._nameToUniform3[e]=m._arrayCopy(t):m._arrayAssign(t,r))}setUniform4iv(e,t){const r=this._nameToUniform4[e];p(r,t)&&(this._context.bindProgram(this),this._context.gl.uniform4iv(this.getUniformLocation(e),t),void 0===r?this._nameToUniform4[e]=m._arrayCopy(t):m._arrayAssign(t,r))}setUniform1f(e,t){const r=this._nameToUniform1[e];void 0!==r&&t===r||(this._context.bindProgram(this),this._context.gl.uniform1f(this.getUniformLocation(e),t),this._nameToUniform1[e]=t)}setUniform1fv(e,t){const r=this._nameToUniform1v[e];p(r,t)&&(this._context.bindProgram(this),this._context.gl.uniform1fv(this.getUniformLocation(e),t),void 0===r?this._nameToUniform1v[e]=m._arrayCopy(t):m._arrayAssign(t,r))}setUniform2f(e,t,r){const i=this._nameToUniform2[e];void 0!==i&&t===i[0]&&r===i[1]||(this._context.bindProgram(this),this._context.gl.uniform2f(this.getUniformLocation(e),t,r),void 0===i?this._nameToUniform2[e]=[t,r]:(i[0]=t,i[1]=r))}setUniform2fv(e,t){const r=this._nameToUniform2[e];p(r,t)&&(this._context.bindProgram(this),this._context.gl.uniform2fv(this.getUniformLocation(e),t),void 0===r?this._nameToUniform2[e]=m._arrayCopy(t):m._arrayAssign(t,r))}setUniform3f(e,t,r,i){const n=this._nameToUniform3[e];void 0!==n&&t===n[0]&&r===n[1]&&i===n[2]||(this._context.bindProgram(this),this._context.gl.uniform3f(this.getUniformLocation(e),t,r,i),void 0===n?this._nameToUniform3[e]=[t,r,i]:(n[0]=t,n[1]=r,n[2]=i))}setUniform3fv(e,t){const r=this._nameToUniform3[e];p(r,t)&&(this._context.bindProgram(this),this._context.gl.uniform3fv(this.getUniformLocation(e),t),void 0===r?this._nameToUniform3[e]=m._arrayCopy(t):m._arrayAssign(t,r))}setUniform4f(e,t,r,i,n){const o=this._nameToUniform4[e];void 0!==o&&t===o[0]&&r===o[1]&&i===o[2]&&n===o[3]||(this._context.bindProgram(this),this._context.gl.uniform4f(this.getUniformLocation(e),t,r,i,n),void 0===o?this._nameToUniform4[e]=[t,r,i,n]:(o[0]=t,o[1]=r,o[2]=i,o[3]=n))}setUniform4fv(e,t){const r=this._nameToUniform4[e];p(r,t)&&(this._context.bindProgram(this),this._context.gl.uniform4fv(this.getUniformLocation(e),t),void 0===r?this._nameToUniform4[e]=m._arrayCopy(t):m._arrayAssign(t,r))}setUniformMatrix3fv(e,t,r=!1){const n=this._nameToUniformMatrix3[e];(function(e,t){return!!Object(i.g)(e)||(9!==e.length?p(e,t):9!==e.length||e[0]!==t[0]||e[1]!==t[1]||e[2]!==t[2]||e[3]!==t[3]||e[4]!==t[4]||e[5]!==t[5]||e[6]!==t[6]||e[7]!==t[7]||e[8]!==t[8])})(n,t)&&(this._context.bindProgram(this),this._context.gl.uniformMatrix3fv(this.getUniformLocation(e),r,t),void 0===n?this._nameToUniformMatrix3[e]=m._arrayCopy(t):m._arrayAssign(t,n))}setUniformMatrix4fv(e,t,r=!1){const n=this._nameToUniformMatrix4[e];(function(e,t){return!!Object(i.g)(e)||(16!==e.length?p(e,t):16!==e.length||e[0]!==t[0]||e[1]!==t[1]||e[2]!==t[2]||e[3]!==t[3]||e[4]!==t[4]||e[5]!==t[5]||e[6]!==t[6]||e[7]!==t[7]||e[8]!==t[8]||e[9]!==t[9]||e[10]!==t[10]||e[11]!==t[11]||e[12]!==t[12]||e[13]!==t[13]||e[14]!==t[14]||e[15]!==t[15])})(n,t)&&(this._context.bindProgram(this),this._context.gl.uniformMatrix4fv(this.getUniformLocation(e),r,t),void 0===n?this._nameToUniformMatrix4[e]=m._arrayCopy(t):m._arrayAssign(t,n))}assertCompatibleVertexAttributeLocations(e){const t=e.locations===this.locations;return t||console.error("VertexAttributeLocations are incompatible"),t}static _padToThree(e){let t=e.toString();return e<1e3&&(t=("  "+e).slice(-3)),t}_addLineNumbers(e){let t=2;return e.replace(/\n/g,()=>"\n"+m._padToThree(t++)+":")}_loadShader(e){const t=35633===e;let r=t?this._vertexShaderSource:this._fragmentShaderSource,i="";for(const n in this._defines)i+=`#define ${n} ${this._defines[n]}\n`;r=i+r,"webgl2"===this._context.contextVersion&&(r=function(e,t){const r=function(e){return t=e,r=function(){var e,t,r,i=0,n=0,s=999,c=[],l=[],u=1,d=0,f=0,h=!1,m=!1,p="";return function(o){return l=[],null!==o?function(o){var a;for(i=0,r=(p+=o).length;e=p[i],i<r;){switch(a=i,s){case 0:i="/"===e&&"*"===t?(c.push(e),b(c.join("")),s=999,i+1):(c.push(e),t=e,i+1);break;case 1:case 2:i="\r"!==e&&"\n"!==e||"\\"===t?(c.push(e),t=e,i+1):(b(c.join("")),s=999,i);break;case 3:i=g();break;case 4:i="."===e||/[eE]/.test(e)?(c.push(e),s=5,t=e,i+1):"x"===e&&1===c.length&&"0"===c[0]?(s=11,c.push(e),t=e,i+1):/[^\d]/.test(e)?(b(c.join("")),s=999,i):(c.push(e),t=e,i+1);break;case 11:i=/[^a-fA-F0-9]/.test(e)?(b(c.join("")),s=999,i):(c.push(e),t=e,i+1);break;case 5:"f"===e&&(c.push(e),t=e,i+=1),i=/[eE]/.test(e)||"-"===e&&/[eE]/.test(t)?(c.push(e),t=e,i+1):/[^\d]/.test(e)?(b(c.join("")),s=999,i):(c.push(e),t=e,i+1);break;case 9999:i=x();break;case 9:i=/[^\s]/g.test(e)?(b(c.join("")),s=999,i):(c.push(e),t=e,i+1);break;case 999:c=c.length?[]:c,i="/"===t&&"*"===e?(f=n+i-1,s=0,t=e,i+1):"/"===t&&"/"===e?(f=n+i-1,s=1,t=e,i+1):"#"===e?(s=2,f=n+i,i):/\s/.test(e)?(s=9,f=n+i,i):(h=/\d/.test(e),m=/[^\w_]/.test(e),f=n+i,s=h?4:m?3:9999,i)}if(a!==i)switch(p[a]){case"\n":d=0,++u;break;default:++d}}return n+=i,p=p.slice(i),l}(o.replace?o.replace(/\r\n/g,"\n"):o):(c.length&&b(c.join("")),s=10,b("(eof)"),l)};function b(e){e.length&&l.push({type:a[s],data:e,position:f,line:u,column:d})}function g(){if("."===t&&/\d/.test(e))return s=5,i;if("/"===t&&"*"===e)return s=0,i;if("/"===t&&"/"===e)return s=1,i;if("."===e&&c.length){for(;v(c););return s=5,i}if(";"===e||")"===e||"("===e){if(c.length)for(;v(c););return b(e),s=999,i+1}var r=2===c.length&&"="!==e;if(/[\w_\d\s]/.test(e)||r){for(;v(c););return s=999,i}return c.push(e),t=e,i+1}function v(e){for(var t,r,i=0;;){if(t=o.c.indexOf(e.slice(0,e.length+i).join("")),r=o.c[t],-1===t){if(i--+e.length>0)continue;r=e.slice(0,1).join("")}return b(r),f+=r.length,(c=c.slice(r.length)).length}}function x(){if(/[^\d\w_]/.test(e)){var r=c.join("");return s=o.b.indexOf(r)>-1?8:o.a.indexOf(r)>-1?7:6,b(c.join("")),s=999,i}return c.push(e),t=e,i+1}}(),[].concat(r(t)).concat(r(null));var t,r}(e);if("300 es"===function(e,t="100",r="300 es"){const i=/^\s*\#version\s+([0-9]+(\s+[a-zA-Z]+)?)\s*/;for(const n of e)if("preprocessor"===n.type){const e=i.exec(n.data);if(e){const i=e[1].replace(/\s\s+/g," ");if(i===r)return i;if(i===t)return n.data="#version "+r,t;throw new Error("unknown glsl version: "+i)}}return e.splice(0,0,{type:"preprocessor",data:"#version "+r},{type:"whitespace",data:"\n"}),null}(r,"100","300 es"))throw new Error("shader is already glsl 300 es");let i=null,u=null;const m={},p={};for(let o=0;o<r.length;++o){const e=r[o];switch(e.type){case"keyword":"vertex"===t&&"attribute"===e.data?e.data="in":"varying"===e.data&&(e.data="vertex"===t?"out":"in");break;case"builtin":if(/^texture(2D|Cube)(Proj)?(Lod|Grad)?(EXT)?$/.test(e.data.trim())&&(e.data=e.data.replace(/(2D|Cube|EXT)/g,"")),"fragment"===t&&"gl_FragColor"===e.data&&(i||(i=l(r,m,"fragColor"),d(r,i,"vec4")),e.data=i),"fragment"===t&&"gl_FragData"===e.data){const t=h(r,o+1),i=l(r,m,"fragData");f(r,i,"vec4",t,"mediump"),e.data=i}else"fragment"===t&&"gl_FragDepthEXT"===e.data&&(u||(u=l(r,m,"gl_FragDepth")),e.data=u);break;case"ident":if(n.indexOf(e.data)>=0){if("vertex"===t&&c(r,o))throw new Error("attribute in vertex shader uses a name that is a reserved word in glsl 300 es");e.data in p||(p[e.data]=l(r,m,e.data)),e.data=p[e.data]}}}for(let n=r.length-1;n>=0;--n){const e=r[n];if("preprocessor"===e.type){const t=e.data.match(/\#extension\s+(.*)\:/);if(t&&t[1]&&s.indexOf(t[1].trim())>=0){const e=r[n+1];r.splice(n,e&&"whitespace"===e.type?2:1)}const i=e.data.match(/\#ifdef\s+(.*)/);i&&i[1]&&s.indexOf(i[1].trim())>=0&&(e.data="#if 1");const o=e.data.match(/\#ifndef\s+(.*)/);o&&o[1]&&s.indexOf(o[1].trim())>=0&&(e.data="#if 0")}}return r.map(e=>"eof"!==e.type?e.data:"").join("")}(r,t?"vertex":"fragment"));const u=this._context.gl,m=u.createShader(e);return u.shaderSource(m,r),u.compileShader(m),m}static _arrayCopy(e){const t=[];for(let r=0;r<e.length;++r)t.push(e[r]);return t}static _arrayAssign(e,t){for(let r=0;r<e.length;++r)t[r]=e[r]}}function p(e,t){if(Object(i.g)(e)||e.length!==t.length)return!0;for(let r=0;r<e.length;++r)if(e[r]!==t[r])return!0;return!1}let b=0;t.a=m},lKY1:function(e,t,r){"use strict";r.r(t),r.d(t,"fetch",function(){return Vn}),r.d(t,"gltfToEngineResources",function(){return Un}),r.d(t,"parseUrl",function(){return En});var i=r("srIe"),n=r("Cy1f"),o=r("5DEt"),a=r("15Hh"),s=r("SbiP"),c=r("2uVf"),l=r("r+FG"),u=r("HJJS"),d=r("VeZB"),f=r("6S2I");const h=f.a.getLogger("esri.views.3d.support.buffer.math");function m(e,t,r){if(e.count!==t.count)return void h.error("source and destination buffers need to have the same number of elements");const i=e.count,n=r[0],o=r[1],a=r[2],s=r[4],c=r[5],l=r[6],u=r[8],d=r[9],f=r[10],m=r[12],p=r[13],b=r[14],g=e.typedBuffer,v=e.typedBufferStride,x=t.typedBuffer,O=t.typedBufferStride;for(let h=0;h<i;h++){const e=h*v,t=h*O,r=x[t],i=x[t+1],y=x[t+2];g[e]=n*r+s*i+u*y+m,g[e+1]=o*r+c*i+d*y+p,g[e+2]=a*r+l*i+f*y+b}}function p(e,t,r){if(e.count!==t.count)return void h.error("source and destination buffers need to have the same number of elements");const i=e.count,n=r[0],o=r[1],a=r[2],s=r[3],c=r[4],l=r[5],u=r[6],d=r[7],f=r[8],m=e.typedBuffer,p=e.typedBufferStride,b=t.typedBuffer,g=t.typedBufferStride;for(let h=0;h<i;h++){const e=h*p,t=h*g,r=b[t],i=b[t+1],v=b[t+2];m[e]=n*r+s*i+u*v,m[e+1]=o*r+c*i+d*v,m[e+2]=a*r+l*i+f*v}}function b(e,t,r){const i=Math.min(e.count,t.count),n=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;for(let c=0;c<i;c++){const e=c*o,t=c*s;n[e]=r*a[t],n[e+1]=r*a[t+1],n[e+2]=r*a[t+2]}}Object.freeze({__proto__:null,transformMat4:m,transformMat3:p,scale:b,shiftRight:function(e,t,r){const i=Math.min(e.count,t.count),n=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;for(let c=0;c<i;c++){const e=c*o,t=c*s;n[e]=a[t]>>r,n[e+1]=a[t+1]>>r,n[e+2]=a[t+2]>>r}}});var g=r("QmHG"),v=r("KrcW");class x{constructor(e){this.allocator=e,this.items=[],this.itemsPtr=0,this.tickHandle=v.a.before(()=>this.reset()),this.grow()}destroy(){this.tickHandle&&(this.tickHandle.remove(),this.tickHandle=Object(i.l)(this.tickHandle)),this.items=Object(i.l)(this.items)}get(){return 0===this.itemsPtr&&Object(v.a)(()=>{}),this.itemsPtr===this.items.length&&this.grow(),this.items[this.itemsPtr++]}reset(){const e=Math.min(3*Math.max(8,this.itemsPtr),this.itemsPtr+3*O);this.items.length=Math.min(e,this.items.length),this.itemsPtr=0}grow(){for(let e=0;e<Math.max(8,Math.min(this.items.length,O));e++)this.items.push(this.allocator())}}const O=1024;var y=r("M0lq"),_=r("sTkM"),w=r("AvGH"),j=r("D8Ta");class T{constructor(e,t,r){this.itemByteSize=e,this.itemCreate=t,this.buffers=[],this.items=[],this.itemsPerBuffer=0,this.itemsPtr=0,this.itemsPerBuffer=Math.ceil(r/this.itemByteSize),this.tickHandle=v.a.before(()=>this.reset())}destroy(){this.tickHandle&&(this.tickHandle.remove(),this.tickHandle=Object(i.l)(this.tickHandle)),this.itemsPtr=0,this.items=Object(i.l)(this.items),this.buffers=Object(i.l)(this.buffers)}get(){0===this.itemsPtr&&Object(v.a)(()=>{});const e=Math.floor(this.itemsPtr/this.itemsPerBuffer);for(;this.buffers.length<=e;){const e=new ArrayBuffer(this.itemsPerBuffer*this.itemByteSize);for(let t=0;t<this.itemsPerBuffer;++t)this.items.push(this.itemCreate(e,t*this.itemByteSize));this.buffers.push(e)}return this.items[this.itemsPtr++]}reset(){const e=2*(Math.floor(this.itemsPtr/this.itemsPerBuffer)+1);for(;this.buffers.length>e;)this.buffers.pop(),this.items.length=this.buffers.length*this.itemsPerBuffer;this.itemsPtr=0}static createVec2f64(e=S){return new T(16,w.b,e)}static createVec3f64(e=S){return new T(24,n.c,e)}static createVec4f64(e=S){return new T(32,j.c,e)}static createMat3f64(e=S){return new T(72,c.b,e)}static createMat4f64(e=S){return new T(128,l.d,e)}static createQuatf64(e=S){return new T(32,_.b,e)}get test(){return{size:this.buffers.length*this.itemsPerBuffer*this.itemByteSize}}}const S=4096,M=(T.createVec2f64(),T.createVec3f64()),C=T.createVec4f64(),A=(T.createMat3f64(),T.createMat4f64());T.createQuatf64();var P=r("OKTS");function I(e){return e?{origin:Object(n.d)(e.origin),vector:Object(n.d)(e.vector)}:{origin:Object(n.e)(),vector:Object(n.e)()}}function R(e,t){const r=N.get();return r.origin=e,r.vector=t,r}function L(e,t,r=I()){return Object(o.h)(r.origin,e),Object(o.h)(r.vector,t),r}function B(e,t){const r=Object(o.g)(M.get(),t,e.origin),i=Object(o.e)(e.vector,r),n=Object(o.e)(e.vector,e.vector),a=Object(P.c)(i/n,0,1),s=Object(o.g)(M.get(),Object(o.b)(M.get(),e.vector,a),r);return Object(o.e)(s,s)}function F(e,t,r,i,n){const{vector:a,origin:s}=e,c=Object(o.g)(M.get(),t,s),l=Object(o.m)(a),u=Object(o.e)(a,c)/l;return Object(o.b)(n,a,Object(P.c)(u,r,i)),Object(o.c)(n,n,e.origin)}function z(e,t,r,i){const n=1e-6,a=e.origin,s=Object(o.c)(M.get(),a,e.vector),c=t.origin,l=Object(o.c)(M.get(),c,t.vector),u=M.get(),d=M.get();if(u[0]=a[0]-c[0],u[1]=a[1]-c[1],u[2]=a[2]-c[2],d[0]=l[0]-c[0],d[1]=l[1]-c[1],d[2]=l[2]-c[2],Math.abs(d[0])<n&&Math.abs(d[1])<n&&Math.abs(d[2])<n)return!1;const f=M.get();if(f[0]=s[0]-a[0],f[1]=s[1]-a[1],f[2]=s[2]-a[2],Math.abs(f[0])<n&&Math.abs(f[1])<n&&Math.abs(f[2])<n)return!1;const h=u[0]*d[0]+u[1]*d[1]+u[2]*d[2],m=d[0]*f[0]+d[1]*f[1]+d[2]*f[2],p=u[0]*f[0]+u[1]*f[1]+u[2]*f[2],b=d[0]*d[0]+d[1]*d[1]+d[2]*d[2],g=(f[0]*f[0]+f[1]*f[1]+f[2]*f[2])*b-m*m;if(Math.abs(g)<n)return!1;let v=(h*m-p*b)/g,x=(h+m*v)/b;r&&(v=Object(P.c)(v,0,1),x=Object(P.c)(x,0,1));const O=M.get(),y=M.get();return O[0]=a[0]+v*f[0],O[1]=a[1]+v*f[1],O[2]=a[2]+v*f[2],y[0]=c[0]+x*d[0],y[1]=c[1]+x*d[1],y[2]=c[2]+x*d[2],i.tA=v,i.tB=x,i.pA=O,i.pB=y,i.distance2=Object(o.i)(O,y),!0}const D={tA:0,tB:0,pA:Object(n.e)(),pB:Object(n.e)(),distance2:0},N=new x(()=>({origin:null,vector:null}));function V(e){return e?{p0:Object(n.d)(e.p0),p1:Object(n.d)(e.p1),p2:Object(n.d)(e.p2)}:{p0:Object(n.e)(),p1:Object(n.e)(),p2:Object(n.e)()}}function E(e,t,r,i=V()){return Object(o.h)(i.p0,e),Object(o.h)(i.p1,t),Object(o.h)(i.p2,r),i}function U(e,t,r){const i=Object(y.i)(e,t),n=Object(y.i)(t,r),o=Object(y.i)(r,e),a=(i+n+o)/2,s=a*(a-i)*(a-n)*(a-o);return s<=0?0:Math.sqrt(s)}function G(e,t,r){return Object(o.g)(q,t,e),Object(o.g)(W,r,e),Object(o.m)(Object(o.d)(q,q,W))/2}Object.freeze({__proto__:null,create:I,wrap:R,copy:function(e,t=I()){return L(e.origin,e.vector,t)},fromValues:L,fromPoints:function(e,t,r=I()){return Object(o.h)(r.origin,e),Object(o.g)(r.vector,t,e),r},distance2:B,distance:function(e,t){return Math.sqrt(B(e,t))},projectPoint:function(e,t,r){return F(e,t,0,1,r)},pointAt:function(e,t,r){return Object(o.c)(r,e.origin,Object(o.b)(r,e.vector,t))},projectPointClamp:F,closestRayDistance2:function(e,t){if(z(e,R(t.origin,t.direction),!1,D)){const{tA:t,pB:r,distance2:i}=D;if(t>=0&&t<=1)return i;if(t<0)return Object(o.i)(e.origin,r);if(t>1)return Object(o.i)(Object(o.c)(M.get(),e.origin,e.vector),r)}return null},closestLineSegmentPoint:function(e,t,r){return!!z(e,t,!0,D)&&(Object(o.h)(r,D.pA),!0)},closestLineSegmentDistance2:function(e,t){return z(e,t,!0,D)?D.distance2:null}});const k=new x(I),H=new x(()=>({p0:null,p1:null,p2:null})),q=Object(n.e)(),W=Object(n.e)();Object.freeze({__proto__:null,create:V,wrap:function(e,t,r){const i=H.get();return i.p0=e,i.p1=t,i.p2=r,i},copy:function(e,t=V()){return E(e.p0,e.p1,e.p2,t)},fromValues:E,distance2:function(e,t){const r=e.p0,i=e.p1,n=e.p2,a=Object(o.g)(M.get(),i,r),s=Object(o.g)(M.get(),n,i),c=Object(o.g)(M.get(),r,n),l=Object(o.g)(M.get(),t,r),u=Object(o.g)(M.get(),t,i),d=Object(o.g)(M.get(),t,n),f=Object(o.d)(a,a,c),h=Object(o.e)(Object(o.d)(M.get(),a,f),l),m=Object(o.e)(Object(o.d)(M.get(),s,f),u),p=Object(o.e)(Object(o.d)(M.get(),c,f),d);if(h>0&&m>0&&p>0){const e=Object(o.e)(f,l);return e*e/Object(o.e)(f,f)}const b=B(L(r,a,k.get()),t),g=B(L(i,s,k.get()),t),v=B(L(n,c,k.get()),t);return Math.min(b,g,v)},intersectRay:function(e,t,r){const i=1e-5,{direction:n,origin:a}=t,{p0:s,p1:c,p2:l}=e,u=c[0]-s[0],d=c[1]-s[1],f=c[2]-s[2],h=l[0]-s[0],m=l[1]-s[1],p=l[2]-s[2],b=n[1]*p-m*n[2],g=n[2]*h-p*n[0],v=n[0]*m-h*n[1],x=u*b+d*g+f*v;if(x>-i&&x<i)return!1;const O=1/x,y=a[0]-s[0],_=a[1]-s[1],w=a[2]-s[2],j=O*(y*b+_*g+w*v);if(j<0||j>1)return!1;const T=_*f-d*w,S=w*u-f*y,M=y*d-u*_,C=O*(n[0]*T+n[1]*S+n[2]*M);return!(C<0||j+C>1||(r&&(Object(o.b)(r,n,O*(h*T+m*S+p*M)),Object(o.c)(r,a,r)),0))},areaPoints2d:U,area2d:function(e){return U(e.p0,e.p1,e.p2)},areaPoints3d:G});let $=1,X=null;const Y=new Uint32Array([0]);function J(e){if(1===e)return Y;if(e>$||null==X){for(;e>$;)$*=2;X=new Uint32Array($);for(let e=0;e<$;e++)X[e]=e}return new Uint32Array(X.buffer,0,e)}let K=0;const Q=Object(n.e)(),Z=Object(n.e)(),ee=Object(n.e)(),te=Object(n.e)();var re=r("EVMh");class ie{constructor(e,t=ie.DefaultIndices,r="triangle"){this.initialize(e,t,r)}get id(){return this._id}get vertexAttributes(){return this._vertexAttributes}get indices(){return this._indices}get indexCount(){const e=Object(re.c)(this._indices);return null==e?0:e.length}get primitiveType(){return this._primitiveType}getVertexAttr(){return this.vertexAttributes}initialize(e,t=ie.DefaultIndices,r="triangle"){const i={};for(const n in e){const{data:t,size:r}=e[n];i[n]={data:t,size:r,offsetIdx:0,strideIdx:r}}if(t===ie.DefaultIndices){const e=J(function(e){const t=Object(re.c)(e);return null==t?0:t.data.length/t.size}(i));t={};for(const r in i)t[r]=e}this._id=K++,this._vertexAttributes=i,this._indices=t,this._primitiveType=r}toRenderData(){return{id:this._id.toString(),indices:this._indices,vertexAttr:this._vertexAttributes}}getIndices(e){return this._indices[e]}getAttribute(e){return this._vertexAttributes[e]}estimateGpuMemoryUsage(){let e=0;return this._indices[re.a.POSITION]&&(e+=3*this._indices[re.a.POSITION].length*4),this._indices[re.a.NORMAL]&&(e+=3*this._indices[re.a.NORMAL].length*4),this._indices[re.a.UV0]&&(e+=2*this._indices[re.a.UV0].length*4),this._indices[re.a.COLOR]&&(e+=1*this._indices[re.a.COLOR].length*4),e}}ie.DefaultIndices={};class ne{constructor(){this._count=0}gen(e){return null==e&&(e="a"),e+"_"+this._count++}}var oe=r("ikTR");class ae{constructor(e,t,r,i){this.primitiveIndices=e,this._numIndexPerPrimitive=t,this.indices=r,this._position=i,this.center=Object(n.e)(),Object(re.b)(e.length>=1),Object(re.b)(r.length%this._numIndexPerPrimitive==0),Object(re.b)(r.length>=e.length*this._numIndexPerPrimitive),Object(re.b)(3===this._position.size||4===this._position.size);const{data:a,offsetIdx:s,strideIdx:c}=this._position;let l=0;const u=e.length;let d=s+c*r[this._numIndexPerPrimitive*e[l]];for(ae.tmpIndices.clear(),ae.tmpIndices.push(d),this.bbMin=Object(n.g)(a[d],a[d+1],a[d+2]),this.bbMax=Object(n.d)(this.bbMin);l<u;++l){const t=this._numIndexPerPrimitive*e[l];for(let e=0;e<this._numIndexPerPrimitive;++e){d=s+c*r[t+e],ae.tmpIndices.push(d);let i=a[d];this.bbMin[0]=Math.min(i,this.bbMin[0]),this.bbMax[0]=Math.max(i,this.bbMax[0]),i=a[d+1],this.bbMin[1]=Math.min(i,this.bbMin[1]),this.bbMax[1]=Math.max(i,this.bbMax[1]),i=a[d+2],this.bbMin[2]=Math.min(i,this.bbMin[2]),this.bbMax[2]=Math.max(i,this.bbMax[2])}}Object(o.f)(this.center,this.bbMin,this.bbMax,.5),this.bsRadius=.5*Math.max(Math.max(this.bbMax[0]-this.bbMin[0],this.bbMax[1]-this.bbMin[1]),this.bbMax[2]-this.bbMin[2]);let f=this.bsRadius*this.bsRadius;for(l=0;l<ae.tmpIndices.length;++l){d=ae.tmpIndices.data[l];const e=a[d]-this.center[0],t=a[d+1]-this.center[1],r=a[d+2]-this.center[2],i=e*e+t*t+r*r;if(i<=f)continue;const n=Math.sqrt(i),o=.5*(n-this.bsRadius);this.bsRadius=this.bsRadius+o,f=this.bsRadius*this.bsRadius;const s=o/n;this.center[0]+=e*s,this.center[1]+=t*s,this.center[2]+=r*s}ae.tmpIndices.clear()}getCenter(){return this.center}getBSRadius(){return this.bsRadius}getBBMin(){return this.bbMin}getBBMax(){return this.bbMax}getPrimitiveIndices(){return this.primitiveIndices}getIndices(){return this.indices}getPosition(){return this._position}getChildren(){if(this._children)return this._children;if(Object(o.i)(this.bbMin,this.bbMax)>1){const e=Object(o.f)(Object(n.e)(),this.bbMin,this.bbMax,.5),t=this.primitiveIndices.length,r=new Uint8Array(t),i=new Array(8);for(let n=0;n<8;++n)i[n]=0;const{data:a,offsetIdx:s,strideIdx:c}=this._position;for(let n=0;n<t;++n){let t=0;const o=this._numIndexPerPrimitive*this.primitiveIndices[n];let l=s+c*this.indices[o],u=a[l],d=a[l+1],f=a[l+2];for(let e=1;e<this._numIndexPerPrimitive;++e){l=s+c*this.indices[o+e];const t=a[l],r=a[l+1],i=a[l+2];t<u&&(u=t),r<d&&(d=r),i<f&&(f=i)}u<e[0]&&(t|=1),d<e[1]&&(t|=2),f<e[2]&&(t|=4),r[n]=t,++i[t]}let l=0;for(let n=0;n<8;++n)i[n]>0&&++l;if(l<2)return;const u=new Array(8);for(let n=0;n<8;++n)u[n]=i[n]>0?new Uint32Array(i[n]):void 0;for(let n=0;n<8;++n)i[n]=0;for(let n=0;n<t;++n){const e=r[n];u[e][i[e]++]=this.primitiveIndices[n]}this._children=new Array(8);for(let n=0;n<8;++n)void 0!==u[n]&&(this._children[n]=new ae(u[n],this._numIndexPerPrimitive,this.indices,this._position))}return this._children}}(ae||(ae={})).tmpIndices=new oe.a({deallocator:null});var se=ae;class ce{constructor(e,t){this._boundingInfo=null,this._id=ce.__idGen.gen(t),this._data=e}get id(){return this._id}get data(){return this._data}getIndices(e){return this.data.getIndices(e)}get indexCount(){return this.data.indexCount}getAttribute(e){return this.data.getAttribute(e)}get vertexCount(){return this.data.indexCount}get faceCount(){return this.data.indexCount/3}get boundingInfo(){return Object(i.g)(this._boundingInfo)&&(this._boundingInfo=this._calculateBoundingInfo()),this._boundingInfo}computeAttachmentOrigin(e){return"triangle"===this.data.primitiveType?this.computeAttachmentOriginTriangles(e):this.computeAttachmentOriginPoints(e)}computeAttachmentOriginTriangles(e){const t=this.getIndices(re.a.POSITION);return function(e,t,r){if(!e)return!1;const{strideIdx:i,offsetIdx:n,data:a}=e;Object(o.r)(r,0,0,0),Object(o.r)(te,0,0,0);let s=0,c=0;for(let l=0;l<t.length-2;l+=3){const e=t[l+0]*i+n,u=t[l+1]*i+n,d=t[l+2]*i+n;Object(o.r)(Q,a[e+0],a[e+1],a[e+2]),Object(o.r)(Z,a[u+0],a[u+1],a[u+2]),Object(o.r)(ee,a[d+0],a[d+1],a[d+2]);const f=G(Q,Z,ee);f?(Object(o.c)(Q,Q,Z),Object(o.c)(Q,Q,ee),Object(o.b)(Q,Q,1/3*f),Object(o.c)(r,r,Q),s+=f):(Object(o.c)(te,te,Q),Object(o.c)(te,te,Z),Object(o.c)(te,te,ee),c+=3)}return!(0===c&&0===s||(0!==s?(Object(o.b)(r,r,1/s),0):0===c||(Object(o.b)(r,te,1/c),0)))}(this.getAttribute(re.a.POSITION),t,e)}computeAttachmentOriginPoints(e){const t=this.getIndices(re.a.POSITION);return function(e,t,r){if(!e||!t)return!1;const{strideIdx:i,offsetIdx:n,data:a}=e;Object(o.r)(r,0,0,0);let s=-1,c=0;for(let o=0;o<t.length;o++){const e=t[o]*i+n;s!==e&&(r[0]+=a[e+0],r[1]+=a[e+1],r[2]+=a[e+2],c++),s=e}return c>1&&Object(o.b)(r,r,1/c),c>0}(this.getAttribute(re.a.POSITION),t,e)}invalidateBoundingInfo(){this._boundingInfo=null}_calculateBoundingInfo(){let e=this.data.getIndices(re.a.POSITION);const t=this.data.getAttribute(re.a.POSITION),r="triangle"===this.data.primitiveType?3:1;if(0===e.length){e=new Uint32Array(r);for(let t=0;t<r;++t)e[t]=t}const i=e.length;Object(re.b)(i%r==0,"Indexing error: "+i.toFixed(0)+" not divisible by "+r.toFixed(0));const n=J(i/r);return new se(n,r,e,t)}}ce.__idGen=new ne;var le=ce,ue=r("/ADo"),de=r("dXfX"),fe=r("BPBZ"),he=r("R/jG"),me=(r("wSAH"),r("aAs6"));function pe(e,t){return Object(o.e)(e,t)/Object(o.m)(e)}function be(e,t){const r=Object(o.e)(e,t)/(Object(o.m)(e)*Object(o.m)(t));return-Object(P.a)(r)}const ge=Object(n.e)(),ve=Object(n.e)();function xe(e=We){return[e[0],e[1],e[2],e[3]]}function Oe(e,t,r,i){return _e(e,t,r,i,C.get())}function ye(e,t=xe()){return _e(e[0],e[1],e[2],e[3],t)}function _e(e,t,r,i,n=xe()){return n[0]=e,n[1]=t,n[2]=r,n[3]=i,n}function we(e,t,r=xe()){Object(o.h)(r,t);const i=Object(o.e)(t,t);return Math.abs(i-1)>1e-5&&i>1e-12&&Object(o.b)(r,r,1/Math.sqrt(i)),Re(r,e,r),r}function je(e,t,r,i=xe()){return Le(Object(o.g)(M.get(),e,t),Object(o.g)(M.get(),r,t),e,i)}function Te(e,t,r,i,n){if(e.count<3)return!1;e.getVec(r,Me);let a=i,s=!1;for(;a<e.count-1&&!s;)e.getVec(a,Ce),a++,s=!Object(o.n)(Me,Ce);if(!s)return!1;for(a=Math.max(a,n),s=!1;a<e.count&&!s;)e.getVec(a,Ae),a++,Object(o.g)(Pe,Me,Ce),Object(o.o)(Pe,Pe),Object(o.g)(Ie,Ce,Ae),Object(o.o)(Ie,Ie),s=!Object(o.n)(Me,Ae)&&!Object(o.n)(Ce,Ae)&&Math.abs(Object(o.e)(Pe,Ie))<Se;return s?(je(Me,Ce,Ae,t),!0):(0!==r||1!==i||2!==n)&&Te(e,t,0,1,2)}Object.freeze({__proto__:null,projectPoint:function(e,t,r){const i=Object(o.e)(e,t)/Object(o.e)(e,e);return Object(o.b)(r,e,i)},projectPointSignedLength:pe,angle:be,angleAroundAxis:function(e,t,r){Object(o.o)(ge,e),Object(o.o)(ve,t);const i=Object(o.e)(ge,ve),n=Object(P.a)(i),a=Object(o.d)(ge,ge,ve);return Object(o.e)(a,r)<0?2*Math.PI-n:n}});const Se=.99619469809,Me=Object(n.e)(),Ce=Object(n.e)(),Ae=Object(n.e)(),Pe=Object(n.e)(),Ie=Object(n.e)();function Re(e,t,r){return e!==r&&ye(e,r),r[3]=-Object(o.e)(r,t),r}function Le(e,t,r,i=xe()){return we(r,Object(o.d)(M.get(),t,e),i)}function Be(e,t,r){return!!Object(i.h)(t)&&qe(e,t.origin,t.direction,!0,!1,r)}function Fe(e,t,r){return qe(e,t.origin,t.vector,!1,!1,r)}function ze(e,t,r){return qe(e,t.origin,t.vector,!1,!0,r)}function De(e,t){const{center:r,radius:i}=t;return He(e,r)-i>=0}function Ne(e,t){return He(e,t)>=0}function Ve(e,t){return e[0]*(e[0]>0?t[0]:t[3])+e[1]*(e[1]>0?t[1]:t[4])+e[2]*(e[2]>0?t[2]:t[5])+e[3]>=0}function Ee(e,t){const r=Object(o.e)(e,t.ray.direction),i=-He(e,t.ray.origin);if(i<0&&r>=0)return!1;if(r>-1e-6&&r<1e-6)return i>0;if((i<0||r<0)&&!(i<0&&r<0))return!0;const n=i/r;return r>0?n<t.c1&&(t.c1=n):n>t.c0&&(t.c0=n),t.c0<=t.c1}function Ue(e,t){const r=Object(o.e)(e,t.ray.direction),i=-He(e,t.ray.origin);if(r>-1e-6&&r<1e-6)return i>0;const n=i/r;return r>0?n<t.c1&&(t.c1=n):n>t.c0&&(t.c0=n),t.c0<=t.c1}function Ge(e,t,r){const i=Object(o.b)(M.get(),e,-e[3]),n=ke(e,Object(o.g)(M.get(),t,i),M.get());return Object(o.c)(r,n,i),r}function ke(e,t,r){const i=Object(o.b)(M.get(),e,Object(o.e)(e,t));return Object(o.g)(r,t,i),r}function He(e,t){return Object(o.e)(e,t)+e[3]}function qe(e,t,r,i,n,a){const s=Object(o.e)(e,r);if(0===s)return!1;let c=-(Object(o.e)(e,t)+e[3])/s;return n&&(c=i?Math.max(0,c):Object(P.c)(c,0,1)),!(c<0||!i&&c>1||(Object(o.c)(a,t,Object(o.b)(a,r,c)),0))}const We=[0,0,1,0];Object.freeze({__proto__:null,create:xe,wrap:Oe,copy:ye,fromValues:_e,fromNormalAndOffset:function(e,t,r=xe()){return Object(o.h)(r,e),r[3]=t,r},fromPositionAndNormal:we,fromPoints:je,fromManyPoints:function(e,t){return Te(e,t,0,1,2)},fromManyPointsSampleAt:Te,setOffsetFromPoint:Re,negate:function(e,t){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=-e[3],t},fromVectorsAndPoint:Le,intersectRay:Be,intersectLineSegment:Fe,intersectLineSegmentClamp:ze,isSphereFullyInside:De,isSphereFullyOutside:function(e,t){const{center:r,radius:i}=t;return He(e,r)+i<0},isPointInside:Ne,isPointOutside:function(e,t){return He(e,t)<0},isAABBFullyInside:Ve,clip:Ee,clipInfinite:Ue,projectPoint:Ge,projectVector:ke,distance:function(e,t){return Math.abs(He(e,t))},signedDistance:He,normal:function(e){return e},UP:We});var $e=r("qRWG");function Xe(e){return e?{origin:Object(n.d)(e.origin),direction:Object(n.d)(e.direction)}:{origin:Object(n.e)(),direction:Object(n.e)()}}function Ye(e,t=Xe()){return Je(e.origin,e.direction,t)}function Je(e,t,r=Xe()){return Object(o.h)(r.origin,e),Object(o.h)(r.direction,t),r}function Ke(e,t,r=Xe()){const n=Object($e.a)(Object(y.c)(M.get(),t));if(n[2]=0,!e.unprojectFromRenderScreen(n,r.origin))return null;const a=Object($e.a)(Object(y.c)(M.get(),t));a[2]=1;const s=e.unprojectFromRenderScreen(a,M.get());return Object(i.g)(s)?null:(Object(o.g)(r.direction,s,r.origin),r)}function Qe(e,t,r=Xe()){return Ze(e,e.screenToRender(t,Object($e.a)(M.get())),r)}function Ze(e,t,r=Xe()){Object(o.h)(r.origin,e.eye);const n=Object(o.r)(M.get(),t[0],t[1],1),a=e.unprojectFromRenderScreen(n,M.get());return Object(i.g)(a)?null:(Object(o.g)(r.direction,a,r.origin),r)}function et(e,t){const r=Object(o.d)(M.get(),Object(o.o)(M.get(),e.direction),Object(o.g)(M.get(),t,e.origin));return Object(o.e)(r,r)}function tt(e,t,r){const i=Object(o.e)(e.direction,Object(o.g)(r,t,e.origin));return Object(o.c)(r,e.origin,Object(o.b)(r,e.direction,i)),r}function rt(){return{origin:null,direction:null}}const it=new x(rt);Object.freeze({__proto__:null,create:Xe,wrap:function(e,t){const r=it.get();return r.origin=e,r.direction=t,r},copy:Ye,fromPoints:function(e,t,r=Xe()){return Object(o.h)(r.origin,e),Object(o.g)(r.direction,t,e),r},fromValues:Je,fromScreen:function(e,t,r=Xe()){return Ke(e,e.screenToRender(t,Object($e.a)(M.get())),r)},fromRender:Ke,fromScreenAtEye:Qe,fromRenderAtEye:Ze,distance2:et,distance:function(e,t){return Math.sqrt(et(e,t))},closestPoint:tt,createWrapper:rt});const nt=f.a.getLogger("esri.views.3d.support.geometryUtils.boundedPlane");function ot(e=wt){return{plane:xe(e.plane),origin:Object(n.d)(e.origin),basis1:Object(n.d)(e.basis1),basis2:Object(n.d)(e.basis2)}}function at(e,t=ot()){return st(e.origin,e.basis1,e.basis2,t)}function st(e,t,r,i=ot()){return Object(o.h)(i.origin,e),Object(o.h)(i.basis1,t),Object(o.h)(i.basis2,r),ct(i),function(e,t){Math.abs(Object(o.e)(e.basis1,e.basis2)/(Object(o.m)(e.basis1)*Object(o.m)(e.basis2)))>1e-6&&nt.warn(t,"Provided basis vectors are not perpendicular"),Math.abs(Object(o.e)(e.basis1,vt(e)))>1e-6&&nt.warn(t,"Basis vectors and plane normal are not perpendicular"),Math.abs(-Object(o.e)(vt(e),e.origin)-e.plane[3])>1e-6&&nt.warn(t,"Plane offset is not consistent with plane origin")}(i,"fromValues()"),i}function ct(e){Le(e.basis2,e.basis1,e.origin,e.plane)}function lt(e,t,r){e!==r&&at(e,r);const i=Object(o.b)(M.get(),vt(e),t);return Object(o.c)(r.origin,r.origin,i),r.plane[3]-=t,r}function ut(e,t=ot()){const r=(e[2]-e[0])/2,i=(e[3]-e[1])/2;return Object(o.r)(t.origin,e[0]+r,e[1]+i,0),Object(o.r)(t.basis1,r,0,0),Object(o.r)(t.basis2,0,i,0),_e(0,0,1,0,t.plane),t}function dt(e,t,r){return!!Be(e.plane,t,r)&&xt(e,r)}function ft(e,t,r){const i=jt.get();_t(e,t,i,jt.get());let n=Number.POSITIVE_INFINITY;for(const a of Ct){const s=yt(e,a,Tt.get()),c=M.get();if(Fe(i,s,c)){const e=Object(me.c)(M.get(),t.origin,c),i=Math.abs(Object(P.a)(Object(o.e)(t.direction,e)));i<n&&(n=i,Object(o.h)(r,c))}}return n===Number.POSITIVE_INFINITY?ht(e,t,r):r}function ht(e,t,r){if(dt(e,t,r))return r;const i=jt.get(),n=jt.get();_t(e,t,i,n);let a=Number.POSITIVE_INFINITY;for(const s of Ct){const c=yt(e,s,Tt.get()),l=M.get();if(ze(i,c,l)){const e=et(t,l);if(!Ne(n,l))continue;e<a&&(a=e,Object(o.h)(r,l))}}return bt(e,t.origin)<a&&mt(e,t.origin,r),r}function mt(e,t,r){const i=Ge(e.plane,t,M.get()),n=F(Ot(e,e.basis1),i,-1,1,M.get()),a=F(Ot(e,e.basis2),i,-1,1,M.get());return Object(o.g)(r,Object(o.c)(M.get(),n,a),e.origin),r}function pt(e,t,r){const{origin:i,basis1:n,basis2:a}=e,s=Object(o.g)(M.get(),t,i),c=pe(n,s),l=pe(a,s),u=pe(vt(e),s);return Object(o.r)(r,c,l,u)}function bt(e,t){const r=pt(e,t,M.get()),{basis1:i,basis2:n}=e,a=Object(o.m)(i),s=Object(o.m)(n),c=Math.max(Math.abs(r[0])-a,0),l=Math.max(Math.abs(r[1])-s,0),u=r[2];return c*c+l*l+u*u}function gt(e,t){const r=-e.plane[3];return pe(vt(e),t)-r}function vt(e){return e.plane}function xt(e,t){const r=Object(o.g)(M.get(),t,e.origin),i=Object(o.p)(e.basis1),n=Object(o.p)(e.basis2),a=Object(o.e)(e.basis1,r),s=Object(o.e)(e.basis2,r);return-a-i<0&&a-i<0&&-s-n<0&&s-n<0}function Ot(e,t){const r=Tt.get();return Object(o.h)(r.origin,e.origin),Object(o.h)(r.vector,t),r}function yt(e,t,r){const{basis1:i,basis2:n,origin:a}=e,s=Object(o.b)(M.get(),i,t.origin[0]),c=Object(o.b)(M.get(),n,t.origin[1]);Object(o.c)(r.origin,s,c),Object(o.c)(r.origin,r.origin,a);const l=Object(o.b)(M.get(),i,t.direction[0]),u=Object(o.b)(M.get(),n,t.direction[1]);return Object(o.b)(r.vector,Object(o.c)(l,l,u),2),r}function _t(e,t,r,i){const n=vt(e);Le(n,t.direction,t.origin,r),Le(r,n,t.origin,i)}const wt={plane:xe(),origin:Object(n.g)(0,0,0),basis1:Object(n.g)(1,0,0),basis2:Object(n.g)(0,1,0)},jt=new x(xe),Tt=new x(I),St=Object(n.e)(),Mt=new x(()=>({origin:null,basis1:null,basis2:null,plane:null})),Ct=[{origin:[-1,-1],direction:[1,0]},{origin:[1,-1],direction:[0,1]},{origin:[1,1],direction:[-1,0]},{origin:[-1,1],direction:[0,-1]}],At=Object(l.b)(),Pt=Object(l.b)();Object.freeze({__proto__:null,BoundedPlaneClass:class{constructor(){this.plane=xe(),this.origin=Object(n.e)(),this.basis1=Object(n.e)(),this.basis2=Object(n.e)()}},create:ot,wrap:function(e,t,r){const i=Mt.get();return i.origin=e,i.basis1=t,i.basis2=r,i.plane=Oe(0,0,0,0),ct(i),i},copy:at,fromValues:st,updateUnboundedPlane:ct,elevate:lt,setExtent:function(e,t,r){return ut(t,r),lt(r,gt(e,e.origin),r),r},fromAABoundingRect:ut,intersectRay:dt,intersectRayClosestSilhouette:function(e,t,r){if(dt(e,t,r))return r;const i=ft(e,t,M.get());return Object(o.c)(r,t.origin,Object(o.b)(M.get(),t.direction,Object(o.l)(t.origin,i)/Object(o.m)(t.direction))),r},closestPointOnSilhouette:ft,closestPoint:ht,projectPoint:mt,projectPointLocal:pt,distance2:bt,distance:function(e,t){return Math.sqrt(bt(e,t))},distanceToSilhouette:function(e,t){let r=Number.NEGATIVE_INFINITY;for(const i of Ct){const n=B(yt(e,i,Tt.get()),t);n>r&&(r=n)}return Math.sqrt(r)},extrusionContainsPoint:function(e,t){return Ne(e.plane,t)&&xt(e,t)},axisAt:function(e,t,r,i){return function(e,t,r){switch(t){case 0:Object(o.h)(r,e.basis1),Object(o.o)(r,r);break;case 1:Object(o.h)(r,e.basis2),Object(o.o)(r,r);break;case 2:Object(o.h)(r,vt(e))}return r}(e,r,i)},altitudeAt:gt,setAltitudeAt:function(e,t,r,i){const n=gt(e,t),a=Object(o.b)(St,vt(e),r-n);return Object(o.c)(i,t,a),i},equals:function(e,t){return Object(o.n)(e.basis1,t.basis1)&&Object(o.n)(e.basis2,t.basis2)&&Object(o.n)(e.origin,t.origin)},transform:function(e,t,r){return e!==r&&at(e,r),Object(a.a)(At,t),Object(a.b)(At,At),Object(o.j)(r.basis1,e.basis1,At),Object(o.j)(r.basis2,e.basis2,At),Object(o.j)(r.plane,e.plane,At),Object(o.j)(r.origin,e.origin,t),Re(r.plane,r.origin,r.plane),r},rotate:function(e,t,r,i){return e!==i&&at(e,i),Object(a.h)(Pt,Object(a.e)(Pt),t,r),Object(o.j)(i.basis1,e.basis1,Pt),Object(o.j)(i.basis2,e.basis2,Pt),ct(i),i},normal:vt,UP:wt});const It=f.a.getLogger("esri.views.3d.support.geometryUtils.sphere");function Rt(e){return e?{radius:e.radius,center:Object(n.d)(e.center)}:{radius:1,center:Object(n.e)()}}function Lt(e,t=Rt()){return Bt(e.radius,e.center,t)}function Bt(e,t,r=Rt()){return Object(o.h)(r.center,t),r.radius=e,r}function Ft(e,t,r){if(Object(i.g)(t))return!1;const n=Object(o.g)(M.get(),t.origin,e.center),a=Object(o.e)(t.direction,t.direction),s=2*Object(o.e)(t.direction,n),c=s*s-4*a*(Object(o.e)(n,n)-e.radius*e.radius);if(c<0)return!1;const l=Math.sqrt(c);let u=(-s-l)/(2*a);const d=(-s+l)/(2*a);return(u<0||d<u&&d>0)&&(u=d),!(u<0||(r&&Object(o.c)(r,t.origin,Object(o.b)(M.get(),t.direction,u)),0))}function zt(e,t,r){const i=M.get(),n=A.get();Object(o.d)(i,t.origin,t.direction),Object(o.d)(r,i,t.origin),Object(o.b)(r,r,1/Object(o.m)(r)*e.radius);const s=Nt(e,t.origin),c=be(t.origin,r);return Object(a.e)(n),Object(a.h)(n,n,c+s,i),Object(o.j)(r,r,n),r}function Dt(e,t,r){const i=Object(o.g)(M.get(),t,e.center),n=Object(o.b)(M.get(),i,e.radius/Object(o.m)(i));return Object(o.c)(r,n,e.center)}function Nt(e,t){const r=Object(o.g)(M.get(),t,e.center),i=Object(o.m)(r),n=e.radius+Math.abs(e.radius-i);return Object(P.a)(e.radius/n)}const Vt=Object(n.e)();function Et(e,t,r,i){const n=Object(o.g)(Vt,t,e.center);switch(r){case 0:{const e=Object(me.a)(n,Vt)[2];return Object(o.r)(i,-Math.sin(e),Math.cos(e),0)}case 1:{const e=Object(me.a)(n,Vt),t=e[1],r=e[2],a=Math.sin(t);return Object(o.r)(i,-a*Math.cos(r),-a*Math.sin(r),Math.cos(t))}case 2:return Object(o.o)(i,n);default:return}}function Ut(e,t){const r=Object(o.g)(qt,t,e.center);return Object(o.m)(r)-e.radius}const Gt=new x(()=>({center:null,radius:0})),kt=Xe(),Ht=Object(n.e)(),qt=Object(n.e)();function Wt(e=Xt){return[e[0],e[1],e[2],e[3]]}function $t(e,t,r,i,n=Wt()){return n[0]=e,n[1]=t,n[2]=r,n[3]=i,n}Object.freeze(Ht),Object.freeze({__proto__:null,create:Rt,wrap:function(e,t){const r=Gt.get();return r.radius=e,r.center=t||Ht,r},copy:Lt,fromValues:Bt,elevate:function(e,t,r){return e!==r&&Object(o.h)(r.center,e.center),r.radius=e.radius+t,r},setExtent:function(e,t,r){return It.error("sphere.setExtent is not yet supported"),e===r?r:Lt(e,r)},intersectRay:Ft,intersectScreen:function(e,t,r,i){return Ft(e,Qe(t,r,kt),i)},intersectsRay:function(e,t){return Ft(e,t,null)},intersectRayClosestSilhouette:function(e,t,r){if(Ft(e,t,r))return r;const i=zt(e,t,M.get());return Object(o.c)(r,t.origin,Object(o.b)(M.get(),t.direction,Object(o.l)(t.origin,i)/Object(o.m)(t.direction))),r},closestPointOnSilhouette:zt,closestPoint:function(e,t,r){return Ft(e,t,r)?r:(tt(t,e.center,r),Dt(e,r,r))},projectPoint:Dt,distanceToSilhouette:function(e,t){const r=Object(o.g)(M.get(),t,e.center),i=Object(o.p)(r);return Math.sqrt(Math.abs(i-e.radius*e.radius))},angleToSilhouette:Nt,axisAt:Et,altitudeAt:Ut,setAltitudeAt:function(e,t,r,i){const n=Ut(e,t),a=Et(e,t,2,qt),s=Object(o.b)(qt,a,r-n);return Object(o.c)(i,t,s),i}});const Xt=[0,0,1,0];function Yt(e){return e?{ray:Xe(e.ray),c0:e.c0,c1:e.c1}:{ray:Xe(),c0:0,c1:Number.MAX_VALUE}}function Jt(e,t,r,i=Yt()){return Ye(e,i.ray),i.c0=t,i.c1=r,i}function Kt(e,t=Yt()){return Ye(e,t.ray),t.c0=0,t.c1=Number.MAX_VALUE,t}function Qt(e,t,r=Yt()){const i=Object(o.m)(e.vector);return Je(e.origin,t,r.ray),r.c0=0,r.c1=i,r}function Zt(e,t,r){return Object(o.c)(r,e.ray.origin,Object(o.b)(r,e.ray.direction,t))}Object.freeze({__proto__:null,create:Wt,wrap:function(e,t,r,i){return $t(e,t,r,i,C.get())},wrapAxisAngle:function(e,t){return $t(e[0],e[1],e[2],t,C.get())},copy:function(e,t=Wt()){return $t(e[0],e[1],e[2],e[3],t)},fromValues:$t,fromAxisAndAngle:function(e,t,r=Wt()){return Object(o.h)(r,e),r[3]=t,r},fromPoints:function(e,t,r=Wt()){return Object(o.d)(r,e,t),Object(o.o)(r,r),r[3]=be(e,t),r},axis:function(e){return e},UP:Xt});const er=new x(()=>({c0:0,c1:0,ray:null}));function tr(e){if(e){const{planes:t,points:r}=e;return{planes:[xe(t[0]),xe(t[1]),xe(t[2]),xe(t[3]),xe(t[4]),xe(t[5])],points:[Object(n.d)(r[0]),Object(n.d)(r[1]),Object(n.d)(r[2]),Object(n.d)(r[3]),Object(n.d)(r[4]),Object(n.d)(r[5]),Object(n.d)(r[6]),Object(n.d)(r[7])]}}return{planes:[xe(),xe(),xe(),xe(),xe(),xe()],points:[Object(n.e)(),Object(n.e)(),Object(n.e)(),Object(n.e)(),Object(n.e)(),Object(n.e)(),Object(n.e)(),Object(n.e)()]}}function rr(e,t,r=tr()){for(let i=0;i<6;i++)ye(e[i],r.planes[i]);for(let i=0;i<8;i++)Object(o.h)(r.points[i],t[i]);return r}function ir(e){const{planes:t,points:r}=e;je(r[4],r[0],r[3],t[0]),je(r[1],r[5],r[6],t[1]),je(r[4],r[5],r[1],t[2]),je(r[3],r[2],r[6],t[3]),je(r[0],r[1],r[2],t[4]),je(r[5],r[4],r[7],t[5])}function nr(e,t){for(let r=0;r<6;r++)if(!Ee(e[r],t))return!1;return!0}Object.freeze({__proto__:null,create:Yt,wrap:function(e,t,r){const i=er.get();return i.ray=e,i.c0=t,i.c1=r,i},copy:function(e,t=Yt()){return Jt(e.ray,e.c0,e.c1,t)},fromValues:Jt,fromRay:Kt,fromLineSegment:function(e,t=Yt()){return Qt(e,Object(o.o)(M.get(),e.vector),t)},fromLineSegmentAndDirection:Qt,getStart:function(e,t){return Zt(e,e.c0,t)},getEnd:function(e,t){return Zt(e,e.c1,t)},getAt:Zt});const or=[Object(j.b)(-1,-1,-1,1),Object(j.b)(1,-1,-1,1),Object(j.b)(1,1,-1,1),Object(j.b)(-1,1,-1,1),Object(j.b)(-1,-1,1,1),Object(j.b)(1,-1,1,1),Object(j.b)(1,1,1,1),Object(j.b)(-1,1,1,1)],ar=new x(Yt);Object.freeze({__proto__:null,create:tr,copy:function(e,t=tr()){return rr(e.planes,e.points,t)},fromValues:rr,fromMatrix:function(e,t,r=tr()){const{points:i}=r,n=Object(a.g)(A.get(),t,e);Object(a.a)(n,n);for(let a=0;a<8;++a){const e=Object(de.l)(C.get(),or[a],n);Object(o.r)(i[a],e[0]/e[3],e[1]/e[3],e[2]/e[3])}return ir(r),r},recomputePlanes:ir,intersectsSphere:function(e,t){for(let r=0;r<6;r++)if(De(e[r],t))return!1;return!0},intersectsRay:function(e,t){return nr(e,Kt(t,ar.get()))},intersectClipRay:function(e,t){for(let r=0;r<6;r++)if(!Ue(e[r],t))return!1;return!0},intersectsLineSegment:function(e,t,r){return nr(e,Qt(t,r,ar.get()))},intersectsPoint:function(e,t){for(let r=0;r<6;r++)if(He(e[r],t)>0)return!1;return!0},intersectsAABB:function(e,t){for(let r=0;r<6;r++)if(Ve(e[r],t))return!1;return!0},planePointIndices:{bottom:[5,1,0,4],near:[0,1,2,3],far:[5,4,7,6],right:[1,5,6,2],left:[4,0,3,7],top:[7,3,2,6]}});var sr=r("7Nfj");class cr{acquire(e,t,r,i,n,o){this.id=cr._idGen.gen(e&&e.id),this.geometry=e,this.material=t,this.transformation=r,this.instanceParameters=i,this.origin=n,this.shaderTransformation=o}getStaticTransformation(){return this.transformation}getShaderTransformation(){return this.shaderTransformation?this.shaderTransformation(this.transformation):this.transformation}computeAttachmentOrigin(e){return!!(this.material.computeAttachmentOrigin?this.material.computeAttachmentOrigin(this.geometry,e):this.geometry.computeAttachmentOrigin(e))&&(Object(o.j)(e,e,this.getStaticTransformation()),!0)}}cr._idGen=new ne,cr.pool=new sr.a(cr);var lr=cr;const ur=new ne;function dr(e){return{id:ur.gen(0===e?"highlight":"occludee"),channel:e}}var fr=r("tiP8");class hr{constructor(e={}){this._objectTransformation=Object(l.b)(),this._bvObjectSpace=new pr,this._bvWorldSpace=new pr,this._bvDirty=!0,this._hasVolatileTransformation=!1,this._visible=!0,this.id=hr._idGen.gen(e.idHint),this.castShadow=null==e.castShadow||e.castShadow,this.metadata=e.metadata,this.metadata&&this.metadata.isElevationSource&&(this.metadata.lastValidElevationBB=new mr),this.objectTransformation=Object(l.b)(),this._initializeGeometryRecords(e.geometries,e.materials,e.transformations,e.origins)}get geometryRecords(){return this._geometryRecords}get geometries(){return this._geometries}get objectTransformation(){return this._objectTransformation}set objectTransformation(e){Object(a.c)(this._objectTransformation,e),this._invalidateBoundingVolume(),this._notifyDirty("objTransformation")}dispose(){for(const e of this._geometryRecords)lr.pool.release(e);this._geometryRecords=null,this._geometries=null}_initializeGeometryRecords(e,t,r,i){if(!Array.isArray(e))return this._geometryRecords=[],void(this._geometries=[]);Object(re.b)(t.length===e.length,"Object3D: materials don't match geometries"),Object(re.b)(r.length===e.length,"Object3D: transformations don't match geometries"),this._geometryRecords=new Array(e.length),this._geometries=e.slice();for(let n=0;n<e.length;n++){const o={highlights:null,occludees:null,visible:!0};this._geometryRecords[n]=lr.pool.acquire(e[n],t[n],Object(l.c)(r[n]),o,i&&i[n])}this._hasVolatileTransformation=!1}get parentLayer(){return this._parentLayer}set parentLayer(e){Object(re.b)(null==this._parentLayer||null==e,"Object3D can only be added to a single Layer"),this._parentLayer=e}getNumGeometryRecords(){return this._geometryRecords.length}getGeometryRecord(e){return Object(re.b)(e>=0&&e<this._geometryRecords.length,"Object3d.getGeometryDataByIndex: index out of range"),this._geometryRecords[e]}addGeometry(e,t,r,i,n,o){r=r||l.a,this._geometries.push(e);const a=lr.pool.acquire(e,t,r,i||{highlights:null,occludees:null,visible:!0},n,o);return this._geometryRecords.push(a),this._hasVolatileTransformation=this._geometryRecords.some(e=>!!e.shaderTransformation),this._notifyDirty("objGeometryAdded",a),this._invalidateBoundingVolume(),a}removeGeometry(e){const t=this._geometryRecords.splice(e,1)[0];return lr.pool.release(t),this._hasVolatileTransformation=this._geometryRecords.some(e=>!!e.shaderTransformation),this._geometries.splice(e,1),this._notifyDirty("objGeometryRemoved",t),this._invalidateBoundingVolume(),t}removeAllGeometries(){for(;this.getNumGeometryRecords()>0;)this.removeGeometry(0)}geometryVertexAttrsUpdated(e){this._notifyDirty("vertexAttrsUpdated",this._geometryRecords[e]),this._invalidateBoundingVolume()}get isVisible(){return this._visible}setVisible(e){this._visible=e;for(const t of this._geometryRecords)t.instanceParameters.visible=this._visible;this._notifyDirty("visibilityChanged")}maskOccludee(){const e=dr(1);for(const t of this._geometryRecords)t.instanceParameters.occludees=Object(fr.a)(t.instanceParameters.occludees,e);return this._notifyDirty("occlusionChanged"),e}removeOcclude(e){for(const t of this._geometryRecords)t.instanceParameters.occludees=Object(fr.c)(t.instanceParameters.occludees,e);this._notifyDirty("occlusionChanged")}highlight(){const e=dr(0);for(const t of this._geometryRecords)t.instanceParameters.highlights=Object(fr.a)(t.instanceParameters.highlights,e);return this._notifyDirty("highlightChanged"),e}removeHighlight(e){for(const t of this._geometryRecords)t.instanceParameters.highlights=Object(fr.c)(t.instanceParameters.highlights,e);this._notifyDirty("highlightChanged")}getCombinedStaticTransformation(e,t){return Object(a.g)(Object(i.o)(t,Object(l.b)()),this.objectTransformation,e.getStaticTransformation())}getCombinedShaderTransformation(e,t){return t=t||Object(l.b)(),Object(a.g)(t,this.objectTransformation,e.getShaderTransformation()),t}hasVolativeTransformation(){return this._hasVolatileTransformation}getBBMin(e){return this._validateBoundingVolume(),e?this._bvObjectSpace.bbMin:this._bvWorldSpace.bbMin}getBBMax(e){return this._validateBoundingVolume(),e?this._bvObjectSpace.bbMax:this._bvWorldSpace.bbMax}getCenter(e){return this._validateBoundingVolume(),e?this._bvObjectSpace.center:this._bvWorldSpace.center}getBSRadius(e){return this._validateBoundingVolume(),e?this._bvObjectSpace.bsRadius:this._bvWorldSpace.bsRadius}_validateBoundingVolume(){if(!this._bvDirty&&!this._hasVolatileTransformation)return;this._bvObjectSpace.init(),this._bvWorldSpace.init();for(let i=0;i<this._geometryRecords.length;++i){const e=this._geometryRecords[i],t=this._geometries[i].boundingInfo;this._calculateTransformedBoundingVolume(t,this._bvObjectSpace,e.getShaderTransformation()),this._calculateTransformedBoundingVolume(t,this._bvWorldSpace,this.getCombinedShaderTransformation(e))}Object(o.f)(this._bvObjectSpace.center,this._bvObjectSpace.bbMin,this._bvObjectSpace.bbMax,.5),Object(o.f)(this._bvWorldSpace.center,this._bvWorldSpace.bbMin,this._bvWorldSpace.bbMax,.5);const e=Object(n.e)(),t=Object(n.e)(),r=Object(me.d)(this.objectTransformation);for(let i=0;i<this._geometryRecords.length;++i){const n=this._geometries[i],a=this._geometryRecords[i].getShaderTransformation(),s=Object(me.d)(a),c=n.boundingInfo;Object(o.j)(e,c.getCenter(),a);const l=Object(o.l)(e,this._bvObjectSpace.center),u=c.getBSRadius()*s;this._bvObjectSpace.bsRadius=Math.max(this._bvObjectSpace.bsRadius,l+u),Object(o.j)(t,e,this.objectTransformation);const d=Object(o.l)(t,this._bvWorldSpace.center);this._bvWorldSpace.bsRadius=Math.max(this._bvWorldSpace.bsRadius,d+u*r)}this._bvDirty=!1}_calculateTransformedBoundingVolume(e,t,r){const i=e.getBBMin(),a=e.getBBMax(),s=Object(n.d)(i),c=Object(n.d)(a);Object(o.j)(s,s,r),Object(o.j)(c,c,r);for(let n=0;n<3;++n)t.bbMin[n]=Math.min(t.bbMin[n],s[n],c[n]),t.bbMax[n]=Math.max(t.bbMax[n],s[n],c[n]);for(let n=0;n<3;++n){Object(o.h)(s,i),Object(o.h)(c,a),s[n]=a[n],c[n]=i[n],Object(o.j)(s,s,r),Object(o.j)(c,c,r);for(let e=0;e<3;++e)t.bbMin[e]=Math.min(t.bbMin[e],s[e],c[e]),t.bbMax[e]=Math.max(t.bbMax[e],s[e],c[e])}}_invalidateBoundingVolume(){this._bvDirty=!0,this._parentLayer&&this._parentLayer.notifyObjectBBChanged(this,{center:this._bvWorldSpace.center,radius:this._bvWorldSpace.bsRadius})}_notifyDirty(e,t,r,i){this._parentLayer&&this._parentLayer.notifyDirty(e,t,r=r||1,i||this)}get test(){const e=this;return{hasGeometry:t=>e._geometries.indexOf(t)>-1,getGeometryIndex:t=>e._geometries.indexOf(t)}}}hr._idGen=new ne;class mr{constructor(){this.bbMin=Object(n.g)(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this.bbMax=Object(n.g)(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE)}isEmpty(){return this.bbMax[0]<this.bbMin[0]&&this.bbMax[1]<this.bbMin[1]&&this.bbMax[2]<this.bbMin[2]}}class pr extends mr{constructor(){super(),this.center=Object(n.e)(),this.bsRadius=0}init(){Object(o.r)(this.bbMin,Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),Object(o.r)(this.bbMax,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),Object(o.r)(this.center,0,0,0),this.bsRadius=0}getCenter(){return this.center}getBSRadius(){return this.bsRadius}}const br=new class{constructor(e=0){this.offset=e,this.sphere=Rt(),this.tmpVertex=Object(n.e)()}applyToVertex(e,t,r){const i=this.objectTransform.transform;let n=i[0]*e+i[4]*t+i[8]*r+i[12],o=i[1]*e+i[5]*t+i[9]*r+i[13],a=i[2]*e+i[6]*t+i[10]*r+i[14];const s=this.offset/Math.sqrt(n*n+o*o+a*a);n+=n*s,o+=o*s,a+=a*s;const c=this.objectTransform.inverse;return this.tmpVertex[0]=c[0]*n+c[4]*o+c[8]*a+c[12],this.tmpVertex[1]=c[1]*n+c[5]*o+c[9]*a+c[13],this.tmpVertex[2]=c[2]*n+c[6]*o+c[10]*a+c[14],this.tmpVertex}applyToMinMax(e,t){const r=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*r,e[1]+=e[1]*r,e[2]+=e[2]*r;const i=this.offset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]+=t[0]*i,t[1]+=t[1]*i,t[2]+=t[2]*i}applyToAabb(e){const t=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*t,e[1]+=e[1]*t,e[2]+=e[2]*t;const r=this.offset/Math.sqrt(e[3]*e[3]+e[4]*e[4]+e[5]*e[5]);return e[3]+=e[3]*r,e[4]+=e[4]*r,e[5]+=e[5]*r,e}applyToBoundingSphere(e,t){const r=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]),i=this.offset/r;return this.sphere.center[0]=t[0]+t[0]*i,this.sphere.center[1]=t[1]+t[1]*i,this.sphere.center[2]=t[2]+t[2]*i,this.sphere.radius=e+e*this.offset/r,this.sphere}};new class{constructor(e=0){this.offset=e,this.componentLocalOriginLength=0,this.tmpVertex=Object(n.e)(),this.mbs=Object(j.a)(),this.obb={center:Object(n.e)(),halfSize:Object(he.a)(),quaternion:null}}set localOrigin(e){this.componentLocalOriginLength=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2])}applyToVertex(e,t,r){const i=e,n=t,o=r+this.componentLocalOriginLength,a=this.offset/Math.sqrt(i*i+n*n+o*o);return this.tmpVertex[0]=e+i*a,this.tmpVertex[1]=t+n*a,this.tmpVertex[2]=r+o*a,this.tmpVertex}applyToAabb(e){const t=e[0],r=e[1],i=e[2]+this.componentLocalOriginLength,n=e[3],o=e[4],a=e[5]+this.componentLocalOriginLength,s=this.offset/Math.sqrt(t*t+r*r+i*i);e[0]+=t*s,e[1]+=r*s,e[2]+=i*s;const c=this.offset/Math.sqrt(n*n+o*o+a*a);return e[3]+=n*c,e[4]+=o*c,e[5]+=a*c,e}applyToMbs(e){const t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),r=this.offset/t;return this.mbs[0]=e[0]+e[0]*r,this.mbs[1]=e[1]+e[1]*r,this.mbs[2]=e[2]+e[2]*r,this.mbs[3]=e[3]+e[3]*this.offset/t,this.mbs}applyToObb(e){const t=e.center,r=this.offset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);this.obb.center[0]=t[0]+t[0]*r,this.obb.center[1]=t[1]+t[1]*r,this.obb.center[2]=t[2]+t[2]*r,Object(o.q)(this.obb.halfSize,e.halfSize,e.quaternion),Object(o.c)(this.obb.halfSize,this.obb.halfSize,e.center);const i=this.offset/Math.sqrt(this.obb.halfSize[0]*this.obb.halfSize[0]+this.obb.halfSize[1]*this.obb.halfSize[1]+this.obb.halfSize[2]*this.obb.halfSize[2]);return this.obb.halfSize[0]+=this.obb.halfSize[0]*i,this.obb.halfSize[1]+=this.obb.halfSize[1]*i,this.obb.halfSize[2]+=this.obb.halfSize[2]*i,Object(o.g)(this.obb.halfSize,this.obb.halfSize,e.center),Object(fe.a)(gr,e.quaternion),Object(o.q)(this.obb.halfSize,this.obb.halfSize,gr),this.obb.halfSize[0]*=this.obb.halfSize[0]<0?-1:1,this.obb.halfSize[1]*=this.obb.halfSize[1]<0?-1:1,this.obb.halfSize[2]*=this.obb.halfSize[2]<0?-1:1,this.obb.quaternion=e.quaternion,this.obb}},new class{constructor(e=0){this.offset=e,this.tmpVertex=Object(n.e)()}applyToVertex(e,t,r){const i=e+this.localOrigin[0],n=t+this.localOrigin[1],o=r+this.localOrigin[2],a=this.offset/Math.sqrt(i*i+n*n+o*o);return this.tmpVertex[0]=e+i*a,this.tmpVertex[1]=t+n*a,this.tmpVertex[2]=r+o*a,this.tmpVertex}applyToAabb(e){const t=e[0]+this.localOrigin[0],r=e[1]+this.localOrigin[1],i=e[2]+this.localOrigin[2],n=e[3]+this.localOrigin[0],o=e[4]+this.localOrigin[1],a=e[5]+this.localOrigin[2],s=this.offset/Math.sqrt(t*t+r*r+i*i);e[0]+=t*s,e[1]+=r*s,e[2]+=i*s;const c=this.offset/Math.sqrt(n*n+o*o+a*a);return e[3]+=n*c,e[4]+=o*c,e[5]+=a*c,e}},Object(n.e)(),Object(n.e)(),Object(j.a)();const gr=Object(_.a)(),vr=e=>class extends e{constructor(){super(...arguments),this._isDisposed=!1}dispose(){for(const t of null!=(e=this._managedDisposables)?e:[]){var e;const r=this[t];this[t]=null,r&&"function"==typeof r.dispose&&r.dispose()}this._isDisposed=!0}get isDisposed(){return this._isDisposed}};class xr extends(vr(class{})){}var Or=class extends xr{constructor(e){super(),this.material=e.material,this.techniqueRep=e.techniqueRep,this.output=e.output}getTechnique(){return this.technique}getPipelineState(e,t){return this.getTechnique().pipeline}ensureResources(e){return 2}ensureParameters(e){}},yr=class extends Or{constructor(e){super(e),this._textureIDs=new Set,this._textureRepository=e.textureRep,this._textureId=e.textureId,this._initTransparent=!!e.initTextureTransparent,this._texture=this._acquireIfNotUndefined(this._textureId),this._textureNormal=this._acquireIfNotUndefined(e.normalTextureId),this._textureEmissive=this._acquireIfNotUndefined(e.emissiveTextureId),this._textureOcclusion=this._acquireIfNotUndefined(e.occlusionTextureId),this._textureMetallicRoughness=this._acquireIfNotUndefined(e.metallicRoughnessTextureId)}dispose(){this._textureIDs.forEach(e=>this._textureRepository.release(e)),this._textureIDs.clear()}updateTexture(e){e!==this._textureId&&(this._releaseIfNotUndefined(this._textureId),this._textureId=e,this._texture=this._acquireIfNotUndefined(this._textureId))}bindTexture(e,t){Object(i.h)(this._texture)&&(t.setUniform1i("tex",0),e.bindTexture(this._texture.glTexture,0)),Object(i.h)(this._textureNormal)&&(t.setUniform1i("normalTexture",1),e.bindTexture(this._textureNormal.glTexture,1)),Object(i.h)(this._textureEmissive)&&(t.setUniform1i("texEmission",2),e.bindTexture(this._textureEmissive.glTexture,2)),Object(i.h)(this._textureOcclusion)&&(t.setUniform1i("texOcclusion",3),e.bindTexture(this._textureOcclusion.glTexture,3)),Object(i.h)(this._textureMetallicRoughness)&&(t.setUniform1i("texMetallicRoughness",4),e.bindTexture(this._textureMetallicRoughness.glTexture,4))}bindTextureScale(e,t){const r=Object(i.h)(this._texture)&&this._texture.glTexture;r&&r.descriptor.textureCoordinateScaleFactor?t.setUniform2fv("textureCoordinateScaleFactor",r.descriptor.textureCoordinateScaleFactor):t.setUniform2f("textureCoordinateScaleFactor",1,1)}_acquireIfNotUndefined(e){if(!Object(i.g)(e))return this._textureIDs.add(e),this._textureRepository.acquire(e,this._initTransparent)}_releaseIfNotUndefined(e){void 0!==e&&(this._textureIDs.delete(e),this._textureRepository.release(e))}},_r=r("fFEv");const wr={position:0,normal:1,uv0:2,color:3,size:4,tangent:4,uvMapSpace:4,auxpos1:5,symbolColor:5,auxpos2:6,featureAttribute:6,instanceFeatureAttribute:6,instanceColor:7,bound1:5,bound2:6,bound3:7,model:8,modelNormal:12,modelOriginHi:11,modelOriginLo:15};class jr{constructor(e,t,r){this.supportsEdges=!1,this._visible=!0,this._renderPriority=0,this._insertOrder=0,this._vertexAttributeLocations=wr,this.id=jr._idGen.gen(e),this._params=Object(_r.c)(t,r),this.validateParameterValues(this._params)}dispose(){}get params(){return this._params}update(){return!1}setParameterValues(e){Object(_r.e)(this._params,e)&&(this.validateParameterValues(this._params),this.parametersChanged())}validateParameterValues(){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.parametersChanged())}isVisibleInPass(e){return!0}get renderOccluded(){return this.params.renderOccluded}get renderPriority(){return this._renderPriority}set renderPriority(e){e!==this._renderPriority&&(this._renderPriority=e,this.parametersChanged())}get insertOrder(){return this._insertOrder}set insertOrder(e){e!==this._insertOrder&&(this._insertOrder=e,this.parametersChanged())}get vertexAttributeLocations(){return this._vertexAttributeLocations}isVisible(){return this._visible}parametersChanged(){Object(i.h)(this.materialRepository)&&this.materialRepository.materialChanged(this)}}function Tr(e,t,r,i,n){const o=r.typedBuffer,a=r.typedBufferStride,s=e.length;if(i*=a,null==n||1===n)for(let c=0;c<s;++c){const r=2*e[c];o[i]=t[r],o[i+1]=t[r+1],i+=a}else for(let c=0;c<s;++c){const r=2*e[c];for(let e=0;e<n;++e)o[i]=t[r],o[i+1]=t[r+1],i+=a}}function Sr(e,t,r,i,n){const o=r.typedBuffer,a=r.typedBufferStride,s=e.length;if(i*=a,null==n||1===n)for(let c=0;c<s;++c){const r=3*e[c];o[i]=t[r],o[i+1]=t[r+1],o[i+2]=t[r+2],i+=a}else for(let c=0;c<s;++c){const r=3*e[c];for(let e=0;e<n;++e)o[i]=t[r],o[i+1]=t[r+1],o[i+2]=t[r+2],i+=a}}function Mr(e,t,r,i,n){const o=r.typedBuffer,a=r.typedBufferStride,s=e.length;if(i*=a,null==n||1===n)for(let c=0;c<s;++c){const r=4*e[c];o[i]=t[r],o[i+1]=t[r+1],o[i+2]=t[r+2],o[i+3]=t[r+3],i+=a}else for(let c=0;c<s;++c){const r=4*e[c];for(let e=0;e<n;++e)o[i]=t[r],o[i+1]=t[r+1],o[i+2]=t[r+2],o[i+3]=t[r+3],i+=a}}function Cr(e,t,r,i,n,o){if(r){const a=r,s=i.typedBuffer,c=i.typedBufferStride,l=e.length;if(n*=c,null==o||1===o)for(let r=0;r<l;++r){const i=3*e[r],o=t[i],l=t[i+1],u=t[i+2];s[n]=a[0]*o+a[4]*l+a[8]*u+a[12],s[n+1]=a[1]*o+a[5]*l+a[9]*u+a[13],s[n+2]=a[2]*o+a[6]*l+a[10]*u+a[14],n+=c}else for(let r=0;r<l;++r){const i=3*e[r],l=t[i],u=t[i+1],d=t[i+2],f=a[0]*l+a[4]*u+a[8]*d+a[12],h=a[1]*l+a[5]*u+a[9]*d+a[13],m=a[2]*l+a[6]*u+a[10]*d+a[14];for(let e=0;e<o;++e)s[n]=f,s[n+1]=h,s[n+2]=m,n+=c}}else Sr(e,t,i,n,o)}function Ar(e,t,r,i,n,o){if(r){const a=i.typedBuffer,s=i.typedBufferStride,c=e.length,l=r[0],u=r[1],d=r[2],f=r[4],h=r[5],m=r[6],p=r[8],b=r[9],g=r[10],v=Math.abs(1-l*l+f*f+p*p)>1e-5||Math.abs(1-u*u+h*h+b*b)>1e-5||Math.abs(1-d*d+m*m+g*g)>1e-5;if(n*=s,null==o||1===o)for(let r=0;r<c;++r){const i=3*e[r],o=t[i],c=t[i+1],x=t[i+2];let O=l*o+f*c+p*x,y=u*o+h*c+b*x,_=d*o+m*c+g*x;if(v){const e=O*O+y*y+_*_;if(e<.999999&&e>1e-6){const t=Math.sqrt(e);O/=t,y/=t,_/=t}}a[n+0]=O,a[n+1]=y,a[n+2]=_,n+=s}else for(let r=0;r<c;++r){const i=3*e[r],c=t[i],x=t[i+1],O=t[i+2];let y=l*c+f*x+p*O,_=u*c+h*x+b*O,w=d*c+m*x+g*O;if(v){const e=y*y+_*_+w*w;if(e<.999999&&e>1e-6){const t=Math.sqrt(e);y/=t,_/=t,w/=t}}for(let e=0;e<o;++e)a[n+0]=y,a[n+1]=_,a[n+2]=w,n+=s}}else Sr(e,t,i,n,o)}function Pr(e,t,r,i,n,o){const a=i.typedBuffer,s=i.typedBufferStride,c=e.length;if(n*=s,null==o||1===o){if(4===r)for(let l=0;l<c;++l){const r=4*e[l];a[n]=t[r],a[n+1]=t[r+1],a[n+2]=t[r+2],a[n+3]=t[r+3],n+=s}else if(3===r)for(let l=0;l<c;++l){const r=3*e[l];a[n]=t[r],a[n+1]=t[r+1],a[n+2]=t[r+2],a[n+3]=255,n+=s}}else if(4===r)for(let l=0;l<c;++l){const r=4*e[l];for(let e=0;e<o;++e)a[n]=t[r],a[n+1]=t[r+1],a[n+2]=t[r+2],a[n+3]=t[r+3],n+=s}else if(3===r)for(let l=0;l<c;++l){const r=3*e[l];for(let e=0;e<o;++e)a[n]=t[r],a[n+1]=t[r+1],a[n+2]=t[r+2],a[n+3]=255,n+=s}}jr._idGen=new ne;var Ir=r("69UF"),Rr=r("GJyJ");const Lr=Object(Rr.e)(770,1,771,771),Br=Object(Rr.f)(1,1),Fr=Object(Rr.f)(0,771),zr={factor:-1,units:-2};function Dr(e){return e?zr:null}function Nr(e){return 3===e||2===e?513:515}var Vr=r("pO5D");class Er{constructor(e,t){this._module=e,this._loadModule=t}get(){return this._module}async reload(){return this._module=await this._loadModule(),this._module}}function Ur(e={}){return(t,r)=>{var i,n;t._parameterNames=null!=(i=t._parameterNames)?i:[],t._parameterNames.push(r);const o=t._parameterNames.length-1,a=e.count||2,s=Math.ceil(Object(P.h)(a)),c=null!=(n=t._parameterBits)?n:[0];let l=0;for(;c[l]+s>16;)l++,l>=c.length&&c.push(0);t._parameterBits=c;const u=c[l],d=(1<<s)-1<<u;c[l]+=s,Object.defineProperty(t,r,{get(){return this[o]},set(e){if(this[o]!==e&&(this[o]=e,this._keyDirty=!0,this._parameterBits[l]=this._parameterBits[l]&~d|+e<<u&d,"number"!=typeof e&&"boolean"!=typeof e))throw"Configuration values must be booleans or numbers!"}})}}var Gr,kr=r("jjdI"),Hr=r("lwwL");!function(e){function t(e,t,r){Object(a.j)(qr,r,t),e.setUniform3fv("localOrigin",t),e.setUniformMatrix4fv("view",qr)}e.bindCamPosition=function(e,t,r){e.setUniform3f("camPos",r[3]-t[0],r[7]-t[1],r[11]-t[2])},e.bindProjectionMatrix=function(e,t){e.setUniformMatrix4fv("proj",t)},e.bindNearFar=function(e,t){e.setUniform2fv("nearFar",t)},e.bindViewCustomOrigin=t,e.bindView=function(e,r){t(e,r.origin,r.camera.viewMatrix)},e.bindViewport=function(e,t){e.setUniform4fv("viewport",t.camera.fullViewport)}}(Gr||(Gr={}));const qr=Object(Hr.a)();var Wr=r("0nJL"),$r=r("agdK"),Xr=r("viRi"),Yr=r("F7CJ");const Jr={mask:255},Kr={function:{func:519,ref:2,mask:2},operation:{fail:7680,zFail:7680,zPass:0}},Qr={function:{func:519,ref:2,mask:2},operation:{fail:7680,zFail:7680,zPass:7681}};var Zr=r("0BfS"),ei=r("aiF/"),ti=r("1TnO"),ri=r("p9cc"),ii=r("AxBq");class ni extends class{constructor(e,t){t&&(this._config=t.snapshot()),this._program=this.initializeProgram(e),e.commonUniformStore&&(this._commonUniformStore=e.commonUniformStore,this._commonUniformStore.subscribeProgram(this._program)),this._pipeline=this.initializePipeline(e)}dispose(){this._program&&(this._commonUniformStore&&this._commonUniformStore.unsubscribeProgram(this._program),this._program.dispose(),this._program=null)}reload(e){this._program&&(this._commonUniformStore&&this._commonUniformStore.unsubscribeProgram(this._program),this._program.dispose()),this._program=this.initializeProgram(e),this._commonUniformStore&&this._commonUniformStore.subscribeProgram(this._program)}get program(){return this._program}get pipeline(){return this._pipeline}get key(){return this._config.key}get configuration(){return this._config}bindPass(e,t,r){}bindMaterial(e,t,r){}bindDraw(e,t,r){}bindPipelineState(e){e.setPipelineState(this.pipeline)}ensureAttributeLocations(e){this.program.assertCompatibleVertexAttributeLocations(e)}get primitiveType(){return 4}}{initializeProgram(e){const t=ni.shader.get(),r=this.configuration,i=t.build({OITEnabled:0===r.transparencyPassType,output:r.output,viewingMode:e.viewingMode,receiveShadows:r.receiveShadows,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:r.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,symbolColor:r.symbolColors,vvSize:r.vvSize,vvColor:r.vvColor,vvInstancingEnabled:!0,instanced:r.instanced,instancedColor:r.instancedColor,instancedDoublePrecision:r.instancedDoublePrecision,useOldSceneLightInterface:!1,pbrMode:r.usePBR?r.isSchematic?2:1:0,hasMetalnessAndRoughnessTexture:r.hasMetalnessAndRoughnessTexture,hasEmissionTexture:r.hasEmissionTexture,hasOcclusionTexture:r.hasOcclusionTexture,hasNormalTexture:r.hasNormalTexture,hasColorTexture:r.hasColorTexture,receiveAmbientOcclusion:r.receiveAmbientOcclusion,useCustomDTRExponentForWater:!1,normalType:r.normalsTypeDerivate?3:0,doubleSidedMode:r.doubleSidedMode,vertexTangets:r.vertexTangents,attributeTextureCoordinates:r.hasMetalnessAndRoughnessTexture||r.hasEmissionTexture||r.hasOcclusionTexture||r.hasNormalTexture||r.hasColorTexture?1:0,textureAlphaPremultiplied:r.textureAlphaPremultiplied,attributeColor:r.vertexColors,screenSizePerspectiveEnabled:r.screenSizePerspective,verticalOffsetEnabled:r.verticalOffset,offsetBackfaces:r.offsetBackfaces,doublePrecisionRequiresObfuscation:Object(ei.b)(e.rctx),alphaDiscardMode:r.alphaDiscardMode,supportsTextureAtlas:!1});return new kr.a(e.rctx,i.generateSource("vertex"),i.generateSource("fragment"),wr)}bindPass(e,t,r){Gr.bindProjectionMatrix(this.program,r.camera.projectionMatrix);const i=this.configuration.output;7===i&&(this.program.setUniform1f("opacity",t.opacity),this.program.setUniform1f("layerOpacity",t.layerOpacity),this.program.setUniform4fv("externalColor",t.externalColor),this.program.setUniform1i("colorMixMode",_r.b[t.colorMixMode])),0===i?(r.lighting.setUniforms(this.program,!1),this.program.setUniform3fv("ambient",t.ambient),this.program.setUniform3fv("diffuse",t.diffuse),this.program.setUniform4fv("externalColor",t.externalColor),this.program.setUniform1i("colorMixMode",_r.b[t.colorMixMode]),this.program.setUniform1f("opacity",t.opacity),this.program.setUniform1f("layerOpacity",t.layerOpacity),this.configuration.usePBR&&ri.a.bindUniforms(this.program,t,this.configuration.isSchematic)):1===i||3===i?this.program.setUniform2fv("nearFar",r.camera.nearFar):4===i&&$r.a.bindOutputHighlight(e,this.program,r),Xr.a.bindUniformsForSymbols(this.program,t),Yr.a.bindUniforms(this.program,t,r),Object(_r.a)(t.screenSizePerspective,this.program,"screenSizePerspectiveAlignment"),2!==t.textureAlphaMode&&3!==t.textureAlphaMode||this.program.setUniform1f("textureAlphaCutoff",t.textureAlphaCutoff)}bindDraw(e){const t=this.configuration.instancedDoublePrecision?Object(n.g)(e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]):e.origin;Gr.bindViewCustomOrigin(this.program,t,e.camera.viewMatrix),(0===this.configuration.output||7===this.configuration.output||1===this.configuration.output&&this.configuration.screenSizePerspective||2===this.configuration.output&&this.configuration.screenSizePerspective||4===this.configuration.output&&this.configuration.screenSizePerspective)&&Gr.bindCamPosition(this.program,t,e.camera.viewInverseTransposeMatrix),2===this.configuration.output&&this.program.setUniformMatrix4fv("viewNormal",e.camera.viewInverseTransposeMatrix),this.configuration.instancedDoublePrecision&&ti.a.bindCustomOrigin(this.program,t),Wr.a.bindUniforms(this.program,this.configuration,e.slicePlane,t),0===this.configuration.output&&Zr.a.bindViewCustomOrigin(this.program,e,t)}setPipeline(e,t){const r=this.configuration,i=3===e,n=2===e;return Object(Rr.d)({blending:0!==r.output&&7!==r.output||!r.transparent?null:i?Lr:(o=e,2===o?null:1===o?Fr:Br),culling:oi(r),depthTest:{func:Nr(e)},depthWrite:i||n?r.writeDepth&&Rr.c:null,colorWrite:Rr.b,stencilWrite:r.sceneHasOcludees?Jr:null,stencilTest:r.sceneHasOcludees?t?Qr:Kr:null,polygonOffset:i||n?null:Dr(r.enableOffset)});var o}initializePipeline(){return this._occludeePipelineState=this.setPipeline(this.configuration.transparencyPassType,!0),this.setPipeline(this.configuration.transparencyPassType,!1)}getPipelineState(e){return e?this._occludeePipelineState:this.pipeline}}ni.shader=new Er(ii.a,()=>r.e(161).then(r.bind(null,"SjXz")));const oi=e=>function(e){return e.cullFace?0!==e.cullFace:!e.slicePlaneEnabled&&!e.transparent&&!e.doubleSidedMode}(e)&&{face:1===e.cullFace?1028:1029,mode:2305};class ai extends class{constructor(){this._key="",this._keyDirty=!1,this._parameterBits=this._parameterBits.map(()=>0)}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=String.fromCharCode.apply(String,this._parameterBits)),this._key}snapshot(){const e=this._parameterNames,t={key:this.key};for(const r of e)t[r]=this[r];return t}}{constructor(){super(...arguments),this.output=0,this.alphaDiscardMode=1,this.doubleSidedMode=0,this.isSchematic=!1,this.vertexColors=!1,this.offsetBackfaces=!1,this.symbolColors=!1,this.vvSize=!1,this.vvColor=!1,this.verticalOffset=!1,this.receiveShadows=!1,this.slicePlaneEnabled=!1,this.sliceHighlightDisabled=!1,this.receiveAmbientOcclusion=!1,this.screenSizePerspective=!1,this.textureAlphaPremultiplied=!1,this.hasColorTexture=!1,this.usePBR=!1,this.hasMetalnessAndRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.instanced=!1,this.instancedColor=!1,this.instancedDoublePrecision=!1,this.vertexTangents=!1,this.normalsTypeDerivate=!1,this.writeDepth=!0,this.sceneHasOcludees=!1,this.transparent=!1,this.enableOffset=!0,this.cullFace=0,this.transparencyPassType=3}}Object(Vr.a)([Ur({count:8})],ai.prototype,"output",void 0),Object(Vr.a)([Ur({count:4})],ai.prototype,"alphaDiscardMode",void 0),Object(Vr.a)([Ur({count:3})],ai.prototype,"doubleSidedMode",void 0),Object(Vr.a)([Ur()],ai.prototype,"isSchematic",void 0),Object(Vr.a)([Ur()],ai.prototype,"vertexColors",void 0),Object(Vr.a)([Ur()],ai.prototype,"offsetBackfaces",void 0),Object(Vr.a)([Ur()],ai.prototype,"symbolColors",void 0),Object(Vr.a)([Ur()],ai.prototype,"vvSize",void 0),Object(Vr.a)([Ur()],ai.prototype,"vvColor",void 0),Object(Vr.a)([Ur()],ai.prototype,"verticalOffset",void 0),Object(Vr.a)([Ur()],ai.prototype,"receiveShadows",void 0),Object(Vr.a)([Ur()],ai.prototype,"slicePlaneEnabled",void 0),Object(Vr.a)([Ur()],ai.prototype,"sliceHighlightDisabled",void 0),Object(Vr.a)([Ur()],ai.prototype,"receiveAmbientOcclusion",void 0),Object(Vr.a)([Ur()],ai.prototype,"screenSizePerspective",void 0),Object(Vr.a)([Ur()],ai.prototype,"textureAlphaPremultiplied",void 0),Object(Vr.a)([Ur()],ai.prototype,"hasColorTexture",void 0),Object(Vr.a)([Ur()],ai.prototype,"usePBR",void 0),Object(Vr.a)([Ur()],ai.prototype,"hasMetalnessAndRoughnessTexture",void 0),Object(Vr.a)([Ur()],ai.prototype,"hasEmissionTexture",void 0),Object(Vr.a)([Ur()],ai.prototype,"hasOcclusionTexture",void 0),Object(Vr.a)([Ur()],ai.prototype,"hasNormalTexture",void 0),Object(Vr.a)([Ur()],ai.prototype,"instanced",void 0),Object(Vr.a)([Ur()],ai.prototype,"instancedColor",void 0),Object(Vr.a)([Ur()],ai.prototype,"instancedDoublePrecision",void 0),Object(Vr.a)([Ur()],ai.prototype,"vertexTangents",void 0),Object(Vr.a)([Ur()],ai.prototype,"normalsTypeDerivate",void 0),Object(Vr.a)([Ur()],ai.prototype,"writeDepth",void 0),Object(Vr.a)([Ur()],ai.prototype,"sceneHasOcludees",void 0),Object(Vr.a)([Ur()],ai.prototype,"transparent",void 0),Object(Vr.a)([Ur()],ai.prototype,"enableOffset",void 0),Object(Vr.a)([Ur({count:3})],ai.prototype,"cullFace",void 0),Object(Vr.a)([Ur({count:4})],ai.prototype,"transparencyPassType",void 0);var si=r("sKsC");class ci extends ni{initializeProgram(e){const t=ci.shader.get(),r=this.configuration,i=t.build({OITEnabled:0===r.transparencyPassType,output:r.output,viewingMode:e.viewingMode,receiveShadows:r.receiveShadows,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:r.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,symbolColor:r.symbolColors,vvSize:r.vvSize,vvColor:r.vvColor,vvInstancingEnabled:!0,instanced:r.instanced,instancedColor:r.instancedColor,instancedDoublePrecision:r.instancedDoublePrecision,useOldSceneLightInterface:!1,pbrMode:r.usePBR?1:0,hasMetalnessAndRoughnessTexture:!1,hasEmissionTexture:!1,hasOcclusionTexture:!1,hasNormalTexture:!1,hasColorTexture:r.hasColorTexture,receiveAmbientOcclusion:r.receiveAmbientOcclusion,useCustomDTRExponentForWater:!1,normalType:0,doubleSidedMode:2,vertexTangets:!1,attributeTextureCoordinates:r.hasColorTexture?1:0,textureAlphaPremultiplied:r.textureAlphaPremultiplied,attributeColor:r.vertexColors,screenSizePerspectiveEnabled:r.screenSizePerspective,verticalOffsetEnabled:r.verticalOffset,offsetBackfaces:r.offsetBackfaces,doublePrecisionRequiresObfuscation:Object(ei.b)(e.rctx),alphaDiscardMode:r.alphaDiscardMode,supportsTextureAtlas:!1});return new kr.a(e.rctx,i.generateSource("vertex"),i.generateSource("fragment"),wr)}}ci.shader=new Er(si.a,()=>r.e(159).then(r.bind(null,"FmK6")));class li extends jr{constructor(e,t){super(t,e,di),this.supportsEdges=!0,this.techniqueConfig=new ai,this.vertexBufferLayout=li.getVertexBufferLayout(this.params),this.instanceBufferLayout=e.instanced?li.getInstanceBufferLayout(this.params):null}isVisibleInPass(e){return 4!==e||this.params.castShadows}isVisible(){const e=this.params;if(!super.isVisible()||0===e.layerOpacity)return!1;const t=e.instanced,r=e.vertexColors,i=e.symbolColors,n=!!t&&t.indexOf("color")>-1,o=e.vvColorEnabled,a="replace"===e.colorMixMode,s=e.opacity>0,c=e.externalColor&&e.externalColor[3]>0;return r&&(n||o||i)?!!a||s:r?a?c:s:n||o||i?!!a||s:a?c:s}getTechniqueConfig(e,t){return this.techniqueConfig.output=e,this.techniqueConfig.hasNormalTexture=!!this.params.normalTextureId,this.techniqueConfig.hasColorTexture=!!this.params.textureId,this.techniqueConfig.vertexTangents=this.params.vertexTangents,this.techniqueConfig.instanced=!!this.params.instanced,this.techniqueConfig.instancedDoublePrecision=this.params.instancedDoublePrecision,this.techniqueConfig.vvSize=this.params.vvSizeEnabled,this.techniqueConfig.verticalOffset=null!==this.params.verticalOffset,this.techniqueConfig.screenSizePerspective=null!==this.params.screenSizePerspective,this.techniqueConfig.slicePlaneEnabled=this.params.slicePlaneEnabled,this.techniqueConfig.sliceHighlightDisabled=this.params.sliceHighlightDisabled,this.techniqueConfig.alphaDiscardMode=this.params.textureAlphaMode,this.techniqueConfig.normalsTypeDerivate="screenDerivative"===this.params.normals,this.techniqueConfig.transparent=this.params.transparent,this.techniqueConfig.writeDepth=this.params.writeDepth,this.techniqueConfig.sceneHasOcludees=this.params.sceneHasOcludees,this.techniqueConfig.cullFace=null!=this.params.cullFace?this.params.cullFace:0,0!==e&&7!==e||(this.techniqueConfig.vertexColors=this.params.vertexColors,this.techniqueConfig.symbolColors=this.params.symbolColors,this.techniqueConfig.doubleSidedMode=this.params.treeRendering?2:this.params.doubleSided&&"normal"===this.params.doubleSidedType?1:this.params.doubleSided&&"winding-order"===this.params.doubleSidedType?2:0,this.techniqueConfig.instancedColor=!!this.params.instanced&&this.params.instanced.indexOf("color")>-1,this.techniqueConfig.receiveShadows=this.params.receiveShadows&&this.params.shadowMappingEnabled,this.techniqueConfig.receiveAmbientOcclusion=this.params.receiveSSAO,this.techniqueConfig.vvColor=this.params.vvColorEnabled,this.techniqueConfig.textureAlphaPremultiplied=!!this.params.textureAlphaPremultiplied,this.techniqueConfig.usePBR=this.params.usePBR,this.techniqueConfig.hasMetalnessAndRoughnessTexture=!!this.params.metallicRoughnessTextureId,this.techniqueConfig.hasEmissionTexture=!!this.params.emissiveTextureId,this.techniqueConfig.hasOcclusionTexture=!!this.params.occlusionTextureId,this.techniqueConfig.offsetBackfaces=!(!this.params.transparent||!this.params.offsetTransparentBackfaces),this.techniqueConfig.isSchematic=this.params.usePBR&&this.params.isSchematic,this.techniqueConfig.transparencyPassType=t?t.transparencyPassType:3,this.techniqueConfig.enableOffset=!t||t.camera.relativeElevation<5e5),this.techniqueConfig}intersect(e,t,r,n,a,s,c){if(null!==this.params.verticalOffset){const e=n.camera;Object(o.r)(vi,r[12],r[13],r[14]);let t=null;switch(n.viewingMode){case 1:t=Object(o.o)(bi,vi);break;case 2:t=Object(o.h)(bi,pi)}let i=0;if(null!==this.params.verticalOffset){const r=Object(o.g)(xi,vi,e.eye),n=Object(o.m)(r),a=Object(o.b)(r,r,1/n);let s=null;this.params.screenSizePerspective&&(s=Object(o.e)(t,a)),i+=Object(_r.f)(e,n,this.params.verticalOffset,s,this.params.screenSizePerspective)}Object(o.b)(t,t,i),Object(o.s)(gi,t,n.transform.inverseRotation),a=Object(o.g)(hi,a,gi),s=Object(o.g)(mi,s,gi)}Object(_r.d)(e,t,n,a,s,function(e){return Object(i.h)(e)?(br.offset=e,br):null}(n.verticalOffset),c)}getGLMaterial(e){if(0===e.output||7===e.output||1===e.output||2===e.output||3===e.output||4===e.output)return new ui(e)}createBufferWriter(){return new fi(this.vertexBufferLayout,this.instanceBufferLayout)}static getVertexBufferLayout(e){const t=e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId,r=Object(ue.a)().vec3f("position").vec3f("normal");return e.vertexTangents&&r.vec4f("tangent"),t&&r.vec2f("uv0"),e.vertexColors&&r.vec4u8("color"),e.symbolColors&&r.vec4u8("symbolColor"),r}static getInstanceBufferLayout(e){let t=Object(ue.a)();return t=e.instancedDoublePrecision?t.vec3f("modelOriginHi").vec3f("modelOriginLo").mat3f("model").mat3f("modelNormal"):t.mat4f("model").mat4f("modelNormal"),e.instanced&&e.instanced.indexOf("color")>-1&&(t=t.vec4f("instanceColor")),e.instanced&&e.instanced.indexOf("featureAttribute")>-1&&(t=t.vec4f("instanceFeatureAttribute")),t}}class ui extends yr{constructor(e){const t=e.material;super({...e,...t.params}),this.updateParameters()}updateParameters(e){const t=this.material.params;this.updateTexture(t.textureId),this.technique=this.techniqueRep.acquireAndReleaseExisting(t.treeRendering?ci:ni,this.material.getTechniqueConfig(this.output,e),this.technique)}selectPipelines(){}_updateShadowState(e){e.shadowMappingEnabled!==this.material.params.shadowMappingEnabled&&this.material.setParameterValues({shadowMappingEnabled:e.shadowMappingEnabled})}_updateOccludeeState(e){e.hasOccludees!==this.material.params.sceneHasOcludees&&this.material.setParameterValues({sceneHasOcludees:e.hasOccludees})}ensureParameters(e){0!==this.output&&7!==this.output||(this._updateShadowState(e),this._updateOccludeeState(e)),this.updateParameters(e)}bind(e,t){e.bindProgram(this.technique.program),this.technique.bindPass(e,this.material.params,t),this.bindTexture(e,this.technique.program)}beginSlot(e){return e===(this.material.params.transparent?this.material.params.writeDepth?5:8:3)}getPipelineState(e,t){return this.technique.getPipelineState(t)}}const di={textureId:void 0,initTextureTransparent:!1,isSchematic:!1,usePBR:!1,normalTextureId:void 0,vertexTangents:!1,occlusionTextureId:void 0,emissiveTextureId:void 0,metallicRoughnessTextureId:void 0,emissiveFactor:[0,0,0],mrrFactors:[0,1,.5],ambient:[.2,.2,.2],diffuse:[.8,.8,.8],externalColor:[1,1,1,1],colorMixMode:"multiply",opacity:1,layerOpacity:1,vertexColors:!1,symbolColors:!1,doubleSided:!1,doubleSidedType:"normal",cullFace:void 0,instanced:void 0,instancedDoublePrecision:!1,normals:"default",receiveSSAO:!0,receiveShadows:!0,castShadows:!0,shadowMappingEnabled:!1,verticalOffset:null,screenSizePerspective:null,slicePlaneEnabled:!1,sliceHighlightDisabled:!1,offsetTransparentBackfaces:!1,vvSizeEnabled:!1,vvSizeMinSize:[1,1,1],vvSizeMaxSize:[100,100,100],vvSizeOffset:[0,0,0],vvSizeFactor:[1,1,1],vvSizeValue:[1,1,1],vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],vvSymbolAnchor:[0,0,0],vvSymbolRotationMatrix:Object(c.a)(),transparent:!1,writeDepth:!0,textureAlphaMode:0,textureAlphaCutoff:Ir.b,textureAlphaPremultiplied:!1,sceneHasOcludees:!1,renderOccluded:1};class fi{constructor(e,t){this.vertexBufferLayout=e,this.instanceBufferLayout=t}allocate(e){return this.vertexBufferLayout.createBuffer(e)}elementCount(e){return e.indices.position.length}write(e,t,r,i){!function(e,t,r,i,n,o){for(const a of t.fieldNames){const t=e.vertexAttr[a],s=e.indices[a];if(t&&s)switch(a){case re.a.POSITION:{Object(re.b)(3===t.size);const e=n.getField(a,d.u);e&&Cr(s,t.data,r,e,o);break}case re.a.NORMAL:{Object(re.b)(3===t.size);const e=n.getField(a,d.u);e&&Ar(s,t.data,i,e,o);break}case re.a.UV0:{Object(re.b)(2===t.size);const e=n.getField(a,d.m);e&&Tr(s,t.data,e,o);break}case re.a.UVMAPSPACE:{Object(re.b)(4===t.size);const e=n.getField(a,d.C);e&&Mr(s,t.data,e,o);break}case re.a.MEANVERTEXPOSITION:{Object(re.b)(3===t.size);const e=n.getField(a,d.u);e&&Cr(s,t.data,r,e,o);break}case re.a.BOUND1:case re.a.BOUND2:case re.a.BOUND3:{Object(re.b)(3===t.size);const e=n.getField(a,d.u);e&&Cr(s,t.data,r,e,o);break}case re.a.COLOR:{Object(re.b)(3===t.size||4===t.size);const e=n.getField(a,d.J);e&&Pr(s,t.data,t.size,e,o);break}case re.a.SYMBOLCOLOR:{Object(re.b)(3===t.size||4===t.size);const e=n.getField(a,d.J);e&&Pr(s,t.data,t.size,e,o);break}case re.a.TANGENT:{Object(re.b)(4===t.size);const e=n.getField(a,d.C);e&&Mr(s,t.data,e,o);break}}}}(t,this.vertexBufferLayout,e.transformation,e.invTranspTransformation,r,i)}}const hi=Object(n.e)(),mi=Object(n.e)(),pi=Object(n.g)(0,0,1),bi=Object(n.e)(),gi=Object(n.e)(),vi=Object(n.e)(),xi=Object(n.e)();var Oi=r("bJda"),yi=r("ohva"),_i=r("zlDU"),wi=r("4EHJ"),ji=r("9MzC"),Ti=r("zm0L"),Si=r("Ioo4"),Mi=r("LbAs"),Ci=r("of9L"),Ai=r("hTmG"),Pi=r("fOQB"),Ii=r("D6bk");const Ri=[{name:"position",count:2,type:5126,offset:0,stride:8,normalized:!1}],Li=[{name:"position",count:2,type:5126,offset:0,stride:16,normalized:!1},{name:"uv0",count:2,type:5126,offset:8,stride:16,normalized:!1}];var Bi=r("0meK"),Fi=r("xRQN");const zi=f.a.getLogger("esri.views.3d.webgl-engine.lib.DDSUtil");function Di(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}const Ni=Di("DXT1"),Vi=Di("DXT3"),Ei=Di("DXT5");class Ui{constructor(e,t,r){this.data=e,this.glTexture=null,this.powerOfTwoStretchInfo=null,this.loadingPromise=null,this.loadingController=null,this.events=new Ti.a,this.data=e,this.id=Ui.idGen.gen(t),this.params=r||{},this.params.mipmap=!1!==this.params.mipmap,this.params.noUnpackFlip=this.params.noUnpackFlip||!1,this.params.preMultiplyAlpha=this.params.preMultiplyAlpha||!1,this.params.wrap=this.params.wrap||{s:10497,t:10497},this.params.powerOfTwoResizeMode=this.params.powerOfTwoResizeMode||1,this.estimatedTexMemRequired=Ui.estimateTexMemRequired(this.data,this.params),this.startPreload()}startPreload(){const e=this.data;Object(i.g)(e)||(e instanceof HTMLVideoElement?this.startPreloadVideoElement(e):e instanceof HTMLImageElement&&this.startPreloadImageElement(e))}startPreloadVideoElement(e){Object(wi.t)(e.src)||"auto"===e.preload&&e.crossOrigin||(e.preload="auto",e.crossOrigin="anonymous",e.src=e.src)}startPreloadImageElement(e){Object(wi.u)(e.src)||Object(wi.t)(e.src)||e.crossOrigin||(e.crossOrigin="anonymous",e.src=e.src)}static getDataDimensions(e){return e instanceof HTMLVideoElement?{width:e.videoWidth,height:e.videoHeight}:e}static estimateTexMemRequired(e,t){if(Object(i.g)(e))return 0;if(Object(yi.c)(e)||Object(yi.k)(e))return e.byteLength;const{width:r,height:n}=e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement?Ui.getDataDimensions(e):t;return(t.mipmap?4/3:1)*r*n*(t.components||4)||0}dispose(){this.data=void 0}get width(){return this.params.width}get height(){return this.params.height}createDescriptor(e){return{target:3553,pixelFormat:6408,dataType:5121,wrapMode:this.params.wrap,flipped:!this.params.noUnpackFlip,samplingMode:this.params.mipmap?9987:9729,hasMipmap:this.params.mipmap,preMultiplyAlpha:this.params.preMultiplyAlpha,maxAnisotropy:this.params.mipmap&&!this.params.disableAnisotropy?e.parameters.maxMaxAnisotropy:void 0}}load(e,t){if(Object(i.h)(this.glTexture))return this.glTexture;if(Object(i.h)(this.loadingPromise))return this.loadingPromise;const r=this.data;return Object(i.g)(r)?(this.glTexture=new Ci.a(e,this.createDescriptor(e),null),e.bindTexture(this.glTexture,0),this.glTexture):"string"==typeof r?this.loadFromURL(e,t,r):r instanceof Image?this.loadFromImageElement(e,t,r):r instanceof HTMLVideoElement?this.loadFromVideoElement(e,t,r):r instanceof ImageData||r instanceof HTMLCanvasElement?this.loadFromImage(e,r,t):(Object(yi.c)(r)||Object(yi.k)(r))&&this.params.encoding===Ui.DDS_ENCODING?this.loadFromDDSData(e,r):Object(yi.k)(r)?this.loadFromPixelData(e,r):Object(yi.c)(r)?this.loadFromPixelData(e,new Uint8Array(r)):null}get requiresFrameUpdates(){return this.data instanceof HTMLVideoElement}frameUpdate(e,t,r){if(!(this.data instanceof HTMLVideoElement)||Object(i.g)(this.glTexture))return r;if(this.data.readyState<2||r===this.data.currentTime)return r;if(Object(i.h)(this.powerOfTwoStretchInfo)){const{framebuffer:r,vao:i,sourceTexture:n}=this.powerOfTwoStretchInfo;n.setData(this.data),this.drawStretchedTexture(e,t,r,i,n,this.glTexture)}else{const{width:e,height:t}=this.data,{width:r,height:i}=this.glTexture.descriptor;e!==r||t!==i?this.glTexture.updateData(0,0,0,Math.min(e,r),Math.min(t,i),this.data):this.glTexture.setData(this.data)}return this.glTexture.descriptor.hasMipmap&&this.glTexture.generateMipmap(),this.data.currentTime}loadFromDDSData(e,t){return this.glTexture=function(e,t,r,i){const{textureData:n,internalFormat:o,width:a,height:s}=function(e,t){const r=new Int32Array(e,0,31);if(542327876!==r[0])return zi.error("Invalid magic number in DDS header"),null;if(!(4&r[20]))return zi.error("Unsupported format, must contain a FourCC code"),null;const i=r[21];let n,o;switch(i){case Ni:n=8,o=33776;break;case Vi:n=16,o=33778;break;case Ei:n=16,o=33779;break;default:return zi.error("Unsupported FourCC code:",(a=i,String.fromCharCode(255&a,a>>8&255,a>>16&255,a>>24&255))),null}var a;let s=1,c=r[4],l=r[3];0==(3&c)&&0==(3&l)||(zi.warn("Rounding up compressed texture size to nearest multiple of 4."),c=c+3&-4,l=l+3&-4);const u=c,d=l;let f,h;131072&r[2]&&!1!==t&&(s=Math.max(1,r[7])),1===s||Object(P.f)(c)&&Object(P.f)(l)||(zi.warn("Ignoring mipmaps of non power of two sized compressed texture."),s=1);let m=r[1]+4;const p=[];for(let b=0;b<s;++b)h=(c+3>>2)*(l+3>>2)*n,f=new Uint8Array(e,m,h),p.push(f),m+=h,c=Math.max(1,c>>1),l=Math.max(1,l>>1);return{textureData:{type:"compressed",levels:p},internalFormat:o,width:u,height:d}}(r,i);t.samplingMode=n.levels.length>1?9987:9729,t.hasMipmap=n.levels.length>1,t.internalFormat=o,t.width=a,t.height=s;const c=new Ci.a(e,t,n);return e.bindTexture(c,0),c}(e,this.createDescriptor(e),t,this.params.mipmap),e.bindTexture(this.glTexture,0),this.glTexture}loadFromPixelData(e,t){Object(re.b)(this.params.width>0&&this.params.height>0);const r=this.createDescriptor(e);return r.pixelFormat=1===this.params.components?6409:3===this.params.components?6407:6408,r.width=this.params.width,r.height=this.params.height,this.glTexture=new Ci.a(e,r,t),e.bindTexture(this.glTexture,0),this.glTexture}async loadAsync(e){const t=Object(ji.d)();this.loadingController=t;const r=e(t.signal);this.loadingPromise=r;const i=()=>{this.loadingController===t&&(this.loadingController=null),this.loadingPromise===r&&(this.loadingPromise=null)};return r.then(i,i),r}loadFromURL(e,t,r){return this.loadAsync(async i=>{const n=await Object(Mi.a)(r,{signal:i});return this.loadFromImage(e,n,t)})}loadFromImageElement(e,t,r){return r.complete?this.loadFromImage(e,r,t):this.loadAsync(async i=>{const n=await Object(Si.a)(r,r.src,!1,i);return this.loadFromImage(e,n,t)})}loadFromVideoElement(e,t,r){return r.readyState>=2?this.loadFromImage(e,r,t):this.loadFromVideoElementAsync(e,t,r)}loadFromVideoElementAsync(e,t,r){return this.loadAsync(n=>Object(ji.c)((o,a)=>{const s=()=>{r.removeEventListener("loadeddata",c),r.removeEventListener("error",l),Object(i.h)(u)&&u.remove()},c=()=>{r.readyState>=2&&(s(),o(this.loadFromImage(e,r,t)))},l=e=>{s(),a(e||new _i.a("Failed to load video"))};r.addEventListener("loadeddata",c),r.addEventListener("error",l);const u=Object(ji.r)(n,()=>l(Object(ji.e)()))}))}loadFromImage(e,t,r){const i=Ui.getDataDimensions(t);this.params.width=i.width,this.params.height=i.height;const n=this.createDescriptor(e);return n.pixelFormat=3===this.params.components?6407:6408,!this.requiresPowerOfTwo(e,n)||Object(P.f)(i.width)&&Object(P.f)(i.height)?(n.width=i.width,n.height=i.height,this.glTexture=new Ci.a(e,n,t),e.bindTexture(this.glTexture,0),this.glTexture):(this.glTexture=this.makePowerOfTwoTexture(e,t,i,n,r),e.bindTexture(this.glTexture,0),this.glTexture)}requiresPowerOfTwo(e,t){const r=33071,i="number"==typeof t.wrapMode?t.wrapMode===r:t.wrapMode.s===r&&t.wrapMode.t===r;return!Object(Fi.a)(e.gl)&&(t.hasMipmap||!i)}makePowerOfTwoTexture(e,t,r,i,n){const{width:o,height:a}=r,s=Object(P.i)(o),c=Object(P.i)(a);let l;switch(i.width=s,i.height=c,this.params.powerOfTwoResizeMode){case 2:i.textureCoordinateScaleFactor=[o/s,a/c],l=new Ci.a(e,i),l.updateData(0,0,0,o,a,t);break;case 1:case null:case void 0:l=this.stretchToPowerOfTwo(e,t,i,n);break;default:Object(Oi.a)(this.params.powerOfTwoResizeMode)}return i.hasMipmap&&l.generateMipmap(),l}stretchToPowerOfTwo(e,t,r,i){const n=new Ci.a(e,r),o=new Bi.a(e,{colorTarget:0,depthStencilTarget:0},n),a=new Ci.a(e,{target:3553,pixelFormat:r.pixelFormat,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!!r.flipped,maxAnisotropy:8,preMultiplyAlpha:r.preMultiplyAlpha},t),s=function(e,t=Ri,r=wr,i=-1,n=1){let o=null;switch(t){case Li:o=new Float32Array([i,i,0,0,n,i,1,0,i,n,0,1,n,n,1,1]);break;case Ri:default:o=new Float32Array([i,i,n,i,i,n,n,n])}return new Ii.a(e,r,{geometry:t},{geometry:Pi.a.createVertex(e,35044,o)})}(e);return this.drawStretchedTexture(e,i,o,s,a,n),this.requiresFrameUpdates?this.powerOfTwoStretchInfo={vao:s,sourceTexture:a,framebuffer:o}:(s.dispose(!0),a.dispose(),o.detachColorTexture(),e.bindFramebuffer(null),o.dispose()),n}drawStretchedTexture(e,t,r,i,n,o){e.bindFramebuffer(r);const a=e.getViewport();e.setViewport(0,0,o.descriptor.width,o.descriptor.height);const s=t.program;e.bindProgram(s),s.setUniform4f("color",1,1,1,1),s.setUniform1i("tex",0),e.bindTexture(n,0),e.bindVAO(i),e.setPipelineState(t.pipeline),e.drawArrays(5,0,Object(Ai.c)(i,"geometry")),e.bindFramebuffer(null),e.setViewport(a.x,a.y,a.width,a.height)}unload(){if(Object(i.h)(this.powerOfTwoStretchInfo)){const{framebuffer:e,vao:t,sourceTexture:r}=this.powerOfTwoStretchInfo;t.dispose(!0),r.dispose(),e.dispose(),this.glTexture=null,this.powerOfTwoStretchInfo=null}if(Object(i.h)(this.glTexture)&&(this.glTexture.dispose(),this.glTexture=null),Object(i.h)(this.loadingController)){const e=this.loadingController;this.loadingController=null,this.loadingPromise=null,e.abort()}this.events.emit("unloaded")}}Ui.idGen=new ne,Ui.DDS_ENCODING="image/vnd-ms.dds";var Gi=Ui,ki=r("Lqtk"),Hi=r("eSsm");class qi{constructor(e){this.streamDataRequester=e}async loadJSON(e,t){return this.load("json",e,t)}async loadBinary(e,t){return Object(wi.u)(e)?(Object(ji.w)(t),Object(wi.j)(e)):this.load("binary",e,t)}async loadImage(e,t){return this.load("image",e,t)}async load(e,t,r){if(Object(i.g)(this.streamDataRequester))return(await Object(ki.default)(t,{responseType:Wi[e]})).data;const n=await Object(Hi.c)(this.streamDataRequester.request(t,e,r));if(!0===n.ok)return n.value;throw Object(ji.v)(n.error),new _i.a("","Request for resource failed: "+n.error)}}const Wi={image:"image",binary:"array-buffer",json:"json"};var $i=r("grla");function Xi(e,t,r){const i=e.typedBuffer,n=e.typedBufferStride,o=t.typedBuffer,a=t.typedBufferStride,s=r?r.count:t.count;let c=(r&&r.dstIndex?r.dstIndex:0)*n,l=(r&&r.srcIndex?r.srcIndex:0)*a;for(let u=0;u<s;++u)i[c]=o[l],i[c+1]=o[l+1],c+=n,l+=a}function Yi(e,t,r){const i=e.typedBuffer,n=e.typedBufferStride,o=t.typedBuffer,a=t.typedBufferStride,s=r?r.count:t.count;let c=(r&&r.dstIndex?r.dstIndex:0)*n,l=(r&&r.srcIndex?r.srcIndex:0)*a;if(Object($i.b)(t.elementType)){const e=Object($i.d)(t.elementType);if(Object($i.c)(t.elementType))for(let t=0;t<s;++t)i[c]=Math.max(o[l]/e,-1),i[c+1]=Math.max(o[l+1]/e,-1),c+=n,l+=a;else for(let t=0;t<s;++t)i[c]=o[l]/e,i[c+1]=o[l+1]/e,c+=n,l+=a}else Xi(e,t,r);return e}function Ji(e,t,r){const i=e.typedBuffer,n=e.typedBufferStride,o=t.typedBuffer,a=t.typedBufferStride,s=r?r.count:t.count;let c=(r&&r.dstIndex?r.dstIndex:0)*n,l=(r&&r.srcIndex?r.srcIndex:0)*a;for(let u=0;u<s;++u)i[c]=o[l],i[c+1]=o[l+1],i[c+2]=o[l+2],c+=n,l+=a}function Ki(e,t,r){const i=e.typedBuffer,n=e.typedBufferStride,o=t.typedBuffer,a=t.typedBufferStride,s=r?r.count:t.count;let c=(r&&r.dstIndex?r.dstIndex:0)*n,l=(r&&r.srcIndex?r.srcIndex:0)*a;for(let u=0;u<s;++u)i[c]=o[l],i[c+1]=o[l+1],i[c+2]=o[l+2],i[c+3]=o[l+3],c+=n,l+=a}function Qi(e,t,r,i,n,o){const a=e.typedBuffer,s=e.typedBufferStride,c=o?o.count:e.count;let l=(o&&o.dstIndex?o.dstIndex:0)*s;for(let u=0;u<c;++u)a[l]=t,a[l+1]=r,a[l+2]=i,a[l+3]=n,l+=s}function Zi(e,t){const r=e.count;t||(t=new e.TypedArrayConstructor(r));for(let i=0;i<r;i++)t[i]=e.get(i);return t}function en(e,t){return new e(new ArrayBuffer(t*e.ElementCount*Object($i.a)(e.ElementType)))}Object.freeze({__proto__:null,copy:Xi,normalizeIntegerBuffer:Yi}),Object.freeze({__proto__:null,copy:Ji}),Object.freeze({__proto__:null,copy:Ki,fill:Qi}),Object.freeze({__proto__:null,copy:function(e,t,r){const i=e.typedBuffer,n=e.typedBufferStride,o=t.typedBuffer,a=t.typedBufferStride,s=r?r.count:t.count;let c=(r&&r.dstIndex?r.dstIndex:0)*n,l=(r&&r.srcIndex?r.srcIndex:0)*a;for(let u=0;u<s;++u){for(let e=0;e<9;++e)i[c+e]=o[l+e];c+=n,l+=a}}}),Object.freeze({__proto__:null,copy:function(e,t,r){const i=e.typedBuffer,n=e.typedBufferStride,o=t.typedBuffer,a=t.typedBufferStride,s=r?r.count:t.count;let c=(r&&r.dstIndex?r.dstIndex:0)*n,l=(r&&r.srcIndex?r.srcIndex:0)*a;for(let u=0;u<s;++u){for(let e=0;e<16;++e)i[c+e]=o[l+e];c+=n,l+=a}}}),Object.freeze({__proto__:null,copy:function(e,t,r){const i=e.typedBuffer,n=e.typedBufferStride,o=t.typedBuffer,a=t.typedBufferStride,s=r?r.count:t.count;let c=(r&&r.dstIndex?r.dstIndex:0)*n,l=(r&&r.srcIndex?r.srcIndex:0)*a;for(let u=0;u<s;++u)i[c]=o[l],c+=n,l+=a},makeDense:Zi});const tn=f.a.getLogger("esri.views.3d.glTF");class rn{constructor(e,t,r=""){this.major=e,this.minor=t,this._context=r}lessThan(e,t){return this.major<e||e===this.major&&this.minor<t}since(e,t){return!this.lessThan(e,t)}validate(e){if(this.major!==e.major)throw new _i.a((this._context&&this._context+":")+"unsupported-version",`Required major ${this._context&&this._context+" "}version is '${this.major}', but got '\${version.major}.\${version.minor}'`,{version:e})}clone(){return new rn(this.major,this.minor,this._context)}static parse(e,t=""){const[r,i]=e.split("."),n=/^\s*\d+\s*$/;if(!r||!r.match||!r.match(n))throw new _i.a((t&&t+":")+"invalid-version","Expected major version to be a number, but got '${version}'",{version:e});if(!i||!i.match||!i.match(n))throw new _i.a((t&&t+":")+"invalid-version","Expected minor version to be a number, but got '${version}'",{version:e});const o=parseInt(r,10),a=parseInt(i,10);return new rn(o,a,t)}}class nn{constructor(e){this.data=e,this.offset4=0,this.dataUint32=new Uint32Array(this.data,0,Math.floor(this.data.byteLength/4))}readUint32(){const e=this.offset4;return this.offset4+=1,this.dataUint32[e]}readUint8Array(e){const t=4*this.offset4;return this.offset4+=e/4,new Uint8Array(this.data,t,e)}remainingBytes(){return this.data.byteLength-4*this.offset4}}const on={baseColorFactor:[1,1,1,1],metallicFactor:1,roughnessFactor:1},an={pbrMetallicRoughness:on,emissiveFactor:[0,0,0],alphaMode:"OPAQUE",alphaCutoff:.5,doubleSided:!1},sn={ESRI_externalColorMixMode:"tint"},cn=(e={})=>{const t={...on,...e.pbrMetallicRoughness},r=function(e){switch(e.ESRI_externalColorMixMode){case"multiply":case"tint":case"ignore":case"replace":break;default:Object(Oi.a)(e.ESRI_externalColorMixMode),e.ESRI_externalColorMixMode="tint"}return e}({...sn,...e.extras});return{...an,...e,pbrMetallicRoughness:t,extras:r}},ln={magFilter:9729,minFilter:9987,wrapS:10497,wrapT:10497},un=1179937895;class dn{constructor(e,t,r,i,n){this.context=e,this.errorContext=t,this.uri=r,this.json=i,this.glbBuffer=n,this.bufferCache=new Map,this.textureCache=new Map,this.materialCache=new Map,this.nodeParentMap=new Map,this.nodeTransformCache=new Map,this.baseUri=function(e){let t,r;return e.replace(/^(.*\/)?([^/]*)$/,(e,i,n)=>(t=i||"",r=n||"","")),{dirPart:t,filePart:r}}(this.uri).dirPart,this.checkVersionSupported(),this.checkRequiredExtensionsSupported(),t.errorUnsupportedIf(null==i.scenes,"Scenes must be defined."),t.errorUnsupportedIf(null==i.meshes,"Meshes must be defined"),t.errorUnsupportedIf(null==i.nodes,"Nodes must be defined."),this.computeNodeParents()}static async load(e,t,r,i){if(Object(wi.u)(r)){const i=Object(wi.i)(r);if("model/gltf-binary"!==i.mediaType)try{const n=JSON.parse(i.isBase64?atob(i.data):i.data);return new dn(e,t,r,n)}catch{}const n=Object(wi.j)(r);if(dn.isGLBData(n))return this.fromGLBData(e,t,r,n)}if(r.endsWith(".gltf")){const n=await e.loadJSON(r,i);return new dn(e,t,r,n)}const n=await e.loadBinary(r,i);if(dn.isGLBData(n))return this.fromGLBData(e,t,r,n);const o=await e.loadJSON(r,i);return new dn(e,t,r,o)}static isGLBData(e){const t=new nn(e);return t.remainingBytes()>=4&&t.readUint32()===un}static async fromGLBData(e,t,r,i){const n=await dn.parseGLBData(t,i);return new dn(e,t,r,n.json,n.binaryData)}static async parseGLBData(e,t){const r=new nn(t);e.assert(r.remainingBytes()>=12,"GLB binary data is insufficiently large.");const i=r.readUint32(),n=r.readUint32(),o=r.readUint32();e.assert(i===un,"Magic first 4 bytes do not fit to expected GLB value."),e.assert(t.byteLength>=o,"GLB binary data is smaller than header specifies."),e.errorUnsupportedIf(2!==n,"An unsupported GLB container version was detected. Only version 2 is supported.");let a,s,c=0;for(;r.remainingBytes()>=8;){const t=r.readUint32(),i=r.readUint32();0===c?(e.assert(1313821514===i,"First GLB chunk must be JSON."),e.assert(t>=0,"No JSON data found."),a=await gn(r.readUint8Array(t))):1===c?(e.errorUnsupportedIf(5130562!==i,"Second GLB chunk expected to be BIN."),s=r.readUint8Array(t)):e.warnUnsupported("More than 2 GLB chunks detected. Skipping."),c+=1}return a||e.error("No GLB JSON chunk detected."),{json:a,binaryData:s}}async getBuffer(e,t){const r=this.json.buffers[e],i=this.errorContext;if(null==r.uri)return i.assert(null!=this.glbBuffer,"GLB buffer not present"),this.glbBuffer;let n=this.bufferCache.get(e);if(!n){const o=await this.context.loadBinary(this.resolveUri(r.uri),t);n=new Uint8Array(o),this.bufferCache.set(e,n),i.assert(n.byteLength===r.byteLength,"Buffer byte lengths should match.")}return n}async getAccessor(e,t){const r=this.json.accessors[e],i=this.errorContext;i.errorUnsupportedIf(null==r.bufferView,"Some accessor does not specify a bufferView."),i.errorUnsupportedIf(r.type in["MAT2","MAT3","MAT4"],`AttributeType ${r.type} is not supported`);const n=this.json.bufferViews[r.bufferView],o=await this.getBuffer(n.buffer,t),a=pn[r.type],s=bn[r.componentType],c=a*s,l=n.byteStride||c;return{raw:o.buffer,byteStride:l,byteOffset:o.byteOffset+(n.byteOffset||0)+(r.byteOffset||0),entryCount:r.count,isDenselyPacked:l===c,componentCount:a,componentByteSize:s,componentType:r.componentType,min:r.min,max:r.max,normalized:!!r.normalized}}async getIndexData(e,t){if(null==e.indices)return null;const r=await this.getAccessor(e.indices,t);if(r.isDenselyPacked)switch(r.componentType){case 5121:return new Uint8Array(r.raw,r.byteOffset,r.entryCount);case 5123:return new Uint16Array(r.raw,r.byteOffset,r.entryCount);case 5125:return new Uint32Array(r.raw,r.byteOffset,r.entryCount)}else switch(r.componentType){case 5121:return Zi(this.wrapAccessor(d.l,r));case 5123:return Zi(this.wrapAccessor(d.j,r));case 5125:return Zi(this.wrapAccessor(d.k,r))}}async getPositionData(e,t){const r=this.errorContext;r.errorUnsupportedIf(null==e.attributes.POSITION,"No POSITION vertex data found.");const i=await this.getAccessor(e.attributes.POSITION,t);return r.errorUnsupportedIf(5126!==i.componentType,"Expected type FLOAT for POSITION vertex attribute, but found "+vn[i.componentType]),r.errorUnsupportedIf(3!==i.componentCount,"POSITION vertex attribute must have 3 components, but found "+i.componentCount.toFixed()),this.wrapAccessor(d.u,i)}async getNormalData(e,t){const r=this.errorContext;r.assert(null!=e.attributes.NORMAL,"No NORMAL vertex data found.");const i=await this.getAccessor(e.attributes.NORMAL,t);return r.errorUnsupportedIf(5126!==i.componentType,"Expected type FLOAT for NORMAL vertex attribute, but found "+vn[i.componentType]),r.errorUnsupportedIf(3!==i.componentCount,"NORMAL vertex attribute must have 3 components, but found "+i.componentCount.toFixed()),this.wrapAccessor(d.u,i)}async getTangentData(e,t){const r=this.errorContext;r.assert(null!=e.attributes.TANGENT,"No TANGENT vertex data found.");const i=await this.getAccessor(e.attributes.TANGENT,t);return r.errorUnsupportedIf(5126!==i.componentType,"Expected type FLOAT for TANGENT vertex attribute, but found "+vn[i.componentType]),r.errorUnsupportedIf(4!==i.componentCount,"TANGENT vertex attribute must have 4 components, but found "+i.componentCount.toFixed()),new d.C(i.raw,i.byteOffset,i.byteStride,i.byteOffset+i.byteStride*i.entryCount)}async getTextureCoordinates(e,t){const r=this.errorContext;r.assert(null!=e.attributes.TEXCOORD_0,"No TEXCOORD_0 vertex data found.");const i=await this.getAccessor(e.attributes.TEXCOORD_0,t);return r.errorUnsupportedIf(2!==i.componentCount,"TEXCOORD_0 vertex attribute must have 2 components, but found "+i.componentCount.toFixed()),5126===i.componentType?this.wrapAccessor(d.m,i):(r.errorUnsupportedIf(!i.normalized,"Integer component types are only supported for a normalized accessor for TEXCOORD_0."),function(e){switch(e.componentType){case 5120:return new d.q(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);case 5121:return new d.t(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);case 5122:return new d.o(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);case 5123:return new d.r(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);case 5125:return new d.s(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);case 5126:return new d.m(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);default:return void Object(Oi.a)(e.componentType)}}(i))}async getVertexColors(e,t){const r=this.errorContext;r.assert(null!=e.attributes.COLOR_0,"No COLOR_0 vertex data found.");const i=await this.getAccessor(e.attributes.COLOR_0,t);if(r.errorUnsupportedIf(4!==i.componentCount&&3!==i.componentCount,"COLOR_0 attribute must have 3 or 4 components, but found "+i.componentCount.toFixed()),4===i.componentCount){if(5126===i.componentType)return this.wrapAccessor(d.C,i);if(5121===i.componentType)return this.wrapAccessor(d.J,i);if(5123===i.componentType)return this.wrapAccessor(d.H,i)}else if(3===i.componentCount){if(5126===i.componentType)return this.wrapAccessor(d.u,i);if(5121===i.componentType)return this.wrapAccessor(d.B,i);if(5123===i.componentType)return this.wrapAccessor(d.z,i)}r.errorUnsupported("Unsupported component type for COLOR_0 attribute: "+vn[i.componentType])}hasPositions(e){return void 0!==e.attributes.POSITION}hasNormals(e){return void 0!==e.attributes.NORMAL}hasVertexColors(e){return void 0!==e.attributes.COLOR_0}hasTextureCoordinates(e){return void 0!==e.attributes.TEXCOORD_0}hasTangents(e){return void 0!==e.attributes.TANGENT}async getMaterial(e,t){const r=this.errorContext;let i=this.materialCache.get(e.material);if(!i){const n=null!=e.material?cn(this.json.materials[e.material]):cn(),o=n.pbrMetallicRoughness,a=this.hasVertexColors(e);let s,c,l,u,d;o.baseColorTexture&&(r.errorUnsupportedIf(0!==(o.baseColorTexture.texCoord||0),"Only TEXCOORD with index 0 is supported."),s=await this.getTexture(o.baseColorTexture.index,t)),n.normalTexture&&(0!==(n.normalTexture.texCoord||0)?r.warnUnsupported("Only TEXCOORD with index 0 is supported for the normal map texture."):c=await this.getTexture(n.normalTexture.index,t)),n.occlusionTexture&&(0!==(n.occlusionTexture.texCoord||0)?r.warnUnsupported("Only TEXCOORD with index 0 is supported for the occlusion texture."):l=await this.getTexture(n.occlusionTexture.index,t)),n.emissiveTexture&&(0!==(n.emissiveTexture.texCoord||0)?r.warnUnsupported("Only TEXCOORD with index 0 is supported for the emissive texture."):u=await this.getTexture(n.emissiveTexture.index,t)),o.metallicRoughnessTexture&&(0!==(o.metallicRoughnessTexture.texCoord||0)?r.warnUnsupported("Only TEXCOORD with index 0 is supported for the metallicRoughness texture."):d=await this.getTexture(o.metallicRoughnessTexture.index,t)),i={alphaMode:n.alphaMode,alphaCutoff:n.alphaCutoff,color:o.baseColorFactor,doubleSided:!!n.doubleSided,colorTexture:s,normalTexture:c,name:n.name,id:null!=e.material?e.material:-1,occlusionTexture:l,emissiveTexture:u,emissiveFactor:n.emissiveFactor,metallicFactor:o.metallicFactor,roughnessFactor:o.roughnessFactor,metallicRoughnessTexture:d,vertexColors:a,ESRI_externalColorMixMode:n.extras.ESRI_externalColorMixMode}}return i}async getTexture(e,t){const r=this.errorContext,i=this.json.textures[e],n=(e=>({...ln,...e}))(null!=i.sampler?this.json.samplers[i.sampler]:{});r.errorUnsupportedIf(null==i.source,"Source is expected to be defined for a texture.");const o=this.json.images[i.source];let a=this.textureCache.get(e);if(!a){let i;if(o.uri)i=await this.context.loadImage(this.resolveUri(o.uri),t);else{r.errorUnsupportedIf(null==o.bufferView,"Image bufferView must be defined."),r.errorUnsupportedIf(null==o.mimeType,"Image mimeType must be defined.");const e=this.json.bufferViews[o.bufferView],n=await this.getBuffer(e.buffer,t);r.errorUnsupportedIf(null!=e.byteStride,"byteStride not supported for image buffer"),i=await async function(e,t){return Object(ji.c)((r,i)=>{const n=new Blob([e],{type:t}),o=URL.createObjectURL(n),a=new Image;a.addEventListener("load",()=>{URL.revokeObjectURL(o),"decode"in a?a.decode().then(()=>r(a),()=>r(a)):r(a)}),a.addEventListener("error",e=>{URL.revokeObjectURL(o),i(e)}),a.src=o})}(new Uint8Array(n.buffer,n.byteOffset+(e.byteOffset||0),e.byteLength),o.mimeType)}a={data:i,wrapS:n.wrapS,wrapT:n.wrapT,minFilter:n.minFilter,name:o.name,id:e},this.textureCache.set(e,a)}return a}getNodeTransform(e){if(void 0===e)return hn;let t=this.nodeTransformCache.get(e);if(!t){const r=this.getNodeTransform(this.getNodeParent(e)),i=this.json.nodes[e];i.matrix?t=Object(a.g)(Object(l.b)(),r,i.matrix):i.translation||i.rotation||i.scale?(t=Object(l.c)(r),i.translation&&Object(a.j)(t,t,i.translation),i.rotation&&(mn[3]=Object(fe.b)(mn,i.rotation),Object(a.h)(t,t,mn[3],mn)),i.scale&&Object(a.i)(t,t,i.scale)):t=r,this.nodeTransformCache.set(e,t)}return t}wrapAccessor(e,t){return new e(t.raw,t.byteOffset,t.byteStride,t.byteOffset+t.byteStride*(t.entryCount-1)+t.componentByteSize*t.componentCount)}resolveUri(e){return Object(wi.y)(e,this.baseUri)}getNodeParent(e){return this.nodeParentMap.get(e)}checkVersionSupported(){const e=rn.parse(this.json.asset.version,"glTF");fn.validate(e)}checkRequiredExtensionsSupported(){const e=this.json;e.extensionsRequired&&0!==e.extensionsRequired.length&&this.errorContext.errorUnsupported("gltf loader was not able to load unsupported feature. Required extensions: "+e.extensionsRequired.join(", "))}computeNodeParents(){this.json.nodes.forEach((e,t)=>{e.children&&e.children.forEach(e=>{this.nodeParentMap.set(e,t)})})}}const fn=new rn(2,0,"glTF"),hn=Object(a.f)(Object(l.b)(),Math.PI/2),mn=Object(_.a)(),pn={SCALAR:1,VEC2:2,VEC3:3,VEC4:4},bn={5120:1,5121:1,5122:2,5123:2,5126:4,5125:4};async function gn(e){return Object(ji.c)((t,r)=>{const i=new Blob([e]),n=new FileReader;n.onload=()=>{t(JSON.parse(n.result))},n.onerror=e=>{r(e)},n.readAsText(i)})}const vn={5120:"BYTE",5121:"UNSIGNED_BYTE",5122:"SHORT",5123:"UNSIGNED_SHORT",5125:"UNSIGNED_INT",5126:"FLOAT"};let xn=0;function On(e){let t=null;return e.json.nodes.forEach(e=>{const r=e.extras;Object(i.h)(r)&&(r.ESRI_proxyEllipsoid||r.ESRI_lod)&&(t=r)}),t}function yn(e){return e.extensions&&e.extensions.MSFT_lod&&Array.isArray(e.extensions.MSFT_lod.ids)}function _n(e,t,r){const i=t=>{const i=`${r}_tex_${t&&t.id}${t&&t.name?"_"+t.name:""}`;if(t&&!e.textures.has(i)){const r=function(e,t={}){return{data:e,parameters:{wrap:{s:10497,t:10497,...t.wrap},noUnpackFlip:!0,mipmap:!1,...t}}}(t.data,{wrap:{s:wn(t.wrapS),t:wn(t.wrapT)},mipmap:Tn.some(e=>e===t.minFilter),noUnpackFlip:!0});e.textures.set(i,r)}return i},n=`${r}_mat_${t.id}_${t.name}`;if(!e.materials.has(n)){const r=function(e={}){return{color:[1,1,1],opacity:1,alphaMode:"OPAQUE",alphaCutoff:.5,doubleSided:!1,castShadows:!0,receiveShadows:!0,receiveAmbientOcclustion:!0,textureColor:null,textureNormal:null,textureOcclusion:null,textureEmissive:null,textureMetallicRoughness:null,emissiveFactor:[0,0,0],metallicFactor:1,roughnessFactor:1,colorMixMode:"multiply",...e}}({color:[t.color[0],t.color[1],t.color[2]],opacity:t.color[3],alphaMode:t.alphaMode,alphaCutoff:t.alphaCutoff,doubleSided:t.doubleSided,colorMixMode:t.ESRI_externalColorMixMode,textureColor:t.colorTexture?i(t.colorTexture):void 0,textureNormal:t.normalTexture?i(t.normalTexture):void 0,textureOcclusion:t.occlusionTexture?i(t.occlusionTexture):void 0,textureEmissive:t.emissiveTexture?i(t.emissiveTexture):void 0,textureMetallicRoughness:t.metallicRoughnessTexture?i(t.metallicRoughnessTexture):void 0,emissiveFactor:[t.emissiveFactor[0],t.emissiveFactor[1],t.emissiveFactor[2]],metallicFactor:t.metallicFactor,roughnessFactor:t.roughnessFactor});e.materials.set(n,r)}return n}function wn(e){if(33071===e||33648===e||10497===e)return e;jn.error("Unexpected TextureSampler WrapMode: "+e)}const jn=new class{error(e){throw new _i.a("gltf-loader-error",e)}errorUnsupported(e){throw new _i.a("gltf-loader-unsupported-feature",e)}errorUnsupportedIf(e,t){e&&this.errorUnsupported(t)}assert(e,t){e||this.error(t)}warn(e){tn.warn(e)}warnUnsupported(e){this.warn("[Unsupported Feature] "+e)}warnUnsupportedIf(e,t){e&&this.warnUnsupported(t)}},Tn=[9987,9985],Sn=["POINTS","LINES","LINE_LOOP","LINE_STRIP","TRIANGLES","TRIANGLE_STRIP","TRIANGLE_FAN"];var Mn=r("f/qv");const Cn=f.a.getLogger("esri.views.3d.layers.graphics.objectResourceUtils");function An(e){throw new _i.a("","Request for object resource failed: "+e)}function Pn(e){const t=e.params,r=t.topology;let i=!0;switch(t.vertexAttributes||(Cn.warn("Geometry must specify vertex attributes"),i=!1),t.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const e=t.faces;if(e){if(t.vertexAttributes)for(const r in t.vertexAttributes){const t=e[r];t&&t.values?(null!=t.valueType&&"UInt32"!==t.valueType&&(Cn.warn(`Unsupported indexed geometry indices type '${t.valueType}', only UInt32 is currently supported`),i=!1),null!=t.valuesPerElement&&1!==t.valuesPerElement&&(Cn.warn(`Unsupported indexed geometry values per element '${t.valuesPerElement}', only 1 is currently supported`),i=!1)):(Cn.warn(`Indexed geometry does not specify face indices for '${r}' attribute`),i=!1)}}else Cn.warn("Indexed geometries must specify faces"),i=!1;break}default:Cn.warn(`Unsupported topology '${r}'`),i=!1}e.params.material||(Cn.warn("Geometry requires material"),i=!1);const n=e.params.vertexAttributes;for(const o in n)n[o].values||(Cn.warn("Geometries with externally defined attributes are not yet supported"),i=!1);return i}function In(e){const t=Object(g.c)();return e.forEach(e=>{const r=e.boundingInfo;Object(g.g)(t,r.getBBMin()),Object(g.g)(t,r.getBBMax())}),t}async function Rn(e,t){const r=[];for(const a in e){const n=e[a],o=n.images[0].data;if(!o){Cn.warn("Externally referenced texture data is not yet supported");continue}const s=n.encoding+";base64,"+o,c="/textureDefinitions/"+a,l={noUnpackFlip:!0,wrap:{s:10497,t:10497},preMultiplyAlpha:!0},u=Object(i.h)(t)&&t.disableTextures?Object(ji.u)(null):Object(Mi.a)(s,t);r.push(u.then(e=>({refId:c,image:e,params:l,alphaChannelUsage:"rgba"===n.channels?n.alphaChannelUsage||"transparency":"none"})))}const n=await Object(ji.b)(r),o={};for(const i of n)o[i.refId]=i;return o}function Ln(e){switch(e){case"mask":return 2;case"maskAndTransparency":return 3;case"none":return 1;case"transparency":default:return 0}}function Bn(e){const t=e.params;return{id:1,material:t.material,texture:t.texture,region:t.texture}}function Fn(e){const t=new Uint32Array(e);for(let r=0;r<e;r++)t[r]=r;return t}const zn=new rn(1,2,"wosr");function Dn(e,t,r){if(e.count!==t.count)return void h.error("source and destination buffers need to have the same number of elements");const i=e.count,n=r[0],o=r[1],a=r[2],s=r[3],c=r[4],l=r[5],u=r[6],d=r[7],f=r[8],m=e.typedBuffer,p=e.typedBufferStride,b=t.typedBuffer,g=t.typedBufferStride;for(let h=0;h<i;h++){const e=h*p,t=h*g,r=b[t],i=b[t+1],v=b[t+2],x=b[t+3];m[e]=n*r+s*i+u*v,m[e+1]=o*r+c*i+d*v,m[e+2]=a*r+l*i+f*v,m[e+3]=x}}function Nn(e,t,r){const i=Math.min(e.count,t.count),n=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;for(let c=0;c<i;c++){const e=c*o,t=c*s;n[e]=r*a[t],n[e+1]=r*a[t+1],n[e+2]=r*a[t+2],n[e+3]=r*a[t+3]}}async function Vn(e,t){const r=En(Object(s.a)(e));if("wosr"===r.fileType){const e=await(t.cache?t.cache.loadWOSR(r.url,t):async function(e,t){const r=await async function(e,t){const r=Object(i.h)(t)&&t.streamDataRequester;if(r)return async function(e,t,r){const i=await Object(Hi.c)(t.request(e,"json",r));return!0===i.ok?i.value:(Object(ji.v)(i.error),void An(i.error.details.url))}(e,r,t);const n=await Object(Hi.c)(Object(ki.default)(e,Object(i.n)(t)));return!0===n.ok?n.value.data:(Object(ji.v)(n.error),void An(n.error))}(e,t);return{resource:r,textures:await Rn(r.textureDefinitions,t)}}(r.url,t)),o=function(e,t){const r=[],o=[],a=[],s=[],c=e.resource,l=rn.parse(c.version||"1.0","wosr");zn.validate(l);const u=c.model.name,d=c.model.geometries,f=c.materialDefinitions,h=e.textures;let m=0;const p=new Map;for(let b=0;b<d.length;b++){const e=d[b];if(!Pn(e))continue;const c=Bn(e),l=e.params.vertexAttributes,g={};for(const t in l){const e=l[t];g[t]={data:e.values,size:e.valuesPerElement}}const v={};if("PerAttributeArray"===e.params.topology){const e=Fn(g.position.data.length/g.position.size);for(const t in g)v[t]=e}else{const t=e.params.faces;for(const e in t)v[e]=new Uint32Array(t[e].values)}const x=h&&h[c.texture];if(x&&!p.has(c.texture)){const{image:e,params:t}=x,r=new Gi(e,u,t);s.push(r),p.set(c.texture,r)}const O=p.get(c.texture),y=O?O.id:void 0;let _=a[c.material]?a[c.material][c.texture]:null;if(!_){const e=f[c.material.substring(c.material.lastIndexOf("/")+1)].params;1===e.transparency&&(e.transparency=0);const r=x&&x.alphaChannelUsage,o=e.transparency>0||"transparency"===r||"maskAndTransparency"===r,s={ambient:Object(n.f)(e.diffuse),diffuse:Object(n.f)(e.diffuse),opacity:1-(e.transparency||0),transparent:o,textureAlphaMode:x?Ln(x.alphaChannelUsage):void 0,textureAlphaCutoff:.33,textureId:y,initTextureTransparent:!0,doubleSided:!0,cullFace:0,colorMixMode:e.externalColorMixMode||"tint",textureAlphaPremultiplied:!0};Object(i.h)(t)&&t.materialParamsMixin&&Object(Mn.d)(s,t.materialParamsMixin),_=new li(s,u),a[c.material]||(a[c.material]={}),a[c.material][c.texture]=_}o.push(_);const w=new le(new ie(g,v),u);m+=v.position?v.position.length:0,r.push(w)}return{name:u,stageResources:{textures:s,materials:o,geometries:r},pivotOffset:c.model.pivotOffset,boundingBox:In(r),numberOfVertices:m,lodThreshold:null}}(e,t);return{lods:[o],referenceBoundingBox:o.boundingBox,isEsriSymbolResource:!1,isWosr:!0,remove:e.remove}}const c=await(t.cache?t.cache.loadGLTF(r.url,t):async function(e,t,r={}){const n=await dn.load(e,jn,t,r),o="gltf_"+xn++,a={lods:[],materials:new Map,textures:new Map,meta:On(n)},s=!(!n.json.asset.extras||"symbolResource"!==n.json.asset.extras.ESRI_type);return await async function(e,t){const r=e.json,i=r.scenes[r.scene||0].nodes,n=i.length>1;for(const a of i){const e=r.nodes[a],t=[o(a,0)];yn(e)&&!n&&t.push(...e.extensions.MSFT_lod.ids.map((e,t)=>o(e,t+1))),await Object(ji.b)(t)}async function o(i,n){const a=r.nodes[i],s=e.getNodeTransform(i);if(jn.warnUnsupportedIf(null!=a.weights,"Morph targets are not supported."),null!=a.mesh){const e=r.meshes[a.mesh];for(const r of e.primitives)await t(r,s,n,e.name)}for(const e of a.children||[])await o(e,n)}}(n,async(e,t,s,c)=>{const u=void 0!==e.mode?e.mode:4,d=function(e){switch(e){case 4:case 5:case 6:return e;default:return null}}(u);if(Object(i.g)(d))return void jn.warnUnsupported("Unsupported primitive mode ("+Sn[u]+"). Skipping primitive.");if(!n.hasPositions(e))return void jn.warn("Skipping primitive without POSITION vertex attribute.");const f=await n.getMaterial(e,r),h={transform:Object(l.c)(t),attributes:{position:await n.getPositionData(e,r),normal:null,texCoord0:null,color:null,tangent:null},indices:await n.getIndexData(e,r),primitiveType:d,material:_n(a,f,o)};n.hasNormals(e)&&(h.attributes.normal=await n.getNormalData(e,r)),n.hasTangents(e)&&(h.attributes.tangent=await n.getTangentData(e,r)),n.hasTextureCoordinates(e)&&(h.attributes.texCoord0=await n.getTextureCoordinates(e,r)),n.hasVertexColors(e)&&(h.attributes.color=await n.getVertexColors(e,r));let m=null;Object(i.h)(a.meta)&&Object(i.h)(a.meta.ESRI_lod)&&"screenSpaceRadius"===a.meta.ESRI_lod.metric&&(m=a.meta.ESRI_lod.thresholds[s]),a.lods[s]=a.lods[s]||{parts:[],name:c,lodThreshold:m},a.lods[s].parts.push(h)}),{model:a,meta:{isEsriSymbolResource:s,uri:n.uri},customMeta:{}}}(new qi(t.streamDataRequester),r.url,t)),u=Object(i.f)(c.model.meta,"ESRI_proxyEllipsoid");c.meta.isEsriSymbolResource&&Object(i.h)(u)&&-1!==c.meta.uri.indexOf("/RealisticTrees/")&&function(e,t){for(let r=0;r<e.model.lods.length;++r){const s=e.model.lods[r];e.customMeta.esriTreeRendering=!0;for(const c of s.parts){const s=c.attributes.normal;if(Object(i.g)(s))return;const u=c.attributes.position,f=u.count,h=Object(n.e)(),m=Object(n.e)(),p=Object(n.e)(),b=en(d.J,f),g=en(d.u,f),v=Object(a.a)(Object(l.b)(),c.transform);for(let i=0;i<f;i++){u.getVec(i,m),s.getVec(i,h),Object(o.j)(m,m,c.transform),Object(o.g)(p,m,t.center),Object(o.a)(p,p,t.radius);const n=p[2],a=Object(o.m)(p),l=Math.min(.45+.55*a*a,1);Object(o.a)(p,p,t.radius),Object(o.j)(p,p,v),Object(o.o)(p,p),r+1!==e.model.lods.length&&e.model.lods.length>1&&Object(o.f)(p,p,h,n>-1?.2:Math.min(-4*n-3.8,1)),g.setVec(i,p),b.set(i,0,255*l),b.set(i,1,255*l),b.set(i,2,255*l),b.set(i,3,255)}c.attributes.normal=g,c.attributes.color=b}}}(c,u);const f=c.meta.isEsriSymbolResource?{usePBR:t.usePBR,isSchematic:!1,treeRendering:c.customMeta.esriTreeRendering,mrrFactors:[0,1,.2]}:{usePBR:!0,isSchematic:!1,mrrFactors:[0,1,.5]},h={...t.materialParamsMixin,treeRendering:c.customMeta.esriTreeRendering};if(null!=r.specifiedLodIndex){const e=Un(c,f,h,r.specifiedLodIndex);let t=e[0].boundingBox;return 0!==r.specifiedLodIndex&&(t=Un(c,f,h,0)[0].boundingBox),{lods:e,referenceBoundingBox:t,isEsriSymbolResource:c.meta.isEsriSymbolResource,isWosr:!1,remove:c.remove}}const m=Un(c,f,h);return{lods:m,referenceBoundingBox:m[0].boundingBox,isEsriSymbolResource:c.meta.isEsriSymbolResource,isWosr:!1,remove:c.remove}}function En(e){const t=e.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return t?{fileType:"gltf",url:t[1],specifiedLodIndex:null!=t[4]?Number(t[4]):null}:e.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:e,specifiedLodIndex:null}:{fileType:"unknown",url:e,specifiedLodIndex:null}}function Un(e,t,r,n){const o=e.model,a=Object(c.a)(),s=new Array,l=new Map,f=new Map;return o.lods.forEach((e,c)=>{if(void 0!==n&&c!==n)return;let h=0;const v={name:e.name,stageResources:{textures:new Array,materials:new Array,geometries:new Array},lodThreshold:Object(i.h)(e.lodThreshold)?e.lodThreshold:null,pivotOffset:[0,0,0],numberOfVertices:0,boundingBox:Object(g.c)()};s.push(v),e.parts.forEach(n=>{const s=n.material+(n.attributes.normal?"_normal":"")+(n.attributes.color?"_color":"")+(n.attributes.texCoord0?"_texCoord0":"")+(n.attributes.tangent?"_tangent":""),c=o.materials.get(n.material),x=Object(i.h)(n.attributes.texCoord0),O=Object(i.h)(n.attributes.normal);if(!l.has(s)){if(x){if(Object(i.h)(c.textureColor)&&!f.has(c.textureColor)){const e=o.textures.get(c.textureColor),t={...e.parameters,preMultiplyAlpha:!0};f.set(c.textureColor,new Gi(e.data,c.textureColor,t))}if(Object(i.h)(c.textureNormal)&&!f.has(c.textureNormal)){const e=o.textures.get(c.textureNormal),t={...e.parameters,preMultiplyAlpha:!0};f.set(c.textureNormal,new Gi(e.data,c.textureNormal,t))}if(Object(i.h)(c.textureOcclusion)&&!f.has(c.textureOcclusion)){const e=o.textures.get(c.textureOcclusion),t={...e.parameters,preMultiplyAlpha:!0};f.set(c.textureOcclusion,new Gi(e.data,c.textureOcclusion,t))}if(Object(i.h)(c.textureEmissive)&&!f.has(c.textureEmissive)){const e=o.textures.get(c.textureEmissive),t={...e.parameters,preMultiplyAlpha:!0};f.set(c.textureEmissive,new Gi(e.data,c.textureEmissive,t))}if(Object(i.h)(c.textureMetallicRoughness)&&!f.has(c.textureMetallicRoughness)){const e=o.textures.get(c.textureMetallicRoughness),t={...e.parameters,preMultiplyAlpha:!0};f.set(c.textureMetallicRoughness,new Gi(e.data,c.textureMetallicRoughness,t))}}const e=Math.pow(c.color[0],.47619047619047616),a=Math.pow(c.color[1],.47619047619047616),u=Math.pow(c.color[2],.47619047619047616),d=Math.pow(c.emissiveFactor[0],.47619047619047616),h=Math.pow(c.emissiveFactor[1],.47619047619047616),m=Math.pow(c.emissiveFactor[2],.47619047619047616);l.set(s,new li({...t,transparent:"BLEND"===c.alphaMode,textureAlphaMode:Gn(c.alphaMode),textureAlphaCutoff:c.alphaCutoff,diffuse:[e,a,u],ambient:[e,a,u],opacity:c.opacity,doubleSided:c.doubleSided,doubleSidedType:"winding-order",cullFace:c.doubleSided?0:2,vertexColors:!!n.attributes.color,vertexTangents:!!n.attributes.tangent,normals:O?"default":"screenDerivative",castShadows:!0,receiveSSAO:!0,textureId:Object(i.h)(c.textureColor)&&x?f.get(c.textureColor).id:void 0,colorMixMode:c.colorMixMode,normalTextureId:Object(i.h)(c.textureNormal)&&x?f.get(c.textureNormal).id:void 0,textureAlphaPremultiplied:!0,occlusionTextureId:Object(i.h)(c.textureOcclusion)&&x?f.get(c.textureOcclusion).id:void 0,emissiveTextureId:Object(i.h)(c.textureEmissive)&&x?f.get(c.textureEmissive).id:void 0,metallicRoughnessTextureId:Object(i.h)(c.textureMetallicRoughness)&&x?f.get(c.textureMetallicRoughness).id:void 0,emissiveFactor:[d,h,m],mrrFactors:[c.metallicFactor,c.roughnessFactor,t.mrrFactors[2]],isSchematic:!1,...r},s))}const y=function(e,t){switch(t){case 4:return function(e){return"number"==typeof e?J(e):Object(yi.i)(e)||Object(yi.k)(e)?new Uint32Array(e):e}(e);case 5:return function(e){const t="number"==typeof e?e:e.length;if(t<3)return new Uint32Array(0);const r=t-2,i=new Uint32Array(3*r);if("number"==typeof e){let e=0;for(let t=0;t<r;t+=1)t%2==0?(i[e++]=t,i[e++]=t+1,i[e++]=t+2):(i[e++]=t+1,i[e++]=t,i[e++]=t+2)}else{let t=0;for(let n=0;n<r;n+=1)if(n%2==0){const r=e[n+1],o=e[n+2];i[t++]=e[n],i[t++]=r,i[t++]=o}else{const r=e[n],o=e[n+2];i[t++]=e[n+1],i[t++]=r,i[t++]=o}}return i}(e);case 6:return function(e){const t="number"==typeof e?e:e.length;if(t<3)return new Uint32Array(0);const r=t-2,i=new Uint32Array(3*r);if("number"==typeof e){let e=0;for(let t=0;t<r;++t)i[e++]=0,i[e++]=t+1,i[e++]=t+2;return i}{const t=e[0];let n=e[1],o=0;for(let a=0;a<r;++a){const r=e[a+2];i[o++]=t,i[o++]=n,i[o++]=r,n=r}return i}}(e)}}(n.indices||n.attributes.position.count,n.primitiveType),_={},w={},j=n.attributes.position.count,T=en(d.u,j);if(m(T,n.attributes.position,n.transform),w.position={data:T.typedBuffer,size:T.elementCount},_.position=y,Object(i.h)(n.attributes.normal)){const e=en(d.u,j);Object(u.g)(a,n.transform),p(e,n.attributes.normal,a),w.normal={data:e.typedBuffer,size:e.elementCount},_.normal=y}if(Object(i.h)(n.attributes.tangent)){const e=en(d.C,j);Object(u.g)(a,n.transform),Dn(e,n.attributes.tangent,a),w.tangent={data:e.typedBuffer,size:e.elementCount},_.tangent=y}if(Object(i.h)(n.attributes.texCoord0)){const e=en(d.m,j);Yi(e,n.attributes.texCoord0),w.uv0={data:e.typedBuffer,size:e.elementCount},_.uv0=y}if(Object(i.h)(n.attributes.color)){const e=en(d.J,j);if(4===n.attributes.color.elementCount)n.attributes.color instanceof d.C?Nn(e,n.attributes.color,255):n.attributes.color instanceof d.J?Ki(e,n.attributes.color):n.attributes.color instanceof d.H&&Nn(e,n.attributes.color,1/256);else{Qi(e,255,255,255,255);const t=new d.B(e.buffer,0,4);n.attributes.color instanceof d.u?b(t,n.attributes.color,255):n.attributes.color instanceof d.B?Ji(t,n.attributes.color):n.attributes.color instanceof d.z&&b(t,n.attributes.color,1/256)}w.color={data:e.typedBuffer,size:e.elementCount},_.color=y}const S=new le(new ie(w,_),`gltf_${e.name}_${h++}`);v.stageResources.geometries.push(S),v.stageResources.materials.push(l.get(s)),x&&(Object(i.h)(c.textureColor)&&v.stageResources.textures.push(f.get(c.textureColor)),Object(i.h)(c.textureNormal)&&v.stageResources.textures.push(f.get(c.textureNormal)),Object(i.h)(c.textureOcclusion)&&v.stageResources.textures.push(f.get(c.textureOcclusion)),Object(i.h)(c.textureEmissive)&&v.stageResources.textures.push(f.get(c.textureEmissive)),Object(i.h)(c.textureMetallicRoughness)&&v.stageResources.textures.push(f.get(c.textureMetallicRoughness))),v.numberOfVertices+=j;const M=S.boundingInfo;Object(g.g)(v.boundingBox,M.getBBMin()),Object(g.g)(v.boundingBox,M.getBBMax())})}),s}function Gn(e){switch(e){case"BLEND":return 0;case"MASK":return 2;case"OPAQUE":return 1;default:return 0}}Object.freeze({__proto__:null,transformMat4:function(e,t,r){if(e.count!==t.count)return void h.error("source and destination buffers need to have the same number of elements");const i=e.count,n=r[0],o=r[1],a=r[2],s=r[3],c=r[4],l=r[5],u=r[6],d=r[7],f=r[8],m=r[9],p=r[10],b=r[11],g=r[12],v=r[13],x=r[14],O=r[15],y=e.typedBuffer,_=e.typedBufferStride,w=t.typedBuffer,j=t.typedBufferStride;for(let h=0;h<i;h++){const e=h*_,t=h*j,r=w[t],i=w[t+1],T=w[t+2],S=w[t+3];y[e]=n*r+c*i+f*T+g*S,y[e+1]=o*r+l*i+m*T+v*S,y[e+2]=a*r+u*i+p*T+x*S,y[e+3]=s*r+d*i+b*T+O*S}},transformMat3:Dn,scale:Nn,shiftRight:function(e,t,r){const i=Math.min(e.count,t.count),n=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;for(let c=0;c<i;c++){const e=c*o,t=c*s;n[e]=a[t]>>r,n[e+1]=a[t+1]>>r,n[e+2]=a[t+2]>>r,n[e+3]=a[t+3]>>r}}})},lwwL:function(e,t,r){"use strict";function i(){const e=new Float32Array(16);return e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}r.d(t,"a",function(){return i});const n=i();Object.freeze({__proto__:null,create:i,clone:function(e){const t=new Float32Array(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t},fromValues:function(e,t,r,i,n,o,a,s,c,l,u,d,f,h,m,p){const b=new Float32Array(16);return b[0]=e,b[1]=t,b[2]=r,b[3]=i,b[4]=n,b[5]=o,b[6]=a,b[7]=s,b[8]=c,b[9]=l,b[10]=u,b[11]=d,b[12]=f,b[13]=h,b[14]=m,b[15]=p,b},createView:function(e,t){return new Float32Array(e,t,16)},IDENTITY:n})},mmTy:function(e,t,r){"use strict";function i(e,t,r){for(let i=0;i<r;++i)t[2*i]=e[i],t[2*i+1]=e[i]-t[2*i]}function n(e,t,r,n){for(let s=0;s<n;++s)o[0]=e[s],i(o,a,1),t[s]=a[0],r[s]=a[1]}r.d(t,"a",function(){return i}),r.d(t,"b",function(){return n});const o=new Float64Array(1),a=new Float32Array(2)},p9cc:function(e,t,r){"use strict";r.d(t,"a",function(){return a});var i=r("OIYib"),n=r("R/jG"),o=r("fLTx");function a(e,t){const r=e.fragment,n=t.hasMetalnessAndRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture;1===t.pbrMode&&n&&e.include(o.a,t),2!==t.pbrMode?(0===t.pbrMode&&r.code.add(i.a`
      float getBakedOcclusion() { return 1.0; }
  `),1===t.pbrMode&&(r.uniforms.add("emissionFactor","vec3"),r.uniforms.add("mrrFactors","vec3"),r.code.add(i.a`
      vec3 mrr;
      vec3 emission;
      float occlusion;
    `),t.hasMetalnessAndRoughnessTexture&&(r.uniforms.add("texMetallicRoughness","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texMetallicRoughnessSize","vec2"),r.code.add(i.a`
      void applyMetallnessAndRoughness(TextureLookupParameter params) {
        vec3 metallicRoughness = textureLookup(texMetallicRoughness, params).rgb;

        mrr[0] *= metallicRoughness.b;
        mrr[1] *= metallicRoughness.g;
      }`)),t.hasEmissionTexture&&(r.uniforms.add("texEmission","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texEmissionSize","vec2"),r.code.add(i.a`
      void applyEmission(TextureLookupParameter params) {
        emission *= textureLookup(texEmission, params).rgb;
      }`)),t.hasOcclusionTexture?(r.uniforms.add("texOcclusion","sampler2D"),t.supportsTextureAtlas&&r.uniforms.add("texOcclusionSize","vec2"),r.code.add(i.a`
      void applyOcclusion(TextureLookupParameter params) {
        occlusion *= textureLookup(texOcclusion, params).r;
      }

      float getBakedOcclusion() {
        return occlusion;
      }
      `)):r.code.add(i.a`
      float getBakedOcclusion() { return 1.0; }
      `),r.code.add(i.a`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;
      ${n?"vtc.uv = vuv0;":""}
      ${t.hasMetalnessAndRoughnessTexture?t.supportsTextureAtlas?"vtc.size = texMetallicRoughnessSize; applyMetallnessAndRoughness(vtc);":"applyMetallnessAndRoughness(vtc);":""}
      ${t.hasEmissionTexture?t.supportsTextureAtlas?"vtc.size = texEmissionSize; applyEmission(vtc);":"applyEmission(vtc);":""}
      ${t.hasOcclusionTexture?t.supportsTextureAtlas?"vtc.size = texOcclusionSize; applyOcclusion(vtc);":"applyOcclusion(vtc);":""}
    }
  `))):r.code.add(i.a`
      const vec3 mrr = vec3(0.0, 0.6, 0.2);
      const vec3 emission = vec3(0.0);
      float occlusion = 1.0;

      void applyPBRFactors() {}

      float getBakedOcclusion() { return 1.0; }
    `)}Object(n.b)(0,.6,.2),(a||(a={})).bindUniforms=function(e,t,r=!1){r||(e.setUniform3fv("mrrFactors",t.mrrFactors),e.setUniform3fv("emissionFactor",t.emissiveFactor))}},qrV2:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e,t){const r=e.fragment;r.code.add(i.a`
    struct ShadingNormalParameters {
      vec3 normalView;
      vec3 viewDirection;
    } shadingParams;
    `),r.code.add(1===t.doubleSidedMode?i.a`
      vec3 shadingNormal(ShadingNormalParameters params) {
        return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
      }
    `:2===t.doubleSidedMode?i.a`
      vec3 shadingNormal(ShadingNormalParameters params) {
        return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
      }
    `:i.a`
      vec3 shadingNormal(ShadingNormalParameters params) {
        return normalize(params.normalView);
      }
    `)}},"r+FG":function(e,t,r){"use strict";function i(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function n(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]]}function o(e,t){return new Float64Array(e,t,16)}r.d(t,"a",function(){return a}),r.d(t,"b",function(){return i}),r.d(t,"c",function(){return n}),r.d(t,"d",function(){return o});const a=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];Object.freeze({__proto__:null,create:i,clone:n,fromValues:function(e,t,r,i,n,o,a,s,c,l,u,d,f,h,m,p){return[e,t,r,i,n,o,a,s,c,l,u,d,f,h,m,p]},createView:o,IDENTITY:a})},sJp1:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e){e.attributes.add("position","vec3"),e.vertex.code.add(i.a`
    vec3 positionModel() { return position; }
  `)}},sKsC:function(e,t,r){"use strict";r.d(t,"a",function(){return S}),r.d(t,"b",function(){return T});var i=r("OIYib"),n=r("Tbkp"),o=r("aQrP"),a=r("0nJL"),s=r("viRi"),c=r("69UF"),l=r("F7CJ"),u=r("bVvB"),d=r("0BfS"),f=r("vXUg"),h=r("XV/G"),m=r("1TnO"),p=r("368d"),b=r("p9cc"),g=r("F8o4"),v=r("wzLF"),x=r("sJp1"),O=r("bLIi"),y=r("fiGu"),_=r("cIib"),w=r("6kvK"),j=r("NiZE");function T(e){const t=new o.a,r=t.vertex.code,T=t.fragment.code;return t.vertex.uniforms.add("proj","mat4").add("view","mat4").add("camPos","vec3").add("localOrigin","vec3"),t.include(x.a),t.varyings.add("vpos","vec3"),t.include(s.a,e),t.include(m.a,e),t.include(l.a,e),0!==e.output&&7!==e.output||(t.include(v.a,e),t.include(n.a,{linearDepth:!1}),e.offsetBackfaces&&t.include(g.a),e.instancedColor&&t.attributes.add("instanceColor","vec4"),t.varyings.add("vNormalWorld","vec3"),t.varyings.add("localvpos","vec3"),t.include(p.a,e),t.include(f.a,e),t.include(O.a,e),t.include(u.a,e),t.vertex.uniforms.add("externalColor","vec4"),t.varyings.add("vcolorExt","vec4"),r.add(i.a`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${e.instancedColor?"vcolorExt *= instanceColor;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${i.a.float(c.c)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          }
          else {
            vpos = calculateVPos();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, camPos);":""}
          }
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),7===e.output&&(t.include(a.a,e),t.include(c.a,e),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("opacity","float").add("layerOpacity","float"),t.fragment.uniforms.add("view","mat4"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.fragment.include(j.a),T.add(i.a`
      void main() {
        discardBySlice(vpos);
        ${e.hasColorTexture?i.a`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:i.a`vec4 texColor = vec4(1.0);`}
        ${e.attributeColor?i.a`
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:i.a`
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}

        gl_FragColor = vec4(opacity_);
      }
    `)),0===e.output&&(t.include(a.a,e),t.include(w.a,e),t.include(_.a,e),t.include(c.a,e),e.receiveShadows&&t.include(d.a,e),t.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("ambient","vec3").add("diffuse","vec3").add("opacity","float").add("layerOpacity","float"),t.fragment.uniforms.add("view","mat4"),e.hasColorTexture&&t.fragment.uniforms.add("tex","sampler2D"),t.include(b.a,e),t.include(h.a,e),t.fragment.include(j.a),T.add(i.a`
      void main() {
        discardBySlice(vpos);
        ${e.hasColorTexture?i.a`
        vec4 texColor = texture2D(tex, vuv0);
        ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
        discardOrAdjustAlpha(texColor);`:i.a`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - camPos);
        ${1===e.pbrMode?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = _oldHeuristicLighting(vpos + localOrigin);
        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":1===e.viewingMode?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.attributeColor?i.a`
        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:i.a`
        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));
        `}
        ${i.a`
        vec3 shadedNormal = normalize(vNormalWorld);
        albedo_ *= 1.2;
        vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);
        float alignmentLightView = clamp(dot(-viewForward, lightingMainDirection), 0.0, 1.0);
        float transmittance = 1.0 - clamp(dot(-viewForward, shadedNormal), 0.0, 1.0);
        float treeRadialFalloff = vColor.r;
        float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
        additionalLight += backLightFactor * lightingMainIntensity;`}
        ${1===e.pbrMode||2===e.pbrMode?1===e.viewingMode?i.a`vec3 normalGround = normalize(vpos + localOrigin);`:i.a`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:i.a``}
        ${1===e.pbrMode||2===e.pbrMode?i.a`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];
            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:"vec3 shadedColor = evaluateSceneLighting(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight);"}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.OITEnabled?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
      }
    `)),t.include(y.a,e),t}var S=Object.freeze({__proto__:null,build:T})},tiP8:function(e,t,r){"use strict";r.d(t,"a",function(){return o}),r.d(t,"b",function(){return s}),r.d(t,"c",function(){return a});var i=r("srIe"),n=(r("15Hh"),r("r+FG"));function o(e,t){return Object(i.g)(e)&&(e=[]),e.push(t),e}function a(e,t){if(Object(i.g)(e))return e;const r=e.filter(e=>e!==t);return 0===r.length?null:r}function s(e){return!!Object(i.h)(e)&&!e.visible}r("EVMh"),r("mmTy"),new Float64Array(3),new Float32Array(6),Object(n.b)()},vXUg:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e,t){0===t.output&&t.receiveShadows?(e.varyings.add("linearDepth","float"),e.vertex.code.add(i.a`
      void forwardLinearDepth() { linearDepth = gl_Position.w; }
    `)):1===t.output||3===t.output?(e.varyings.add("linearDepth","float"),e.vertex.uniforms.add("uCameraNearFar","vec2"),e.vertex.code.add(i.a`
      void forwardLinearDepth() {
        linearDepth = (-position_view().z - uCameraNearFar[0]) / (uCameraNearFar[1] - uCameraNearFar[0]);
      }
    `)):e.vertex.code.add(i.a`
      void forwardLinearDepth() {}
    `)}},viRi:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e,t){t.vvInstancingEnabled&&(t.vvSize||t.vvColor)&&e.attributes.add("instanceFeatureAttribute","vec4"),t.vvSize?(e.vertex.uniforms.add("vvSizeMinSize","vec3"),e.vertex.uniforms.add("vvSizeMaxSize","vec3"),e.vertex.uniforms.add("vvSizeOffset","vec3"),e.vertex.uniforms.add("vvSizeFactor","vec3"),e.vertex.uniforms.add("vvSymbolRotationMatrix","mat3"),e.vertex.uniforms.add("vvSymbolAnchor","vec3"),e.vertex.code.add(i.a`
      vec3 vvScale(vec4 _featureAttribute) {
        return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
      }

      vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
        return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
      }
    `),e.vertex.code.add(i.a`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 vvScale = clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize + eps, vvSizeMaxSize);
        return vec4(vvSymbolRotationMatrix * _normal / vvScale, 1.0);
      }

      ${t.vvInstancingEnabled?i.a`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):e.vertex.code.add(i.a`
      vec4 localPosition() { return vec4(position, 1.0); }

      vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }
    `),t.vvColor?(e.vertex.defines.addInt("VV_COLOR_N",8),e.vertex.code.add(i.a`
      uniform float vvColorValues[VV_COLOR_N];
      uniform vec4 vvColorColors[VV_COLOR_N];

      vec4 vvGetColor(vec4 featureAttribute, float values[VV_COLOR_N], vec4 colors[VV_COLOR_N]) {
        float value = featureAttribute.y;
        if (value <= values[0]) {
          return colors[0];
        }

        for (int i = 1; i < VV_COLOR_N; ++i) {
          if (values[i] >= value) {
            float f = (value - values[i-1]) / (values[i] - values[i-1]);
            return mix(colors[i-1], colors[i], f);
          }
        }
        return colors[VV_COLOR_N - 1];
      }

      ${t.vvInstancingEnabled?i.a`
      vec4 vvColor() {
        return vvGetColor(instanceFeatureAttribute, vvColorValues, vvColorColors);
      }`:""}
    `)):e.vertex.code.add(i.a`
      vec4 vvColor() { return vec4(1.0); }
    `)}!function(e){function t(e,t){t.vvSizeEnabled&&(e.setUniform3fv("vvSizeMinSize",t.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",t.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",t.vvSizeOffset),e.setUniform3fv("vvSizeFactor",t.vvSizeFactor)),t.vvColorEnabled&&(e.setUniform1fv("vvColorValues",t.vvColorValues),e.setUniform4fv("vvColorColors",t.vvColorColors))}e.bindUniforms=t,e.bindUniformsWithOpacity=function(e,r){t(e,r),r.vvOpacityEnabled&&(e.setUniform1fv("vvOpacityValues",r.vvOpacityValues),e.setUniform1fv("vvOpacityOpacities",r.vvOpacityOpacities))},e.bindUniformsForSymbols=function(e,r){t(e,r),r.vvSizeEnabled&&(e.setUniform3fv("vvSymbolAnchor",r.vvSymbolAnchor),e.setUniformMatrix3fv("vvSymbolRotationMatrix",r.vvSymbolRotationMatrix))}}(n||(n={}))},wzLF:function(e,t,r){"use strict";r.d(t,"a",function(){return o});var i=r("OIYib");function n(e){const t=i.a`
    vec3 decodeNormal(vec2 f) {
      float z = 1.0 - abs(f.x) - abs(f.y);
      return vec3(f + sign(f) * min(z, 0.0), z);
    }
  `;e.fragment.code.add(t),e.vertex.code.add(t)}function o(e,t){0===t.normalType&&(e.attributes.add("normal","vec3"),e.vertex.code.add(i.a`
      vec3 normalModel() {
        return normal;
      }
    `)),1===t.normalType&&(e.include(n),e.attributes.add("normalCompressed","vec2"),e.vertex.code.add(i.a`
      vec3 normalModel() {
        return decodeNormal(normalCompressed);
      }
    `)),3===t.normalType&&(e.extensions.add("GL_OES_standard_derivatives"),e.fragment.code.add(i.a`
      vec3 screenDerivativeNormal(vec3 positionView) {
        return normalize(cross(dFdx(positionView), dFdy(positionView)));
      }
    `))}},xRv2:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("OIYib");function n(e){e.vertex.code.add(i.a`
    const float PI = 3.141592653589793;
  `),e.fragment.code.add(i.a`
    const float PI = 3.141592653589793;
    const float LIGHT_NORMALIZATION = 1.0 / PI;
    const float INV_PI = 0.3183098861837907;
    const float HALF_PI = 1.570796326794897;
    `)}}}]);