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
  image: {
    type: String
  }

  async saveCourse () { 
    const getCourses = await Course.readAllCourse ()
    const courseAll = JSON.parse ( getCourses )
    courseAll.push({
      id: this.id,
      course: this.course,
      price: this.price,
      img: this.img 
    })
    return new Promise (
      (resolve, reject) => {
        fs.writeFile ( 
          path.join ( __dirname, '..', 'data', 'courses.json'),
          JSON.stringify ( courseAll ),
          ( err ) => {
           if ( err ) { reject ( err )}
            else { resolve ( console.log ('write  resolveOK') ) } 
           }  
        )
      }
    )
  }

  static async getById (id) {
    const courses = JSON.parse ( await Course.readAllCourse () )
    return courses.find( c => c.id === id )
  }
}

<<<<<<< HEAD
module.exports = model ( 'CourseRepiad', course ) // make model/ his want constructor param of shema
=======
module.exports = Course
>>>>>>> parent of 467b1ba... make add course in db
