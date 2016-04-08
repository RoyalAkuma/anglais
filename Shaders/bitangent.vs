attribute vec3 aPosition ;
attribute vec3 aBiTangent ; 

uniform mat4 uProjectionMatrix ;
uniform mat4 uModelViewMatrix ;
uniform mat4 uNormalMatrix ; 

varying mediump vec4 vColor ; 

void main(void) 
{
  vec4 vertex = uModelViewMatrix * vec4( aPosition , 1.0 ) ; 
  gl_Position = uProjectionMatrix * vertex ;

  vec3 bitangent = normalize( ( uNormalMatrix * vec4( aBiTangent , 1.0 ) ).xyz ) ;
  
  vColor = vec4( abs(bitangent), 1.0 ) ;   
}

