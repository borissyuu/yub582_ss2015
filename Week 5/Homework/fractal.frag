
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359;
#define sinN sin(u_time); 
#define cosN cos(u_time);
#define sinAbs abs(sin(u_time));
#define cosAbs abs(cos(u_time));

// float f(float x, float z0) {
// 	return sin(pow(x+z0, 2.)) - .9 * (1. + 2. * sin(.1 * u_time)) * x + z0;
// }


////////////////////MATRIX///////////////////////

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

////////////////////EQUATION///////////////////////

// float f(float x, float z0) {
//  float dist = sin(pow(x+z0, 2.)) - .9 * (1. + 2. * (sinN*.1)) * x + z0;
//  return smoothstep (.1, 1., dist);
// }


////////////////////MAIN CODE///////////////////////
void main(){


	// vec2 st = gl_FragCoord.xy/u_resolution;
 //    vec3 color = vec3(0.0);
 //    vec3 pos = vec3(st, 1.0);
 //    vec2 z = vec2(0.0);
 //    vec2 z0 = vec2(0.0);

 //    translate(vec2(-.5));
 //    //rotate(u_time);
 //    pos = matrix * pos;

//Shader Toy
    // float range = 4.0;
    // vec2 p = -.5 * range + range * st;
    // float g = 0.0;
    // float k = 100.0;

    // z = p;
    // z0 = p;
    // float dz = 0.0;

    // //for (int i = 0; i < 100; i++) {

    // 	//vec2 prevz = z;
    // 	z = f(z, .3);

    // 	g = min(g, dot(z-1.0, z-1.0));
    	// dz = dot(z-prevz, z-prevz);
    	// if (dz < 0.00001) {
    	// 	k = dz/0.0001;
    	// 	z=k*z+(1.0-k)*prevz;
    	// 	k = k + float(i);
   //  	 	color += vec3(0.3, circle(pos.xy, .1), 1.);
			// gl_FragColor = vec4(fract(color*1000.), 1.0);
    	//}

    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st, 1.0);

    float scale = float(abs(mod(u_time*.25, 6.0))) * .25 +.25;
    scale += sin(u_time*0.0001);

    vec3 pct = vec3(st.x+st.y/5.);

    translate(vec2(-.5));
    rotate(u_time);
    pos = matrix * pos;

    color += sin((vec3(0.3, circle(pos.xy, .1)*scale, 1.)));
    gl_FragColor = vec4(fract(color*1000.), 1.0);

    }



