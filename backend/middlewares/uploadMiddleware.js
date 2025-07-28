// middlewares/uploadMiddleware.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ai-blog-uploads", // Optional folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, crop: "limit" }], // Optional optimization
  },
});

// Multer middleware using Cloudinary storage
const upload = multer({ storage });

module.exports = upload;













// const multer = require("multer");

// // Configure storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// // File filter
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if(allowedTypes.includes(file.mimetype)){
//         cb(null, true);
//     }else{
//         cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false);
//     }
// };

// const upload = multer({ storage, fileFilter });
// module.exports = upload;
