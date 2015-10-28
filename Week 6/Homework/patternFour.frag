//code based from https://www.shadertoy.com/view/XlS3Ww

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define M_PI 3.1415926535897932384626433832795

float f(vec2 p, vec2 centre, float mult)
{
    float radius = 0.09;
    
    float power = 0.5 + 3.5 * mult;
    power = clamp(power, 0.0, 4.0);
    vec3 a = vec3(p, radius);
    vec3 b = vec3(centre, 0.0);
    return dot(pow(abs(a-b) * sin(M_PI*u_time), vec3(power)), vec3(1.0, 1.0, -1.0));
    //return mod(sin(M_PI*u_time), centre);
}

vec2 grad(vec2 x, vec2 centre, float mult)
{
    vec2 h = vec2( 0.01, 0.0 );
    return vec2(f(x+h.xy, centre-h.y, mult) - f(x+h.xy, centre, mult), f(x+h.yx, centre, mult) + f(x-h.yx, centre, mult) ) / (2.0*h.x);
}

float stripes(vec2 st) {
    return step(st.y,st.x);
}

mat2 rotationMatrix(float a) {
    return mat2(vec2(cos(a),-sin(a)),
               	vec2(sin(a),cos(a)));
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main()
{
	vec2 uv = gl_FragCoord.xy/u_resolution;
    uv *= -1.0+(5.0*uv);
    // uv *= 30.0;
	// uv.x *= u_resolution.x/u_resolution.y;

    vec2 translate = vec2(0.0,0.0); //to move the space

	float d = distance(uv,vec2(.5));
    d = sin(d*3.14*5.-u_time*3.);

    translate = vec2(0.3*cos(u_time*2.*M_PI/40.),.3*sin(u_time*2.*M_PI/40.)); //speed
    
    uv += translate*.8; 

    uv -= .5;
    uv = rotationMatrix(d*M_PI)*uv;   
    uv = scale(vec2(sin(u_time/1.)+1.))*uv; 
    uv += .5;

	vec2 uv_f = fract(uv);

	// uv_f = rotate2d(sin(u_time/40.)*2.* M_PI) * uv_f;

    const float gridSize = 5.0;
   
    vec2 grid = vec2(gridSize);
    vec2 coord = floor(uv * grid) / grid;
    
    vec2 c = vec2(1.0/gridSize);
    vec2 p = mod(uv, c) - c*0.5;
    
    vec2 centre = vec2(0,0);
    
    float t = sin(abs(coord.x * coord.y) + u_time*2.0) * 0.5 + 0.5; //multi
    t *= t;
    
    float v = f(p, centre, t);
    vec2  g = grad(p, centre, t);
    float de = v / length(g);
    
    vec2 mixVal = coord;
    mixVal*= mixVal;
    vec3 sCol = vec3(0.2 + mixVal * 0.8, 0.0) + vec3(0,0,1) * (1.0 - dot(coord, vec2(1.0)));
    
    float edge = 5.0 / u_resolution.x;
    float border = smoothstep(0.0, edge * 2.0, abs(de));
    sCol *= border;

    float pct = stripes(uv_f);
    vec3 col = vec3(0.0);
    //col += pct;
    col += mix( col, sCol, pct);
    
    gl_FragColor = vec4(col,  1.0); 
}