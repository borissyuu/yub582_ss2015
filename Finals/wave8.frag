#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define MAX_ITER 2

float shape(vec2 st, float N) {
	float a = atan(st.x,st.y)+PI;
    float r = TWO_PI/N;
    return abs(cos(floor(.5+a/r)*r-a)*length(st));
}

float circle(vec2 st, float radius) {
//     st -= .5;
    return 1.0-step(radius*.5,dot(st,st)*2.);
}

float box(vec2 st, vec2 size){
    return shape(st*size,4.);
}

mat2 rotationMatrix(float a) {
    return mat2(vec2(cos(a),-sin(a)),
                vec2(sin(a),cos(a)));
}


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
	vec3 color = vec3(st.x, st.y, 1.0);

	//vec2 grid = vec2(10., .5);

	float d = distance(st, vec2(0.5));
	d *= sin(d * u_time / PI) * 2.;

    st *= 5.;

    st = st *2.-2.;

    vec2 offset = vec2(0.);
    float time = u_time *.5 + 23.;
    vec2 p = 1.0-mod(st*TWO_PI*2.0, TWO_PI*u_time/2.) - 250.0;

    vec2 i = vec2(p);
    float c = .5;
    float inten = .005;

  for (int n = 0; n < MAX_ITER; n++) 
    {
        float t = time * (1.0 - (3.5 / float(n+1)));
        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
        c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
    }
    c /= float(MAX_ITER);
    //c = 1.17-exp(pow(c, 1.4));
    c = 1.17-exp(pow(c, 1.4));

    vec2 st_i = floor(st);

       if (mod(st_i.y,2.) == 1.) {
        st.x += .5;
    }

	vec2 st_f = fract(st);

	st_f -= .5;
    st_f = rotationMatrix(d*3.14)*st_f;
    st_f += .5;

    float pct = circle(st_f, .5);
    vec2 line = vec2(pow(abs(c), 8.0));

    float a = atan(st.x, st.y);
    float f = cos(u_time * d) - smoothstep(a, a, d);
    st_f *= st_f + f;
    color += pct;

	color.r = texture2D(u_tex0,st_f + line).r;
    color.g = texture2D(u_tex0,st_f + line).g;
    color.b = texture2D(u_tex0,st_f + line).b;

    gl_FragColor = vec4(color, 1.0);


}