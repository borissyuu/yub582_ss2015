#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float percentage){
    return smoothstep(percentage -0.02, percentage, st.y) - smoothstep(percentage, percentage + 0.02, st.y);
}

float random (in float x) {
	return fract(sin(x)*1e10);
}

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(st.x, st.y, 1.0);
	vec2 grid = vec2(10., 5.);

	st *= grid;

	vec2 st_i = floor(st);
	vec2 st_f = fract(st);

	if (mod(st_i.y,2.) == 1.) {
        st.x -= .5*sin(u_time);
    } 

    float a = pow(abs(grid.x), 1.5);

    float percentage = plot(grid,a);
    vec3 color1 = vec3(0.0);
    color1 = (1.0 - percentage) * color + percentage * vec3(.678, .189, .956);

    color.r = texture2D(u_tex0,st).r;
    color.g = texture2D(u_tex0,st).g;
    color.b = texture2D(u_tex0,st).b;

    gl_FragColor = vec4(color * color1, 1.0);



}