const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Set up memory storage for image uploads (no file storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API to list available template images
app.get("/templates", (req, res) => {
  const templatesDir = path.join(__dirname, "public/templates");

  fs.readdir(templatesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error reading templates" });
    }
    
    // Filter only PNG images
    const templates = files.filter(file => file.endsWith(".png"));
    res.json({ templates });
  });
});

// API to handle image upload (stored in memory)
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Convert image to base64 to send to frontend for preview
  const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

  res.json({ imageUrl: base64Image });
});

  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
