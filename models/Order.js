const {Schema, model} = require ( 'mongoose' )



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
            type: Schema.Types.ObjectId,
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
