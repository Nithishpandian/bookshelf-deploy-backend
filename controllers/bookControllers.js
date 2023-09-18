const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

// @desc get all books
// @route POST /api/book/getallbooks
// @access private
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ user: req.user.id });
  res.status(200).json(books);
});

// @desc post books
// @route POST /api/book/bookshelf
// @access private
const postBook = asyncHandler(async (req, res) => {
  const { image, title, authors, pageCount, description } = req.body;

  if (!image || !title || !authors || !pageCount || !description) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  // Posting books
  const book = await Book.create({
    user: req.user.id,
    image,
    title,
    authors,
    pageCount,
    description,
  });
  if (book) {
    res.status(201).json({
      _id: book.id,
      user: book.user,
      image: book.image,
      title: book.title,
      authors: book.authors,
      pageCount: book.pageCount,
      description: book.description,
      rating: book.rating,
      reviews: book.reviews,
    });
  } else {
    res.status(400);
    throw new Error("Invalid book data");
  }
});

// update user rating and reviews
const updateBookRating = asyncHandler(async (req, res) => {
  const { bookId, rating, reviews } = req.body;
  const book = await Book.findById(bookId);

  if (!book) {
    res.status(400);
    throw new Error("book not found");
  }

  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    {
      rating: rating,
      reviews: reviews,
    },
    { new: true }
  );
  res.status(200).json(updatedBook);
});

const deleteReview = asyncHandler(async (req, res) => {
  const { bookId, index } = req.body;
  const book = await Book.findById(bookId);

  if (!book) {
    res.status(400);
    throw new Error("book not found");
  }
  book.reviews.splice(index, 1);

  const updatedBook = await book.save();

  // const deletedReview = await Book.deleteOne({ reviews: book.reviews[index] });
  res.status(200).json(updatedBook);
});

const currentlyReading = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const book = await Book.findById(bookId);

  if (!book) {
    res.status(400);
    throw new Error("book not found");
  }

  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    {
      currentlyReading: true,
    },
    { new: true }
  );
  res.status(200).json(updatedBook);
});

const finishedreading = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const book = await Book.findById(bookId);

  if (!book) {
    res.status(400);
    throw new Error("book not found");
  }

  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    {
      currentlyReading: false,
      finished: true,
      finishedPercentage: 100,
    },
    { new: true }
  );
  res.status(200).json(updatedBook);
});

const updatepercentage = asyncHandler(async (req, res) => {
  const { bookId, comments, finishedPercentage } = req.body;
  const book = await Book.findById(bookId);

  if (!book) {
    res.status(400);
    throw new Error("book not found");
  }

  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    {
      finishedPercentage,
      comments,
    },
    { new: true }
  );
  res.status(200).json(updatedBook);
});

const deleteBook = asyncHandler(async(req, res)=>{
  const book = await Book.findById(req.params.id)
  if (!book) {
    res.status(400);
    throw new Error("book not found");
  }
  await Book.deleteOne(book)
  res.status(200).json({id: req.params.id})
})

module.exports = {
  getAllBooks,
  postBook,
  updateBookRating,
  deleteReview,
  currentlyReading,
  finishedreading,
  updatepercentage,
  deleteBook
};
