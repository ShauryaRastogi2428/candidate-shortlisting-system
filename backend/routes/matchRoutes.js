const express = require("express");
const router = express.Router();

const {
  matchCandidates
} = require("../controllers/matchController");

const {
  aiShortlist
} = require("../services/aiService");

router.post("/match", matchCandidates);

router.post("/ai/shortlist", aiShortlist);

module.exports = router;