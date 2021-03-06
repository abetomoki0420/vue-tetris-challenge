import { Mino } from "../types/tetris";

export const squareMino: Mino = {
  type: 1,
  stateIndex: 1,
  coordinates: [
    {
      row: 0,
      col: 4,
    },
    {
      row: 1,
      col: 4,
    },
    {
      row: 0,
      col: 5,
    },
    {
      row: 1,
      col: 5,
    },
  ],
};

// --------
//  - 3 4
//  1 2 -
//  - - -
// --------
//  - 1 -
//  - 2 3
//  - - 4
// --------
//  - - -
//  - 2 1
//  4 3 -
// --------
//  4 - -
//  3 2 -
//  - 1 -
// --------
export const sMino: Mino = {
  type: 2,
  stateIndex: 1,
  coordinates: [
    {
      row: 1,
      col: 3,
    },
    {
      row: 1,
      col: 4,
    },
    {
      row: 0,
      col: 4,
    },
    {
      row: 0,
      col: 5,
    },
  ],
};

// --------
//  1 - -
//  2 3 4
//  - - -
// --------
//  - 2 1
//  - 3 -
//  - 4 -
// --------
//  - - -
//  4 3 2
//  - - 1
// --------
//  - 4 -
//  - 3 -
//  1 2 -
// --------
export const jMino: Mino = {
  type: 3,
  stateIndex: 1,
  coordinates: [
    {
      row: 0,
      col: 4,
    },
    {
      row: 1,
      col: 4,
    },
    {
      row: 1,
      col: 5,
    },
    {
      row: 1,
      col: 6,
    },
  ],
};

// --------
//  - - 4
//  1 2 3
//  - - -
// --------
//  - 1 -
//  - 2 -
//  - 3 4
// --------
//  - - -
//  3 2 1
//  4 - -
// --------
//  4 3 -
//  - 2 -
//  - 1 -
// --------
export const lMino: Mino = {
  type: 4,
  stateIndex: 1,
  coordinates: [
    {
      row: 1,
      col: 3,
    },
    {
      row: 1,
      col: 4,
    },
    {
      row: 1,
      col: 5,
    },
    {
      row: 0,
      col: 5,
    },
  ],
};

// --------
//  - - -
//  1 2 -
//  - 3 4
// --------
//  - 1 -
//  3 2 -
//  4 - -
// --------
//  4 3 -
//  - 2 1
//  - - -
// --------
//  - - 4
//  - 2 3
//  - 1 -
// --------
export const zMino: Mino = {
  type: 5,
  stateIndex: 1,
  coordinates: [
    {
      row: 1,
      col: 4,
    },
    {
      row: 1,
      col: 5,
    },
    {
      row: 2,
      col: 5,
    },
    {
      row: 2,
      col: 6,
    },
  ],
};

// --------
//  - 3 -
//  1 2 4
//  - - -
// --------
//  - 1 -
//  - 2 3
//  - 4 -
// --------
//  - - -
//  4 2 1
//  - 3 -
// --------
//  - 4 -
//  3 2 -
//  - 1 -
// --------
export const tMino: Mino = {
  type: 6,
  stateIndex: 1,
  coordinates: [
    {
      row: 1,
      col: 4,
    },
    {
      row: 1,
      col: 5,
    },
    {
      row: 0,
      col: 5,
    },
    {
      row: 1,
      col: 6,
    },
  ],
};

// --------
//  - - - -
//  - - - -
//  1 2 3 4
//  - - - -
// --------
//  - 1 - -
//  - 2 - -
//  - 3 - -
//  - 4 - -
// --------
//  - - - -
//  4 3 2 1
//  - - - -
//  - - - -
// --------
//  - - 4 -
//  - - 3 -
//  - - 2 -
//  - - 1 -
// --------
export const iMino: Mino = {
  type: 7,
  stateIndex: 1,
  coordinates: [
    {
      row: 2,
      col: 3,
    },
    {
      row: 2,
      col: 4,
    },
    {
      row: 2,
      col: 5,
    },
    {
      row: 2,
      col: 6,
    },
  ],
};
