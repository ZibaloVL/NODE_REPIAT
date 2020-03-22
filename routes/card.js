const { Router } = require( 'express' )
const Card = require ( '../models/Card' )
const Course = require ( '../models/Course' )
router = Router ()

router.get ( '/', async ( req, res ) => {
  const AllInCard = await Card.fetch ()
  console.log('AllInCard.courses', AllInCard.courses)
  res.render ( 'card', 
    {
      title: 'Card',
      isCard: true,
      courses: AllInCard.courses,
      sum: AllInCard.sum
    }
  )
})

router.delete ('/remove/:id', async ( req, res ) => {
    const card = Card.removeCourse( req.params.id )
    console.log ('status 3000')
    res.status(200).json(card)
  }
)

router.post('/', async ( req, res ) => {
    const course = await Course.getById ( req.body.id )
    await Card.addCoursInCard ( course )
    res.redirect( '/' )
  }
)

module.exports = router