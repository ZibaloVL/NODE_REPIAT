const path = require( 'path' )
const fs = require( 'fs' )

class Card {
  
  static async addCoursInCard ( course ) {
    const card = await Card.fetch ()
    console.log ( 'course', course )
    console.log ( 'card', card )

    const indx = card.courses.findIndex ( i => i.id === course.id )
    if ( indx >= 0 ) {
      card.courses[ indx ].count = Number ( card.courses[ indx ].count ) + 1
      card.sum += Number ( course.price )
    } else {
      console.log ( 'typeof ( course )', typeof ( course ))
      course['count'] = 1
      card.courses.push( course )
      card.sum += Number ( course.price )
    }
    await Card.writeCard ( card )
    
  } 

  static async removeCourse ( id ) {
    const card = await Card.fetch ()
    console.log ( 'card1:', card )
    const idx = card.courses.findIndex ( c => c.id === id)
    console.log ( 'card.courses[ idx ].count=', card.courses[ idx ].count )
    card.sum -= Number ( card.courses[ idx ].price )  
    if ( card.courses[ idx ].count > 1 ) {
      card.courses[ idx ].count-- 
    } else {
      card.courses = card.courses.filter ( c => c.id != id ) 
      console.log ( 'cardf:', card )
    }
    await Card.writeCard ( card )
  }  

  static async writeCard ( card ) {
    //write data in card.json
    return new Promise ( ( resolve, reject ) => {
        fs.writeFile (
          path.join ( __dirname, '..', 'data', 'Card.json' ),
          JSON.stringify ( card ),
          ( err ) => {
            if ( err ) { reject ( err ) }
              else {
                resolve ( console.log ('good write card'))
              }
          }
        )
      }
    )
  }

  static fetch () {
    return new Promise( ( resolve, reject ) => {
      fs.readFile( path.join ( __dirname, '..', 'data', 'Card.json' ),
        'utf8',
        ( err, content ) => {
          if ( err ) { reject (err)
          } else { resolve ( JSON.parse ( content ) ) }
        })
      }
    )
  }

  
}

module.exports = Card