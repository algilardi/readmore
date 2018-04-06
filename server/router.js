const Auth = require('./controllers/auth');
const Book = require('./controllers/book');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
	app.post('/login', requireSignin, Auth.login);
	app.post('/register', Auth.register);
	app.get('/getData', Auth.getData);

	app.get('/getTopBooks', Book.getTopBooks);
	app.post('/addBook', Book.addBook);
	app.post('/updateBook', Book.updateBook);
};
