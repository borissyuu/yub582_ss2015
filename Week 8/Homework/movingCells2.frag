
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (float x) {
    return fract(sin(x)*10e5);
}

float random (in vec2 st) { 
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    st *= vec2(20.,2);
    
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    
    float time = floor(u_time*8.);
    float pct = random(i_st.x-time);
    float r = 60. + u_time *(1.0 - time);

    // if (i_st.y == 1.){ 
    //     f_st.y = 1.-f_st.y;
    // }

    if (i_st.y == 1.) {
    	pct = random(-i_st.x-time);
    }

    r *= -1.0;
    float offset = 0.025;
    vec3 color = 1. - vec3(step(pct * (r+offset) ,f_st.y),step(0.7 * (r-offset),f_st.x), step(pct * r, f_st.x));
   
    gl_FragColor = vec4(1.0-color,1.0); 
}