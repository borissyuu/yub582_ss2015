#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// float pent (vec2 d, float w, float a) {
// 	return 1.0 + smoothstep (d, w+a, w) - smoothstep (d, w, w-a);
// 	//return min((step(0.5-w/2.,st.x)-step(0.5+w/2.,st.x)),(step(0.5-h/2., st.y)-step(0.5+h/2.,st.y)));
// }


float triangles (vec2 st) {
    return step(st.y, st.x) * step(st.x, st.y);
}

float F( float n, float k ){
    return 1.0 - pow(abs(sin(PI * u_time * n)), k);
}

void main() {

	//float fade_out = 1.-abs(sin(u_time)-cos(u_time));
	float fade_out = 1.-mod(u_time/2., 2.);

	float border = abs(sin(fade_out/10.)); // 0.01
	float pent_radius= 1.-(fade_out); // 0.5
	
	vec4 pent_color= vec4(1.0, 1.0, 1.0, fade_out);
	// //vec2 circle_center= vec2(0.5, 0.5);

	// vec4 bkg_color = vec4(0.);

	vec2 st = gl_FragCoord.xy/u_resolution.xy;	
	// st.x *= u_resolution.x/u_resolution.y;
	vec3 color = vec3(0.0);
	float d = 0.0; 

	//st = st - circle_centre;
	st = st * 10. - 5.; //remap the space from -1. to 1.
	//st *= 10.;
	vec2 st_f = fract(st);
	int N = 5; //number of sides

	//angle and radius from current pixel
	float a = atan(st_f.x, st_f.y)+PI;
	float r = TWO_PI/float(N);

	// Shaping function that modulate the distance
  	d = cos(floor(.9+a/r)*r-a)*length(st.xy);

  	//original code 
  	//float t = smoothstep(.4,.41,d) - smoothstep(.41, .4, d);
  	color += vec3(1.0 + smoothstep(d, pent_radius+border, pent_radius) - smoothstep(d, pent_radius, pent_radius-border));
  	color += vec3(1.0 + smoothstep(d, pent_radius+border, pent_radius) - smoothstep(d, pent_radius, pent_radius-border));
  	//color += 1.0 - triangles(st_f);

  	// float y = pent(d, circle_radius, border);
  	// vec3 color = vec3(y);

  	//color += (0.5 + 0.45*F(.2, 10.)) * pent 
  	//color += (0.5 + 0.45*F(0.2, 10.)) * circle(uv, c, 350.0, 3., -0.925) * green;

  	gl_FragColor =  vec4(color, 1.);
  	//gl_FragColor = mix(circle_color, bkg_color, color);


}