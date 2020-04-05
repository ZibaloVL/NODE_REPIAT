document.querySelectorAll('.price').forEach(node=>{
  node.textContent = new Intl.NumberFormat ('ru-Ru', {
    currency: 'rub',
    style: 'currency'
  }).format (node.textContent)
}) 

const cards = document.querySelector('.card')
const tbodyCard = document.querySelector ( '.tbodyCard' )


if ( cards ) {
  cards.addEventListener ( "click", ( event ) => {
    if ( event.target.classList.contains ( 'cardRemove' ) ) {
      const id = event.target.dataset.id 
      fetch ('card/remove/' + id, {
        method: 'delete' 
      })
      .then( res => {
        console.log (res)
        return res.json() 
      })
      .then( card => {
        console.log ( 'card in app:', card )
        if ( card.courses.length  > 0 ) {
          console.log( 'card.courses.length=', card.courses.length ) 
          const  innerHtmltbodyCard = card.courses.map ( e =>
            ` <tr>
                <td scope="row">${e.course}</td>
                <td>${ e.price }</td>
                <td>${ e.count }</td>
                <td>
                  <button 
                    type="submit"
                    name=""
                    id=""
                    class="btn  waves-effect waves-light btn-primary cardRemove"
                    data-id="${ e.id }" 
                    >  -
                  </button>
                </td>
              </tr>
            `             
          ).join('')
            console.log ( 'innerHtmltbodyCard_end', innerHtmltbodyCard )
            console.log ( 'tbodyCard', tbodyCard )
            tbodyCard.innerHTML = innerHtmltbodyCard
        } else {
          console.log ( 'remove' )
          cards.innerHTML = "<h2>cart is empty</h2>"
        }
      } ) 
    }
  })
}