class SudokuSolver {
  // The validate function should take a given puzzle string and check it to see if it has 81 valid characters for the input.
  validate(puzzleString) {
    return !!puzzleString.match(/^[1-9.]{81}$/);
  }

  // The check functions should be validating against the current state of the board.
  getRow(puzzleString, row) {
    const start =
      ["A", "B", "C", "D", "E", "F", "G", "H", "I"].indexOf(row.toUpperCase()) *
      9;
    const end = start + 9;
    return puzzleString.slice(start, end);
  }
  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  // The solve function should handle solving any given valid puzzle string, not just the test inputs and solutions. You are expected to write out the logic to solve this.
  solve(puzzleString) {}
}

module.exports = SudokuSolver;
