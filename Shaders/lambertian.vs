attribute vec3 aPosition ;
attribute vec3 aNormal ; 
attribute vec4 aColor ; 

uniform mat4 uProjectionMatrix ;
uniform mat4 uModelViewMatrix ;
uniform mat4 uNormalMatrix ; 

uniform vec3 uLightPosition;

varying mediump vec4 vColor ; 

// This is a not really good version of a lambertian shader (it is a per vertex version, 
// while a good one would be a per fragment version ...)
void main(void) 
{
  vec4 vertex = uModelViewMatrix * vec4( aPosition , 1.0 ) ; 
  gl_Position = uProjectionMatrix * vertex ;

  vec3 normal = normalize( ( uNormalMatrix * vec4( aNormal , 1.0 ) ).xyz ) ;
  
  /* Consider a static light source (warning frame is not correct) */
  float cos = max( min( dot( normal , 
			     normalize( uLightPosition - vertex.xyz ) ), 
			1.0), 
		   0.33); 
  
  vColor = vec4( aColor.xyz * cos, aColor.w ) ;   
}

