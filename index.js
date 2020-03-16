const express = require('express')
const path = require('path')
const exphbs  = require('express-handlebars')

// =====ADD ROUTE PAGE=====
const homePage = require('./routes/home')
const coursesPage = require('./routes/courses')
const addPage = require('./routes/add')
// ===== end ADD ROUTE PAGE=====
const app = express()
// make layout
const hbs = exphbs.create(
  {
    defaultLayout: 'main',
    extname: 'hbs'
  }
)
// make engine app
app.engine('hbs', hbs.engine)
// registration engine
app.set('view engine', 'hbs')
// set map for views
app.set('views','views')

app.use(express.static('public'))

app.use(express.urlencoded({
  extended: true
}))
//----registration page----
app.use('/', homePage)
app.use('/courses', coursesPage)
app.use('/add', addPage)
//----end registration page----


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server  is running on port ${PORT}`)
})