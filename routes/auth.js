const { Router } = require ( 'express' )
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
    req.session.isAuthenticated = true
    res.redirect ( '/' )
})



module.exports = router