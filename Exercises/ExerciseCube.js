function exerciseCube(gl, light) 
{
    var line_shader = new DefaultShader( gl ) ;
    var lambertian_shader = new LambertianShader( gl ) ;
    var normal_shader = new NormalShader( gl );
    var tangent_shader = new TangentShader( gl );
    var bi_tangent_shader = new BiTangentShader( gl );
    lambertian_shader.SetLightPosition( light );

    var scn = new Scene();
    scn.AddShader( line_shader );
    scn.AddShader( lambertian_shader );
    scn.AddShader( normal_shader );
    scn.AddShader( tangent_shader );
    scn.AddShader( bi_tangent_shader );

    // Objects are defined here ..
    var axis = new Axis( "Axis1" , line_shader , new Vector( 0 , 0 , 0 ) , 100.0 ) ; 
    scn.AddObject( axis ) ; 
    
    // Exercise 2:
    var cube1 = new Cube( "cube1", tangent_shader );
    cube1.SetAnimate( function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .RotateZ(tick*Math.PI/100)
		       .Scale(1.5)
		       .Translate(new Vector(-3,5,0))
		     );
    });
    scn.AddObject( cube1 ) ; 
    
    var cube2 = new Cube( "cube2", normal_shader );
    cube2.SetAnimate( function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .Scale(1.5)
		       .RotateZ(tick*Math.PI/100)
		       .Translate(new Vector(5,-3,0))
		     );
    });
    scn.AddObject( cube2 ) ; 
    
    var cube3 = new Cube( "cube3", bi_tangent_shader );
    cube3.SetAnimate( function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .Scale(1.5)
		       .RotateZ(tick*Math.PI/100)
		       .Translate(new Vector(0,0,5))
		     );
    });
    scn.AddObject( cube3 ) ; 

    // Do not modify the end ...
    scn.Prepare(gl);
    return scn;
};
