const Candidate = require("../models/Candidate");

exports.matchCandidates = async (req, res) => {

  try {

    const {
      requiredSkills,
      minExperience
    } = req.body;

    const candidates = await Candidate.find();

    const rankedCandidates =
      candidates.map((candidate) => {

        const matchedSkills =
          candidate.skills.filter((skill) =>

            requiredSkills.includes(skill)

          );

        const skillScore =
          matchedSkills.length /
          requiredSkills.length;

        let experienceScore = 0;

        if (
          candidate.experience >= minExperience
        ) {

          experienceScore = 1;

        } else {

          experienceScore =
            candidate.experience /
            minExperience;

        }

        const totalScore =
          (
            (skillScore * 0.7) +
            (experienceScore * 0.3)
          ) * 100;

        let ranking = "Low Match";

        if (totalScore >= 80) {

          ranking = "High Match";

        } else if (totalScore >= 50) {

          ranking = "Medium Match";

        }

        return {

          name: candidate.name,

          email: candidate.email,

          skills: candidate.skills,

          experience: candidate.experience,

          matchedSkills,

          matchPercentage:
            totalScore.toFixed(1),

          ranking

        };

      })

      .sort(
        (a, b) =>
          b.matchPercentage -
          a.matchPercentage
      );

    res.json(rankedCandidates);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};