#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat3 matrix = mat3(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0));

mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0), vec3(sin(a),cos(a),0.0), vec3(0.0,0.0,1.0));
}

void rotate(float a) {
    matrix = rotationMatrix(a) * matrix;
}

mat3 translationMatrix(vec2 f) {
    return mat3(vec3(1.0,0.0,0.0), vec3(0.0,1.0,0.0), vec3(f.x,f.y,1.0));
}

void translate(vec2 f) {
    matrix = translationMatrix(f) * matrix;
}

float random(in float x) {
	return fract(sin(x)*10e5);
}

float noise(in float st) {
	float i = floor(st);
	float f = fract(st);
	return mix(random(i), random(i+1.0), smoothstep(0.0, 1.0, f));
}

float circle(vec2 st, float pct) {
	pct = distance(st,vec2(0.5)) / max(0.1, pct/1.5);  
    return pct = smoothstep(0.0, 1.0, pct);
    // pct = step(step(0.2,pct), pct);  
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.0);
	// vec2 grid = vec2(20.0, 2.0);
	// st *= grid;

	vec3 pos = vec3(st, -1.0);
	translate(vec2(.6));
	rotate(u_time);
	pos = matrix * pos; 

	color += vec3(circle(pos.xy, noise(st.x)*3.), .5, 1.);
	gl_FragColor = vec4(color, 1.0);


}