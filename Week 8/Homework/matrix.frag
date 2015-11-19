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

float pattern (vec2 st, vec2 v, float t) {
	vec2 p = floor(v-st);
	return smoothstep(t, random(100. + p * .0000001), random(p.y)*.5);
}


void main() {

	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	st.x *= u_resolution.x/u_resolution.y;

	vec2 grid = vec2(50.0, 20.0);
	st *= grid;

	vec2 i_st = floor(st); 
	vec2 f_st = fract(st);

	vec2 time = vec2(u_time * 2. * max(grid.x, grid.y));
	time *= vec2(1.0, 0.0) *random(i_st.x);

	//grid
	float totalCells = grid.x*grid.y ;
	float t = mod(u_time*max(grid.x,grid.y)+floor(1.0+u_time),totalCells);
    vec2 head = vec2(mod(t,grid.x), floor(t/grid.y));

	vec2 offset = vec2(0.1, 0.0);
	vec3 color = vec3(0.0);

	color *= step(grid.y-head.y,i_st.y);                                // Y
    color += (1.0-step(grid.x-head.x,i_st.x))*step(grid.y-head.y,i_st.y+1.);   // X
    color = clamp(color,vec3(0.),vec3(1.));

	color.r = random(pattern(st + offset,time, f_st.x));
	color.g = pattern(st, time, f_st.x);
	color.b = random(pattern(st - offset, time, f_st.x));

	color *= step(.1,fract(st.x+time.x))*step(.1,fract(st.y+time.y));
    //color *= step(0.2,f_st.y);

    gl_FragColor = vec4(color, 1.0); 


}