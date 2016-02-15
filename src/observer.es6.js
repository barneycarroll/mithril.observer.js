import m from 'mithril'

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

m.mount( document.createElement( 'div' ), {
  view : () =>
    m( 'div', {
      config : () => {
        for( let observer of observers )
          observer.disconnect()
        
        observers.clear()
      }
    } )
} )

const m_render = m.render

export default Object.assign( m, {
  render( root ){
    const observer = new MutationObserver( mutations => 
      mutations.forEach( mutation => console.log( mutation ) )
    )
    
    observer.observe( root, config )
  
    observers.add( observer )
    
    return m_render( ...arguments )
  }
} )
