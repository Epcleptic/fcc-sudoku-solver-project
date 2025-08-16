const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("Unit Tests", () => {
  test("Logic handles a valid puzzle string of 81 characters", function () {
    assert.doesNotThrow(() => {
      solver.validate(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      );
    });
  });
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function () {
    assert.throws(() => {
      solver.validate(
        "0.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      );
    }, "Invalid characters in puzzle");
  });
  test("Logic handles a puzzle string that is not 81 characters in length", function () {
    assert.throws(() => {
      solver.validate(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6."
      );
    }, "Expected puzzle to be 81 characters long");
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
    assert.equal(
      solver.solve(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      ),
      "769235418851496372432178956174569283395842761628713549283657194516924837947381625"
    );
  });
  test("Invalid puzzle strings fail the solver", function () {
    assert.throws(() => {
      solver.solve(
        ".9...5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      );
    }, "Puzzle cannot be solved");
  });
  test("Solver returns the expected solution for an incomplete puzzle", function () {
    assert.equal(
      solver.solve(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      ),
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
    );
  });
});
