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
    float movement = abs(sin(u_time/2.) + sin(u_time) * 0.3);
    vec3 pct = vec3(st.y);
    vec3 color = vec3(0.0);
    vec3 sunrise = vec3(0.0);
    vec3 sunset = vec3(0.0);

    colorA = rgbNormalizer(vec3(200.0, 90.0, 100.0));
    colorB = rgbNormalizer(vec3(150.0, 90.0, 165.0));

    pct.r = sin(st.y * PI * 3.0);
    pct.g = smoothstep(2.0, 1.0, sin(st.y * PI));
    pct.b = cos(st.y * PI + 2.0) + PI;

    color = mix(colorB, colorA, pct/3.);
    sunrise = color; 

    float one = smoothstep(0.6, 1.0, sin(st.y*PI));
    sunrise = mix(sunrise, vec3(0.0), one); 
    float two = smoothstep(0.0, 1.0, sin(st.y*PI+2.0));
    sunrise = mix(sunrise, rgbNormalizer(vec3(160.0,25.0,193.0)), two);
    float three = smoothstep(0.0, 1.0, sin(st.y*PI)-2.0);
    sunrise = mix(sunrise, rgbNormalizer(vec3(135.0,102.0,200.0)), three);

    color = mix(color, sunrise, -movement);

    gl_FragColor = vec4(color,1.0);

}