( function( global, factory ){
	var output = factory( global )
	
	     if( typeof module === 'object'   && module != null && module.exports )
		module.exports = output
	else if( typeof define === 'function' && define.amd )
		define( function(){ return output } )
	else
		global.observer = output
} )
( typeof window !== 'undefined' ? window : {}, function( global ){
  var dummy     = document.createElement( 'div' )
  var observers = []
  var log       = []
  var callback  = function( root, mutations ){
  	console.log( root, mutations )
  }

  var config    = {
    childList             : true,
    attributes            : true,
    characterData         : true,
    subtree               : true,
    attributeOldValue     : true,
    characterDataOldValue : true,
    attributeFilte        : true
  }

  m.mount( dummy, {
    view : function( ctrl ){
      return m( 'div', {
        config : function( ctrl ){
        	if( !ctrl.init )
          	return ctrl.init = true
        
          for( var i = 0; i < observers.length; i++ )
            observers[ i ].disconnect()
          
          callback( log )
          
          observers.length = log.length = 0
        }
      } )
    }
  } )

  var m_render = m.render

  m.render = function( root ){
  	if( root != dummy ){
      var observer = new MutationObserver( function( mutations ){
        callback( root, mutations )
      } )

      observer.observe( root, config )

      observers.push( observer )

      return m_render.apply( this, arguments )
    }
  }
  
  return {
  	reporter : function( fn ){
    	if( typeof fn === 'function' )
      	callback = fn
      
      return callback
    }
  }
} );
