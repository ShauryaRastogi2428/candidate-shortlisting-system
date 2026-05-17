import { useEffect, useState } from "react";
import axios from "axios";

function CandidateList() {

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {

    fetchCandidates();

  }, []);

  const fetchCandidates = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/candidates"
      );

      setCandidates(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="fade-in">

      <div className="candidate-grid">

        {
          candidates.map((candidate) => (

            <div
              key={candidate._id}
              className="
                candidate-card
                glass
                glow
                card-hover
              "
            >

              <h3 className="candidate-name">
                👤 {candidate.name}
              </h3>

              <p>
                📧
                {" "}
                {candidate.email}
              </p>

              <br />

              <p>
                💻 Skills
              </p>

              <p
                style={{
                  color: "#38bdf8",
                  marginTop: "8px"
                }}
              >
                {candidate.skills.join(", ")}
              </p>

              <br />

              <p>
                🧠 Experience:
                {" "}
                <span
                  style={{
                    color: "#60a5fa",
                    fontWeight: "600"
                  }}
                >
                  {candidate.experience}
                  {" "}
                  Years
                </span>
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default CandidateList;