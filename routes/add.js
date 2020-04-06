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
     // include metod in mongoose
    try {
      await course.save()
      res.redirect ( '/' )
    } catch ( error ) {
      console.log ( 'error in records' )
      console.log ( error )
    }
    /*
    const course = new Course ( req.body )
    course.saveCourse ()
      .then ( () => res.redirect ( '/' ))
  */
  }  
)


module.exports = router