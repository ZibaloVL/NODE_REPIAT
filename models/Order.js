const {Schema, model} = require('mongoose')


orderShema = new Schema({
    courses: [{
        course: {
            type: Object,
            require: true
        },
        count: {
            type: Number,
            require: true
        }
    }],
    user: {
        name: String,
        userId: {
            type: userShema.Types.Object,
            ref: 'User',
            require: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})





module.exports = model ('Orer', orderShema)
/*
_id orders
last date 
id user
course :[
    {
        id course,
        count: min 1
    }
]
*/

