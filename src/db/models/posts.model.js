const { model } = require("mongoose");

const Post = model("Post", {
  picture: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
  },
  dislikes: {
    type: Array,
  },
});

module.exports = Post;
