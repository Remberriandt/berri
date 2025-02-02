import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default function handler(req, res) {
  upload.single("image")(req, res, err => {
    if (err) {
      return res.status(500).json({ error: "Upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Convert image to base64
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    res.json({ imageUrl: base64Image });
  });
}
