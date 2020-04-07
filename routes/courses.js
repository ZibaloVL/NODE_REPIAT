const { Router } = require('express')
const Course = require ( '../models/Course' )
router = Router ()

router.get ( '/', async ( req, res ) => {
  const AllCourses = await Course.find ()
  // console.log ('AllCourses:',AllCourses)
  res.render ( 'courses', 
    {
      title: 'Courses',
      isCourses: true,
      AllCourses
    }
  )
})

router.get ('/:id/edit', async ( req, res ) => {
  if ( !req.query.admission ) {
    res.redirect( '/' )
  }
  const course = await Course.findById ( req.params.id )
  res.render ( 'course-edit', 
    {
      title: `Edit course ${course.course}`,
      course : course
    }
  )
})

router.post ( '/edit', async ( req, res ) => {
  console.log( 'req.body', req.body )
  const id = req.body.id
  delete req.body.id
  console.log ('req.body', req.body )
  console.log ('{id}', id )
  try {
    await Course.findByIdAndUpdate ( { _id: `${id}`}, req.body )
    res.redirect('/courses')  
  } catch (error) {
    console.log('not redaction element')
    console.log ( error )
  }
})

router.get ( '/:id', async ( req, res ) => {
  const courseById = await Course.findById ( req.params.id )
  res.render ( 'course', 
    {
      layout: 'empty', // new layout
      title: `Coorse ${ courseById.course }` ,
      course: courseById
    }
  )
})

module.exports = router