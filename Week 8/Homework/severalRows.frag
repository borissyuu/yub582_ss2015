#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in float x) {
	return fract(sin(x)*1e4);
}

float random (in vec2 st) {
	return fract(sin(dot(st.xy, vec2(12.9898, 78.233)))*43778.1);
}

float pattern(vec2 st, vec2 v, float t) {
	vec2 p = floor(st+v);
	return step(t, random(100. + p * .000001)+random(p.x)*.5);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	st.x *= u_resolution.x/u_resolution.y;

	vec2 grid = vec2(100.0, 50.0);
	st *= grid;

	vec2 i_st = floor(st);
	vec2 f_st = fract(st);

	vec2 time = vec2(u_time*2.*max(grid.x, grid.y));
	time *= vec2(-1.,0.0) * random(i_st.y);
	vec2 r = 60. + u_time *(1.0 - time);

	vec2 offset = vec2(0.1, 0.);

	r *= -1.;

	vec3 color = vec3(0.0);
	color.r = pattern(st+offset, time-r, 0.5+u_mouse.x/u_resolution.x);
	color.g = pattern(st, time-r, 0.5+u_mouse.x/u_resolution.x);
	color.b = pattern(st-offset, time-r, 0.5+u_mouse.x/u_resolution.x);


	gl_FragColor = vec4(color, 1.0);

}