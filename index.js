const express = require( 'express' )
const path = require( 'path' )
const mongoose = require( 'mongoose' )
const exphbs = require( 'express-handlebars' )
const session = require ( 'express-session' )
MongoStore = require( 'connect-mongodb-session' )(session) // for session in mongo db


const varMiddleware = require( './middleware/variables' )
const userMidlewear = require ( './middleware/user' )

// =====ADD ROUTE PAGE=====
const homeRoutes = require( './routes/home' )
const cardRoutes = require( './routes/card' )
const addRoutes = require( './routes/add' )
const ordersRoutes = require( './routes/orders' )
const coursesRoutes = require( './routes/courses' )
const authRoutes = require( './routes/auth' )
// ===== end ADD ROUTE PAGE=====


//------ KEYS
const MONGODB_URI = `mongodb+srv://fotoroom:kuEifC50kGaGa0pN@nodeshoplearn-fif3b.gcp.mongodb.net/shopRepiat`
// ----
const app = express()

// make layout
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

//---- param for session store
const store = new MongoStore({
  collection: 'sessions',  // place in mongo where save seeion 
  uri: MONGODB_URI
})
//---- end param for session store

// make engine app
app.engine('hbs', hbs.engine)
// registration engine
app.set('view engine', 'hbs')
// set map for views
app.set('views', 'views')



//static map registr
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'keyboard nusha',
  resave: false,
  saveUninitialized: false, // in tutorial true
  store: store 
  // cookie: { secure: true }
}))

//----session param


app.use ( varMiddleware )
console.log ('mid')
app.use ( userMidlewear )

//----end session param




//----registration page----
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)
//----end registration page----


// name db fotoroom 
// par db kuEifC50kGaGa0pN
const PORT = process.env.PORT || 3000

async function start() {
  try {
    await mongoose.connect( MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
/*
    const candidate = await User.findOne()
    if (!candidate) {
      const user = new User({
        email: 'fotoroom.md@gmail.com',
        name: 'Slava',
        cart: {items: []}
      })
      await user.save()
    }
*/   
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()


