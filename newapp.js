//constants
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const passport = require('passport')
const bcrypt = require('bcrypt');
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy;

//variables
var Post = require('./models/post.js')
var PagesController = require('./controllers/pages.js')
var PostController = require('./controllers/posts.js')
var UserController = require('./controllers/users.js')
var User = require('./models/User.js')

//functions
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'pug')
mongoose.connect('mongodb://127.0.0.1:27017/crusader-news',{useNewUrlParser:true})

app.use(session({secret:'cats', cookie: {maxAge: 60000000}, saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({username: username}, function(err, user){
      if (err){
        console.log(err)
        return done(err);
      }
      if (user === undefined){
        return done(null, false, {message:'incorrect username'});
      }
      bcrypt.compare(password, hash, function(err, result){
        if (result === false){
          return done(null, false, {message:'incorrect password'});
        }
        return done(null, user)
      })
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: false })
);

function isLoggedIn(req, res, next){
  console.log("user is not logged in")
  next()
}

//routes
app.get('/', isLoggedIn, PagesController.home)
app.get('/login', PagesController.login)
app.get('/signup', PagesController.signup)
app.post('/new-user', UserController.signup)
app.get('/posts', PostController.posts)
app.post('/newPost', PostController.newPost)
app.get('/upvote.post/:id', PostController.upvote)
app.get('/downvote.post/:id', PostController.downvote)
app.listen(port, () => console.log(`app listening on port ${port}`))
