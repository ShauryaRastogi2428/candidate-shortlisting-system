// ================= aiService.js =================

const axios = require("axios");
const Candidate = require("../models/Candidate");

exports.aiShortlist = async (req, res) => {

  try {

    console.log("AI route hit");

    const { requiredSkills, minExperience } = req.body;

    const candidates = await Candidate.find();

    const formattedCandidates = candidates.map((c) => ({
      name: c.name,
      skills: c.skills,
      experience: c.experience,
      bio: c.bio
    }));

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",

        messages: [

          {
            role: "system",
            content:
              "You are an AI hiring assistant."
          },

          {
            role: "user",
            content: `
Required Skills:
${requiredSkills.join(", ")}

Minimum Experience:
${minExperience}

Candidates:
${JSON.stringify(formattedCandidates)}

Task:
1. Rank candidates from best to worst
2. Mention matching skills
3. Mention experience
4. Give short reason

Rules:
- Do not use markdown
- Do not use ** or #
- Keep response clean
- Keep response professional
`
          }

        ]
      },
      {
        headers: {
          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type": "application/json"
        }
      }
    );

    const result =
      response.data.choices[0].message.content;

    res.json({
      success: true,
      result
    });

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error:
        error.response?.data || error.message
    });

  }

};