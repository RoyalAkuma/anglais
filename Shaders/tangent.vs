attribute vec3 aPosition ;
attribute vec3 aTangent ; 

uniform mat4 uProjectionMatrix ;
uniform mat4 uModelViewMatrix ;
uniform mat4 uNormalMatrix ; 

varying mediump vec4 vColor ; 

void main(void) 
{
  vec4 vertex = uModelViewMatrix * vec4( aPosition , 1.0 ) ; 
  gl_Position = uProjectionMatrix * vertex ;

  vec3 tangent = normalize( ( uNormalMatrix * vec4( aTangent , 1.0 ) ).xyz ) ;
  
  vColor = vec4( abs(tangent), 1.0 ) ;   
}

