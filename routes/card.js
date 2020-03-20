const { Router } = require( 'express' )
const Card = require ( '../models/Card' )
const Course = require ( '../models/Course' )
router = Router ()

router.get ( '/', async ( req, res ) => {
  
  res.render ( 'card', 
    {
      title: 'Card',
      isCard: true, // mast be make navbar
    }
  )
})

router.post('/', async ( req, res ) => {
    const course = await Course.getById ( req.body.id )
    await Card.addCoursInCard ( course )
    res.redirect( '/' )
  }
)



module.exports = router