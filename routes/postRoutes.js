const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  userPost,
  setPost,
  deletePost
} = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/getallposts", protect, getAllPosts);
router.get("/userposts", protect, userPost);
router.post("/setpost", protect, setPost);
router.delete("/deletepost/:id", protect, deletePost)

module.exports = router;
