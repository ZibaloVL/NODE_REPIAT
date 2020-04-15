const { Router } = require( 'express' )
const Course = require ( '../models/Course' )
const User = require ( '../models/User' )
router = Router ()

router.get ( '/', async ( req, res ) => {
  /*const AllInCard = await Card.fetch ()
  res.render ( 'card', 
    {
      title: 'Card',
      isCard: true,
      courses: AllInCard.courses,
      sum: AllInCard.sum
    }
  )*/
  res.json('get/')
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