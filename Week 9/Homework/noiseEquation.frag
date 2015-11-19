#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in float x) {
	return fract(sin(x)*10e5);
}

float noise(in float st) {
	float i = floor(st);
	float f = fract(st);
	return mix(random(i), random(i+1.0), smoothstep(0.0, 1.0, f));
}


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;

	vec2 grid = vec2(10.0, 2.0);
	st *= grid;

	vec3 color = vec3(noise(st.x));
	gl_FragColor = vec4(color, 1.0);


}