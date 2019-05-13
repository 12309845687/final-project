const bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../models/User.js')

exports.signup = function(req, res){
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const confirmation = req.body.confirmation

  if (email === '' || username === '' || password === '' || confirmation === ''){
    res.send('you are missing information. Please try again')
    return
  }

  if (confirmation !== password){
    res.send('passwords do not match')
    return
  }

  bcrypt.hash(password, saltRounds, function(err, hash){
    var user = new User({email: email, username: username, password: hash})
    user.save(function(err, savedUser){
      if (err){
        res.send('Something went wrong')
        return
      }
      console.log('user created')
      console.log(savedUser)
      res.send('thank you')
    })
  });
}

exports.login = function(req, res){
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const confirmation = req.body.confirmation

  if (email === '' || username === '' || password === '' || confirmation === ''){
    res.send('you are missing information. Please try again')
    return
  }
  User.find({username: username}, function(err, user){
    if(err){
      console.log(err)
        res.send('something went wrong')
    }
    bcrypt.compare(password, hash, function(err, result){
      if (result === false){
        res.send('try again')
      }
      res.redirect('/')
    });
  })
}
