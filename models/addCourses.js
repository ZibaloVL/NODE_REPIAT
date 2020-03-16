const uniqid = require('uniqid')
const path = require('path')
const fs = require('fs')

class addCourses {
  constructor( payload ) {
    this.course = payload.nameCourse
    this.price = payload.priceCourse
    this.img = payload.imgUrlCourse
    this.id =  uniqid.time()
  }

  async saveCourse () {
    const courseAll = await this.readAllCourse ()
    console.log('courses: ', JSON.parse (courseAll) )
  }

  readAllCourse () {    
    return new Promise ( 
      (resolve, reject) => {
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
}

module.exports = addCourses