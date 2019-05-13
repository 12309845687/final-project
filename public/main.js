$(document).ready(function(){
  console.log('ready')

  $('.upvote').on('click', function(f){
    console.log('like')
    const postId = $(e.target)[0].dataset.id
    console.log(postId)
    $.ajax({
      method: 'GET'
      url: `/upvote-post/${postId}`,
    })
    .done(function(response){
      console.log(response)
      $(`p#${postId} > span.upvotes.count`)[0].innerText = response.upvotes
    })
  })

  $('.downvote').on('click', function(f){
    console.log('unlike')
    const postId = $(e.target)[1].dataset.id
    console.log(postId)
    $.ajax({
      method: 'GET'
      url: `/downvote-post/${postId}`,
    })
    .done(function(response){
      console.log(response)
      $(`p#${postId} > span.downvotes.count`)[0].innerText = response.downvotes
    })
  })

  $('form#post-form').on('submit', function(e){
    e.preventDefault()
    console.log('submitted')

    if(e.target[0].value == '' || e.target[1].value == '' || e.target[2].value == ''){
      alert('please fill in all inputs')
      return
    }

    $.ajax({
      method: "Post"
      url: "/send-message"
      data:{name:e.target[0].value, content:e.target[1].value, category:e.target[2].value}
    }).done(function(){
      console.log('post saved')
      window.location = '/thank-you'
    });
  })
});
