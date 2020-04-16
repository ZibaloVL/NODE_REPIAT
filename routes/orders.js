const { Router } = require('express')
const Order = require ( '../models/Order' )

router = Router ()

router.get ('/',async( req, res) => {
    try {
        const orders = await Order.find ( 
            {'user.userId': req.user._id} 
        )
        .populate( 'user.userId' )
        console.log ( 'orders', orders )

        res.render ( 'orders', 
        {
            title: 'Orders',
            isOrders: true,
            orders: orders.map ( o => {
                return {
                    ...o._doc,
                    price: o.courses.reduce( ( total, c ) => {
                        return total += c.count * c.course.price
                    })
                }
            })
        }
    )
    } catch (error) {
        console.log ( error )
    }
})

router.post('/', async ( req, res ) => {
    try {
        user =  await req.user
            .populate ( 'cart.items.courseId')
            .execPopulate ()

        const coursesInOrder = user.cart.items.map (
            i => ({
                count: i.count,
                course: {
                    ...i.courseId._doc //_doc need for unshifr object
                }
            })
        )
    /*       
        console.log ( 'coursesInOrder', coursesInOrder )
        console.log ('req.user', req.user)
    */    
        const order = new Order ( {
            user: {
                name: req.user.name,
                userId: req.user
            },
            courses: coursesInOrder,
        })
        await order.save()
        await req.user.cleanCart()

        res.redirect ( '/orders' )  
    } catch (error) {
        console.log ( error )
    }
})


module.exports = router