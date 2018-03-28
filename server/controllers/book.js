const User = require('../models/user');
const Book = require('../models/book');

exports.getTopBooks = (req, res, next) => {
    let highestRatedBooks, mostPopularBooks;
    Book.find({}).sort({avgRating:-1}).limit(10).exec((err, highestBooks) => {
        Book.find({}).sort({totalUsers:-1}).limit(10).exec((err, popularBooks) => {
            res.send({highestRatedBooks: highestBooks, mostPopularBooks: popularBooks});
        });
    });
};

exports.addBook = (req, res, next) => {
    const volumeID = req.body.volumeID;
    const title = req.body.title;
    const email = req.body.email;
    const status = req.body.status;
    let rating = req.body.rating;

    // Update User's books
    // User will always exist since it is a requirement for addbook btn
    const newBook = {
        title: title,
        volumeID: volumeID,
        rating: rating
    };

    if (status === "completed") {
        User.findOneAndUpdate({ email: email }, {$push: {completed: newBook}}, err => {if (err) return next(err);});
    }
    if (status === "reading") {
        User.findOneAndUpdate({ email: email }, {$push: {reading: newBook}}, err => {if (err) return next(err);});
    }
    if (status === "planToRead") {
        User.findOneAndUpdate({ email: email }, {$push: {planToRead: newBook}}, err => {if (err) return next(err);});
    }


    Book.findOne({ volumeID: volumeID }, (err, existingBook) => {
        if (err) { return next(err); }
        if (rating === 'none')
            rating = 0;
        else
            rating = Number.parseInt(rating);

        // If book found --> Update Book stats if rating was left
        if (existingBook) {
            if (rating !== 0)
                existingBook.totalUsers++;
            existingBook.ratingSum += rating;
            existingBook.avgRating = existingBook.ratingSum / existingBook.totalUsers;

            existingBook.save( err => {if (err) return next(err);} );
        }
        // Otherwise Add entry for that book to DB
        else {
            const newBook = new Book({
                volumeID: volumeID,
                title: title,
                totalUsers: 1,
                ratingSum: rating,
                avgRating: rating
            });

            newBook.save( err => {if (err) return next(err);} );
        }
    });
};
