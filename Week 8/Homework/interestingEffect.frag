#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415

float random(in float x) {
	return fract(sin(x)*1e4);
}

float random (in vec2 st) {
	return fract(sin(dot(st.xy, vec2(12.87642, 52.9987))) * abs(sin(PI)));
}

vec2 truchetPattern(in vec2 st, in float index){
    index = fract((index-0.5)*2.0);
    if (index > 0.75) {
        st = vec2(1.0) - st;
    } else if (index > 0.5) {
        st = vec2(1.0-st.x,st.y);
    } else if (index > 0.25) {
        st = 1.0-vec2(1.0-st.x,st.y);
    }
    return st;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	st *= u_resolution.x/u_resolution.y;

	vec2 grid = vec2(50., 50.);
	st *= grid;

	vec2 i_st = floor(st);
	vec2 f_st = fract(st);

	vec2 time = floor(vec2(u_time*10.)*max(grid.x, grid.y)); //time
	time += vec2(-1., 0.0)-random(grid.y + i_st.y); //direction
	//time *= vec2(-1., 0.0) * random(i_st.y);

	vec2 offset = vec2(0.1, 0.);
	vec2 tile = truchetPattern(i_st, f_st.x);
	vec3 color = vec3(1.0);
	//color = smoothstep(tile.x-.3, tile.x, tile.y) - smoothstep(tile.x, tile.x+.3, tile.y);
	color *= step(grid.y, i_st.y);
	color += mod(tile.x, i_st.y);

	color.r *= random(floor(st*time*20.+offset));
	color.g *= random(floor(st+time*20.));
	color.b *= random(floor(st+time*20.-offset));

	gl_FragColor = vec4(color, 1.0);
}