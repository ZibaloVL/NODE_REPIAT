const { Router } = require('express')
const addCourses = require ( '../models/addCourses' )
router = Router ()

router.get ( '/', async ( req, res ) => {
  const course = new addCourses ( req.body )
  const AllCourses = await course.readAllCourse ()
  res.render ( 'courses', 
    {
      title: 'Courses',
      isCourses: true,
      AllCourses: JSON.parse ( AllCourses )
    }
  )
})

module.exports = router