import { Request, Response, NextFunction } from 'express';

/*  PASSPORT SETUP  */
var userProfile: any;

exports.getStart = (req: Request, res: Response) => res.render('pages/auth');
// exports.getSuccess = (req: Request, res: Response) => res.send(userProfile); 
exports.getError = (req: Request, res: Response) => res.send("error logging in");

/*  PASSPORT SETUP  */
  /*  Google AUTH  */
 
   
//   exports.getAuth = () =>  {

//     passport.serializeUser(function(user:any, cb:any) {
//         cb(null, user);
//       });
      
//       passport.deserializeUser(function(obj:any, cb:any) {
//         cb(null, obj);
//       });
    
//     passport.use(new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:8080/auth/google/callback"
//         //process.env.REDIRECT_URI as string
//       },
//       function(accessToken: null, refreshToken: null, profile:any, done:any) {
//           var userProfile: any;
//           userProfile=profile;
//           return done(null, userProfile);
//       }
//     ));
//     passport.authenticate('google', { scope : ['profile', 'email'] });}; 

//   exports.getCallback = (req: Request, res: Response) => {
//      passport.authenticate('google', { failureRedirect: '/error' }), function(){res.redirect('/success');}
//   };

