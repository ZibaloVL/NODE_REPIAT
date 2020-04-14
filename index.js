const express = require( 'express' )
const path = require( 'path' )
const exphbs  = require( 'express-handlebars' )
const mongoose = require( 'mongoose')

// =====ADD ROUTE PAGE=====
const homePage = require('./routes/home')
const coursesPage = require('./routes/courses')
const addPage = require('./routes/add')
const card = require('./routes/card')
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
app.use('/card', card)
//----end registration page----

// name db fotoroom 
// par db kuEifC50kGaGa0pN



async function start() {
  // const url = `mongodb+srv://fotoroom:kuEifC50kGaGa0pN@nodeshoplearn-fif3b.gcp.mongodb.net/test?retryWrites=true&w=majority`
  const url = `mongodb+srv://fotoroom:kuEifC50kGaGa0pN@nodeshoplearn-fif3b.gcp.mongodb.net/shopRepiat`
  try {
    await mongoose.connect( url , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
    console.log(`server  is running on port ${PORT}`)
})

  } catch (error) {
     console.log (error) 
  }
}

start()
