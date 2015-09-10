#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float u_resolution;

void main() {

	float g = cos(u_time * 5.);
	float h = exp(u_time * .8);

	gl_FragColor = vec4(exp(sin(pow(u_time, 20.))), g, abs(sin(h)), 1.);
}