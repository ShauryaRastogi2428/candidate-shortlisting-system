import { useState } from "react";
import axios from "axios";

function CandidateForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        "https://candidate-shortlisting-system-3.onrender.com/api/candidates",
        {
          ...formData,

          experience:
            Number(formData.experience),

          skills:
            formData.skills
              .split(",")
              .map(skill => skill.trim())
        }
      );

      console.log(
        "CANDIDATE ADDED:",
        response.data
      );

      alert(
        "✅ Candidate Added Successfully"
      );

      setFormData({
        name: "",
        email: "",
        skills: "",
        experience: "",
        bio: ""
      });

      setLoading(false);

    } catch (error) {

      console.log(
        "FULL ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "❌ Error Adding Candidate"
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
          name="name"
          placeholder="👤 Candidate Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="email"
          name="email"
          placeholder="📧 Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="text"
          name="skills"
          placeholder="💻 Skills (React, Node.js, MongoDB)"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="number"
          name="experience"
          placeholder="🧠 Experience (Years)"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <textarea
          className="input"
          name="bio"
          placeholder="📝 Candidate Bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
        />

        <button
          className="button glow"
          type="submit"
        >

          {
            loading
              ? "Adding..."
              : "Add Candidate"
          }

        </button>

      </form>

    </div>

  );

}

export default CandidateForm;