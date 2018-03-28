const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    volumeID: String,
    title: String,
    totalUsers: Number,
    ratingSum: Number,
    avgRating: Number
});

module.exports = mongoose.model('book', bookSchema);
