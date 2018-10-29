var authController = require('../controllers/authcontroller.js');
var passport = require('passport');

module.exports = function (app) {

    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',

        failureRedirect: '/signup'
    }



    ));

    app.get('/dashboard',isLoggedIn, authController.dashboard);

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/signin'
    }
 
));

    function isLoggedIn(req, res, next) {

        console.log(req, "IS LOGGED IN")
 
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/signin');
     
    }

    

}



