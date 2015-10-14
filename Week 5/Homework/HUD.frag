
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
  float dist = sqrt(dot(st/.2, st/.2));
  float border = 0.02;
  return - smoothstep(rad, rad+border, dist) + smoothstep(rad-border, rad, dist);
}

float circleTwo (vec2 st, float rad ){
  float dist = dot(st/.2, st/.2);
  float border = 0.02;
  return - smoothstep(rad, rad+border, dist) + smoothstep(rad-border, rad, dist);
}

float circleThree (vec2 st, float rad ){
  float dist = sqrt(dot(st/.2, st/.2));
  float border = 0.01;
  return - smoothstep(rad, rad+border, dist) + smoothstep(rad-border, rad, dist);
}

float circleFour (vec2 st, float rad ){
  float dist = sqrt(dot(st/.2, st/.2));
  float border = 0.01;
  return - smoothstep(rad, rad+border, dist) + smoothstep(rad-border, rad, dist);
}

float semiOne (vec2 st, float rad ){
  float dist = sqrt(dot(st/.2, st/.2));
  float split = mod(cos(u_time+st.y), 1.);
  float splitTwo = mod(sin(u_time), 1.);
  float border = 0.01;
  return - abs(smoothstep(rad, (rad+border) - split, dist)) + abs(smoothstep((rad-border) + split, rad, dist));
}

float circleFive (vec2 st, float rad ){
  float dist = sqrt(dot(st/.2, st/.2));
  float border = 0.04;
  return - smoothstep(rad, rad+border, dist) + smoothstep(rad-border, rad, dist);
}


void main(){
	 vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st, 1.0);

    vec3 pct = vec3(st.x+st.y/2.);

    translate(vec2(-.5));
    rotate(u_time);
    pos = matrix * pos;

    // vec2 circleOne = vec2(pos.xy, .2);
    // color = mix()
    color += circleOne(pos.xy, .1) * mix(colorA, colorB, pct);
    color += circleTwo(pos.xy, .6) * mix(colorA, colorB, pct);
    color += circleThree(pos.xy, 1.3)* mix(colorA, colorB, pct);
    color += circleFour(pos.xy, 1.8);
    color += semiOne (pos.xy, 2.)* mix(colorA, colorB, pct);
    color += circleFive(pos.xy, 2.4)* mix(colorA, colorB, pct);

	gl_FragColor = vec4(color, 1.0);
}