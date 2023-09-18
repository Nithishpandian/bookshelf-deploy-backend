const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: [String],
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [String],
      default: null,
    },
    currentlyReading: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    finishedPercentage: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [String],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
