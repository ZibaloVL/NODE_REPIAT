const { Schema, model } = require( 'mongoose')

// make shema of db
const course = new Schema ({
  title: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  img: {
    type: String,
    require: true
  }
})


module.exports = model ( 'CourseRepiad', course ) // make model/ his want constructor param of shema