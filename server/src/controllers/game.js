const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { parseError } = require("../util");

const {
  getAllCategories,
  getQuestion,
  updatePoints,
} = require("../services/game");

const gameRouter = Router();

gameRouter.get("/allCategories", async (req, res) => {
  try {
    let allCategories = await getAllCategories();
    res.json(allCategories);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

gameRouter.post("/questions", async (req, res) => {
  const allQuestions = [];

  try {
    const categoriesIDs = req.body.categoriesIDs;
    const pointsList = [5, 10, 15, 20];

    for (let p = 0; p < pointsList.length; p++) {
      for (let c = 0; c < categoriesIDs.length; c++) {
        let receivedQuestion = await getQuestion(
          categoriesIDs[c],
          pointsList[p]
        );
        allQuestions.push(receivedQuestion[0]);
      }
    }

    res.json(allQuestions);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

gameRouter.post("/recordPoints", isUser(), async (req, res) => {
  try {
    const username = req.user.username;
    const points = req.body.points;

    const result = await updatePoints(username, points);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.errors });
  }
});

module.exports = { gameRouter };
