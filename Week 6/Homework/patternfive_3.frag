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

float circles (vec2 st, float radius, float n) {
	float pct = 0.;
	float power = 0.5 + 3.5 * radius;
    power = clamp(power, 0.0, 4.0);

	st.x -= .5;
	for (float i = 0.; i < n; i++) {
		st.y -= .6 * i;
		pct +=smoothstep((radius * 1./i) + power/2., radius * 1./i - .1, length(st));
	}
	return pct;
}

// float f(vec2 p, vec2 centre, float mult)
// {
//     float radius = 0.09;
    
//     float power = 0.5 + 3.5 * mult;
//     power = clamp(power, 0.0, 4.0);
//     vec3 a = vec3(p, radius);
//     vec3 b = vec3(centre, 0.0);
//     return dot(pow(abs(a-b) * sin(M_PI*u_time), vec3(power)), vec3(1.0, 1.0, -1.0));


vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 st, float zoom){
    st *= zoom;
        if (mod(floor(st.x), 2.) == 0.){
        st = rotate2D(st, PI*.5);
    }
    return fract(st);
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
	//st = st * 10. - 5.; //remap the space from -1. to 1.
	st *= 35. ;

	vec2 st_i = floor(st);

    if (mod(st_i.y, 2.) == 1.) {
        st.x = 1.-st.x;
    }

    if (mod(st_i.x, 2.) == 1.) {
        st.y = 1.-st.y;
    }

    if (st_i.y == 1.) {
        st.x -= .5;
    }

	vec2 st_f = fract(st);
	int N = 5; //number of sides

	//angle and radius from current pixel
	float a = atan(st_f.x, st_f.y)+PI;
	float r = TWO_PI/float(N);

	// Shaping function that modulate the distance
  	d = cos(floor(.9+a/r)*r-a)*length(st.xy);

  	//original code 
  	//float t = smoothstep(.4,.41,d) - smoothstep(.41, .4, d);
  	//color += vec3(1.0 + smoothstep(d, pent_radius+border, pent_radius) - smoothstep(d, pent_radius, pent_radius-border));
  	//color += vec3(1.0 + smoothstep(d, pent_radius+border, pent_radius) - smoothstep(d, pent_radius, pent_radius-border));

  	float bkg_color = triangles(st_f);

  	//float pct = circles(st, pent_radius, 100.);
  	//vec2 loops = tile(pct*st, 2.);
  	//color += triangles(st_f);

  	// float y = pent(d, circle_radius, border);
  	// vec3 color = vec3(y);
  	vec2 piece = tile(st-u_time, 2.);
  	//color += (0.5 + 0.45*F(.2, 10.)) * pent 
  	color = mix(color, bkg_color*vec3(0.1,0.52,0.402), 1.);
  	color += mix(color, vec3(0.5,0.2,0.302), circles(piece, .2, 2.) );

  	gl_FragColor =  vec4(color, 1.);
  	//gl_FragColor = mix(circle_color, bkg_color, color);


}