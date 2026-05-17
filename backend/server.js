const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const candidateRoutes = require("./routes/candidateRoutes");
const matchRoutes = require("./routes/matchRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/candidates", candidateRoutes);
app.use("/api", matchRoutes);

/* ================= OPENROUTER TEST ROUTE ================= */
app.get("/test-ai", async (req, res) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: "Say hello in one line"
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true,
      aiResponse: response.data.choices[0].message.content
    });

  } catch (error) {
    console.log("OpenRouter Error:", error.message);

    res.status(500).json({
      success: false,
      error: "OpenRouter API failed"
    });
  }
});

/* ================= MONGODB CONNECTION ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});