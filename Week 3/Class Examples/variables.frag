#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
	//for each position along x-axis, a bump is created at each particular value of y
  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main() {
	//normalize gradient
	vec2 st = gl_FragCoord.xy/u_resolution;

    vec4 color = vec(0.);

    color.x += 0.;
    color.y += 0.;
    color.z += 0.;
    color.w += 0.;

    color.r += -0.5;
    color.g += 0.;
    color.b += 0.;
    color.a += 0.;

    color.a += 0.;
    color.t += 0.;
    color.p += 0.;
    color.q += 0.;

    color.rg = vec2(1.);
    color.rg = color.bg;
    
    gl_FragColor = color;
    gl_FragColor.a = 1.0;

}