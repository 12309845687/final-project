exports.home = function(req, res){
  res.render('home')
}

exports.login = function(req, res){
  res.render('login')
}

exports.signup = function(req, res){
  res.render('signup')
}

// exports.login = function(req, res){
//   const email = req.body.email
//   const username = req.body.username
//   const password = req.body.password
//   const confirmation = req.body.confirmation
//
//   if (email === '' || username === '' || password === '' || confirmation === ''){
//     res.send('you are missing information. Please try again')
//     return
//   }
//   User.find({username: username}, function(err, user){
//     if(err){
//       console.log(err)
//         res.send('something went wrong')
//     }
//     bcrypt.compare(password, hash, function(err, result){
//       if (result === false){
//         res.send('try again')
//       }
//       res.redirect('/')
//     });
//   })
// }
