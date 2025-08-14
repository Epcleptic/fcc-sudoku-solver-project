const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("Unit Tests", () => {
  test("Logic handles a valid puzzle string of 81 characters", function () {
    assert.isTrue(
      solver.validate(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      )
    );
  });
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function () {
    assert.isFalse(
      solver.validate(
        "0.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      )
    );
  });
  test("Logic handles a puzzle string that is not 81 characters in length", function () {
    assert.isFalse(
      solver.validate(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37"
      )
    );
  });
  test("Logic handles a valid row placement", function () {
    assert.isTrue(
      solver.checkRowPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37",
        "A",
        "1",
        "1"
      )
    );
  });
  test("Logic handles an invalid row placement", function () {
    assert.isFalse(
      solver.checkRowPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37",
        "A",
        "1",
        "2"
      )
    );
  });
});
