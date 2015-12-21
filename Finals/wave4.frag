// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define TWO_PIE 6.28318530718
#define MAX_ITER 5


float random (in float x) {
    return fract(sin(x)*1e4);
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(st.x,st.y,1.0);
    // vec2 grid = vec2 (10.0, 2.0);
    // st *= vec2(10.,2.);

    vec2 offset = vec2(0.);
    float time = u_time *.5 + 23.;
    vec2 p = mod(st*TWO_PIE*2.0, TWO_PIE) - 250.0;

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
    c = 1.17-pow(c, 1.4);

    vec2 st_f = fract(st);
    vec2 st_i = floor(st*10.);

    vec2 line = vec2(pow(abs(c), 8.0));
    
    //offset.x = u_time*random(st_i.y);
    color.r = texture2D(u_tex0,st + line).r;
    //offset.x = u_time*0.999*random(st_i.y);
    color.g = texture2D(u_tex0,st + line).g;
    //offset.x = u_time*0.99*random(st_i.y);
    color.b = texture2D(u_tex0,st + line).b;

    gl_FragColor = vec4(color, 1.0);
}