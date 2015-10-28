// Author @patriciogv - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define NUM 9.0

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius, in float a){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01+a),
                         _radius+(_radius*0.01+a),
                         dot(l,l)*4.0);
}

vec2 tile (vec2 _st) {
    return fract(_st);
}

float stripes(vec2 st) {
    return step(st.y,st.x);
}

vec2 even (vec2 st) {
    vec2 st_i = floor(st);
    if (mod(st_i.y, 2.) == 0.)  {
        st.x += .5; 
    }
    return st;
}

vec2 truchet(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x = 1.-st.x;
    }
    if (mod(st_i.x,2.) == 1.) {
        st.y = 1.-st.y;
    }
    return st;
}

void main() {
	vec2 qq = gl_FragCoord.xy/u_resolution.xy;
	vec2 uv = gl_FragCoord.xy/u_resolution.xx;
    vec3 color = vec3(0.0);
	float anima = 11.0 + (u_time + 0.8*sin(u_time)) / 1.8;
    
    vec2 pq = vec2(0.0);
	vec3 coo = vec3(0.0);
    vec2 st = vec2(0.0);


    st = even(st*3.);
    st = fract(st);
    
    pq = floor( uv*NUM ) / NUM;
	st = fract( uv*NUM )*2.0 - 1.0;

	coo = (vec3(0.5,0.7,0.7) + 0.3*sin(10.0*pq.y)*cos(13.0*pq.x))*0.6;
	color += 1.0*coo*circle( st, 1.0 - map(pq, anima), 0.0 );
	color += 0.6*coo*shapes(st,0.5,.5);

    //color = 1.0 - vec3(circle(st,0.5,.5));
    // color += vec3(stripes(st*5.));
    //col *= pow( 16.0*qq.x*qq.y*(1.0-qq.x)*(1.0-qq.y), 0.05 );
    
	gl_FragColor = vec4(color,1.0);
}