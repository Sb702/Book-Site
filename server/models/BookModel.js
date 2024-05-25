const mongoose = require('mongoose');



const BookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    authors: {
        type: [String],
    },
    description: {
        type: String,
    },
    userID: {
        type: String,
        required: true
    },
});

const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;