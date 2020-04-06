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
    type: String
  }
})


module.exports = model ( 'Course', course ) // make model/ his want constructor param of shema