const { Router } = require ( 'express' )
router = Router ()

router.get( '/', async ( req, res ) => {
        res.render( 'auth/login',
        {
            isLogin: true,
            title: 'Enter'
        })
    }
)


module.exports = router