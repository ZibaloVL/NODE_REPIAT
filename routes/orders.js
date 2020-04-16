const { Router } = require('express')
router = Router ()

router.get ('/', ( req, res) => {
    res.render ( 'orders', 
        {
            title: 'Orders',
            isOrders: true,
            orders: 'Page orderss'
        }
    )
})


module.exports = router