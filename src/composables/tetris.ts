import { ref, computed } from "vue";
import {
  squareMino,
  tMino,
  jMino,
  lMino,
  zMino,
  sMino,
  iMino,
} from "../constants/tetris";
import { Mino } from "../types/tetris";

const minos = [squareMino, tMino, jMino, lMino, zMino, sMino, iMino];

const useTetris = () => {
  const currentMino = ref<Mino>(getRandomMino());

  const fields = ref<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 21
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 20
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 19 -- display end
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 18
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 17
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 16
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 15
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 14
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 13
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 12
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 11
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 10
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 9
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 8
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 7
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 6
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 5
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 4
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 3
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 2
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 1
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 0 -- display start
  ]);

  const attachedFields = computed(() => {
    return attachMino(fields.value, currentMino.value);
  });

  const timer = (interval = 1000) => {
    setInterval(() => {
      if (existsValidBoundaryBottom(attachedFields.value, currentMino.value)) {
        // ミノを下げる
        currentMino.value = fallDownMino(currentMino.value);
      } else {
        fields.value = clearLines(attachedFields.value);

        currentMino.value = getRandomMino();
      }
    }, interval);
  };

  const fall = () => {
    if (existsValidBoundaryBottom(attachedFields.value, currentMino.value)) {
      // ミノを下げる
      currentMino.value = fallDownMino(currentMino.value);
    }
  };

  const move = (input: "l" | "r") => {
    if (existsValidBoundarySide(fields.value, currentMino.value, input)) {
      currentMino.value = moveMino(currentMino.value, input);
    }
  };

  return {
    fields: attachedFields,
    timer,
    move,
    fall,
  };
};

export default useTetris;

export const getRandomMino = () => {
  return minos[Math.floor(Math.random() * minos.length)];
};

export const attachMino = (field: number[][], mino: Mino) => {
  const cloneField = [...field];

  const attachedField = mino.coordinates.reduce((accum, coordinate) => {
    const { row, col } = coordinate;

    const targetRow = accum[row];
    const cloneRow = [...targetRow];

    cloneRow.splice(col, 1, mino.type);

    accum.splice(row, 1, cloneRow);

    return accum;
  }, cloneField);

  return attachedField;
};

export const fallDownMino = (mino: Mino): Mino => {
  const fallenCoordinates = mino.coordinates.map((coordinate) => {
    return {
      row: coordinate.row + 1,
      col: coordinate.col,
    };
  });

  return {
    ...mino,
    coordinates: fallenCoordinates,
  };
};

export const moveMino = (mino: Mino, input: "l" | "r"): Mino => {
  const moveCoordinates = mino.coordinates.map((coordinate) => {
    return {
      row: coordinate.row,
      col: input === "l" ? coordinate.col - 1 : coordinate.col + 1,
    };
  });

  return {
    ...mino,
    coordinates: moveCoordinates,
  };
};

export const existsValidBoundaryBottom = (fields: number[][], mino: Mino) => {
  const limit = fields.length;

  const cols = [
    ...new Set(mino.coordinates.map((coordinate) => coordinate.col)),
  ];

  const rowsTable = cols.reduce((table, col) => {
    const targetRows = mino.coordinates
      .filter((coordinate) => coordinate.col === col)
      .map((coordinate) => coordinate.row);

    if (targetRows.length === 0) {
      return table;
    }

    table[col] = Math.max(...targetRows);
    return table;
  }, {} as any);

  return mino.coordinates
    .filter((coordinate) => {
      const { row, col } = coordinate;

      return rowsTable[col] === row;
    })
    .map((coordinate) => {
      const { row, col } = coordinate;

      return row + 1 < limit ? fields[row + 1][col] : -1;
    })
    .every((cell) => cell === 0);
};

export const existsValidBoundarySide = (
  fields: number[][],
  mino: Mino,
  input: "l" | "r"
) => {
  const limit = fields[0].length;

  const cols = mino.coordinates.map((coordinate) => coordinate.col);
  const leftCol = Math.min(...cols);
  const rightCol = Math.max(...cols);

  switch (input) {
    case "l":
      return mino.coordinates
        .filter((coordinate) => coordinate.col === leftCol)
        .map((coordinate) => {
          const { row, col } = coordinate;

          return col - 1 >= 0 ? fields[row][col - 1] : -1;
        })
        .every((cell) => cell === 0);
    case "r":
      return mino.coordinates
        .filter((coordinate) => coordinate.col === rightCol)
        .map((coordinate) => {
          const { row, col } = coordinate;

          return col + 1 < limit ? fields[row][col + 1] : -1;
        })
        .every((cell) => cell === 0);
  }
};

export const clearLines = (fields: number[][]) => {
  const cloneFields = [...fields];

  const resultFields = cloneFields.filter((row) => {
    return !row.every((col) => col !== 0);
  });

  const clearCount = cloneFields.length - resultFields.length;

  for (let i = 0; i < clearCount; i++) {
    resultFields.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }

  return resultFields;
};

export const rotateMino = (mino: Mino) => {
  switch (mino.type) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
  }
};

export const rotateMinoS = (mino: Mino): Mino => {
  const { coordinates, stateIndex } = mino;

  const [first, second, third, forth] = coordinates;

  switch (stateIndex) {
    case 1:
      return {
        ...mino,
        stateIndex: 2,
        coordinates: [
          {
            row: first.row - 1,
            col: first.col + 1,
          },
          second,
          {
            row: third.row + 1,
            col: third.col + 1,
          },
          {
            row: forth.row + 2,
            col: forth.col,
          },
        ],
      };
    case 2:
      return {
        ...mino,
        stateIndex: 3,
        coordinates: [
          {
            row: first.row + 1,
            col: first.col + 1,
          },
          second,
          {
            row: third.row + 1,
            col: third.col - 1,
          },
          {
            row: forth.row,
            col: forth.col - 2,
          },
        ],
      };
    case 3:
      return {
        ...mino,
        stateIndex: 4,
        coordinates: [
          {
            row: first.row + 1,
            col: first.col - 1,
          },
          second,
          {
            row: third.row - 1,
            col: third.col - 1,
          },
          {
            row: forth.row - 2,
            col: forth.col,
          },
        ],
      };
    case 4:
      return {
        ...mino,
        stateIndex: 1,
        coordinates: [
          {
            row: first.row - 1,
            col: first.col - 1,
          },
          second,
          {
            row: third.row - 1,
            col: third.col + 1,
          },
          {
            row: forth.row,
            col: forth.col + 2,
          },
        ],
      };
  }
};
