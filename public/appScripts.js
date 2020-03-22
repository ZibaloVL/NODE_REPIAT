console.log('script')
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
      .then( response => response.json())
      .then ( card => console.log ( card ) ) 
    }
  })
}