const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { isUser } = require("../middlewares/guards");
const { parseError } = require("../util");

const {
  getAllCategories,
  //   getCategory,
  getQuestion,
  //   updatePoints,
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

// gameRouter.get("/category/:categoryName", async (req, res) => {
//   try {
//     const data = await getCategory(req.params.categoryName);
//     res.json(data);
//   } catch (err) {
//     const parsed = parseError(err);
//     res.status(400).json({ code: 400, message: parsed.message });
//   }
// });

gameRouter.post("/questions", async (req, res) => {
  const allQuestions = [];

  try {
    const categoriesIDs = req.body.categoriesIDs;
    const pointsList = [5, 10, 15, 20];

    for (let c = 0; c < categoriesIDs.length; c++) {
      for (let p = 0; p < pointsList.length; p++) {
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

// gameRouter.put(
//   "/result/:userId",
//   isUser(),
//   body("points")
//     .trim()
//     .notEmpty()
//     .isNumeric()
//     .withMessage("Points should be a number"),
//   async (req, res) => {
//     try {
//       const validation = validationResult(req);

//       if (validation.errors.length) {
//         throw validation.errors;
//       }

//       const result = await updatePoints(req.params.userId, req.body);
//       res.json(result);
//     } catch (err) {
//       const parsed = parseError(err);
//       res.status(400).json({ code: 400, message: parsed.errors });
//     }
//   }
// );

module.exports = { gameRouter };
