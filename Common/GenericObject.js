// Class to manage an object (you must inherit from this class)
function GenericObject( _name , _shader )
{
    // Name of object to use
    this.name   = _name ;
    
    // Current object matrix 
    this.matrix = new Matrix();
    
    // Shader to use for rendering current object 
    this.shader = _shader ; 
    
    // default animation: do nothing
    this.animator = function() {};

    // by default, an object should be displayed
    this.isDisplayable = true;
} ;

// Get Name of current object 
GenericObject.prototype.GetName = function()
{
    return this.name ;
} ;

// Set Name of current object 
GenericObject.prototype.SetName = function( aName ) 
{
    this.name = aName ;
} ;

// Get ModelMatrix
GenericObject.prototype.GetMatrix = function( )
{
    return this.matrix ;
} ;

// Set ModelMatrix
GenericObject.prototype.SetMatrix = function ( aMatrix )
{
    this.matrix = aMatrix ;
} ;

GenericObject.prototype.GetShader = function()
{
    return this.shader ; 
} ;

GenericObject.prototype.SetShader = function( aShader )
{
    this.shader = aShader ; 
} ;

GenericObject.prototype.SetAnimate = function( animator )
{
    this.animator = animator;
};

GenericObject.prototype.Animate = function( tick )
{
    this.animator( tick, this );
};

GenericObject.prototype.SetDisplay = function( isDisplayable ) {
    this.isDisplayable = isDisplayable;
};

GenericObject.prototype.DisplayMe = function() {
    return this.isDisplayable;
};

// Overload this function in order to compute additionnal items before drawing 
// Warning: In order to use the shader, you need to ask it about the attributes it needs ...
GenericObject.prototype.Prepare = function( gl )
{

} ;


// Overload this method in order to draw something
// Draw an object 
// @param gl:  the OpenGL context
// @param scn: the scene
GenericObject.prototype.Draw = function( gl , scn )
{

} ;
