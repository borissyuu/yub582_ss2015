#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    //step() takes two parameters --> limit/threshold & value we want to check/pass. Any number under limit will return 0.0. any higher will return 1.0
    // Step will return 0.0 unless the value is over 0.5,
    // in that case it will return 1.0
    float y = 1.0 - pow(max(0.0, abs(st.x)*2.0 - 1.0), 2.5);
    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,5.0,0.0);
    
    gl_FragColor = vec4(color,1.0);
}