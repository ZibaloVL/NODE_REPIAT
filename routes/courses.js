const { Router } = require('express')
const Course = require ( '../models/Course' )
router = Router ()

router.get ( '/', async ( req, res ) => {
  const AllCourses = await Course.readAllCourse ()
  res.render ( 'courses', 
    {
      title: 'Courses',
      isCourses: true,
      AllCourses: JSON.parse ( AllCourses )
    }
  )
})

router.get('/:id', async (req, res) => {
  const courseById = await Course.getById ( req.params.id )
  console.log ('courseById', courseById)
  res.render( 'course', 
    {
      layout: 'empty', // new layout
      title: `Coorse ${ courseById.course }` ,
      course: courseById
    }
  )
})

module.exports = router