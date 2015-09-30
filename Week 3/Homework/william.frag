#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.14159265359

vec3 colorA = vec3(0.0);
vec3 colorB = vec3(0.0);

// vec3 colorA = vec3(0.365, 0.119, 0.131);
// vec3 colorB = vec3(0.01,0.733,0.524);

// float easeInOutQuint(float t, float b, float c, float d) {
//     t /= d/2.0;
//     if (t < 1.0) return c/2.0*t*t*t*t*t + b;
//     t -= 2.0;
//     return c/2.0*(t*t*t*t*t + 2.0) + b;
// }

vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 pct = vec3(st.y);
    vec3 color = vec3(0.0);

    colorA = rgbNormalizer(vec3(200.0, 90.0, 100.0));
    colorB = rgbNormalizer(vec3(150.0, 90.0, 165.0));

    pct.r = sin(st.y * PI * 3.0);
    pct.g = smoothstep(2.0, 1.0, sin(st.y * PI));
    pct.b = cos(st.y * PI + 2.0) + PI;

    color = mix(colorB, colorA*0.5, pct/3.);

    gl_FragColor = vec4(color,0.9);

}