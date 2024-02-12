#version 300 es

in vec3 position;
in vec2 coord;

uniform mat4 Pmatrix;
uniform mat4 Vmatrix;
uniform mat4 Mmatrix;
            
//attribute vec3 color;
            
out vec2 vCoord;
            
void main(void) {
    gl_Position = vec4(position, 1.);
    
    vCoord = coord;
}