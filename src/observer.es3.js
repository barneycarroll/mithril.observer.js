( function(){
  var observers = []

  var config    = {
    childList             : true,
    attributes            : true,
    characterData         : true,
    subtree               : true,
    attributeOldValue     : true,
    characterDataOldValue : true,
    attributeFilte        : true
  }

  m.mount( document.createElement( 'div' ), {
    view :function(){
      return m( 'div', {
        config : function(){
          for( var i = 0; i < observers.length; i++ )
            observers[ i ].disconnect()
          
          observers.length = 0
        }
      } )
    }
  } )

  var m_render = m.render

  m.render = function( root ){
    var observer = new MutationObserver( function( mutations ){
      for( var i = 0; i < mutations.length; i++ )
        console.log( mutations[ i ] )
    } )
    
    observer.observe( root, config )
  
    observers.push( observer )
    
    return m_render.apply( this, arguments )
  }
}() );
