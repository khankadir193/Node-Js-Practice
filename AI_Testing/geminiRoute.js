
import "dotenv/config";
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is missing from .env");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey,
});

app.get("/", (req, res) => {
  res.send("Gemini API test server is running!");
});

app.get("/test-gemini", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: "Reply with exactly: Gemini API is working!",
    });

    res.status(200).json({
      success: true,
      message: "Gemini API key is working!",
      aiResponse: response.text,
    });
  } catch (error) {
    console.error("Gemini API error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gemini API request failed.",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
