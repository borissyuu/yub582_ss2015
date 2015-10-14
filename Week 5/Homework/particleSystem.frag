
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359;

const int n = 10;

vec3 colorA = vec3(0.214, 0.314, 0.413);
vec3 colorB = vec3(0.543, 0.660, 0.766);


//mat3 matrix = mat3(vec3(1.,0.,0.), vec3(0.,1.,0.), vec3(0.,0.,1.));

mat3 scaleMatrix(vec2 f) {
    return mat3(vec3(f.x,0.0,0.0),
                vec3(0.0,f.y,0.0),
                vec3(0.0,0.0,1.0));
}

void scale(in vec2 f, inout vec3 pos) {
    pos = scaleMatrix(f) * pos;
}

mat3 translationMatrix(vec2 f) {
    return mat3(vec3(1.0,0.0,0.0),
                vec3(0.0,1.0,0.0),
                vec3(f.x,f.y,1.0));
}

void translate(vec2 f, inout vec3 pos) {
    pos = translationMatrix(f) * pos;
}

mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0),
                vec3(sin(a),cos(a),0.0),
                vec3(0.0,0.0,1.0));
}

void rotate(float a, inout vec3 pos) {
    pos = rotationMatrix(a) * pos;
}

float circleOne (vec2 st, float rad ){
  float dist = dot(st/.2+abs((sin(u_time)*.5)), st/.2)+abs(cos(u_time)+mod(st.y, 2.));
  float border = .9; //can affect whether circle is line or filled
  return smoothstep(rad, rad+border, dist) + smoothstep(rad-border, rad, dist);
}

void main() {

 	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st, 1.0);
    st = (st*0.5) * 2.0 - .5;

    float r = length(abs(st))*2.0;
    float a = atan(st.x,st.y)*2.0;

    float f = dot(cos(a*12.)*sin(a*5.0)+0.1, r-5.);

    // translate(vec2(-.5));
    // rotate(u_time);

     mat3 universe = rotationMatrix(u_time) * 
        			scaleMatrix(vec2(sin(u_time))) *
        			translationMatrix(vec2(-.5));

    pos = universe * pos;

for (int i = 0; i < n; i++) {

  		f = circleOne(pos.xy, f);
    // 	color = vec3(dot(f,r));

    	color = vec3(0.3, f, .9);

    	gl_FragColor = vec4(color, 1.0);
	}

}