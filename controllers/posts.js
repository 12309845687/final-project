var Post = require('../models/post.js')
exports.posts = function (req, res){
  Post.find({}, function(err, data){
    console.log(data)
    res.render ('posts', {posts:data, user: req.user ? req.user:null})
  })
}

exports.newPost = function (req, res){
  console.log('Recived new post')
  console.log(req.body)

  var post = new Post({ title: req.body.title, content: req.body.content, category: req.body.category })

  post.save(function (err){
    if (err) {
      console.log(err)
      return
    }

    console.log('obj saved=.')
    res.send('<h1>Your post has been registered. Thank You!</h1>')
  })

  console.log('hello')
}

exports.upvote = function(req, res){
  console.log('post upvoted = ', req.params.id)
  Post.findById(req.params.id, function (err, post){
    if (err){
      console.log(err)
    }
    if (post === null){
      console.log('could not find post')
      return
    }
    post.upvotes += 1
    post.save(function(error, postAfterSave){
      if(error){
        console.log(error)
        res.json({error: 'could not upvote'})
        return
      }
      res.json({success:'post upvoted', upvotes: postAfterSave.upvotes})
    })
  })
}

exports.downvote = function(req, res){
  console.log('post downvoted = ', req.params.id)
  Post.findById(req.params.id, function (err, post){
    if (err){
      console.log(err)
    }
    if (post === null){
      console.log('could not find post')
      return
    }
    post.downvotes += 1
    post.save(function(error, postAfterSave){
      if(error){
        console.log(error)
        res.json({error: 'could not downvote'})
        return
      }
      res.json({success:'post downvoted', upvotes: postAfterSave.downvotes})
    })
  })
}
