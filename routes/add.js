const { Router } = require ( 'express' )
const Course = require ( '../models/Course' )
router = Router ()


router.get ('/', ( req, res ) => {
  res.render ( 'add',
    {
      title: 'Add course',
      isAdd: true
    }
  )
})

router.post ( '/', async ( req, res ) => {
    console.log( req.body )
    const course = new Course (
      {
        title: req.body.nameCourse,
        price: req.body.priceCourse,
        img: req.body.imgUrlCourse
      }
    )
    try {
      await course.save() // standart metod in mongoose
      res.redirect ( '/' )
    }
    catch ( error ) {
      console.log ( 'error in records' )
      console.log ( error )
    }
  }  
)


module.exports = router