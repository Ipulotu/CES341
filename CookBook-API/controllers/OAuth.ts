import { Request, Response, NextFunction } from 'express';
const passport = require('passport');


exports.getStart = (req: Request, res: Response) => res.render('pages/auth');

exports.getError = (req: Request, res: Response) => res.send("error logging in");

exports.getGoogleAuth = (req: Request, res: Response) => passport.authenticate('google', { scope : ['profile', 'email'] });
 
exports.returnGoogleAuth = (req: Request, res: Response) => passport.authenticate('google', { failureRedirect: '/error' });

exports.redirectSuccess = (req: Request, res: Response) =>{
    //res.redirect('/success');
    res.send('it worked!')

};
