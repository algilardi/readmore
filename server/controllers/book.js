const User = require('../models/user');
const Book = require('../models/book');

exports.getTopBooks = (req, res, next) => {
    let highestRatedBooks, mostPopularBooks;
    Book.find({}).sort({avgRating:-1}).limit(10).exec((err, highestBooks) => {
        Book.find({}).sort({totalUsers:-1}).limit(10).exec((err, popularBooks) => {
            res.send({
                highestRatedBooks: highestBooks.filter(book => book.avgRating !== 0),
                mostPopularBooks: popularBooks.filter(book => book.totalUsers !== 0)
            });
        });
    });
};

exports.addBook = (req, res, next) => {
    const volumeID = req.body.volumeID;
    const title = req.body.title;
    const email = req.body.email;
    const status = req.body.status;
    let rating = req.body.rating;
    rating = (rating === 'none') ? 0 : Number.parseInt(rating);

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

exports.updateBook = (req, res, next) => {
    const volumeID = req.body.volumeID;
    const title = req.body.title;
    const email = req.body.email;
    const status = req.body.status;
    const oldStatus = req.body.activeList;
    let rating = req.body.rating;
    let oldRating = req.body.oldRating;

    const newUserBook = {
        title: title,
        volumeID: volumeID,
        rating: rating
    };

    // Updates book arrays on user
    User.findOne({email: email}, (err, existingUser) => {
        let newArr = existingUser[oldStatus].filter(book => book.volumeID !== volumeID);
        existingUser[oldStatus] = newArr.slice();
        existingUser[status].push(newUserBook);
        existingUser.save(err => {if (err) console.log(err);} );
    });

    // Updates book document itself
    rating = (rating === 'none') ? 0 : Number.parseInt(rating);
    oldRating = (oldRating === 'none') ? 0 : Number.parseInt(oldRating);

    Book.findOne({ volumeID: volumeID }, (err, existingBook) => {
        if (err) { return next(err); }

        // Add new rating
        if (rating !== 0) {
            existingBook.totalUsers++;
            existingBook.ratingSum += rating;
        }
        if (oldRating !== 0) {
            existingBook.totalUsers--;
            existingBook.ratingSum -= oldRating;
        }
        existingBook.avgRating = existingBook.ratingSum / existingBook.totalUsers;

        existingBook.save( err => {if (err) return next(err);} );

    });
};

exports.deleteBook = (req, res, next) => {
    const volumeID = req.body.volumeID;
    const title = req.body.title;
    const email = req.body.email;
    const activeList = req.body.activeList;
    let rating = req.body.rating;
    rating = (rating === 'none') ? 0 : Number.parseInt(rating);

    // Updates book arrays on user
    User.findOne({email: email}, (err, existingUser) => {
        let newArr = existingUser[activeList].filter(book => {return book.volumeID !== volumeID;});
        existingUser[activeList] = newArr.slice();
        existingUser.save(err => {if (err) console.log(err);} );
    });

    // Updates rating on book
    // Don't bother deleting a book with 0 users
    Book.findOne({volumeID: volumeID}, (err, existingBook) => {
        if (err) { return next(err); }

        if (rating !== 0) {
            existingBook.totalUsers--;
            existingBook.ratingSum -= rating;
        }

        existingBook.avgRating = (existingBook.totalUsers === 0) ? 0 : existingBook.ratingSum / existingBook.totalUsers;
        existingBook.save( err => {if (err) return next(err);} );
    });
};
