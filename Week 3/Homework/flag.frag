#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.14159265359

vec3 colorA = vec3(0.0);
vec3 colorB = vec3(0.0);


vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.);
    vec3 flagColor = vec3(0.);
	vec3 yellowGreen = vec3(0.);
	vec3 pct = vec3(st.y);

	colorA = rgbNormalizer(vec3(0.0, 0.0, 0.0));
	colorB = rgbNormalizer(vec3(0.0, 60.0, 120.0));

    // pct.r = sin(st.x * PI * 2.0);
    // pct.g = smoothstep(.5, 1.0, sin(st.x * PI + .5));
    // pct.b = cos(st.x * PI * 2.0) + PI;

    color = mix(colorA, colorB, pct);
    flagColor = color;

    float one = smoothstep(0.0, 0.5, sin(st.y*PI)*2.);
    flagColor = mix(flagColor, rgbNormalizer(vec3(250.0, 50.0, 50.0)), one);
    float two = smoothstep(0.0, 0.5, sin(st.y*PI)+1.5);
    flagColor = mix(flagColor, rgbNormalizer(vec3(200.0, 85.0, 70.0)), two);

    color = step(0.3,mix(color, flagColor, pct));
    gl_FragColor = vec4(color, 1.0);

}