#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    
    st -= 0.5;
    
    float r = length(st);
    float a = atan(st.y, st.x)/3.1415;
    
    a = a*.5 + .5;
    
    st = vec2(a, r);
    //float y = pow(st.x, 2.); 1
    
    vec3 pct = vec3(st.x); //2
    
    pct.r = pow(pct.r, 0.2);
    pct.g = sin(pct.g*3.1415);
    pct.b = pow(pct.b, 2.);
    
	vec3 A = vec3(0.765, 0.119, 0.231);
    vec3 B = vec3(0.089, 0.310, 0.905);
    
    //0.0 is bucket A, 1.0 is bucket B, 0.5 is a mix
    color = mix(A, B, pct);
    //color += plot(st,y); 1
    color.r += plot(st, pct.r);
    color.g += plot(st, pct.g);
    color.b += plot(st, pct.b);
        
	gl_FragColor = vec4(color,1.0);
}   