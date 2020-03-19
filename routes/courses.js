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

router.get ('/:id/edit', async ( req, res ) => {
  if ( !req.query.admission ) {
    res.redirect( '/' )
  }
  const course = await Course.getById ( req.params.id )
  res.render ( 'course-edit', 
    {
      title: `Edit course ${course.course}`,
      course : course
    }
  )
})

router.post ( '/edit', async ( req, res ) => {
  await Course.editCourse ( req.body )
  res.redirect('/courses')
})

router.get ( '/:id', async ( req, res ) => {
  const courseById = await Course.getById ( req.params.id )
  res.render ( 'course', 
    {
      layout: 'empty', // new layout
      title: `Coorse ${ courseById.course }` ,
      course: courseById
    }
  )
})

module.exports = router