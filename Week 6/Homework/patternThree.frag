//code adapted from https://www.shadertoy.com/view/Md2Gzy

#ifdef GL_ES
precision mediump float;
#endif

#define NUM 9.0

uniform vec2 u_resolution;
uniform float u_time;

//////////////////////MATRIX///////////////////////////

mat3 matrix = mat3(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0));

mat3 scaleMatrix(vec2 f) {
    return mat3(vec3(f.x,0.0,0.0),
                vec3(0.0,f.y,0.0),
                vec3(0.0,0.0,1.0));
}

void scale(in vec2 f) {
    matrix = scaleMatrix(f) * matrix;
}

mat3 translationMatrix(vec2 f) {
    return mat3(vec3(1.0,0.0,0.0),
                vec3(0.0,1.0,0.0),
                vec3(f.x,f.y,1.0));
}

void translate(vec2 f) {
    matrix = translationMatrix(f) * matrix;
}

mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0),
                vec3(sin(a),cos(a),0.0),
                vec3(0.0,0.0,1.0));
}

void rotate(float a) {
    matrix = rotationMatrix(a) * matrix;
}

////////////////////SHAPE///////////////////////

vec3 hsv(float h, float s, float v){
  return mix(vec3(1.0),clamp((abs(fract(h+vec3(3.0, 2.0, 1.0)/3.0)*6.0-3.0)-1.0), 0.0, 1.0),s)*v;
}

float shape(vec2 st, float r, float e){
	float p = pow(32.0, r - 0.5);
	float l = pow( pow(abs(st.x),p) + pow(abs(st.y),p), 1.0/p );
	float d = l - pow(r,0.6) - e*0.2 + 0.05;
	float fw = fwidth( d )*0.5;
	fw *= 1.0 + 10.0*e;
    return (r)*smoothstep(fw, -fw, d) * (1.0 - .2 *e) *(0.4 + 0.6*smoothstep( -fw, fw, abs(l-r*0.8+0.05)-0.1 )) + abs(st.x)+abs(st.y)-10.;
}

float circle(vec2 st, float radius) {
    st -= .5;
    return 1.0-step(radius*.5,dot(st,st)*2.);
}

////////////////////MAIN CODE///////////////////////
void main()
{
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec2 pos = st*2.0-1.0;
	pos.x *= u_resolution.x/u_resolution.y;
	pos = pos*cos(0.00005)+vec2(pos.y,-pos.x)*sin(0.00005);
    pos = mod(pos*4.0, 2.0)-1.0;

    // vec3 pos = vec3(st, 1.0);
    // pos = pos * 5.0 - 2.25;
    // translate(vec2(.3));
    // scale(vec2(.5));
    // pos = mod(matrix * pos, 2.); //number of boxes 

    float c = 0.05/abs(sin(0.3*u_time*shape(3.0*pos.xy, 1.0, 0.0)));
    vec3 col = hsv(fract(0.1*u_time),1.0,1.0);
	gl_FragColor = vec4(col*c,1.0);
}