#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265
#define TWO_PI 6.28318531
#define sinT sin(u_time)
#define cosT cos(u_time)
#define RING_COUNT 50.0

//////////////////////EQUATIONS-SHADER TOY (https://www.shadertoy.com/view/XsfSz2)///////////////////////////
float sinRan(vec2 a) {
//     float frac = 1.0 / a;
//     float eT = mod(a, frac);
//     return a - eT * frac * (a*6.0-15.) * a * a;
    return fract(sin(dot(a,vec2(1233.224,1743.335))));
}

// vec2 csin( vec2 z) { 
//     float r = exp(z.y); 
//     return 0.5*vec2((r+1.0/r)*sin(z.x),(r-1.0/r)*cos(z.x));
// }


// float cosRan(vec2 b) {
//     return fract(cos(dot(b,vec2(1233.224,1743.335))));
// }

// float easeWithSteps(float t, float ease) {
//     float frac = 1.0 / steps;
//     float eT  = mod(t, frac);
//     float eX = eT / frac;
//     return t - eT frac * x*x*x*(x*(x*6.0 - 15.0) + 10.0);
// }

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

float circle(vec2 st, float size) {
  float pct = 1.0 - length(st/size)*.3;
  return smoothstep(0.1, 5., pct);
}

vec3 circleLine (vec2 st) {
    return vec3(circle(st.xy + .9, .1)*sinT) + vec3(circle(st.xy + .3, .1)) + vec3(circle(st.xy + .6, .9)*cosT);
}


////////////////////EQUATION///////////////////////

// float f(float x, float z0) {
//  float dist = sin(pow(x+z0, 2.)) - .9 * (1. + 2. * (sinN*.1)) * x + z0;
//  return smoothstep (.1, 1., dist);
// }


////////////////////MAIN CODE///////////////////////
void main(){


    // vec2 st = gl_FragCoord.xy/u_resolution;
 
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st, 1.0);
    vec3 circles = vec3(0.0);

    float scale = float(abs(mod(u_time*.25, 6.0))) * .25 +.25;
    scale += sin(u_time*0.0001);

    pos = pos * 2.0 - 1.25;
    translate(vec2(-.5));
    //rotate(u_time);
    pos = matrix * pos;
    
    circles = circleLine(pos.xy) * vec3(1.0);

    color = circles * vec3(.4, 1.0-sinT, 1.0-cosT);
    //color += sin((vec3(0.3, circle(pos.xy, .1)*scale, 1.)));
    gl_FragColor = vec4(fract(color*1000.), 1.0);

    }