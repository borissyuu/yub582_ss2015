#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;

float F(float x, float p, float w) {
    return (smoothstep(p-w* .5,p,x) + smoothstep(p+w* .5, p, x))-1.0; //in order to get the light to bounce without fading, we need P to be half the width
}

void main(){

	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.);

	//float pct = F(st.x,abs(sin(u_time)),1.); (3)
    
    // float pct = F(st.x,abs(sin(u_time*.5)), .1); //(4), creates the x line
    // pct += F(st.y, abs(sin(u_time*.5)), .1); //(4), creates the y line  

    //pct *= F(st.y, abs(sin(u_time*.5)), .1); //(5), if we multiple instead of add, only 1 will show

    vec2 p = vec2(cos(u_time*0.5), sin(u_time*0.5))*.25 + .5; //(6)
    float pct = F(st.x, p.x, .1); //(6)
    pct *= F(st.y, p.y, .1); //(6)
    
    //color = vec3(pct); //(3, 4, 5)
    float x = pow(st.x, 10.);
    color = vec3(F(st.y, x, .03)); 
    gl_FragColor = vec4(color,1.0);
}