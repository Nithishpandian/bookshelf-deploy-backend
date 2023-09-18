const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");

// @desc    login User
// @route   POST /api/users/login
// @access  public
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

    res.status(200).json(posts);
});

const userPost = asyncHandler(async (req, res) => {
  const userPost = await Post.find({ user: req.user.id });

    res.status(200).json(userPost);
});

const setPost = asyncHandler(async (req, res) => {
  const { image, title, authors, pageCount, description, rating, reviews } = req.body;

  if (!image || !title || !authors || !pageCount || !description ) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  // Posting books
  const post = await Post.create({
    user: req.user.id,
    image,
    title,
    authors,
    pageCount,
    description,
    rating,
    reviews,
  });
  if (post) {
    res.status(201).json({
      _id: post.id,
      user: post.user,
      image: post.image,
      title: post.title,
      authors: post.authors,
      pageCount: post.pageCount,
      description: post.description,
      rating: post.rating,
      reviews: post.reviews
    });
  } else {
    res.status(400);
    throw new Error("Invalid book data");
  }
});

const deletePost = asyncHandler(async(req, res)=>{
  const post = await Post.findById(req.params.id)
  if(!post){
    res.status(400)
    throw new Error("Post not found")
  }

  await Post.deleteOne(post)
  res.status(200).json({id: req.params.id})

})


module.exports = {
  getAllPosts,
  userPost,
  setPost,
  deletePost
};
