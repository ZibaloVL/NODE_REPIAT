const { Router } = require ( 'express' )
const addCourses = require ( '../models/addCourses' )
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
  const course = new addCourses ( req.body )
  course.saveCourse ()
  res.redirect ( '/' )
}
)

module.exports = router