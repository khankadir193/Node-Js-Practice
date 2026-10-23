
import "dotenv/config";
import express from "express";
import Groq from "groq-sdk";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Check that the Groq API key exists
if (!process.env.GROQ_API_KEY) {
  console.error("Error: GROQ_API_KEY is missing from .env");
  process.exit(1);
}

// Initialize Groq once when the server starts
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Groq API test server is running!");
});

app.get("/test-groq", async (req, res) => {
  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: "Reply with exactly: Groq API is working!",
        },
      ],
    });

    const aiResponse = response.choices[0]?.message?.content;

    console.log("Groq response:", aiResponse);

    return res.status(200).json({
      success: true,
      message: "Groq API request successful!",
      aiResponse,
    });
  } catch (error) {
    console.error("Groq API error:", error.message);

    return res.status(error.status || 500).json({
      success: false,
      message: "Groq API request failed.",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
