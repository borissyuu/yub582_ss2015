#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random(float x) {
    return fract(sin(x)*10e5);
}

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    st *= vec2(10.,2.); //10 rows divided by 2
    
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    
    float time = floor(u_time*8.);
    float pct = random(time+i_st.x);
    
    if(i_st.y == 1.) {
        f_st.y = 1.- f_st.y; // flipping the top on, bottom is 0, top is 1
    }
    
    vec3 color = vec3(step(pct, f_st.y)-step(.7, f_st.x));
    
	gl_FragColor = vec4(color,1.0);
}

//dot product --> if we have a angle and a vector, dot product gives one value of where the product is looking. same direction = 0, different direction = 1 or -1




