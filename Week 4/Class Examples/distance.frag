#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);

	float pct = 0.0;

	st -= .5;
	float r = length(st)*2.;
	float a = atan(st.y, st.x);

	
	float z = abs(cos(a*5.))* .5 +2.;

	gl_FragColor = vec4(vec3(1.0-step(.5,r)), 1.0);

}