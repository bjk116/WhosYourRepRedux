var axios = require('axios');
var mongoose = require('mongoose');
var ApiEvents = require('./models/ApiEvents');
var moment = require('moment');
var Politician = require('./models/Politician');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var request = require('request');
var path = require('path');

//Set mongoose to use promises
mongoose.Promise = Promise;

//Initialisze express
var app = express();

//Use morgan and body parser with app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
}));

// var session = require('express-session');
// var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy;
// var FacebookUser = require('./models/facebookmodel');

// var FACEBOOK_APP_ID = '125732914829092';
// var FACEBOOK_APP_SECRET = 'fbb5018e2f3260adb5c32a026c313ee9';

var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './build')));

//db name = whosyourrep
// mongoose.connect('mongodb://localhost/whosyourrep');
var databaseURI = 'mongodb://localhost/whosyourrep';
var db = mongoose.connection;

if (process.env.MONGODB_URI) {
  mongoose.connect("mongodb://heroku_pgmm042q:bvj1qmemfm1thtkmondb89pi8f@ds015335.mlab.com:15335/heroku_pgmm042q");
}else {
  mongoose.connect(databaseURI);
}

db.on('error', function(error) {
	console.log('Mongoose error: ', error);
});

db.once('open', function() {
	console.log('Mongoose connection successful');
});


// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "/auth/facebook/callback"
//   }, function(accessToken, refreshToken, profile, done) {
//     //console.log(profile);
//   		// process.nextTick is a nodejs function that waits for data to come back before continuing
//   		process.nextTick(function(){
//   			FacebookUser.findOne({'facebook.id': profile.id}, function(err, user) {
//   				if (err) {
//   					console.log('error');
//   					return done(err);
//   				}

//   				if (user) {
//   					console.log('found user: ' + user);
//   					return done(null, user);
//   				}else {
//   					console.log('making user');
//   					var newFacebookUser = new FacebookUser();
//   					newFacebookUser.facebook.id = profile.id;
//   					newFacebookUser.facebook.token = accessToken;
//   					newFacebookUser.facebook.name = profile.displayName;
//   					// newFacebookUser.facebook.email = profile.emails.value;
//   					newFacebookUser.save(function(err, doc){
//   						if (err) {
//   							throw err;
//   						}else {
//   							return done(null, doc);
//   							console.log("new facebook user saved to db: "+ doc);
//   						}
//   					});
//   				}
//   			});
//   		});
//   	}
// ));

// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// // Initialize Passport and restore authentication state, if any, from the
// // session.
// app.use(passport.initialize());
// app.use(passport.session());



// // Redirect the user to Facebook for authentication.  When complete,
// // Facebook will redirect the user back to the application at
// //     /auth/facebook/callback
// app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// // Facebook will redirect the user to this URL after approval.  Finish the
// // authentication process by attempting to obtain an access token.  If
// // access was granted, the user will be logged in.  Otherwise,
// // authentication has failed.
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//       successRedirect: '/loginerror',
//       failureRedirect: '/'
//     }));

// app.get('/test', function(req, res) {
// 	console.log('clicked logo');
// });



// passport.serializeUser(function(user, done) {
//   done(null, user.id);
//   console.log("serializeUser id: " + user.id);
// });

// passport.deserializeUser(function(id, done) {
//   FacebookUser.findById(id, function(err, user) {
//     done(err, user);
//     console.log("user deserialized: " + user);
//   });
// });

// app.get("/logout", function(req, res){
//   req.session.destroy((err) => {
//     if(err) {
//       console.log(err);
//     }else {
//       console.log('log out successful');
//     }

//     req.logout()

//     res.redirect("http://localhost:3001/")
//   })
  
// });

// function authenticationMiddleware () {  
//   return (req, res, next) => {
//     console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

//       if (req.isAuthenticated()) return next();
//       // res.redirect('/');
//   }
// }

require('./routes/api-routes.js')(app);

app.listen(PORT, function() {
	console.log('running on ', PORT);
});

require('./scraper/scraper')();