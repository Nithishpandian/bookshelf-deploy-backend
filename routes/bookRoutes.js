const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  postBook,
  updateBookRating,
  deleteReview,
  currentlyReading,
  finishedreading,
  updatepercentage,
  deleteBook
} = require("../controllers/bookControllers");
const { protect } = require("../middlewares/authMiddleware");

router.get("/getallbooks", protect, getAllBooks);
router.post("/bookshelf", protect, postBook);
router.put("/updatebook", protect, updateBookRating);
router.post("/deletereview", protect, deleteReview);

router.delete("/deletebook/:id", protect, deleteBook)

router.put("/currentlyreading", protect, currentlyReading);
router.put("/finishedreading", protect, finishedreading);
router.put("/updatepercentage", protect, updatepercentage);

module.exports = router;
