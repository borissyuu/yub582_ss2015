#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265
vec3 colorA = vec3(.538, .111, .378); 

float random(in float x) {
	return fract(sin(x)*10e5);
}

float noise(in float st) {
	float i = floor(st);
	float f = fract(st);
	return mix(random(i), random(i+1.0), smoothstep(0.0, 1.0, f));
}

vec3 rect(float x, float y, float w, float h, float a){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float horizonal = step(x ,st.x) - step(x + w, st.x); 
    float vertical = step( y ,st.y) - step(y + h , st.y);
    vec3 color = vec3(a) * horizonal * vertical;

    return color; 
}

float F( float n, float k ){
    return 1.0 - pow(abs(sin(PI * u_time * n)), k);
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
	vec3 color = vec3(0.0);

	vec2 grid = vec2(st*10.);

	float n = noise(smoothstep(u_time*6.28318531, u_time, st.x));

	float f = F(0.2, 10.);
    float theta0 = 150.0 * f - 180.;

	color = mix(color, vec3(1.0), rect(0.0, 0.0, 1.0, 1.0, 0.0));
	color = mix(color, vec3(0.8 , 10.0*sin(theta0*PI/150.)-cos(theta0*PI/150.), 10.0), rect(0.2 *n, 0.2 *n, 0.8*n , 0.8 , 1.0));
	color = mix(colorA, vec3(0.8 , 3.0*sin(theta0*PI/150.)-cos(theta0*PI/150.), 7.0), rect(0.7 *n, 0.3 *n, 0.1*n , 0.1 , 1.0));
	color += mix(vec3(0.3 , .2*sin(theta0*PI/150.)-cos(theta0*PI/150.), .5),colorA, rect(0.05 *n, 0.2 *n, 0.9*n , 0.4 , 1.0));
	color += rect(.538, .111, .378, .429, 1.0);


	// color += mix(color, vec3(0.0), rect(0.0, 0.2, 1.0, 0.02, 1.0)); // x structure
 //    color += mix(color, vec3(0.0), rect(.7, 0.0, 0.02, 1.0, 1.0));// y structure

    // color = mix(color, vec3(0.0), rect(0.9, 0.0, 0.02, 0.2 , 1.0));
    // color = mix(color, vec3(0.0), rect(0.9, 0.1  * 0.5, 0.1, 0.02, 1.0));
    // color = mix(color, vec3(0.0), rect(0.0, 0.7, 0.2 , 0.02, 1.0));

	gl_FragColor = vec4(color, 1.0);


}