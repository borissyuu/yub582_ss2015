
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359;

vec3 colorA = vec3(0.214, 0.314, 0.413);
vec3 colorB = vec3(0.543, 0.660, 0.766);

mat3 matrix = mat3(vec3(1.,0.,0.), vec3(0.,1.,0.), vec3(0.,0.,1.));

mat3 scaleMatrix(vec2 f) {
    return mat3(vec3(f.x,0.0,0.0), vec3(0.0,f.y,0.0), vec3(0.0,0.0,1.0));
}

void scale(in vec2 f) {
    matrix = scaleMatrix(f) * matrix;
}

mat3 translationMatrix(vec2 f) {
    return mat3(vec3(1.0,0.0,0.0), vec3(0.0,1.0,0.0), vec3(f.x,f.y,1.0));
}

void translate(vec2 f) {
    matrix = translationMatrix(f) * matrix;
}

mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0), vec3(sin(a),cos(a),0.0), vec3(0.0,0.0,1.0));
}

void rotate(float a) {
    matrix = rotationMatrix(a) * matrix;
}

float circleOne (vec2 st, float rad ){
  float dist = dot(st/.2+abs((sin(u_time)*.5)), st/.2)+abs(cos(u_time)+pow(fract(st.y), 2.));
  float border = 20.; //can affect whether circle is line or filled
  return smoothstep(rad, rad+border, dist) + smoothstep(rad-border, rad, dist);
}

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st, 1.0);
    float d = 0.0;

    vec3 pct = vec3(st.x+st.y/5.);

    //d = length(abs(st)-.1);

    //translate(vec2(-.5));
    rotate(u_time);
    pos = matrix * pos;

    //float f = pow(cos(u_time)*sin(u_time), 2.); to make the circle float around

	// color = circleOne(pos.xy, .1) * mix(colorA, colorB, pct);
	color += vec3(0.3, circleOne(pos.xy, .1), 1.);
	gl_FragColor = vec4(fract(color*1000.), 1.0);
}

// float circle(in vec2 _st, in float _radius){
//     vec2 l = _st-vec2(0.5);
// 	return 1.-smoothstep(_radius-(_radius*0.01), _radius+(_radius*0.01), dot(l,l)*4.0);
// }