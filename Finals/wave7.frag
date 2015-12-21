#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI = 3.141592658;
const float TWO_PIE = 6.28318530718;
const float sections = 5.0;

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.0);
    vec2 offset;

    //st *= 10.;
    st = st *2.-.5;

    //st = tile(st,4.); 

	vec2 pos = vec2(0.5) - st;

	float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    //float f = cos(a*3.);

    float ma = mod(r, TWO_PIE/sections);
    ma = abs(ma-PI/sections);

    float x = sqrt(cos(ma) * r) + u_time;
    float y = sqrt(sin(ma) * r) + u_time;

    offset.x = -sqrt(dot(ma * a, ma * a));
    offset.y = sqrt(dot(ma * a, ma * a));

    offset -= abs(cos(u_time + a) + r);

    color = texture2D(u_tex0, offset).rbg;
    
    gl_FragColor = vec4(color,1.0);
}