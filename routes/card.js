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
    summ+= element.courseId.price*element.count
  });
  return summ
}

router.get ( '/', async ( req, res ) => {
  const user = await req.user
    .populate ( 'cart.items.courseId' )
    .execPopulate()
    res.render ( 'card', 
      {
        title: 'Card',
        isCard: true,
        courses: AllInCard (user.cart.items),
        sum: summCart (user.cart.items)
      }
    )
})

router.delete ('/remove/:id', async ( req, res ) => {
  await req.user.removeCourseFromCart (req.params.id)
  const user = await req.user
    .populate ( 'cart.items.courseId' )
    .execPopulate()
    const card = {
      title: 'Card',
      isCard: true,
      courses: AllInCard (user.cart.items),
      sum: summCart (user.cart.items)
    }
    console.log ( 'card', card )
    res.status(200).json(card) // не передаётся в тело card atributs?
  }
)

router.post('/', async ( req, res ) => {
    const course = await Course.findById ( req.body.id )
    try {
      await req.user.addToCart( course )
      res.redirect( '/' ) 
    } catch ( error ) {
      console.log ( error )
    }
  }
)

module.exports = router