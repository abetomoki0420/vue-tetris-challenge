import Timer = NodeJS.Timer;
import { ref, computed , onMounted } from "vue";
import {
  squareMino,
  tMino,
  jMino,
  lMino,
  zMino,
  sMino,
  iMino,
} from "../constants/tetris";
import { Mino, MinoType } from "../types/tetris";

const minos = [squareMino, tMino, jMino, lMino, zMino, sMino, iMino];

const useTetris = () => {
  
  onMounted( () => {
    const tetrisEl = document.getElementById('tetris')
    tetrisEl?.focus();
  });
  
  
  const currentMino = ref<Mino>(getRandomMino());
  const nextMino = ref<Mino>(getRandomMino());
  const holdMino = ref<Mino | null>(null);

  const processingTimer = ref<Timer | null>(null);
  
  const hasHeldMino = ref<boolean>(false);

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

  const start = (interval = 1000) => {
    processingTimer.value = setInterval(processing, interval);
  };

  const processing = () => {
    if (existsValidBoundaryBottom(attachedFields.value, currentMino.value)) {
      // ??????????????????
      currentMino.value = fallDownMino(currentMino.value);
    } else {
      fields.value = clearLines(attachedFields.value);

      setNextMino();
  
      hasHeldMino.value = false;
    }

    if (!existsValidBoundary(fields.value, currentMino.value)) {
      alert("finish");

      const timer = processingTimer.value;
      if (timer !== null) {
        clearInterval(timer);
      }
    }
  };

  const fall = () => {
    const tempMino = fallDownMino(currentMino.value);
    if (existsValidBoundary(fields.value, tempMino)) {
      currentMino.value = tempMino;
    }
  };

  const move = (input: "l" | "r") => {
    const tempMino = moveMino(currentMino.value, input);
    if (existsValidBoundary(fields.value, tempMino)) {
      currentMino.value = tempMino;
    }
  };

  const spin = () => {
    const tempMino = rotateMino(currentMino.value);
    if (existsValidBoundary(fields.value, tempMino)) {
      currentMino.value = tempMino;
    }
  };

  const hold = () => {
    if(hasHeldMino.value){
      return;
    }
    
    if (holdMino.value) {
      // ??????????????????
      const tempMino = currentMino.value;
      currentMino.value = holdMino.value;
      holdMino.value = getMinoBaseByType(minos, tempMino.type);
    } else {
      // ??????????????????
      holdMino.value = getMinoBaseByType(minos, currentMino.value.type);
      setNextMino();
    }
    
    hasHeldMino.value = true;
  };

  const getMinoBaseByType = (minos: Mino[], minoType: MinoType) => {
    return minos.find((mino) => mino.type === minoType) as Mino;
  };

  const setNextMino = () => {
    currentMino.value = nextMino.value;
    nextMino.value = getRandomMino();
  };
  
  const holdFields = computed(() => {
    return getSubFields(holdMino.value)
  });
  
  const nextFields = computed( () => {
    return getSubFields(nextMino.value)
  })

  const getSubFields = (mino: Mino | null) => {
    const baseFields = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
  
    if (mino === null) {
      return baseFields;
    }
    
    return mino.coordinates.reduce((fields, coordinate) => {
      const { row, col } = coordinate;

      const rowOffset = 1;
      const colOffset = 3;

      baseFields[row + rowOffset][col - colOffset] = mino.type;

      return baseFields;
    }, baseFields);
  };

  return {
    fields: attachedFields,
    nextFields,
    holdFields,
    start,
    move,
    fall,
    spin,
    hold,
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

export const existsValidBoundary = (fields: number[][], mino: Mino) => {
  return mino.coordinates
    .map((coordinate) => {
      const { row, col } = coordinate;

      return fields[row][col];
    })
    .every((value) => value === 0);
};

export const rotateMino = (mino: Mino) => {
  switch (mino.type) {
    case 1:
      return mino;
    case 2:
      return rotateMinoS(mino);
    case 3:
      return rotateMinoJ(mino);
    case 4:
      return rotateMinoL(mino);
    case 5:
      return rotateMinoZ(mino);
    case 6:
      return rotateMinoT(mino);
    case 7:
      return rotateMinoI(mino);
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

export const rotateMinoJ = (mino: Mino): Mino => {
  const { coordinates, stateIndex } = mino;

  const [first, second, third, forth] = coordinates;

  switch (stateIndex) {
    case 1:
      return {
        ...mino,
        stateIndex: 2,
        coordinates: [
          {
            row: first.row,
            col: first.col + 2,
          },
          {
            row: second.row - 1,
            col: second.col + 1,
          },
          third,
          {
            row: forth.row + 1,
            col: forth.col - 1,
          },
        ],
      };
    case 2:
      return {
        ...mino,
        stateIndex: 3,
        coordinates: [
          {
            row: first.row + 2,
            col: first.col,
          },
          {
            row: second.row + 1,
            col: second.col + 1,
          },
          third,
          {
            row: forth.row - 1,
            col: forth.col - 1,
          },
        ],
      };
    case 3:
      return {
        ...mino,
        stateIndex: 4,
        coordinates: [
          {
            row: first.row,
            col: first.col - 2,
          },
          {
            row: second.row + 1,
            col: second.col - 1,
          },
          third,
          {
            row: forth.row - 1,
            col: forth.col + 1,
          },
        ],
      };
    case 4:
      return {
        ...mino,
        stateIndex: 1,
        coordinates: [
          {
            row: first.row - 2,
            col: first.col,
          },
          {
            row: second.row - 1,
            col: second.col - 1,
          },
          third,
          {
            row: forth.row + 1,
            col: forth.col + 1,
          },
        ],
      };
  }
};

export const rotateMinoL = (mino: Mino): Mino => {
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
            col: third.col - 1,
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
            row: third.row - 1,
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
            col: third.col + 1,
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
            row: third.row + 1,
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

export const rotateMinoZ = (mino: Mino): Mino => {
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
            row: third.row - 1,
            col: third.col - 1,
          },
          {
            row: forth.row,
            col: forth.col - 2,
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
            row: third.row - 1,
            col: third.col + 1,
          },
          {
            row: forth.row - 2,
            col: forth.col,
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
            row: third.row + 1,
            col: third.col + 1,
          },
          {
            row: forth.row,
            col: forth.col + 2,
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
            row: third.row + 1,
            col: third.col - 1,
          },
          {
            row: forth.row + 2,
            col: forth.col,
          },
        ],
      };
  }
};

export const rotateMinoT = (mino: Mino): Mino => {
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
            row: forth.row + 1,
            col: forth.col - 1,
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
            row: forth.row - 1,
            col: forth.col - 1,
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
            row: forth.row - 1,
            col: forth.col + 1,
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
            row: forth.row + 1,
            col: forth.col + 1,
          },
        ],
      };
  }
};

export const rotateMinoI = (mino: Mino): Mino => {
  const { coordinates, stateIndex } = mino;

  const [first, second, third, forth] = coordinates;

  switch (stateIndex) {
    case 1:
      return {
        ...mino,
        stateIndex: 2,
        coordinates: [
          {
            row: first.row - 2,
            col: first.col + 1,
          },
          {
            row: second.row - 1,
            col: second.col,
          },
          {
            row: third.row,
            col: third.col - 1,
          },
          {
            row: forth.row + 1,
            col: forth.col - 2,
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
            col: first.col + 2,
          },
          {
            row: second.row,
            col: second.col + 1,
          },
          {
            row: third.row - 1,
            col: third.col,
          },
          {
            row: forth.row - 2,
            col: forth.col - 1,
          },
        ],
      };
    case 3:
      return {
        ...mino,
        stateIndex: 4,
        coordinates: [
          {
            row: first.row + 2,
            col: first.col - 1,
          },
          {
            row: second.row + 1,
            col: second.col,
          },
          {
            row: third.row,
            col: third.col + 1,
          },
          {
            row: forth.row - 1,
            col: forth.col + 2,
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
            col: first.col - 2,
          },
          {
            row: second.row,
            col: second.col - 1,
          },
          {
            row: third.row + 1,
            col: third.col,
          },
          {
            row: forth.row + 2,
            col: forth.col + 1,
          },
        ],
      };
  }
};
