
const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser); // Register user
router.post("/login", loginUser); // login user
router.get("/profile", protect, getUserProfile); // get user profile

// upload image
router.post("/upload-image", upload.single("image"), (req, res) => {
    if(!req.file){
        return res.status(400).json({ message: "No file uploaded "});
    }
    // const baseUrl = process.env.NODE_ENV === "production" ? "https://ai-blog-backend.onrender.com" : `${req.protocol}://${req.get("host")}`;

    // const imageurl = `${baseUrl}/uploads/${req.file.filename}`;
    const imageurl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageurl });
});

module.exports = router;

