// All objects must inherit from Generic Object 
Sphere.prototype = new GenericObject();
Sphere.prototype.constructor = Sphere ;

/** 
* Create a Sphere given only its discretization parameters and its color
*/
function Sphere( name , shader , nTheta, nPhi, color )
{
    // Call parent constructor (mandatory !)
    GenericObject.call( this , name , shader ) ;
    // at least a prism
    if( nTheta < 3 ) nTheta = 3;
    if( nPhi < 4 ) nPhi = 4;
    // save the data
    this.nTheta = nTheta;
    this.nPhi   = nPhi;
    this.color  = color ;
} ;


/**
*  Prepare shape
*/
Sphere.prototype.Prepare = function( gl )
{
    // Create vertex buffer 
    this.vbo = gl.createBuffer( ) ;
    this.vbo.itemSize = 3 ; // 3 coordinates per points ...
    this.vbo.numItems = 0 ; // do not forget to modify it ...

    // Create index buffer 
    this.ibo = gl.createBuffer();

    // prepare the fill
    var pos = 0;
    var data = [] ;
    var indices = [];
    var nbIndices = 0;
    
    // push north point
    var point = this.CreatePoint( 0, 0 );
    for(var i=0; i<point.length; ++i) data[pos++] = point[i];
    ++this.vbo.numItems;
    // store the size of a given point
    var size = point.length; 

    // add the north strip
    for(var phi=0; phi<=this.nPhi; ++phi) {
	indices[nbIndices++] = 0;
	indices[nbIndices++] = phi+1;
	indices[nbIndices++] = 1+((phi+1)%this.nPhi);
    }

    // loop on elevation angle, from north to south ...
    for (var theta=1; theta<this.nTheta; ++theta) { // nTheta-1 times
	for (var phi=0; phi<this.nPhi; ++phi) { // nPhi points
	    // add a point
	    var point = this.CreatePoint( theta, phi );
	    for(var i=0; i<point.length; ++i) data[pos++] = point[i];
	    ++this.vbo.numItems;
	}
    }    
    // loop on elevation angle, from north to south ...
    for (var theta=1; theta<this.nTheta-1; ++theta) {
	for (var phi=1; phi<=this.nPhi; ++phi) {
	    // add two triangles
	    indices[nbIndices++] = (theta-1)*this.nPhi + phi;
	    indices[nbIndices++] = theta*this.nPhi + phi;
	    indices[nbIndices++] = theta*this.nPhi + (phi + 1)%this.nPhi;
	    
	    indices[nbIndices++] = (theta-1)*this.nPhi + phi;
	    indices[nbIndices++] = theta*this.nPhi + (phi + 1)%this.nPhi;
	    indices[nbIndices++] = (theta-1)*this.nPhi + (phi + 1)%this.nPhi;	    
	}
    }    

    // add the south strip
    for(var phi=0; phi<this.nPhi; ++phi) {
	indices[nbIndices++] = (this.nTheta-2)*this.nPhi+phi;
	indices[nbIndices++] = (this.nTheta-2)*this.nPhi+(phi+1)%this.nPhi;
	indices[nbIndices++] = this.vbo.numItems-1;
    }

    // push sud point
    var point = this.CreatePoint( this.nTheta, 0 );
    for(var i=0; i<point.length; ++i) data[pos++] = point[i];
    ++this.vbo.numItems;
 
    gl.bindBuffer( gl.ARRAY_BUFFER , this.vbo ) ; 
    gl.bufferData( gl.ARRAY_BUFFER , new Float32Array( data ) , gl.STATIC_DRAW ) ; 

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER , this.ibo );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ) , gl.STATIC_DRAW);
    this.ibo.itemSize = 1;
    this.ibo.numItems = nbIndices;
} ;

/**
* Overload draw
*/
Sphere.prototype.Draw = function( gl , scn )
{
    // Let's the shader prepare its attributes
    this.shader.setAttributes( this.vbo );

    // Let's render !
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER , this.ibo );
    gl.drawElements(gl.TRIANGLES, this.ibo.numItems, gl.UNSIGNED_SHORT, 0);
}


/**
* Creates a sphere point
*/
Sphere.prototype.CreatePoint = function( theta, phi )
{
    var data = [];
    
		theta *= Math.PI / this.nTheta;
        phi *= 2 * Math.PI / this.nPhi;

        var x = Math.sin(theta) * Math.cos(phi);
        var y = Math.sin(theta) * Math.sin(phi);
        var z = Math.cos(theta);
        var vertices = [x,y,z];
        var normals = [x,y,z];
        var tangentes = [ Math.sin(theta) * -Math.sin(phi),Math.sin(theta) * Math.cos(phi),0];
        var bitangentes = [ Math.cos(theta) * Math.cos(phi),Math.cos(theta) * Math.sin(phi),-Math.sin(theta)];
        var texcoords = [phi/this.nPhi , theta/this.nTheta];
		
		
        this.addAPoint( data, vertices ); 
        this.addAColor( data, this.color );
        this.addANormal(data, normals );
        this.addATangent(data, tangentes );
        this.addABitangent( data, bitangentes );
        this.addTextureCoordinates( data, texcoords, texcoords);
    return data;
};
