import React from "react";
import Cell from "./Cell";
import createBoard from "../utils";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: createBoard(25, 7),
      gameOver: false,
      gameWon: false,
    };
  }

  handleCellClick = (clickedCell) => {
    if (this.state.gameOver || this.state.gameWon || clickedCell.visible) {
      return;
    }

    const updatedBoard = this.state.board.map((cell) => {
      if (cell.index === clickedCell.index) {
        return {
          ...cell,
          visible: true,
        };
      }

      return cell;
    });

    if (clickedCell.hasMine) {
      this.setState({
        board: updatedBoard.map((cell) => ({
          ...cell,
          visible: cell.hasMine ? true : cell.visible,
        })),
        gameOver: true,
      });

      return;
    }

    const safeCells = updatedBoard.filter((cell) => !cell.hasMine);
    const visibleSafeCells = safeCells.filter((cell) => cell.visible);

    if (safeCells.length === visibleSafeCells.length) {
      this.setState({
        board: updatedBoard,
        gameWon: true,
      });

      return;
    }

    this.setState({
      board: updatedBoard,
    });
  };

  render() {
    return (
      <section className="board-wrapper">
        <h2>Inlämningsuppgift 2 i JavaScript 3</h2>
        <p>David Vakhayev, FE23</p>

        {this.state.gameOver && (
          <div className="message lose-message">Du förlorade!</div>
        )}

        {this.state.gameWon && (
          <div className="message win-message">Du vann!</div>
        )}

        <div className="board">
          {this.state.board.map((cell) => (
            <Cell
              key={cell.index}
              cell={cell}
              onClick={this.handleCellClick}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default Board;