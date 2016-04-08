function exerciseValidation( gl ) 
{
    var line_shader = new DefaultShader( gl ) ;
    
    var scn = new Scene();
    scn.AddShader( line_shader );
    
    // Objects are defined here ..
    var axis = new Axis( "Axis1" , line_shader , new Vector( 0 , 0 , 0 ) , 100.0 ) ; 
    scn.AddObject( axis ) ; 
    
    // add some triangles
    var t1 = new Triangle( "triangle1", line_shader );
    t1.SetAnimate( function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .RotateZ((50+tick)*Math.PI/100)
		       .Scale(6.66)
		       .Translate(new Vector(0, 0, -7))
		     );
    });
    scn.AddObject( t1 );

    var t2 = new Triangle( "triangle2", line_shader );
    t2.SetAnimate( function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .RotateZ(tick*Math.PI/100)
		       .RotateX(Math.PI/2)
		       .Scale(6.66)
		       .Translate(new Vector(0, -2, 0))
		     );
    });
    scn.AddObject( t2 );
    var t3 = new Triangle( "triangle3", line_shader );
    t3.SetAnimate( function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .RotateZ(tick*Math.PI/100)
		       .RotateY(Math.PI/2)
		       .Scale(6.66)
		       .Translate(new Vector(-7, 0, 0))
		     );
    });
    scn.AddObject( t3 );

    // Do not modify the end ...
    scn.Prepare(gl);
    return scn;
};
