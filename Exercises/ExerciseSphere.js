function exerciseSphere(gl) 
{
    var line_shader = new DefaultShader( gl ) ;
    var lambertian_shader = new LambertianShader( gl ) ;
    lambertian_shader.SetLightPosition( light );

    var scn = new Scene();
    scn.AddShader( line_shader );
    scn.AddShader( lambertian_shader );

    // Objects are defined here ..
    var axis1 = new Axis( "Axis1" , line_shader , new Vector( 0 , 0 , 0 ) , 100.0 ) ; 
    scn.AddObject( axis1 ) ; 
    
    // Exercise 3: spheres
    var sphereX = new Sphere( "sphereX", lambertian_shader, 21, 20, [ 1, 0.1, 0.1, 1 ] );
    sphereX.SetAnimate( function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .Scale(2.5).
		       Translate(new Vector(-5, 0, 0))
		       .RotateZ(tick*Math.PI/100)
		     );
    });
    scn.AddObject( sphereX );
    
    var sphereY = new Sphere( "sphereY", lambertian_shader, 11, 10, [ 0.1, 1, 0.1, 1 ] );
    sphereY.SetAnimate( function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .Scale(2.5).
		       Translate(new Vector(0, -5, 0))
		       .RotateX(tick*Math.PI/100)
		     );
    });
    scn.AddObject( sphereY );

    var sphereZ = new Sphere( "sphereZ", lambertian_shader,  5,  6, [ 0, 0.1, 1, 1 ] );
    sphereZ.SetAnimate( function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .Scale(2.5).
		       Translate(new Vector(0, 0, -5))
		       .RotateY(tick*Math.PI/100)
		     );
    });
    scn.AddObject( sphereZ );

    // Do not modify the end ...
    scn.Prepare(gl);
    return scn;
};

