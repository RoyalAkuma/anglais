// All shaders must inherit from Shader object 
TangentShader.prototype = new Shader();
TangentShader.prototype.constructor = TangentShader;

/* constructor */
function TangentShader( gl ) {
    Shader.call( this , "tangent",  "./Shaders/tangent.vs", "./Shaders/tangent.fs", gl, TangentShader.prototype.attributes ) ;
} ;

TangentShader.prototype.attributes = [
    AttributeEnum.position, AttributeEnum.tangent
];

TangentShader.prototype.setAttributes = function ( vbo ) 
{
    gl.bindBuffer( gl.ARRAY_BUFFER , vbo ) ;    
    
    // Get Position attribute
    var attr_pos = this.GetAttributeLocation( "aPosition" ) ; 
    
    // Get Normal attribute
    var attr_tan = this.GetAttributeLocation( "aTangent" ) ; 
    
    // Activate Attribute 
    gl.enableVertexAttribArray( attr_pos ) ; 
    gl.enableVertexAttribArray( attr_tan ) ; 
    
    // Fill all parameters for rendering 
    gl.vertexAttribPointer( attr_pos , 3 , gl.FLOAT , false , 24 , 0 ) ; 
    gl.vertexAttribPointer( attr_tan , 3 , gl.FLOAT , false , 24 , 12 ) ;
    
} ;

