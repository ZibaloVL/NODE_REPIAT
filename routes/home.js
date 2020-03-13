const { Router } = require('express')
router = Router()

router.get('/', (req, res) => {
  res.render('index',
    {
      title: 'Home page',
      isMain: true
    }
  )
})


module.exports = router