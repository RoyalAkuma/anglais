// Scene Class Management
function Scene()
{
    // List of Objects
    this.object_list = new Array() ; 
    
    // List of 
    this.shader_list = new Array() ; 
    
    // List of Cameras (for multiple viewpoints)
    this.camera_list = new Array() ; 
    
    // Active Camera index
    this.active_camera = -1 ;
    
    // set the animation step
    this.ticks = 0;
} ;

/**
* Add an object 
*/
Scene.prototype.AddObject = function( anObject ) 
{
    this.object_list.push( anObject ) ;
}

/**
* Remove an object by name 
*/
Scene.prototype.RemoveObjectByName = function( anObjectName )
{
    for( var i = 0 ; i < this.object_list.length ; ++i )
    {
	if( this.object_list[ i ].GetName() == anObjectName )
	{
	    this.object_list.splice( i , 1 ) ; 
	    
	    break ;
	}
    }
    console.log( "[ Scene::RemoveObjectByName ] object : \"" + anObjectName + "\" not found" ) ;
} ;

// Add a shader 
Scene.prototype.AddShader = function( aShader )
{
    this.shader_list.push( aShader ) ; 
} ;

// Get a shader given its name 
Scene.prototype.GetShaderByName = function( aName )
{
    for( var i = 0 ; i < this.shader_list.length ; ++i )
    {
	if( this.shader_list[ i ].GetName() == aName )
	    return this.shader_list[ i ] ; 
    }
    console.log( "[ Scene::GetShaderByName ] shader : \"" + aName + "\" not found" ) ;
    return null ; 
} ;

// Remove a shader from list given its name 
Scene.prototype.RemoveShaderByName = function( aName )
{
    for( var i = 0 ; i < this.object_list.length ; ++i )
    {
	if( this.shader_list[ i ].GetName() == aName )
	{
	    this.shader_list.splice( i , 1 ) ; 
	    break ; 
	}
    }
    console.log( "[ Scene::RemoveShaderByName ] shader : \"" + aName + "\" not found" ) ;	
} ;

// Set the light position
Scene.prototype.SetLightPosition = function( pos ) 
{
    if( pos instanceof Vector ) {
	for(var i=this.shader_list.length; i--; )
	    this.shader_list[i].SetLightPosition( pos );
    }
};

/**
* Add a camera 
*/
Scene.prototype.AddCamera = function( aCamera )
{
    this.camera_list.push( aCamera ) ;
} ;

/**
 * Get a camera
 */
Scene.prototype.GetCameraById = function( anIndex )
{
    if( anIndex < 0 || anIndex >= this.camera_list.length )
    {
	console.log( "[ Scene::GetCameraById ] invalid index : " + anIndex ) ;	
	return null ; 		
    }
    else
    {
	return this.camera_list[ anIndex ] ; 		
    }
} ;

/**
 * Set Current Camera 
 */
Scene.prototype.SetActiveCamera = function( anIndex )
{
    if( anIndex < 0 || anIndex >= this.camera_list.length )
    {
	alert( "[ Scene::SetActiveCamera ] invalid index : " + anIndex ) ;	
    }
    this.camera_list.active_camera = anIndex ; 
} ;

// Get current camera 
Scene.prototype.GetActiveCamera = function()
{
    return this.camera_list[ this.active_camera ] ; 
}

/**
 * Prepare Scene before render
 */
Scene.prototype.Prepare = function( gl )
{
    // Prepare each objects 
    for( var i = 0 ; i < this.object_list.length ; ++i )
    {
	this.object_list[ i ].Prepare( gl ) ; 
	this.object_list[ i ].Animate( this.ticks );
    }
    
    // If no camera 
    if( this.camera_list.length == 0 )
    {
	// Default Camera
	var cam = new Camera( new Vector( 10 , 10 , 10 ) , 
			      new Vector( 0 , 0 , 0 ) , 
			      new Vector( 0 , 0 , 1 ) , 800 , 600 , 
			      60/2 , 
			      0.1 , 1000.0 ) ; 
	this.camera_list.push( cam ) ;
    }
    
    // If camera index not valid 
    if( this.active_camera < 0 || this.active_camera >= this.camera_list.length )
    {
	this.active_camera = 0 ; 
    }
};


/** 
 * Animate
 */
Scene.prototype.Animate = function() {
    ++ this.ticks;
    for( var i = 0 ; i < this.object_list.length ; ++i ) {
	var obj = this.object_list[ i ] ;
	if( !obj.DisplayMe() ) continue;
	obj.Animate( this.ticks );
    };	
};


/**
 * Draw a scene
 */
Scene.prototype.Draw = function( gl )
{
    /** Get Current Camera Matrices */
    var cam = this.GetActiveCamera() ; 
    var mv_mat = cam.GetViewMatrix() ; 
    var pj_mat = cam.GetProjectionMatrix() ;  
    
    for( var i = 0 ; i < this.object_list.length ; ++i )
    {
	// Get Object Properties 
	var obj = this.object_list[ i ] ;
	if( !obj.DisplayMe() ) continue;

	//var obj_shad_name = obj.GetShader( ) ;
	var obj_mat = obj.GetMatrix( ); 
	
	// Get Location of uniform variables 
	var shad = obj.GetShader();//this.GetShaderByName( obj_shad_name ) ;
	shad.SetActive( gl ) ; 
	var loc_mv_mat = shad.GetUniformLocation( "uModelViewMatrix" ) ;
	var loc_pj_mat = shad.GetUniformLocation( "uProjectionMatrix" ) ;
	var loc_nm_mat = shad.GetUniformLocation( "uNormalMatrix" ) ;
	
	// Compute real ModelView matrix
	//var mv = new Matrix(obj_mat).Mul( mv_mat ) ; 
	var mv = new Matrix(mv_mat).Mul(obj_mat);
	
	// Set Uniform Matrices
	gl.uniformMatrix4fv( loc_mv_mat , false , mv.GetGLVector() ) ; 
	gl.uniformMatrix4fv( loc_pj_mat , false , pj_mat.GetGLVector() ) ; 
	
	// If Shader has normal matrix give it !
	if( loc_nm_mat != null )
	{
	    // Compute Normal matrix 
	    var nm = new Matrix(mv).toNormal(); //mat44.transpose( mat44.invert( mv ) ) ;
	    gl.uniformMatrix4fv( loc_nm_mat , false , nm.GetGLVector() ) ; 
	}
	
	// RenderObject 
	obj.Draw( gl , this ) ; 
    }
}

