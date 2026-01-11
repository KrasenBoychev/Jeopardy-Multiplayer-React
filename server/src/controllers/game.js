const { Router } = require("express");
const { parseError } = require("../util");

const { getAllCategories, getQuestion } = require("../services/game");

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

module.exports = { gameRouter };
