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
	//st -= 0.5;

	//pct = sqrt(st.x*st.x+st.y*st.y); 

	//length does the same as sqrt
	//multiple condenses the space, divide expands
	//pct = step(0.5,1. - length(st)*2.); //example of step, hard outline

	//calculates distance betwwen two points
	// pct = distance(vec2(0.5), st);

	//dot creates more of a sphere
	//pct = dot(st, st);


	//pct = 1.-length(st)*5. + u_time; //mountain + u_time
	// pct = 1.-length(abs(st)*5.);
	// pct = fract(pct*2.); //fract
	// pct = step(.5, pct); // 

	//corners
	// st = st *2. - 1.;
	// pct = 1.-length(abs(st)-.2);
	// pct = fract(pct*5.); //fract
	// pct = step(.5, pct); // 

	//corners cut to top
	st = st *2. - 1.;
	pct = 1.-length(abs(st)-.2);
	pct = 1. - length(max(abs(st)-0.3, 0.0));
	//pct = fract(pct*5.); //fract
	//pct = step(.5, pct); // 


	

	//color = vec3(final);
	//gl_FragColor = vec4(vec3(pct),1.);

	float final = 1. - (step(0.9, pct) - step(.92, pct));
	float shadow = smoothstep(0.9, 0.4, pct) + step(0.92, pct);
	final += (1.0 - shadow) * .4;

	color = vec3(1.0 - final);
	gl_FragColor = vec4(color,1.0);

}