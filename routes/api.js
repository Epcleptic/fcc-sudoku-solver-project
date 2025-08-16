"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");
const solver = new SudokuSolver();

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const puzzle = req.body.puzzle;
    const coordinate = req.body.coordinate;
    const value = req.body.value;

    if (!puzzle || !coordinate || !value)
      return res.json({ error: "Required field(s) missing" });

    const row = coordinate[0];
    const column = coordinate.slice(1);

    try {
      solver.validate(puzzle);
    } catch (error) {
      return res.json({ error: error.message });
    }

    if (!solver.valid_row(row) || !solver.valid_col(column))
      return res.json({ error: "Invalid coordinate" });

    if (!solver.all_values().includes(value))
      return res.json({ error: "Invalid value" });

    const rowValid = solver.checkRowPlacement(puzzle, row, column, value);
    const columnValid = solver.checkColPlacement(puzzle, row, column, value);
    const regionValid = solver.checkRegionPlacement(puzzle, row, column, value);

    if (rowValid && columnValid && regionValid) {
      res.json({ valid: true });
    } else {
      const conflict = [];
      if (!rowValid) conflict.push("row");
      if (!columnValid) conflict.push("column");
      if (!regionValid) conflict.push("region");
      res.json({ valid: false, conflict: conflict });
    }

    console.log(rowValid, columnValid, regionValid);
  });

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
