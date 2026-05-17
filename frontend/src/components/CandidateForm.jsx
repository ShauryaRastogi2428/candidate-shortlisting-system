import { useState } from "react";
import axios from "axios";

function CandidateForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://candidate-shortlisting-system-3.onrender.com/api/candidates",
        {
          ...formData,
          skills: formData.skills
            .split(",")
            .map(skill => skill.trim())
        }
      );

      alert("✅ Candidate Added Successfully");

      setFormData({
        name: "",
        email: "",
        skills: "",
        experience: ""
      });

    } catch (error) {

      console.log(error);

      alert("❌ Error Adding Candidate");

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

        <button
          className="button glow"
          type="submit"
        >
          Add Candidate
        </button>

      </form>

    </div>

  );

}

export default CandidateForm;