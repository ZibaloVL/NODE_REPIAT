const { Router } = require('express')
router = Router()

router.get('/', (req,res) => {
  res.render('courses', 
    {
      title: 'Courses',
      isCourses: true
    }
  )
})

module.exports = router