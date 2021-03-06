#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float doubleOddPolynomialSeat (float x, float a, float b, float n){

 float epsilon = 0.00001;
  float q = 0.0 + epsilon;
  float w = 1.0 - epsilon;
  float e = 0.0;
  float r = 1.0;
  a = min(w, max(q, a));  
  b = min(r, max(e, b)); 
  
  float p = (2.0 * n) + 1.0;
  float y = 0.0;
  if (x <= a){
    y = b - b*pow(1.0-x/a, p);
  } else {
    y = b + (1.0-b)*pow((x-a)/(1.0-a), p);
  }
  return y;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    //values have to be between 0.0 and 1.0
    float y = doubleOddPolynomialSeat(st.x, 0.52, 0.613, 8.0);

    vec3 color = vec3(y);
    
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}   