#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float u_resolution;

void main() {

	gl_FragColor = vec4(floor(sin(pow(u_time, 20.))), 0.0, 1.0, 1.);
}