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

router.post ( '/', ( req, res ) => {
  console.log( req.body )
  const course = new Course ( req.body )
  course.saveCourse ()
    .then ( () => res.redirect ( '/' ))
}
)

module.exports = router