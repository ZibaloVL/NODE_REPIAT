const uniqid = require('uniqid')
const path = require('path')
const fs = require('fs')




class Course {
  constructor( payload ) {
    this.course = payload.nameCourse
    this.price = payload.priceCourse
    this.img = payload.imgUrlCourse
    this.id =  uniqid.time()
  }

  static async editCourse ( course ) {
    const courses = JSON.parse ( await Course.readAllCourse() )
    const idx = courses.findIndex ( c => c.id === course.id )
    courses [ idx ] = course

    return new Promise (
      (resolve, reject) => {
        fs.writeFile ( 
          path.join ( __dirname, '..', 'data', 'courses.json'),
          JSON.stringify ( courses ),
          ( err ) => {
           if ( err ) { reject ( err )}
            else { resolve ( console.log ('write  resolveOK') ) } 
           }  
        )
      }
    )
  }

  static readAllCourse () {    
    return new Promise ( 
      ( resolve, reject ) => {
        fs.readFile ( 
          path.join ( __dirname, '..', 'data', 'courses.json'),
          'utf8',
          ( err, contents ) => { 
            if ( err ) { reject ( err ) } 
              else { 
                resolve ( contents ) 
            }
          }
        )
      }
    )
  }

  async saveCourse () { 
    const getCourses = await Course.readAllCourse ()
    console.log('courses: ',  )
    const courseAll = JSON.parse ( getCourses )
    courseAll.push({
      id: this.id,
      course: this.course,
      price: this.price,
      img: this.img 
    })
    console.log('courseAll', courseAll)
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

module.exports = Course