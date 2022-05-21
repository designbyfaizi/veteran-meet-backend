const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const communitySchema = new Schema({
    communityName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    communityEmail: {
        type: String,
        required: true
    },
    communityPassword: {
        type: String,
        required: true
    },
    followers:[
        {
            followerId: {
                type: Schema.Types.ObjectId,
                ref: 'Veteran',
                strict: true
            }
        },
    ]
});

module.exports = mongoose.model('Community', communitySchema);