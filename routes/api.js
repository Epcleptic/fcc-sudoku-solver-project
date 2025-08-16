"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");
const solver = new SudokuSolver();

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {});

  app.route("/api/solve").post((req, res) => {
    const puzzle = req.body.puzzle;

    if (!puzzle) {
      res.json({ error: "Required field missing" });
      return;
    }

    try {
      const solution = solver.solve(puzzle);
      res.json({ solution });
    } catch (error) {
      res.json({ error: error.message });
    }
  });
};
