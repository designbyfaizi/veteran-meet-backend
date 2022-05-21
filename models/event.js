const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventHobby: {
        type: String,
        required: true
    },
    expendedStars:{
        type: Number,
        default: 0
    },
    totalStars: {
        type: Number,
        required: true,
        max: 5000
    },
    date:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);