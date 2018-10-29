var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport

app.use(session({ secret: 'aNtCaRjOhJoS', resave: true, saveUninitialized: true })); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

app.get('/', function (req, res) {

    res.send('Welcome to Passport with Sequelize');

});


//Models
var models = require("./app/models");


//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//load passport strategies

require('./app/config/passport/passport.js')(passport, models.user);

//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);



//Sync Database
// listen on port 3000
var PORT = process.env.PORT || 3000;

models.sequelize.sync({force: true}).then(function() {

});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

