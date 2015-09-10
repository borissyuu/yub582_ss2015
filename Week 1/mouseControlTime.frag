#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; //holds screen coordinates of the pixel
uniform vec2 u_mouse; // mouse position are in pixels
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution; //coordinate of fragment is normalized by total resolution of billboard
	vec2 mt = gl_FragCoord.xy/u_mouse; //coord of fragment is normalized by mouse position

	//float k = pow(mt.y, 5.);
	gl_FragColor = vec4(st.x,1.0, mt.y,1.0);
}