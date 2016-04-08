var exerciseBezierCurve = function( gl ) 
{   
    var scn = new Scene() ;
    var line_shader = new DefaultShader( gl ) ;
    scn.AddShader( line_shader );

    // Objects are defined here ..
    var axis = new Axis( "Axis1" , line_shader , new Vector( 0 , 0 , 0 ) , 100.0 ) ; 
    scn.AddObject( axis ) ; 

    // exercise 1:
    var pts1 = [  -1.0, -1.0, 0.0, 
		  -1.5,  1.0, 0.0,
		  -0.5,  2.0, 0.0,
		   0.0,  1.0, 0.0,
		   0.5, -1.0, 0.0,
		   1.0,  1.0, 0.0,  
		   1.0, -1.0, 0.0
	       ];
    var colors = [ 1, 0, 0, 1, 
		   0, 1, 0, 1,
		   0, 1, 1, 1,
		   0, 0, 1, 1,
		   1, 0, 1, 1,
		   1, 1, 1, 1,
		   1, 1, 0, 1
		 ];

    var bezier1 = new BezierCurve( "bezier1" , line_shader, 1000, pts1, colors );
    bezier1.SetAnimate(	function(tick, obj) {
	obj.SetMatrix( new Matrix()
		       .Translate(new Vector(1,1,0))
		       .Scale(3)
		       .RotateX(Math.PI/2)
		       .RotateZ(tick*Math.PI/100)
		     );
    });
    scn.AddObject( bezier1 ) ; 

    // Do not modify the end ...
    scn.Prepare(gl);
    return scn;
};
