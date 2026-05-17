import "./App.css";

import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import JobForm from "./components/JobForm";

function App() {

  return (

    <div className="app fade-in">

      <div className="container">

        <nav className="navbar glass glow">

          <h1 className="logo text-gradient">
            🤖 HireAI
          </h1>

          <p className="nav-text">
            AI Powered Recruitment Platform
          </p>

        </nav>

        <div className="hero">

          <h1 className="title">
            AI Candidate Shortlisting System
          </h1>

          <p className="subtitle">
            Smart hiring using AI + Skill Matching
          </p>

        </div>

        <div className="stats-grid">

          <div className="stats-card glass">

            <h2>⚡ AI Ranking</h2>

            <p>
              Intelligent candidate scoring
            </p>

          </div>

          <div className="stats-card glass">

            <h2>🎯 Smart Matching</h2>

            <p>
              Skill & experience based filtering
            </p>

          </div>

          <div className="stats-card glass">

            <h2>🚀 Fast Hiring</h2>

            <p>
              Reduce manual screening time
            </p>

          </div>

        </div>

        <div className="grid">

          <div className="card glow card-hover">

            <h2 className="section-title">
              👤 Add Candidate
            </h2>

            <CandidateForm />

          </div>

          <div className="card glow card-hover">

            <h2 className="section-title">
              🎯 Job Requirements
            </h2>

            <JobForm />

          </div>

        </div>

        <div
          className="
            card
            glow
            card-hover
            container-padding
          "
          style={{
            marginTop: "30px"
          }}
        >

          <h2 className="section-title">
            📋 Candidate Database
          </h2>

          <CandidateList />

        </div>

      </div>

    </div>

  );

}

export default App;