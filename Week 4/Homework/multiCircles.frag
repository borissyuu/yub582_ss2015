// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.134, 0.314, 0.413);
vec3 colorB = vec3(0.543, 0.333, 0.666);

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    vec3 color = vec3(0.);

    // a. above 0.5 to white
    // pct = distance(st,vec2(0.5));
    // pct = step(0.5, pct);
    // pct = 1. - step(0.5, pct);

    //b. use smoothstep
    // pct = distance(st,vec2(0.5));
    // pct = smoothstep(0.4, 0.5, pct);

    //d. add color
    pct = distance(st,vec2(0.5));
    pct = smoothstep(0.1, 0.2, pct);


    //e. heartbeat movement 
    float beat = (abs(sin(u_time*2.)) -1.1);
    float beat2 = (cos(u_time+2.));
    //pct.r = mod(st.x, beat);


    vec3 circleOne = vec3(pct); 
    color = mix(color, colorB, circleOne);

    vec3 circleTwo = vec3(pct, cos(u_time), 0.5);
    vec3 color2A = mix(color, vec3(0.0 , 1.0, 0.0), circleTwo);
    color += color2A;
    
    //vec3 color = vec3(pct);

	gl_FragColor = vec4(color,1.0);
}