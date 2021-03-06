// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) + 
            box(_st, vec2(_size/4.,_size));
}

mat3 scaleMatrix(vec2 f) {
    return mat3(vec3(f.x, 0.0, 0.0), vec3(0.0, f.y, 0.0), vec3(0.0, 0.0, 1.0));
    
}

mat3 translationMatrix(vec2 f) {
    
    return mat3(vec3(1.0, 0.0, f.x), vec3(0.0, 1.0, f.y), vec3(0.0, 0.0, 1.0));
}

mat3 rotationMatrix(float a) {
    
    return mat3(vec3(cos(a), -sin(a), 0.0), vec3(sin(a), cos(a), 0.0), vec3(0.0, 0.0, 1.0));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 pos = vec3(st, 1.0);
    vec3 color = vec3(0.0);
    
    pos = translationMatrix(vec2(1.))*pos;
        
    // To move the cross we move the space
//     vec2 translate = vec2(cos(u_time),sin(u_time));
//     st += translate*0.35;

    // Show the coordinates of the space on the background
    // color = vec3(st.x,st.y,0.0);

    // Add the shape on the foreground
    //color += vec3(cross(pos.xy,0.25));

    gl_FragColor = vec4(vec3(cross(pos.xy, 0.9)),1.0);
}