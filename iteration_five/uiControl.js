function display(board) {
  let rank;
  let file;
  for (i = 1; i <= board.length; i++) {
    rank = i.toString();
    for (j = 1; j <= board[0].length; j++) {
      file = numToLetter(j);
      $(`.spot[data-file="${file}"][data-rank="${rank}"]`)[0].dataset.piece =
        board[i - 1][j - 1];
    }
  }
}
