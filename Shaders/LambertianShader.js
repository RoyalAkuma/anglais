// All shaders must inherit from Shader object 
LambertianShader.prototype = new Shader();
LambertianShader.prototype.constructor = LambertianShader ;

/* constructor */
function LambertianShader( gl ) {
    Shader.call( this , "lambertian",  "./Shaders/lambertian.vs", "./Shaders/lambertian.fs", gl, LambertianShader.prototype.attributes ) ;
    this.lightPosition = new Vector( 100, 100, 10 ); // why not?
} ;

LambertianShader.prototype.attributes = [
    AttributeEnum.position, AttributeEnum.normal, AttributeEnum.color
];

LambertianShader.prototype.setAttributes = function ( vbo ) 
{
    gl.bindBuffer( gl.ARRAY_BUFFER , vbo ) ;    
    
    // Get Position attribute
    var attr_pos = this.GetAttributeLocation( "aPosition" ) ; 
    
    // Get Color attribute 
    var attr_col = this.GetAttributeLocation( "aColor" ) ; 
    
    // Get Normal attribute
    var attr_nor = this.GetAttributeLocation( "aNormal" ) ; 
    
    // Activate Attribute 
    gl.enableVertexAttribArray( attr_pos ) ; 
    gl.enableVertexAttribArray( attr_col ) ; 
    gl.enableVertexAttribArray( attr_nor ) ; 
    
    // Fill all parameters for rendering 
    gl.vertexAttribPointer( attr_pos , 3 , gl.FLOAT , false , 40 , 0 ) ; 
    gl.vertexAttribPointer( attr_col , 4 , gl.FLOAT , false , 40 , 12 ) ;
    gl.vertexAttribPointer( attr_nor , 3 , gl.FLOAT , false , 40 , 28 ) ;

    // Get Light Position uniform
    var loc_light  = this.GetUniformLocation( "uLightPosition" ) ;
    
    gl.uniform3f( loc_light, this.lightPosition.X(), this.lightPosition.Y(), this.lightPosition.Z() );
    
} ;


// Set the light position (for shader using light)
Shader.prototype.SetLightPosition = function( pos ) {
    if( pos instanceof Vector )
	this.lightPosition = pos;
} ;

