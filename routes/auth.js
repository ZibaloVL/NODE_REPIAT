const { Router } = require ( 'express' )
const User = require('../models/User')
router = Router ()

router.get ( '/login', async ( req, res ) => {
        res.render( 'auth/login',
        {
            isLogin: true,
            title: 'Enter'
        })
    }
)
router.get ( '/logout', async ( req, res ) => {
    req.session.destroy ( () => {
        res.redirect( '/auth/login#login' )
    })
})


router.post ( '/login' , async ( req, res ) => {


    const user = await User.findById('5e99b5dee82be42a18cf90ea')
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save ( ( err ) => { 
        if ( err ) { throw ( err ) }
        res.redirect ( '/' )
    })
    
})



module.exports = router