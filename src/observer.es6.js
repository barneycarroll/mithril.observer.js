import m from 'mithril'

const roots     = new Set()
const observers = new Set()

const config    = {
  childList             : true,
  attributes            : true,
  characterData         : true,
  subtree               : true,
  attributeOldValue     : true,
  characterDataOldValue : true,
  attributeFilte        : true
}

const methods   = {}

{
  [ 'mount','route' ].forEach( key => {
  	const method = m[ key ]
  
    methods[ key ] = function( root ){
      if( root.nodeType ){
        for( let observer of observers )
          observer.disconnect()

        roots.add( root )
      }

      return method( ...arguments )
    }
  } )
}

m.mount( document.createElement( 'div' ), {
  view : () => {
    observers.clear()

    for( let root of roots ){
    	const observer = new MutationObserver( mutations =>      
        mutations.forEach( mutation => console.log( mutation ) )
      )
      
      observer.observe( root, config )
      
      observers.add( observer )
    }

    m( 'div', {
      config : () => {
        for( let observer of observers )
          observer.disconnect()
      }
    } )
  }
} )

export default Object.assign( m, methods )
