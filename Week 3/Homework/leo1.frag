#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.14159265359
        
vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    vec3 color = vec3(0.0);
    vec3 pct = vec3(st.y);

    float sinTime = abs(sin(u_time * .05));
    float cosTime = abs(cos(u_time * .05));

    vec3 colorWhite = rgbNormalizer(vec3(141.0, 122.0, 79.0));
    // vec3 colorBlue = rgbNormalizer(vec3(200.0, 100.0, 100.0));
    float purple =  sin(st.y*PI)* 0.05 + 0.95;
    color = mix(color,rgbNormalizer(vec3(80.0,61.0,176.0)), purple);

    float blue = smoothstep(0.0, 1.1, sin((st.y+cosTime)*PI*.5));
    color = mix(color, rgbNormalizer(vec3(60.0, 60.0, 200.0)), blue);

    float purple2 = smoothstep(0.7, 1.1, sin((st.y*PI+sinTime)*2.) + cosTime );
    color = mix(color, rgbNormalizer(vec3(150.0, 61.0, 176.0)), purple2);

    float blue2 = smoothstep(0.5*sinTime, 1.3, sin((st.y+cosTime)*PI*.5));
    color = mix(color, rgbNormalizer(vec3(60.0, 100.0, 200.0)), blue2);

    gl_FragColor = vec4(color, 1.0);

}