import express from 'express';
const app = express();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const session = require('express-session');
const passport = require('passport');
const PORT = 8080;


app
  .set('view engine', 'ejs')
  .use(session({
      resave: false,
      saveUninitialized: true,
      secret: 'SECRET' 
  }))
  .use(bodyParser.json())
  .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
  })
  .use(passport.initialize())
  .use(passport.session())
  .use('/', require('./routes'));


//Function to catch errors and not end server
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
    });


/*  PASSPORT SETUP  */
var userProfile:any;
app.get('/success', (req, res) => res.render('pages/success',{
  user: userProfile
}));

passport.serializeUser(function(user:any, cb:any) {
  cb(null, user);
});

passport.deserializeUser(function(obj:any, cb:any) {
  cb(null, obj);
});


//Mongodb connection
mongodb.initDb((err:any) => {
  if (err) {
      console.log(err);
  } else {
      app.listen(PORT);
      console.log(`Connected to DB and listening on ${PORT}`);
  }
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
  },
    async function(accessToken: null, refreshToken: null, profile:any, done:any) {
      const connection = await mongodb.getDb().db("CookBook").collection('Recipes').find({ googleId: profile.id});
      // const User = connection.model('User', UserSchema);
      var user = connection.find({ googleId: profile.id});

      //Cheking for user in db
        if (!user) {
          user = {
            googleId: profile.id,
            displayName: profile.displayName
          };

          //Adding user to db
          connection.insertOne(user)    
            .then((result: any) => {
              console.log(result)
            })
          .catch((error: any) => console.error(error))

        }else{
          return done(null, user);
        }
    }
));


app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });







        // The Google account has not logged in to this app before.  Create a
        // new user record and link it to the Google account.

    //   } else {
    //     // The Google account has previously logged in to the app.  Get the
    //     // user record linked to the Google account and log the user in.
    //     db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
    //       if (err) { return cb(err); }
    //       if (!user) { return cb(null, false); }
    //       return cb(null, user);
    //     });
    //   }
    // };

 



  
