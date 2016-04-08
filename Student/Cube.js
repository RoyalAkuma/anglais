// All objects must inherit from Generic Object 
Cube.prototype = new GenericObject();
Cube.prototype.constructor = Cube ;

/** 
* Create a new unit Cube centering on O
* @param name name of this instance
* @param shader WebGL shader
*/
function Cube( name , shader )
{
  // Call parent constructor (mandatory !)
  GenericObject.call( this , name , shader ) ;
} ;

/**
* Prepare shape
*/
Cube.prototype.Prepare = function( gl )
{    
    var data = [] ;
    
	
	var vertices = [
    // Front face
    [-1.0, -1.0,  1.0],
    [1.0, -1.0,  1.0],
    [1.0,  1.0,  1.0],
    [-1.0,  1.0,  1.0],
    
    // Back face
    [-1.0, -1.0, -1.0],
    [-1.0,  1.0, -1.0],
    [1.0,  1.0, -1.0],
    [1.0, -1.0, -1.0],
    
    // Top face
    [-1.0,  1.0, -1.0],
    [-1.0,  1.0,  1.0],
    [1.0,  1.0,  1.0],
    [1.0,  1.0, -1.0],
    
    // Bottom face
    [-1.0, -1.0, -1.0],
    [1.0, -1.0, -1.0],
    [1.0, -1.0,  1.0],
    [-1.0, -1.0,  1.0],
    
    // Right face
    [1.0, -1.0, -1.0],
    [1.0,  1.0, -1.0],
    [1.0,  1.0,  1.0],
    [1.0, -1.0,  1.0],
    
    // Left face
    [-1.0, -1.0, -1.0],
    [-1.0, -1.0,  1.0],
    [-1.0,  1.0,  1.0],
    [-1.0,  1.0, -1.0]
  ];
  
 
	
	//Couleurs 
	var colors = [
	[1.0 , 0.0 , 0.0 , 1.0], 
	[1.0 , 0.0 , 0.0 , 1.0], 
	[1.0 , 0.0 , 0.0 , 1.0], 
	[1.0 , 0.0 , 0.0 , 1.0], 
	
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	
	[1.0 , 0.0 , 0.0 , 1.0], 
	[1.0 , 0.0 , 0.0 , 1.0], 
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0], 
	
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
	[1.0 , 0.0 , 0.0 , 1.0],
    ] ;
	
	//Normale 
	var normals = [ 
	[0, 0, 1],
	[0, 0, -1],
	[0, 1, 0],
	[0, -1, 0],
	[1, 0, 0],
	[-1, 0, 0]
    ];
	
	//Tangente
	var tangents = [ 
	[1, 0, 0],
	[-1, 0, 0],
	[0, 0, 1],
	[0, 0, -1],
	[0, 1, 0],
	[0, -1, 0]
    ]; 
	
	//Bitangente
    var bitangents = [ 
	[0, 1, 0],
	[0, -1, 0],
	[1, 0, 0],
	[-1, 0, 0],
	[0, 0, 1],
	[0, 0, -1]
    ];
	
	//Textures coordinates 
	var texcoords = [
	0,1, 0,0, 1,0, 1,1,
	1,0, 1,1, 0,1, 0,0,
	1,0, 1,1, 0,1, 0,0,
	1,1, 0,1, 0,0, 1,0,
	0,0, 0,1, 1,1, 1,0,
	0,0, 1,0, 1,1, 0,1
    ];
	
    // NB: fill the data using the functions:
	for(var v=0; v<24; ++v) {
		this.addAPoint( data, vertices[v] );
		this.addAColor( data, colors[v] );
		this.addANormal( data, normals[Math.floor(v/4)] );
		this.addATangent( data, tangents[Math.floor(v/4)] );
		this.addABitangent( data, bitangents[Math.floor(v/4)] );
		this.addTextureCoordinates( data, texcoords[v*2], texcoords[v*2+1] );
	}
	
    // NB bis: you MUST respect the order we use below ...

    // Create vertex buffer 
    this.vbo = gl.createBuffer( ) ;
    this.vbo.itemSize = 3 ; 
    this.vbo.numItems = 24 ; 
    
    gl.bindBuffer( gl.ARRAY_BUFFER , this.vbo ) ; 
    gl.bufferData( gl.ARRAY_BUFFER , new Float32Array( data ) , gl.STATIC_DRAW ) ; 
    
    // Create index buffer 
    this.ibo = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER , this.ibo );
    var indices = [
	0, 1, 2,      0, 2, 3,    // Front face
	4, 5, 6,      4, 6, 7,    // Back face
	8, 9, 10,     8, 10, 11,  // Top face
	12, 13, 14,   12, 14, 15, // Bottom face
	16, 17, 18,   16, 18, 19, // Right face
	20, 21, 22,   20, 22, 23  // Left face
    ] ;
    
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ) , gl.STATIC_DRAW);
    this.ibo.itemSize = 1;
    this.ibo.numItems = 36;
} ;

/**
* Overload draw
*/
Cube.prototype.Draw = function( gl , scn )
{
    // Let's the shader prepare its attributes
    this.shader.setAttributes( this.vbo );

    // Let's render !
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER , this.ibo );
    gl.drawElements(gl.TRIANGLES, this.ibo.numItems, gl.UNSIGNED_SHORT, 0);
}

