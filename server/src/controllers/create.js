const { Router } = require("express");
const { parseError } = require("../util");

const { isAdmin } = require("../middlewares/guards");

const {
  recordCategory,
  recordQuestion,
  getCategoryId,
  checkCategory,
  checkQuestion,
} = require("../services/create");

const createRouter = Router();

createRouter.post("/checkCategory", isAdmin(), async (req, res) => {
  try {
    const categoryName = req.body.categoryName.toLowerCase();
    const result = await checkCategory(categoryName);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.errors });
  }
});

createRouter.post("/checkQuestion", isAdmin(), async (req, res) => {
  try {
    const questionName = req.body.questionName;
    const result = await checkQuestion(questionName);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.errors });
  }
});

createRouter.post("/singleQuestion", isAdmin(), async (req, res) => {
  try {
    const categoryId = await getCategoryId(
      req.body.questionDetails.categoryName
    );

    const result = await recordQuestion(req.body.questionDetails, categoryId);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.errors });
  }
});

createRouter.post("/categoryAndQuestions", isAdmin(), async (req, res) => {
  try {
    let result;

    const items = req.body.items;
    const categoryName = items[0][1].toLowerCase();
    const createCategory = await recordCategory(categoryName);
    result = createCategory;

    for (let i = 1; i <= 4; i++) {
      result = await recordQuestion(items[i][1], createCategory._id);
    }

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { createRouter };
