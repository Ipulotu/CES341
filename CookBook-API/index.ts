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
//Path for succsesful login
var userProfile:any;
app.get('/success', (req, res) => res.render('pages/success',{
  user: userProfile
}));

//Path for created account & succsesful login
app.get('/success/create', (req, res) => res.render('pages/successCreate',{
  user: userProfile,
  message:"New Account created!"
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
  function(accessToken: null, refreshToken: null, profile:any, done:any) {
    userProfile=profile;
    return done(null, userProfile);
}
));


app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  async function(req, res) {
    const connection = await mongodb.getDb().db("CookBook").collection('Users');
    // Successful authentication, redirect success.
    var data = connection.find({ googleId: userProfile.id});
    data.toArray().then((users:any) => {
        //Cheking for user in db
        if (users[0] == null) {
          let user = {
            googleId: userProfile.id,
            displayName: userProfile.displayName
          };

          //Adding user to db
          connection.insertOne(user)    
            .then((result: any) => {
              console.log(result)
            })
          .catch((error: any) => console.error(error))
          res.redirect('/success/create');

        }else if(users[0].googleId == userProfile.id){
          res.redirect('/success');
        }
    });
  });





  
