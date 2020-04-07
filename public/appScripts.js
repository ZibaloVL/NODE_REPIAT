document.querySelectorAll('.price').forEach(node=>{
  node.textContent = new Intl.NumberFormat ('ru-Ru', {
    currency: 'rub',
    style: 'currency'
  }).format (node.textContent)
}) 

const cards = document.querySelector('.card')


if ( cards ) {
  cards.addEventListener ( "click", ( event ) => {
    if ( event.target.classList.contains ( 'cardRemove' ) ) {
      const id = event.target.dataset.id 
      fetch ('card/remove/' + id, {
        method: 'delete' 
      })
      .then( res => {
        console.log (res)
        res.json() //не приходит в тело card
      })
      .then( card => {
        console.log ( 'card in app:', card )
        if ( card.courses.length ) {
          console.log ('change')
        } else {
          cards.innerrHTML = "<h2>cart is empty</h2>"
        }
      
      } ) 
    }
  })
}