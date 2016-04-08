// All objects must inherit from Generic Object 
Axis.prototype = new GenericObject();
Axis.prototype.constructor = Axis ;

/** 
* Create an axis given an origin and a size 
*/
function Axis( name , shader , origin , size )
{
  // Call parent constructor (mandatory !)
  GenericObject.call( this , name , shader ) ;

  if( shader.GetAttribute( AttributeEnum.normal ) 
      || shader.GetAttribute( AttributeEnum.tangent ) 
      || shader.GetAttribute( AttributeEnum.bitangent ) 
      || shader.GetAttribute( AttributeEnum.texcoord ) ) 
    {
	console.log( "Axis created with bad shader ..." );
    }
  this.origin = origin ;
  this.size = size ; 
} ;

/**
* Overload Prepare
*/
Axis.prototype.Prepare = function( gl )
{
    var vertices = [ 
	[ this.origin.X() - this.size / 2.0 , this.origin.Y() , this.origin.Z() ] ,
	[ this.origin.X() + this.size / 2.0 , this.origin.Y() , this.origin.Z() ] ,
	[ this.origin.X() , this.origin.Y() - this.size / 2.0 , this.origin.Z() ] ,
	[ this.origin.X() , this.origin.Y() + this.size / 2.0 , this.origin.Z() ] ,
	[ this.origin.X() , this.origin.Y() , this.origin.Z() - this.size / 2.0 ] ,
	[ this.origin.X() , this.origin.Y() , this.origin.Z() + this.size / 2.0 ]
    ];
    var colors = [
	[ 1.0 , 0 , 0 , 1.0 ] , 
	[ 1.0 , 0 , 0 , 1.0 ] ,
	[ 0 , 1.0 , 0 , 1.0 ] ,
	[ 0 , 1.0 , 0 , 1.0 ] , 
	[ 0 , 0 , 1.0 , 1.0 ] ,
	[ 0 , 0 , 1.0 , 1.0 ]
    ];

    // Create buffer 
    this.vbo = gl.createBuffer( ) ;
    this.vbo.itemSize = 3 ; 
    this.vbo.numItems = 6 ; 
    
    // and fill it!
    var data = [] ;
    var pos = 0;
    for(vert=0; vert<vertices.length; ++vert) {
	// position
	for(var i=0; i<3; ++i) data[pos++] = vertices[vert][i]; // X Y Z
	// and color
	if( this.shader.GetAttribute( AttributeEnum.color ) )
	    for(var i=0; i<4; ++i) data[pos++] = colors[vert][i]; // R G B A
    }
    
    gl.bindBuffer( gl.ARRAY_BUFFER , this.vbo ) ; 
    gl.bufferData( gl.ARRAY_BUFFER , new Float32Array( data ) , gl.STATIC_DRAW ) ; 
} ;

/**
* Overload draw
*/
Axis.prototype.Draw = function( gl , scn )
{
    // Let's the shader prepare its attributes
    this.shader.setAttributes( this.vbo );
    // Let's render !
    gl.bindBuffer( gl.ARRAY_BUFFER , this.vbo );
    gl.drawArrays( gl.LINES , 0 , this.vbo.numItems ) ; 
}
