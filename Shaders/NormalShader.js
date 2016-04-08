// All shaders must inherit from Shader object 
NormalShader.prototype = new Shader();
NormalShader.prototype.constructor = NormalShader;

/* constructor */
function NormalShader( gl ) {
    Shader.call( this , "normal",  "./Shaders/normal.vs", "./Shaders/normal.fs", gl, NormalShader.prototype.attributes ) ;
} ;

NormalShader.prototype.attributes = [
    AttributeEnum.position, AttributeEnum.normal
];

NormalShader.prototype.setAttributes = function ( vbo ) 
{
    gl.bindBuffer( gl.ARRAY_BUFFER , vbo ) ;    
    
    // Get Position attribute
    var attr_pos = this.GetAttributeLocation( "aPosition" ) ; 
    
    // Get Normal attribute
    var attr_nor = this.GetAttributeLocation( "aNormal" ) ; 
    
    // Activate Attribute 
    gl.enableVertexAttribArray( attr_pos ) ; 
    gl.enableVertexAttribArray( attr_nor ) ; 
    
    // Fill all parameters for rendering 
    gl.vertexAttribPointer( attr_pos , 3 , gl.FLOAT , false , 24 , 0 ) ; 
    gl.vertexAttribPointer( attr_nor , 3 , gl.FLOAT , false , 24 , 12 ) ;
    
} ;

