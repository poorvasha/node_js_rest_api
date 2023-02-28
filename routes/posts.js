const express = require("express");
const Post = require("../models/Posts");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.send({ message: error + "something wrong" });
  }
});
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.send(post);
  } catch (error) {
    res.send({ message: error + "something wrong" });
  }
});

router.post("/postcontent", async (req, res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    console.log(savedPost);
    res.send(savedPost);
  } catch (error) {
    res.send({ message: error + "something wrong" });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const post = await Post.deleteOne({ _id: req.params.postId });
    res.send(post);
  } catch (error) {
    res.send({ message: error + "something wrong" });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const post = await Post.updateOne(
      { _id: req.params.postId },
      { $set : {
        title: req.body.title,
        description: req.body.description,
      }}
    );
    res.json(post);
   

  } catch (error) {
    res.send({ message: error + "something wrong" });
  }
});
module.exports = router;
