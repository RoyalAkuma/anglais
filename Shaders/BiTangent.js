// All shaders must inherit from Shader object 
BiTangentShader.prototype = new Shader();
BiTangentShader.prototype.constructor = BiTangentShader;

/* constructor */
function BiTangentShader( gl ) {
    Shader.call( this , "bitangent",  "./Shaders/bitangent.vs", "./Shaders/bitangent.fs", gl, BiTangentShader.prototype.attributes ) ;
} ;

BiTangentShader.prototype.attributes = [
    AttributeEnum.position, AttributeEnum.bitangent
];

BiTangentShader.prototype.setAttributes = function ( vbo ) 
{
    gl.bindBuffer( gl.ARRAY_BUFFER , vbo ) ;    
    
    // Get Position attribute
    var attr_pos = this.GetAttributeLocation( "aPosition" ) ; 
    
    // Get Normal attribute
    var attr_tan = this.GetAttributeLocation( "aBiTangent" ) ; 
    
    // Activate Attribute 
    gl.enableVertexAttribArray( attr_pos ) ; 
    gl.enableVertexAttribArray( attr_tan ) ; 
    
    // Fill all parameters for rendering 
    gl.vertexAttribPointer( attr_pos , 3 , gl.FLOAT , false , 24 , 0 ) ; 
    gl.vertexAttribPointer( attr_tan , 3 , gl.FLOAT , false , 24 , 12 ) ;
    
} ;

