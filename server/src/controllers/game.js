const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { isUser } = require("../middlewares/guards");
const { parseError } = require("../util");

const {
  getAllCategories,
  //   getCategory,
  //   getQuestions,
  //   updatePoints,
} = require("../services/game");

const gameRouter = Router();

gameRouter.get("/allCategories", async (req, res) => {
  try {
    let allCategories = await getAllCategories();

    // const newCategories = [];
    // for (let i = 0; i <= 3; i++) {
    //   const randomCategory =
    //     allCategories[Math.floor(Math.random() * allCategories.length)];

    //   newCategories.push({
    //     name: randomCategory.name,
    //     selected: false,
    //   });
    //   allCategories = allCategories.filter(
    //     (category) => category.name != randomCategory.name
    //   );
    // }

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

// gameRouter.get("/questions/:categoriesIDs", async (req, res) => {
//   try {
//     const categoriesIDs = req.params.categoriesIDs;
//     const categoriesIDsArr = categoriesIDs.split(",");
//     const data = await getQuestions(categoriesIDsArr);
//     res.json(data);
//   } catch (err) {
//     const parsed = parseError(err);
//     res.status(400).json({ code: 400, message: parsed.message });
//   }
// });

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
