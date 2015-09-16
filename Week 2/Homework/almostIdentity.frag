#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float almostIdentity( float x, float m, float n ) {
    if( x>m ) return x;

     float a = 2.0*n - m;
     float b = 2.0*m - 3.0 *n;
     float t = x/m;

    return (a*t + b)*t*t + n;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    //raise x to power of 5 to make a curved line 
 	//bigger the number, darker the background, smaller the number, brigther the background
    float y = almostIdentity(st.x, 1.0, .01);

    vec3 color = vec3(0.);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
    
    gl_FragColor = vec4(color,1.0);
}