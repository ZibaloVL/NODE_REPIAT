const path = require( 'path' )
const fs = require( 'fs' )

class Card {
  
  static async addCoursInCard ( course ) {
    const card = await Card.fetch ()
    
    const indx = card.courses.findIndex ( i => i.id === course.id )
    if ( indx >= 0 ) {
      card.courses[ indx ].count = Number ( card.courses[ indx ].count ) + 1
      card.sum += Number ( course.price )
    } else {
      course['count'] = 1
      card.courses.push( course )
      card.sum += Number ( course.price )
    }
    await Card.writeCard ( card )  
  } 

  static async removeCourse ( id ) {
    const card = await Card.fetch ()
    const idx = card.courses.findIndex ( c => c.id === id)
    card.sum -= Number ( card.courses[ idx ].price )  
    if ( card.courses[ idx ].count > 1 ) {
      card.courses[ idx ].count-- 
    } else {
      card.courses = card.courses.filter ( c => c.id != id ) 
    }
    return await Card.writeCard ( card )
  }  

  static async writeCard ( card ) {
    return new Promise ( ( resolve, reject ) => {
        fs.writeFile (
          path.join ( __dirname, '..', 'data', 'Card.json' ),
          JSON.stringify ( card ),
          ( err ) => {
            if ( err ) { reject ( err ) }
              else {
                resolve ( card )
              }
          }
        )
      }
    )
  }

  static fetch () {
    return new Promise( ( resolve, reject ) => {
      fs.readFile( path.join ( __dirname, '..', 'data', 'Card.json' ),
        'utf-8',
        ( err, content ) => {
          if ( err ) { reject (err)
          } else { resolve ( JSON.parse ( content ) ) }
        })
      }
    )
  }

  
}

module.exports = Card