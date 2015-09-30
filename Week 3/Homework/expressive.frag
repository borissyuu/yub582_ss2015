#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

  vec3 A = vec3(0.565, 0.119, 0.131);
  vec3 B = vec3(0.289, 0.310, 0.505);

//double Ellipctic Seat 
float F (float x, float a, float b){
  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a = max(min_param_a, min(max_param_a, a)); 
  b = max(min_param_b, min(max_param_b, b)); 

  float y = 0.;
  if (x<=a){
    y = (b/a) * sqrt(sin(a) - sin(x-a));
  } else {
    y = 1.- ((1.-b)/(1.-a))*sqrt(sin(1.-a) - sin(x-a));
  }
  return y;
}

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution;
  float movement = abs(sin(u_time) + cos(u_time) * 0.3);

  float pct = F(st.x, 1., 0.5) * movement;
  pct += F(st.y, 1., 0.5) * movement;

  vec3 color = vec3(1.);

  color = mix(A, B, pct);

  gl_FragColor = vec4(color,1.0);


}