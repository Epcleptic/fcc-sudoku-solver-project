class SudokuSolver {
  // The validate function should take a given puzzle string and check it to see if it has 81 valid characters for the input.
  validate(puzzleString) {
    return !!puzzleString.match(/^[1-9.]{81}$/);
  }

  // Helpers for getting parts of the puzzle
  getRow(puzzleString, row) {
    let start = ["A", "B", "C", "D", "E", "F", "G", "H", "I"].indexOf(
      row.toUpperCase()
    );
    if (start == -1) return;

    start *= 9;
    const end = start + 9;
    return puzzleString.slice(start, end);
  }

  getSquare(row, column) {
    if (isNaN(column)) return;

    column = Number(column) - 1;
    if (column < 0 || column > row.length) return;

    return row[column];
  }

  // The check functions should be validating against the current state of the board.
  checkValidPlacement(puzzleString, row, column) {
    row = this.getRow(puzzleString, row);
    if (!row) return false;
    const square = this.getSquare(row, column);
    return !!square;
  }

  checkSquarePlacement(puzzleString, row, column, value) {
    row = this.getRow(puzzleString, row);
    const square = this.getSquare(row, column);
    return square == value;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    if (!this.checkValidPlacement(puzzleString, row, column)) return false;
    if (this.checkSquarePlacement(puzzleString, row, column, value))
      return true;
    row = this.getRow(puzzleString, row);
    const square = this.getSquare(row, column);
    return square == "." && !row.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  // The solve function should handle solving any given valid puzzle string, not just the test inputs and solutions. You are expected to write out the logic to solve this.
  solve(puzzleString) {}
}

module.exports = SudokuSolver;
