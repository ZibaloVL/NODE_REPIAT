const { Router } = require( 'express' )
const Course = require ( '../models/Course' )
const User = require ( '../models/User' )
router = Router ()

function AllInCard (items) { 
  return items.map ( item => (
    {
      title: item.courseId.title,
      id: item.courseId._id,
      price: item.courseId.price,
      count: item.count
    } 
  ))
}
function summCart (items) {
  let summ = 0
  items.forEach(element => {
    console.log (element.courseId.price)
    console.log (element.count)
    summ+= element.courseId.price*element.count
  });
  return summ
}

router.get ( '/', async ( req, res ) => {
  const user = await req.user
    .populate ( 'cart.items.courseId' )
    .execPopulate()

  console.log ('user', user.cart.items)  
    res.render ( 'card', 
      {
        title: 'Card',
        isCard: true,
        courses: AllInCard (user.cart.items),
        sum: summCart (user.cart.items)
      }
    )
 // res.json('get/')
})

router.delete ('/remove/:id', async ( req, res ) => {
    const card = await Card.removeCourse( req.params.id )
    console.log ('card_delete',card )
    res.status(200).json(card) // не передаётся в тело card
  }
)

router.post('/', async ( req, res ) => {
    const course = await Course.findById ( req.body.id )
    console.log ( 'req.user', req.user )
    try {
      await req.user.addToCart( course )
      res.redirect( '/' ) 
    } catch ( error ) {
      console.log ( error )
    }
  }
)

module.exports = router