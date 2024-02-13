#version 300 es
precision mediump float;


uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
uniform float     iFrameRate;            // shader frame rate
uniform int       iFrame;                // shader playback frame
//uniform float     iChannelTime[4];       // channel playback time (in seconds)
//uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
//uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
//uniform vec4      iDate;                 // (year, month, day, time in seconds)





uniform sampler2D diffuseTexture;

in vec2 vCoord;


float rand(vec2 co){
	return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}



out vec4 outColor;
            
void main(void) {
	vec2 coord =vec2(vCoord.x,1.0-vCoord.y);
    vec4 diffuse = texture(diffuseTexture, coord);

        float time = round(iTime*4.0);
	float random = rand(time*vec2(coord.x/100.0,0));

	if((random<0.6)&&(random>0.0)){
	     outColor = vec4(diffuse.rgb+vec3(0.5), 1.0);
	}else{
    	     outColor = vec4(diffuse.rgb, 1.0);
	}
}