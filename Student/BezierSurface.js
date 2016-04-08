// All objects must inherit from Generic Object 
BezierSurface.prototype = new GenericObject();
BezierSurface.prototype.constructor = BezierSurface ;
/** 
* Create a Bezier surface, given a mesh of 4*4 control points ...
*/
function BezierSurface( name , shader , nbSamples, points , colors )
{
    // Call parent constructor (mandatory !)
    GenericObject.call( this , name , shader ) ;
    
    this.nbSamples = nbSamples;
    
    if ( !(points instanceof Array) )
	throw new Error("BezierSurface shall be called with a point array!");
    
    this.n = points.length / 3;    
    if ( this.n != 16 )
	throw new Error("BezierSurface shall be called with 16 control points!");
    
    // creates the main data
    var vecs = [];
    if( shader.GetAttribute( AttributeEnum.color ) ) {
	if ( (colors == undefined) || !(colors instanceof Array ) ) {
	    colors = [];
	    for(var n=0; n<this.n; ++n) {
		colors[4*n+0] = 1; // white
		colors[4*n+1] = 1; // is
		colors[4*n+2] = 1; // white 
		colors[4*n+3] = 1; // ??
	    }
	}
	else if (colors instanceof Array) {
	    for(var n=colors.length/4; n<this.n; n++) {
		colors[4*n+0] = colors[0];
		colors[4*n+1] = colors[1];
		colors[4*n+2] = colors[2];
		colors[4*n+3] = colors[3];
	    }
	}
	// with colors ...
	for(var n=0; n<this.n; ++n) {
	    vecs[n] = new PointData( points[3*n+0], points[3*n+1], points[3*n+2],
				     colors[4*n+0], colors[4*n+1], colors[4*n+2], colors[4*n+3] );
	}
    }
    else {
	// without colors
	for(var n=0; n<this.n; ++n) {
	    vecs[n] = new PointData( points[3*n+0], points[3*n+1], points[3*n+2] );
	}
    }
  this.points = vecs ;
} ;



BezierSurface.prototype.MakeTriangles = function( data, pos ) {
  var step = 1.0/(this.nbSamples-1);
  var t1 = 0.0;
  var nb = 0;
  for( it = 1;  it<this.nbSamples; ++it ) {
      var t2 = it*step;
      // push two points
      var so = 0.0;
      // one more vertex ...
      ++nb;
      var vec = this.Q( 0.0, t1 );
      for(var i=0; i<vec.n; ++i) data[pos++] = vec.m[i];  
      var norm = this.dQ( 0.0, t1 );
      for(var i=0; i<norm.n; ++i) data[pos++] = norm.m[i];  
      //
      for(var is=0; is<this.nbSamples; ++is) {
	  var s = is*step;
	  // one more vertex ...
	  ++nb; 
	  vec = this.Q( s, t1 );
	  for(var i=0; i<vec.n; ++i) data[pos++] = vec.m[i];  
	  norm = this.dQ( s, t1 );
	  for(var i=0; i<norm.n; ++i) data[pos++] = norm.m[i];      
	  // one more vertex ...
	  ++nb;
	  vec = this.Q( s, t2 );
	  for(var i=0; i<vec.n; ++i) data[pos++] = vec.m[i];   
	  norm = this.dQ( s, t2 );
	  for(var i=0; i<norm.n; ++i) data[pos++] = norm.m[i];     
	  so = s;
      }
      t1 = t2;
      // one more vertex ...
      ++nb; 
      vec = this.Q( so, t2 );
      for(var i=0; i<vec.n; ++i) data[pos++] = vec.m[i];   
      norm = this.dQ( so, t2 );
      for(var i=0; i<norm.n; ++i) data[pos++] = norm.m[i];     
  }
  return [ nb, data, pos ];
}

/**
* Overload Prepare
*/
BezierSurface.prototype.Prepare = function( gl )
{
  // X Y Z R G B A (nx ny nz)
  var pos = 0;
  var triangles = this.MakeTriangles( [], pos );
  var data = triangles[1];
  var nb = triangles[0];

  // Create buffer 
  this.vbo = gl.createBuffer( ) ;

  gl.bindBuffer( gl.ARRAY_BUFFER , this.vbo ) ; 
  gl.bufferData( gl.ARRAY_BUFFER , new Float32Array( data ) , gl.STATIC_DRAW ) ; 

  this.vbo.itemSize = 3 ; 
  this.vbo.numItems = nb-2 ; 
} ;

/**
* Overload draw
*/
BezierSurface.prototype.Draw = function( gl , scn )
{
    // Set shader
    this.shader.setAttribute( this.vbo );
    // Let's render !
    gl.disable(gl.CULL_FACE);
    gl.bindBuffer( gl.ARRAY_BUFFER , this.vbo ) ; 
    gl.drawArrays( gl.TRIANGLE_STRIP , 0 , this.vbo.numItems ) ; 
}


// STUDENT WORK come after

/**
* Calculate the Bernstein polynomial $B_{i,3}(u)$ 
* @param u the parametric value
* @return B_{i,3}(u)
*/
BezierSurface.prototype.bernstein = function(u) {
    // TODO: calculate the Bernstein monomes  ...
	
	var power0 = (1-u)*(1-u)*(1-u);
	var power1 = 3*u*(1-u)*(1-u);
	var power2 = 3*u*u*(1-u);
	var power3 = u*u*u;
	
    return [ 
	power3, power2, power1, power0 // power 3, power 2, power 1, power 0
    ];
}

/**
* Calculate the Bernstein derivative polynomial
* @param u the parametric value
* @return B'_{i,3}(u)
*/
BezierSurface.prototype.bernsteinDeriv = function(u) {
    // TODO: calculate the Bernstein monomes  ...
	
	var power0 = -3*u*u+6*u-3;
	var power1 = 9*u*u-12*u+3;
	var power2 = 6*u-9*u*u;
	var power3 = 3*u*u;
	
    return [
	power3, power2, power1, power0 // power 3, power 2, power 1, power 0
    ];
}

/**
* Calculate the parametric position ...
* @param u first parametric coordinates
* @param v second parametric coordinates
* @returns Q(u,v)
*/
BezierSurface.prototype.Q = function( u, v ) {
    // we use a temporary array
    var vec = new PointData( this.points[0].GetSize() );
    // TODO ...
	var bernstein_u = this.bernstein(u);
	var bernstein_v = this.bernstein(v);
	
	for (var i=0 ; i<=3 ; i++)
	{
		for (var j=0; j<=3; j++)
		{
			vec.AddScale(bernstein_u[3-i]*bernstein_v[3-j],this.points[i*4+j]);
		}
	}
	
    return vec;
} ;

/**
* Calculate the parametric derivative
* @param u first coordinates
* @param v second coordinates
* @returns Q'(u,v)
*/
BezierSurface.prototype.dQ = function( u, v ) {
    var dpdu = [ 0, 0, 0 ];
    var dpdv = [ 0, 0, 0 ];
    var bu  = this.bernstein(u);
    var bdu = this.bernsteinDeriv(u);
    var bv  = this.bernstein(v);
    var bdv = this.bernsteinDeriv(v);
    // TODO: calculate the normal, tangent, the bitangent and the texture coordinates ...
    
    var data =[];
	var normals = [1,1,0];

	this.addANormal(data, normals );
    // returns the result
    return new PointData( data );
} ;
