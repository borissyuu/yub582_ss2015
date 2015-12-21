#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.0);

	vec2 pos = vec2(0.5) - st;

	float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float f = cos(a*3.);

    vec2 offset;
    offset.x = sqrt(dot(pos.x + r * f, pos.x + r * f));
    offset.y = sqrt(dot(pos.y + r * f, pos.y + r * f));

    offset *= cos(u_time + a) + (1.0 - sin(u_time + a));

    color = texture2D(u_tex0, offset).rbg;

    gl_FragColor = vec4(color,1.0);
}