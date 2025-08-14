const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("Unit Tests", () => {
  test("Logic handles a valid puzzle string of 81 characters", function () {
    assert.isTrue(
      solver.validate(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      )
    );
  });
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function () {
    assert.isFalse(
      solver.validate(
        "0.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      )
    );
  });
  test("Logic handles a puzzle string that is not 81 characters in length", function () {
    assert.isFalse(
      solver.validate(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6."
      )
    );
  });
  test("Logic handles a valid row placement", function () {
    assert.isTrue(
      solver.checkRowPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "A",
        "1",
        "7"
      )
    );
  });
  test("Logic handles an invalid row placement", function () {
    assert.isFalse(
      solver.checkRowPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "A",
        "1",
        "1"
      )
    );
  });
  test("Logic handles a valid column placement", function () {
    assert.isTrue(
      solver.checkColPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "A",
        "1",
        "7"
      )
    );
  });
  test("Logic handles an invalid column placement", function () {
    assert.isFalse(
      solver.checkColPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "A",
        "1",
        "1"
      )
    );
  });
  test("Logic handles a valid region (3x3 grid) placement", function () {
    assert.isTrue(
      solver.checkRegionPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "A",
        "1",
        "7"
      )
    );
  });
  test("Logic handles an invalid region (3x3 grid) placement", function () {
    assert.isFalse(
      solver.checkRegionPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "A",
        "1",
        "2"
      )
    );
  });
  test("Valid puzzle strings pass the solver", function () {
    assert.isTrue(
      solver.checkValidBoard(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      )
    );
  });
  test("Invalid puzzle strings fail the solver", function () {
    assert.isFalse(
      solver.checkValidBoard(
        ".9...5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      )
    );
  });
});
