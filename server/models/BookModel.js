const mongoose = require('mongoose');



const BookSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    book: {
        type: Object,
        required: true
    }
});

const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;