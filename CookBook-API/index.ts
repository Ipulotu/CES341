import express from 'express';
const app = express();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const session = require('express-session');
const passport = require('passport');
const UserSchema = require('module/User')
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
  // function(accessToken: null, refreshToken: null, profile:any, done:any) {
  //     userProfile=profile;
  //     return done(null, userProfile);
  // },
    async function(accessToken: null, refreshToken: null, profile:any, done:any) {
      const connection = await mongodb.getDb().db("CookBook").collection('Recipes');
      const User = connection.model('User', UserSchema);

      //Cheking for user in db
      var user = await connection.find({ googleId: profile.id});
        if (!user) {
          // //Adding user to db
          // user = new User({
          //   googleId: profile.id,
          //   displayName: profile.displayName
          // });

          // user.save(function (err:Error) {
          //   if (err) return err;
          //   // saved!
          //   return done(null, user);
          // });

        }else{
          return done(null, user);
        }
    }
));









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

 



  
