const UserBook = require('../models/BookModel');

exports.getBooks = async (req, res) => {
    const userID = req.params.id;
    console.log(userID)
    
    try {
        const books = await UserBook.find({userID: userID});
        res.send(books);
    }
    catch (err) {
        res.send(err)
    }
}

