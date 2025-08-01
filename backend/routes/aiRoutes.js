const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { generateBlogPost, generateBlogPostIdeas, generateCommentReply, generatePostSummary } = require("../controllers/aiContoller");

router.post("/generate", protect, generateBlogPost);
router.post("/generate-ideas", protect, generateBlogPostIdeas);
router.post("/generate-reply", protect, generateCommentReply);
router.post("/generate-summary", generatePostSummary);

module.exports = router;

