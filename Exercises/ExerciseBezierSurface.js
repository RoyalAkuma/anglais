function exerciseBezierSurface(gl) 
{
    var line_shader = new DefaultShader( gl ) ;
    var lambertian_shader = new LambertianShader( gl ) ;
    lambertian_shader.SetLightPosition( light );

    var scn = new Scene();
    scn.AddShader( line_shader );
    scn.AddShader( lambertian_shader );

    // Objects are defined here ..
    var axis = new Axis( "Axis1" , line_shader , new Vector( 0 , 0 , 0 ) , 100.0 ) ; 
    scn.AddObject( axis ) ; 
    
    // Exercise 4:
    var gumbo = new Gumbo( "gumbo1", lambertian_shader, 16, [ 1, 1, 0.2, 1.0 ] );
    gumbo.SetAnimate( function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .Scale(0.4)
		       .Translate(new Vector(-4,-2,0))
		       .RotateZ(tick*Math.PI/100)
		       .Translate(new Vector( 4, -5, -3 ))
		       // .RotateX(Math.PI/2)
		       // .RotateZ(tick*Math.PI/100)
		     );
    });
    scn.AddObject( gumbo );
    
    // teapot
    var teapot = new Teapot( "teapot1", lambertian_shader, 16, [ 1, 0.2, 1, 1.0 ] );
    teapot.SetAnimate( function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .Scale(0.04)
		       .RotateZ(tick*Math.PI/100)
		       .RotateY(tick*Math.PI/250)
		       .RotateZ(tick*Math.PI/1000)
		       .Translate(new Vector(-5,5,0))
		     );
    });
    scn.AddObject( teapot );

    // Do not modify the end ...
    scn.Prepare(gl);
    return scn;
};
