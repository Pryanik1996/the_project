const { Router } = require("express");
const router = Router();
const Post = require("../db/models/posts.model");
const User = require("../db/models/user.model");

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("posts", { posts });
});

router.route("/:id").patch(async (req, res) => {
  try {
    const userId = req.session.userId;
    console.log(userId, "USER");
    const postId = req.body.id;
    const user = await User.findById(userId);
    const like = req.body.like;
    const postLike = await Post.findById(postId);
    const arrayLike = postLike.likes;
    const arrayDislike = postLike.dislikes;
    const checkLike = arrayLike.includes(userId);
    console.log(user);
    let post = {};
    if (user && like && !checkLike) {
      post = await Post.findByIdAndUpdate(
        postId,
        {
          $addToSet: { likes: userId },
          $pull: { dislikes: userId },
        },
        { new: true }
      );
    }
    if (user && !like && checkLike) {
      post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: userId },
          $addToSet: { dislikes: userId },
        },
        { new: true }
      );
    }
    console.log(post);
    res.json(post);
  } catch (err) {
    console.log(err);
    // res.sendStatus(500);
  }
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  console.log(post);
  res.render("edit", { post, id });
});

router.post("/edit/:id", async (req, res) => {
  try {
    const { picture, title, body } = req.body;
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { picture, title, body },
      { new: true }
    );
    res.redirect("/posts");
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/posts/edit/${id}`);
});

router.delete("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// router.patch('/edit/:id', async (req, res) => {
//   const {id} = req.params

//   const updatePost = await Post.findByIdAndUpdate(id, {picture: req.body.picture, title: req.body.title, body: req.body.body})
//   return res.redirect('/posts')
// })

module.exports = router;
