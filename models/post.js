var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
  title: String,
  date: [{type: Date, default: Date.now}],
  type: {type: String, enum: ['text', 'url', 'image', 'video']},
  content: String,
  category: String,
  tags: [String],
  upvotes: {type: Number, default: 0},
  downvotes: {type: Number, default: 0},
  comments:[{name:String, content:String}],
})

var Post = mongoose.model('post', postSchema);
module.exports = Post
