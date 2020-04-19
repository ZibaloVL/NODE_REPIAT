const { Router } = require ( 'express' )
const User = require('../models/User')
const  bcrypt = require('bcryptjs') // shifr parol
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
    const { email, password } = req.body
    try {
        const candidate = await User.findOne ( {email} )
        if ( candidate ) {
            const areSame = bcrypt.compare ( password, candidate.password )

            if ( areSame ) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save ( ( err ) => { //need for posledovatelnost redirect
                        if ( err ) { throw ( err ) }
                        res.redirect ( '/' )
                    }
                )
            } else {
                res.redirect('/auth/login#login')    
            }    
        } else {
            res.redirect('/auth/login#login')
        }
    } catch (error) {
        console.log ('error in login candidate', error )
    }    
})


router.post ( '/register', async ( req, res ) => {
    const {name, email, password, confirm } = req.body
    try {
        const candidate = await User.findOne ( { email } )
        if ( candidate ) {
            res.redirect('/auth/login#register')    
        } else {
            if ( password === confirm ) {
                const passwordHash = await bcrypt.hash( password, 10 )
                const user = new User ({
                    name, email, password: passwordHash, cart: { items: [] }
                })
                await user.save()
                res.redirect ( '/auth/login' )
            }
        }
    } catch ( error ) {
        console.log( error )
        // res.redirect('/auth/login#register')
    }
})



module.exports = router