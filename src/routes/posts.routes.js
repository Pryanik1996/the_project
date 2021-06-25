const { Router } = require("express");
const router = Router();
const Post = require("../db/models/posts.model");
const User = require("../db/models/user.model");

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("posts", { posts });
});

router
  .route("/:id")
  .patch(async (req, res) => {
    try {
      const userId = req.session.userId;
      const postId = req.body.id;
      const user = await User.findById(userId);
      const like = req.body.like;
      const postLike = await Post.findById(postId);
      const arrayLike = postLike.likes;
      const arrayDislike = postLike.dislikes;
      const checkLike = arrayLike.includes(userId);
      let post = {};
      if (
        (user &&
          like &&
          !checkLike &&
          arrayDislike.length > 0 &&
          arrayLike.length >= 0) ||
        (arrayDislike.length >= 0 && arrayLike.length > 0)
      ) {
        post = await Post.findByIdAndUpdate(
          postId,
          {
            $addToSet: { likes: userId },
            $pull: { dislikes: userId },
          },
          { new: true }
        );
      }
      if (
        (user &&
          !like &&
          checkLike &&
          arrayLike.length > 0 &&
          arrayDislike.length > 0 &&
          arrayLike.length >= 0) ||
        (arrayDislike.length >= 0 && arrayLike.length > 0)
      ) {
        post = await Post.findByIdAndUpdate(
          postId,
          {
            $pull: { likes: userId },
            $addToSet: { dislikes: userId },
          },
          { new: true }
        );
      }
      res.json(post);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
