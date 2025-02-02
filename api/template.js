import path from "path";
import fs from "fs/promises";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const templatesDir = path.join(process.cwd(), "public/templates");
    const files = await fs.readdir(templatesDir);

    // Filter only PNG images
    const templates = files.filter(file => file.endsWith(".png"));
    res.json({ templates });
  } catch (error) {
    res.status(500).json({ error: "Error reading templates" });
  }
}
