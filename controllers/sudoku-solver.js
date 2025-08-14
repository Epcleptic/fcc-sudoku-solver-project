class SudokuSolver {
  // The validate function should take a given puzzle string and check it to see if it has 81 valid characters for the input.
  validate(puzzleString) {
    return !!puzzleString.match(/^[1-9.]{81}$/);
  }

  // Helpers for getting parts of the puzzle
  row_letters() {
    return ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  }
  valid_row(row) {
    return this.row_letters().includes(row.toUpperCase());
  }
  getRow(puzzleString, row) {
    if (!this.valid_row(row)) return;

    const start = this.row_letters().indexOf(row.toUpperCase()) * 9;
    const end = start + 9;
    return puzzleString.slice(start, end);
  }
  rows(puzzleString) {
    return this.row_letters().map((letter) =>
      this.getRow(puzzleString, letter)
    );
  }

  column_numbers() {
    return ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  }
  valid_col(column) {
    return this.column_numbers().includes(column);
  }
  getColumn(puzzleString, column) {
    if (!this.valid_col(column)) return;
    return this.row_letters(puzzleString).map((row) =>
      this.getSquare(puzzleString, row, column)
    );
  }
  columns(puzzleString) {
    return this.column_numbers().map((number) =>
      this.getColumn(puzzleString, number)
    );
  }

  getSquare(puzzleString, row, column) {
    if (!this.valid_row(row)) return;
    if (!this.valid_col(column)) return;

    row = this.getRow(puzzleString, row);
    column = Number(column);
    return row[column - 1];
  }
  squares(puzzleString) {
    const result = [];
    this.row_letters(puzzleString).forEach((row) => {
      this.column_numbers().forEach((column) => {
        result.push(this.getSquare(puzzleString, row, column));
      });
    });
    return result;
  }

  getRegionRows(row) {
    if (["A", "B", "C"].includes(row.toUpperCase())) return ["A", "B", "C"];
    if (["D", "E", "F"].includes(row.toUpperCase())) return ["D", "E", "F"];
    return ["G", "H", "I"];
  }
  getRegionCols(column) {
    if (["1", "2", "3"].includes(column)) return ["1", "2", "3"];
    if (["4", "5", "6"].includes(column)) return ["4", "5", "6"];
    return ["7", "8", "9"];
  }
  getRegion(puzzleString, row, column) {
    if (!this.valid_row(row)) return;
    if (!this.valid_col(column)) return;

    const rows = this.getRegionRows(row);
    const cols = this.getRegionCols(column);

    let result = "";
    rows.forEach((row) => {
      cols.forEach((column) => {
        result += this.getSquare(puzzleString, row, column);
      });
    });

    return result;
  }
  regions(puzzleString) {
    let result = [];
    ["A", "D", "G"].forEach((row) => {
      ["1", "4", "7"].forEach((column) => {
        result.push(this.getRegion(puzzleString, row, column));
      });
    });
    return result;
  }

  // The check functions should be validating against the current state of the board.
  checkValidPlacement(puzzleString, row, column) {
    const square = this.getSquare(puzzleString, row, column);
    return !!square;
  }

  checkSquarePlacement(puzzleString, row, column, value) {
    const square = this.getSquare(puzzleString, row, column);
    return square == value;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    if (!this.validate(puzzleString)) return false;
    if (!this.checkValidPlacement(puzzleString, row, column)) return false;
    if (this.checkSquarePlacement(puzzleString, row, column, value))
      return true;
    const square = this.getSquare(puzzleString, row, column);
    return square == "." && !this.getRow(puzzleString, row).includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    if (!this.validate(puzzleString)) return false;
    if (!this.checkValidPlacement(puzzleString, row, column)) return false;
    if (this.checkSquarePlacement(puzzleString, row, column, value))
      return true;
    const square = this.getSquare(puzzleString, row, column);
    return (
      square == "." && !this.getColumn(puzzleString, column).includes(value)
    );
  }

  checkRegionPlacement(puzzleString, row, column, value) {}

  // The solve function should handle solving any given valid puzzle string, not just the test inputs and solutions. You are expected to write out the logic to solve this.
  solve(puzzleString) {}
}

module.exports = SudokuSolver;
