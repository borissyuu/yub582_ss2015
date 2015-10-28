// Based on Code by Vinicius Graciano Santos 
// https://www.shadertoy.com/view/lsBSDz


#ifdef GL_ES
precision mediump float;
#endif

#define NUM 9.0
uniform vec2 u_resolution;
uniform float u_time;
#define M_PI 3.1415926535897932384626433832795
#define TAU 6.28318530718
#define SMOOTH(r,R) (1.0-smoothstep(R-1.0,R+1.0, r))

float F( float n, float k ){
    return 1.0 - mod(sin(M_PI * u_time * n), k);
}

float segment(vec2 p, vec2 a, vec2 b) {
    vec2 ab = b - a;
    vec2 ap = p - a;
    float k = clamp(dot(ap, ab)/dot(ab, ab), 0.0, 1.0);
    return smoothstep(0.0, 5.0/u_resolution.y, length(ap - k*ab) - 0.001);
}

float shape(vec2 p, float angle) {
	float f = F(.05, .9);
    float theta0 = clamp(f, .01, 150.) - 1. ;

    // float theta0 = 90. * u_time;
    // vec2 t = uv - cente
    // float r = sqrt(dot(t, t));
    // if (t< angle) {
    // 	vec2 p = angle*vec2(cos(theta0*M_PI/180.0), -sin(theta0*M_PI/180.0));
    //     float l = length( t - p*clamp( dot(t,p)/dot(p,p), 0.0, 1.0) );
    // 	t = normalize(t);
    //     //compute gradient based on angle difference to theta0
   	//  	float theta = mod(180.0*atan(t.y,t.x)/M_PI+theta0,360.0);
    //     float gradient = clamp(1.0-theta/90.0,0.0,1.0);
    //     return SMOOTH(l,1.0)+0.5*gradient;
    // }

    float d = 100.0;
    vec2 a = vec2(1.0, 0.0), b;
    vec2 rot = vec2(cos(angle)*theta0, sin(angle)*theta0);
    
    for (int i = 0; i < 6; ++i) {
        b = a;
        for (int j = 0; j < 18; ++j) {
        	b = vec2(b.x*rot.x - b.y*rot.y, b.x*rot.y + b.y*rot.x);
        	d = min(d, segment(p,  a, b));
        }
        a = vec2(a.x*rot.x - a.y*rot.y, a.x*rot.y + a.y*rot.x);
    }
    return d;
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 cc = (-u_resolution.xy + 2.0*gl_FragCoord.xy) / u_resolution.y;

    //st = st*3.-1.;
        
    float col = shape(abs(cc), cos(0.01*(u_time+22.0))+sin(u_time)*.5);
    //float col = shape(cc, cos(u_time)+sin(u_time));
    col *= 0.5 + 1.5*pow(st.x*st.y*(1.0-st.x)*(1.0-st.y), 0.3);
    
    
	gl_FragColor = vec4(vec3(pow(col, 0.45)),1.0);
}