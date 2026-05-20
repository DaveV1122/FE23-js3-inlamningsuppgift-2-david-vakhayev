function Cell({ cell, onClick }) {
  function getContent() {
    if (!cell.visible) {
      return "?";
    }

    if (cell.hasMine) {
      return "💣";
    }

    if (cell.numberOfNeighbouringMines === 0) {
      return "";
    }

    return cell.numberOfNeighbouringMines;
  }

  return (
    <button
      className={`cell ${cell.visible ? "cell-visible" : "cell-hidden"}`}
      onClick={() => onClick(cell)}
      disabled={cell.visible}
    >
      {getContent()}
    </button>
  );
}

export default Cell;