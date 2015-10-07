#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float rect(vec2 st, float pct, float w, float h) {

	float sideOne = (1. - w) * .5;
	float sideTwo = (1. - h) * .5;
	// float pct = (step(sideOne, st.x) - step(sideTwo, st.x)) * (step(sideTwo, st.y) - step(sideTwo, st.y));

	// return vec3(pct);

	// return pct = (mod(.2, st.x) - mod(.9, st.x)) * (mod(.2, st.y) - mod(.8, st.y));
	return pct = (step(sideOne, st.x) - step(sideOne, st.x)) * (step(sideTwo, st.y) - step(sideTwo, st.y));
}

void main() {
	// vec2 st = gl_FragCoord.xy/u_resolution;
	// vec3 color = vec3(0.0);

	// float pct = 0.0;
	// pct = rect(st, pct);


	// //float pct = step(.2, st.x) - step(.8, st.x);

	// //we need to multiple so the corners are 1
	// //float pct = (step(.2, st.x) - step(.8, st.x)) * (step(.2, st.y) - step(.8, st.y));
	// // float pct = step(.8, st.x);
	// // float pct = step(.2, st.x);

	// color = vec3(pct);
	// gl_FragColor = vec4(vec3(pct),1.);

	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);
    
    float pct = 0.0;
    pct = rect(st, pct);
    
    color = vec3(pct);

    gl_FragColor = vec4(color, 1.0);

}