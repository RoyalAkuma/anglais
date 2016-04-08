/**
* Load a file and return its string content 
* Synchronous function (not the better one ...)
*/
function LoadFileSync( aFileName )
{
    if( typeof(aFileName)=="undefined" ) return "";
    //console.log("LoadFileSync( "+aFileName+" );");
    var xhr = new XMLHttpRequest() ;
    
    xhr.open( "GET" , aFileName , false ) ;
    xhr.send( null ) ; 
    
    if( xhr.status === 200 || xhr.status === 0 )
    {
	return xhr.responseText ; 
    }
}

/**
* Portable update function
*/
requestAnimFrame = (function() 
{
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
   window.setTimeout(callback, 1000/60);
 };
})();