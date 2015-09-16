#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float expUp( float x, float r, float q )
{

	if( x>r ) return x;

     float a = 2.0*q - r;
     float b = 2.0*r - 3.0 *q;
     float t = x/r;

    //return (a*t + b)*t*t + q;

    float k = pow(r+q,r-q) / (pow(r,r)*pow(r,q));
    //(a*t + b)*t*t + n;
    return k * pow( x, r*t +q) * (x*x) + q;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mt = gl_FragCoord.xy/u_mouse;

    //raise x to power of 5 to make a curved line 
 	//bigger the number, darker the background, smaller the number, brigther the background
    float y = expUp(st.x, 1., .06);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(1.0,mt.y,mt.x);
    
    gl_FragColor = vec4(color,1.0);
}