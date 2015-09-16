#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float doublePolynomialSigmoid (float x, float a, float b, float n){
  
  float y = 0.0;

//exponents control steepness
  if (n%2.0 == 0.0){ 
    // even polynomial
    if (x<=0.5){
      y = pow(2.0*x, n)/2.0;
    } else {
      y = 1.0 - pow(2.0*(x-1.0), n)/2.0;
    }
  } 
  
  else { 
    // odd polynomial
    if (x<=0.5){
      y = pow(2.0*x, n)/2.0;
    } else {
      y = 1.0 + pow(2.0*(x-1), n)/2.0;
    }
  }

  return y;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

  
    float y = doublePolynomialSigmoid(st.x, 0.33, 0.789, 10.0);

    vec3 color = vec3(y);
    
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}   