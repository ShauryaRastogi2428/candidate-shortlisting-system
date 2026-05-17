function MatchResults({ results }) {

  return (

    <div className="fade-in">

      {
        results.length > 0 && (

          <h2
            className="section-title"
            style={{
              marginTop: "25px"
            }}
          >
            🎯 Shortlisted Candidates
          </h2>

        )
      }

      {
        results.map((candidate, index) => (

          <div
            key={index}
            className="
              match-card
              glass
              glow
              card-hover
            "
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px"
              }}
            >

              <div>

                <h3 className="candidate-name">
                  👤 {candidate.name}
                </h3>

                <p
                  style={{
                    marginTop: "8px",
                    color:
                      candidate.ranking === "High Match"
                        ? "#22c55e"
                        : candidate.ranking === "Medium Match"
                        ? "#facc15"
                        : "#ef4444",

                    fontWeight: "700",

                    fontSize: "15px"
                  }}
                >

                  {
                    candidate.ranking === "High Match"
                      ? "🟢 High Match"
                      : candidate.ranking === "Medium Match"
                      ? "🟡 Medium Match"
                      : "🔴 Low Match"
                  }

                </p>

              </div>

              <div
                style={{
                  background:
                    "linear-gradient(to right,#2563eb,#3b82f6)",

                  padding: "10px 18px",

                  borderRadius: "25px",

                  fontWeight: "700",

                  fontSize: "15px",

                  boxShadow:
                    "0 5px 15px rgba(37,99,235,0.35)"
                }}
              >

                {candidate.matchPercentage}%
                {" "}
                Match

              </div>

            </div>

            <br />

            <div
              style={{
                display: "grid",
                gap: "14px"
              }}
            >

              <div>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "6px"
                  }}
                >
                  💻 Matched Skills
                </p>

                <p
                  style={{
                    color: "#38bdf8",
                    fontWeight: "500",
                    lineHeight: "1.7"
                  }}
                >

                  {
                    candidate.matchedSkills.length > 0
                      ? candidate.matchedSkills.join(", ")
                      : "No Matching Skills"
                  }

                </p>

              </div>

              <div>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "6px"
                  }}
                >
                  🧠 Experience
                </p>

                <p
                  style={{
                    color: "#60a5fa",
                    fontWeight: "600"
                  }}
                >

                  {candidate.experience}
                  {" "}
                  Years

                </p>

              </div>

              <div>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "6px"
                  }}
                >
                  📧 Email
                </p>

                <p
                  style={{
                    color: "#e2e8f0"
                  }}
                >
                  {candidate.email}
                </p>

              </div>

            </div>

          </div>

        ))
      }

    </div>

  );

}

export default MatchResults;