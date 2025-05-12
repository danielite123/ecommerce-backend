import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "uploads" }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          })
          .end(file.buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);
    res.status(200).json({ imageUrls });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
};
// export const uploadMultipleImages = async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: "No files uploaded" });
//     }

//     const uploadPromises = req.files.map((file) => {
//       return new Promise((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream({ folder: "uploads" }, (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           })
//           .end(file.buffer);
//       });
//     });

//     const results = await Promise.all(uploadPromises);
//     const imageUrls = results.map((result) => result.secure_url);

//     return res.status(200).json({ imageUrls });
//   } catch (err) {
//     console.error("Upload Error:", err);
//     return res.status(500).json({ error: "Image upload failed" });
//   }
// };
