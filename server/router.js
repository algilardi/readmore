const Auth = require('./controllers/auth');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {

	app.get('/', requireAuth, (req, res) => {
		res.send({ message: 'I like memes' });
	});

	app.post('/login', requireSignin, Auth.login);
	app.post('/register', Auth.register);

};
