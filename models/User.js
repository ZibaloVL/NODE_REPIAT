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

userShema.methods.addToCart = function ( course ) {

  const items = [...this.cart.items]
  console.log ( 'items', items )
  
  const ind = items.findIndex ( i => i.courseId.toString() === course._id.toString() )
  console.log ( 'ind', ind )
  if ( ind != -1) { 
    items[ ind ].count += 1
  } else {
    items.push({
      courseId: course._id,
      count: 1
    })
  }
  this.cart = {
    items
  }
  return this.save()
  // save _id in object items ????
}


module.exports = model ( 'User', userShema ) // make model/ his want constructor param of shema