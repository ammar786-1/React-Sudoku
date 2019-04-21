const baseUrl = "https://sugoku.herokuapp.com/board?difficulty=";
const easy = "easy";
const medium = "medium";
const hard = "hard";
const random = "random";
export const levels = [random, easy, medium, hard];

export async function getEasy() {
  return await getGrid(easy);
}

export async function getMedium() {
  return await getGrid(medium);
}

export async function getHard() {
  return await getGrid(hard);
}

export async function getRandom() {
  return await getGrid(random);
}

export async function getGrid(difficulty) {
  const res = await fetch(baseUrl + difficulty);
  const json = await res.json();
  const board = json.board;
  const grid = [];
  board.forEach(row => {
    row.forEach(cell => grid.push(cell));
  });
  // console.log(grid);

  // prettier-ignore
  /* const grid = [
    0, 0, 0, 8, 0, 0, 0, 0, 4, 
    1, 0, 0, 0, 0, 0, 5, 0, 0, 
    0, 8, 9, 0, 0, 0, 1, 0, 3, 
    0, 0, 2, 0, 0, 0, 0, 8, 0, 
    4, 0, 0, 0, 0, 8, 2, 0, 0, 
    0, 0, 8, 1, 0, 0, 4, 0, 0, 
    5, 0, 0, 0, 0, 4, 6, 0, 7, 
    0, 0, 0, 9, 0, 0, 0, 4, 0, 
    0, 0, 0, 6, 0, 5, 8, 1, 2
  ]; */
  return grid;
}
