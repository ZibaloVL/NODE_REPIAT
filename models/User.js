const { Schema, model } = require( 'mongoose')
userShema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items:[{
      count: {
        type: Number,
        required: true,
        defoult: 1
      },
      courseId: {
        type: Schema.Types.ObjectId,
        ref:'CourseRepiad',
        required: true
      }
    }]
  }
})

module.exports = model ( 'User', userShema ) // make model/ his want constructor param of shema