const toCurrency = price => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(price)
}

document.querySelectorAll('.price').forEach(node=>{
  node.textContent = toCurrency( node.textContent )
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
        return res.json() //не приходит в тело card
      })
      .then( card => {
        console.log ( 'card in app:', card )
        if ( card.courses.length ) {
          const html = card.courses.map ( c=> {
            return `
            <tr>
            <td>${c.title}</td>
            <td>${c.price}</td>
            <td>${c.count}</td>
            <td>
              <button class="btn btm-small js-remove cardRemove" data-id="${c.id}">Удалить</button>
            </td>
          </tr>
            `
          }).join('')
          let sum = 0
          card.courses.forEach( e => {
            sum += e.count*e.price
          })
          console.log('sum=', sum)
          cards.querySelector('tbody').innerHTML = html
          cards.querySelector('.price').textContent = toCurrency( sum )
        } else {
          cards.innerHTML = "<h2>cart is empty</h2>"
        }
      } ) 
    }
  })
}