import { useState } from "react";
import axios from "axios";
import MatchResults from "./MatchResults";

function JobForm() {

  const [jobData, setJobData] = useState({
    requiredSkills: "",
    minExperience: ""
  });

  const [results, setResults] = useState([]);

  const [aiResult, setAiResult] = useState("");

  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setJobData({
      ...jobData,
      [e.target.name]: e.target.value
    });

  };

  // ================= MATCH CANDIDATES =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        "https://candidate-shortlisting-system-3.onrender.com/api/match",
        {
          requiredSkills:
            jobData.requiredSkills
              .split(",")
              .map(skill => skill.trim()),

          minExperience:
            Number(jobData.minExperience)
        }
      );

      setResults(response.data);

      setLoading(false);

    } catch (error) {

      console.log(
        "MATCH ERROR:",
        error.response?.data || error.message
      );

      setLoading(false);

    }

  };

  // ================= AI SHORTLIST =================

  const handleAIShortlist = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "https://candidate-shortlisting-system-3.onrender.com/api/ai/shortlist",
        {
          requiredSkills:
            jobData.requiredSkills
              .split(",")
              .map(skill => skill.trim()),

          minExperience:
            Number(jobData.minExperience)
        }
      );

      console.log(
        "AI RESPONSE:",
        response.data
      );

      setAiResult(response.data.result);

      setLoading(false);

    } catch (error) {

      console.log(
        "AI ERROR:",
        error.response?.data || error.message
      );

      setLoading(false);

    }

  };

  return (

    <div className="fade-in">

      <form onSubmit={handleSubmit}>

        <input
          className="input"
          type="text"
          name="requiredSkills"
          placeholder="💻 Required Skills"
          value={jobData.requiredSkills}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="number"
          name="minExperience"
          placeholder="🧠 Minimum Experience"
          value={jobData.minExperience}
          onChange={handleChange}
          required
        />

        <button
          className="button glow"
          type="submit"
        >

          {
            loading
              ? "Matching..."
              : "Match Candidates"
          }

        </button>

      </form>

      <br />

      <button
        className="button glow"
        onClick={handleAIShortlist}
      >

        {
          loading
            ? "Loading AI..."
            : "🤖 AI Shortlist"
        }

      </button>

      <br />
      <br />

      <MatchResults results={results} />

      {
        aiResult && (

          <div className="ai-box fade-in">

            <h3
              style={{
                marginBottom: "15px"
              }}
            >
              🤖 AI Recommendation
            </h3>

            <div
              style={{
                lineHeight: "1.8",
                whiteSpace: "pre-wrap"
              }}
            >
              {aiResult}
            </div>

          </div>

        )
      }

    </div>

  );

}

export default JobForm;