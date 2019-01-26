$(document).ready(function() {
  $('#new-post-form').submit(function () {
    var file = document.querySelector('input[type=file]').files[0];
    var imageTitle = $("input.post-title-input").val()
    var imageDescription = $("input.post-description-input").val()
    var reader  = new FileReader();

    reader.onloadend = function () {
      imageUrl = reader.result;
      createPost(imageUrl, imageTitle, imageDescription);
      $('#new-post-form')[0].reset(); // Reset form inputs
    }

    if (file) {
      reader.readAsDataURL(file);
    }

    return false; // Disable default form functionality
  });
});

function createPost(imageUrl, title, description) {
  var $newPost = $("<div>", {
    "class": "card"
  });

  $newPost.append(createNewPostImage(imageUrl));
  $newPost.append(createNewPostBody(title, description));

  $("#timeline").append($newPost);
}

function createNewPostImage(image) {
  return $("<img>", {
    "class": "card-img-top",
    src: imageUrl
  });
}

function createNewPostBody(title, description) {
  $newPostBody = $("<div>", {
    "class": "card-body"
  });

  var $newPostTitle = $("<h4>", {
    "class": "card-title",
    html: title
  });
  $newPostBody.append($newPostTitle);

  if (description && description.length !== 0) {
    var $newPostDescription = $("<p>", {
      "class": "card-text",
      html: description
    });
    $newPostBody.append($newPostDescription);
  }

  $newPostBody.append("<p><b>Comments</b></p>");

  var $newPostInteractive = $("<form>", {
    "class": "post-interactive"
  }).append(
    $("<input>", {
      type: "text",
      "class": 'comment-text-input',
      placeholder: "Comment Text"
    })
  ).append(
    $("<input>", {
      type: "submit",
      "class": "btn btn-primary btn-comment",
      value: "Comment"
    })
  );
  $newPostInteractive.submit(function () {
    var commentInput = $newPostInteractive.find("input.comment-text-input");
    var commentText = commentInput.val();
    comment(commentText, $newPostInteractive);
    commentInput.val(""); // Reset the comment field
    return false; // Disable default form functionality
  });
  $newPostBody.append($newPostInteractive);

  return $newPostBody;
}

function comment(commentText, insertBeforeThis) {
  if (commentText && commentText.length !== 0) {
    $("<p>", {
      html: commentText
    }).insertBefore(insertBeforeThis);
  }
}
