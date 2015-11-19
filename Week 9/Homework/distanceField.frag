#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float circle(vec2 st, float pct) {
    pct = distance(st,vec2(0.5)) / max(0.1, pct/1.5);  
    return pct = smoothstep(0.0, 1.0, pct);
    // pct = step(step(0.2,pct), pct);  
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float d = 0.0;  
    vec3 color = vec3(0.0);
    // Scale the coordinate system to see
    // some noise in action
    vec2 pos = vec2(st*10.0);

    // Use the noise function
    float n = noise(pos*smoothstep(u_time*6.28318531, u_time, st.x));

    float circleOne = circle(st, .3+(.2*(1.5*u_time)));
    float circleTwo = circle(st, .7*(.5*(1.5*u_time)));

    d = (7.*(distance(st,vec2(0.4)) * distance(st,vec2(0.6))));
    color = vec3(d/2., d/4., d/5.) - vec3(circleOne/2., circleOne/4., circleOne/5.) - vec3(circleTwo/n, circleTwo/n, circleTwo/n) + mod(u_time/2., 2.);
    gl_FragColor = vec4(color, 1.0);
}