#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.0);

    //st *= 10.;
    st = st *2.-.5;

    st = tile(st,4.); 

	vec2 pos = vec2(0.5) - st;

	float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float f = cos(a*3.);

    vec2 offset;
    offset.x = sqrt(dot(pos.x + r * f, pos.x + r * f));
    offset.y = sqrt(dot(pos.y + r * f, pos.y + r * f));

    offset += abs(cos(u_time + a) + r) + abs((1.0 - sin(u_time + a)+ r)) + .5*cos(10.0*f+u_time);

    color = texture2D(u_tex0, offset).rbg;
    
    gl_FragColor = vec4(color,1.0);
}