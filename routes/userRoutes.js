const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  userData,
  getUserDetails,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/data", protect, userData);
router.get("/:id", protect, getUserDetails);

module.exports = router;
