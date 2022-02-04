const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review }