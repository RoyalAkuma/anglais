// OpenGL Canvas
var canvas ;

// OpenGL Context
var gl ;

// Scenes 
var scn = [];

// the light position
var light = new Vector(15.0, 5.0, 15.0);
var ticks = 0;
var animate = false;

// objects
var exo = 0;

// Init WebGL
function initGL()
{
    canvas = document.getElementById("glCanvas") ;
    
    if( ! canvas )
    {
	console.log( "Unable to find canvas" );
	return ;
  }
    
    gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl") || canvas.getContext("experimental-webgl")); 
    gl.viewportWidth  = canvas.width ;
    gl.viewportHeight = canvas.height ;  
    
    
    gl.clearColor( 0.0 , 0.0 , 0.0 , 1.0 ) ; 
    gl.enable(gl.DEPTH_TEST) ;
    
    // Prepare scene
    prepareScene() ; 
    
    // Start render loop 
    update() ; 
} ;

// Scene creation 
function prepareScene()
{
    scn[0] = exerciseValidation( gl, light );
    scn[1] = exerciseBezierCurve( gl, light );
    scn[2] = exerciseCube( gl, light );
    scn[3] = exerciseSphere( gl, light );
    scn[4] = exerciseBezierSurface( gl, light );
}


/** Render Loop */
function update()
{
    if ( animate ) {
	requestAnimFrame( update ) ; 
	// animate objects ...
	scn[exo].Animate();
    }
    
    // Call animation
    scn[exo].SetLightPosition( light.RotateY( Matrix.prototype.deg_to_rad(0.5*(scn[exo].ticks ))) );
    
    
    // Call rendering 
    draw() ;
} ;


/** Draw function */
function draw() 
{
    gl.viewport( 0 , 0 , gl.viewportWidth , gl.viewportHeight) ;
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT ) ;
    
    scn[exo].Draw( gl ) ;
}

function changeExercise(num) {
    console.log("Exercice "+num);
    document.getElementById("exo"+exo).className ="button";
    exo = num;
    if( !animate ) update();
    document.getElementById("exo"+exo).className ="button-selected";
    //document.getElementById("outExercise").innerHTML = "Exercise "+num ;
};

function startAnimation() {
    animate = !animate;
    if( animate ) {
	update();
	document.getElementById("animButton").className = "button-selected";
    }
    else
	document.getElementById("animButton").className = "button";
};
