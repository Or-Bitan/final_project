const mongoose = require('mongoose');
const User = require('../module/users')

const costSchema = new mongoose.Schema({


    user_id: {
        type: Number,
        required: true,
        ref: 'User'
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        enum: ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'],
        required: true

    }
});
/*
costSchema.pre('save', function(next) {
    const cost = this;
    User.findOne({ id: cost.user_id }, (err, user) => {
        if (err) return next(err);
        user.totalCosts = (user.totalCosts || 0) + cost.sum;
        user.save((err) => {
            if (err) return next(err);
            next();
        });
    });
});

*/




const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;
