import {
  attachMino,
  fallDownMino,
  existsValidBoundaryBottom,
  moveMino,
  existsValidBoundarySide,
  clearLines,
  rotateMinoS,
  rotateMinoJ,
  rotateMinoI,
  rotateMinoL,
  rotateMinoT,
  rotateMinoZ,
} from "./tetris";
import { Mino } from "../types/tetris";
import { sMino, jMino, iMino, lMino, tMino, zMino } from "../constants/tetris";

describe("tetris", () => {
  const fields: number[][] = [
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 0
  ];

  it("attach mino", () => {
    const mino: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 0,
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
        {
          row: 0,
          col: 6,
        },
      ],
    };

    const attachedField = attachMino(fields, mino);

    expect(attachedField).toEqual([
      [0, 0, 0, 0, 2, 2, 2, 0, 0, 0], // row 21
      [0, 0, 0, 0, 0, 2, 0, 0, 0, 0], // row 20
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
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 0
    ]);
  });

  it("falldown mino", () => {
    const mino: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 0,
          col: 8,
        },
        {
          row: 0,
          col: 9,
        },
        {
          row: 1,
          col: 9,
        },
        {
          row: 0,
          col: 10,
        },
      ],
    };

    const fallenDownMino = fallDownMino(mino);

    expect(fallenDownMino).toEqual({
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 1,
          col: 8,
        },
        {
          row: 1,
          col: 9,
        },
        {
          row: 2,
          col: 9,
        },
        {
          row: 1,
          col: 10,
        },
      ],
    });
  });

  it("move mino left", () => {
    const mino: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 0,
          col: 8,
        },
        {
          row: 0,
          col: 9,
        },
        {
          row: 1,
          col: 9,
        },
        {
          row: 0,
          col: 10,
        },
      ],
    };

    const moveLeftMino = moveMino(mino, "l");

    expect(moveLeftMino).toEqual({
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 0,
          col: 7,
        },
        {
          row: 0,
          col: 8,
        },
        {
          row: 1,
          col: 8,
        },
        {
          row: 0,
          col: 9,
        },
      ],
    });
  });

  it("move mino right", () => {
    const mino: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 0,
          col: 0,
        },
        {
          row: 0,
          col: 1,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
      ],
    };

    const moveRightMino = moveMino(mino, "r");

    expect(moveRightMino).toEqual({
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 0,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 0,
          col: 3,
        },
      ],
    });
  });

  it("checks boundary", () => {
    const mino: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 0,
          col: 7,
        },
        {
          row: 0,
          col: 8,
        },
        {
          row: 1,
          col: 8,
        },
        {
          row: 0,
          col: 9,
        },
      ],
    };

    const mino2: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 16,
          col: 7,
        },
        {
          row: 15,
          col: 8,
        },
        {
          row: 16,
          col: 8,
        },
        {
          row: 15,
          col: 9,
        },
      ],
    };

    const mino3: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 12,
          col: 1,
        },
        {
          row: 12,
          col: 2,
        },
        {
          row: 13,
          col: 2,
        },
        {
          row: 13,
          col: 3,
        },
      ],
    };

    const mino4: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 13,
          col: 6,
        },
        {
          row: 13,
          col: 7,
        },
        {
          row: 12,
          col: 7,
        },
        {
          row: 12,
          col: 8,
        },
      ],
    };

    const fields = [
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
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0], // row 8
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0], // row 7
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0], // row 6
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0], // row 5
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 4
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 3
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 2
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 1
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 0
    ];

    expect(existsValidBoundaryBottom(fields, mino)).toBe(true);
    expect(existsValidBoundaryBottom(fields, mino2)).toBe(false);
    expect(existsValidBoundaryBottom(fields, mino3)).toBe(false);
    expect(existsValidBoundaryBottom(fields, mino4)).toBe(false);
  });

  it("checks mino is able to move left", () => {
    const mino: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 0,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 0,
          col: 3,
        },
      ],
    };

    const mino2: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 0,
          col: 0,
        },
        {
          row: 0,
          col: 1,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
      ],
    };

    const fields = [
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
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 4
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 3
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 2
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 1
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 0
    ];

    expect(existsValidBoundarySide(fields, mino, "l")).toBe(true);
    expect(existsValidBoundarySide(fields, mino2, "l")).toBe(false);
  });

  it("checks mino is able to move right", () => {
    const mino: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 0,
          col: 6,
        },
        {
          row: 0,
          col: 7,
        },
        {
          row: 1,
          col: 7,
        },
        {
          row: 0,
          col: 8,
        },
      ],
    };

    const mino2: Mino = {
      type: 2,
      stateIndex: 1,
      coordinates: [
        {
          row: 0,
          col: 7,
        },
        {
          row: 0,
          col: 8,
        },
        {
          row: 1,
          col: 8,
        },
        {
          row: 0,
          col: 9,
        },
      ],
    };

    const fields = [
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
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 4
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 3
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 2
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 1
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 0
    ];

    expect(existsValidBoundarySide(fields, mino, "r")).toBe(true);
    expect(existsValidBoundarySide(fields, mino2, "r")).toBe(false);
  });

  it("checks clearing lines", () => {
    const fields = [
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
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 5
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 4
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 3
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 2
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 1
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // row 0
    ];

    expect(clearLines(fields)).toEqual([
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
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 0
    ]);
  });

  describe("rotation", () => {
    it("checks S mino", () => {
      const rotateFirst = rotateMinoS(sMino);

      expect(rotateFirst).toEqual<Mino>({
        type: 2,
        stateIndex: 2,
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
            row: 2,
            col: 5,
          },
        ],
      });

      const rotateSecond = rotateMinoS(rotateFirst);

      expect(rotateSecond).toEqual<Mino>({
        type: 2,
        stateIndex: 3,
        coordinates: [
          {
            row: 1,
            col: 5,
          },
          {
            row: 1,
            col: 4,
          },
          {
            row: 2,
            col: 4,
          },
          {
            row: 2,
            col: 3,
          },
        ],
      });

      const rotateThird = rotateMinoS(rotateSecond);

      expect(rotateThird).toEqual<Mino>({
        type: 2,
        stateIndex: 4,
        coordinates: [
          {
            row: 2,
            col: 4,
          },
          {
            row: 1,
            col: 4,
          },
          {
            row: 1,
            col: 3,
          },
          {
            row: 0,
            col: 3,
          },
        ],
      });

      const rotateForth = rotateMinoS(rotateThird);

      expect(rotateForth).toEqual<Mino>(sMino);
    });

    it("checks J mino", () => {
      const rotateFirst = rotateMinoJ(jMino);

      expect(rotateFirst).toEqual<Mino>({
        type: 3,
        stateIndex: 2,
        coordinates: [
          {
            row: 0,
            col: 6,
          },
          {
            row: 0,
            col: 5,
          },
          {
            row: 1,
            col: 5,
          },
          {
            row: 2,
            col: 5,
          },
        ],
      });

      const rotateSecond = rotateMinoJ(rotateFirst);

      expect(rotateSecond).toEqual<Mino>({
        type: 3,
        stateIndex: 3,
        coordinates: [
          {
            row: 2,
            col: 6,
          },
          {
            row: 1,
            col: 6,
          },
          {
            row: 1,
            col: 5,
          },
          {
            row: 1,
            col: 4,
          },
        ],
      });

      const rotateThird = rotateMinoJ(rotateSecond);

      expect(rotateThird).toEqual<Mino>({
        type: 3,
        stateIndex: 4,
        coordinates: [
          {
            row: 2,
            col: 4,
          },
          {
            row: 2,
            col: 5,
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
      });

      const rotateForth = rotateMinoJ(rotateThird);

      expect(rotateForth).toEqual<Mino>(jMino);
    });

    it("checks L mino", () => {
      const rotateFirst = rotateMinoL(lMino);

      expect(rotateFirst).toEqual<Mino>({
        ...lMino,
        stateIndex: 2,
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
            row: 2,
            col: 4,
          },
          {
            row: 2,
            col: 5,
          },
        ],
      });

      const rotateSecond = rotateMinoL(rotateFirst);

      expect(rotateSecond).toEqual<Mino>({
        ...lMino,
        stateIndex: 3,
        coordinates: [
          {
            row: 1,
            col: 5,
          },
          {
            row: 1,
            col: 4,
          },
          {
            row: 1,
            col: 3,
          },
          {
            row: 2,
            col: 3,
          },
        ],
      });

      const rotateThird = rotateMinoL(rotateSecond);

      expect(rotateThird).toEqual<Mino>({
        ...lMino,
        stateIndex: 4,
        coordinates: [
          {
            row: 2,
            col: 4,
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
            col: 3,
          },
        ],
      });

      const rotateForth = rotateMinoL(rotateThird);

      expect(rotateForth).toEqual<Mino>(lMino);
    });

    it("checks Z mino", () => {
      const rotateFn = rotateMinoZ;
      const baseMino = zMino;
      const rotateFirst = rotateFn(zMino);

      expect(rotateFirst).toEqual<Mino>({
        ...baseMino,
        stateIndex: 2,
        coordinates: [
          {
            row: 0,
            col: 5,
          },
          {
            row: 1,
            col: 5,
          },
          {
            row: 1,
            col: 4,
          },
          {
            row: 2,
            col: 4,
          },
        ],
      });

      const rotateSecond = rotateFn(rotateFirst);

      expect(rotateSecond).toEqual<Mino>({
        ...baseMino,
        stateIndex: 3,
        coordinates: [
          {
            row: 1,
            col: 6,
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
            row: 0,
            col: 4,
          },
        ],
      });

      const rotateThird = rotateFn(rotateSecond);

      expect(rotateThird).toEqual<Mino>({
        ...baseMino,
        stateIndex: 4,
        coordinates: [
          {
            row: 2,
            col: 5,
          },
          {
            row: 1,
            col: 5,
          },
          {
            row: 1,
            col: 6,
          },
          {
            row: 0,
            col: 6,
          },
        ],
      });

      const rotateForth = rotateFn(rotateThird);

      expect(rotateForth).toEqual<Mino>(baseMino);
    });

    it("checks T mino", () => {
      const rotateFn = rotateMinoT;
      const rotateFirst = rotateFn(tMino);

      expect(rotateFirst).toEqual<Mino>({
        ...tMino,
        stateIndex: 2,
        coordinates: [
          {
            row: 0,
            col: 5,
          },
          {
            row: 1,
            col: 5,
          },
          {
            row: 1,
            col: 6,
          },
          {
            row: 2,
            col: 5,
          },
        ],
      });

      const rotateSecond = rotateFn(rotateFirst);

      expect(rotateSecond).toEqual<Mino>({
        ...tMino,
        stateIndex: 3,
        coordinates: [
          {
            row: 1,
            col: 6,
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
            row: 1,
            col: 4,
          },
        ],
      });

      const rotateThird = rotateFn(rotateSecond);

      expect(rotateThird).toEqual<Mino>({
        ...tMino,
        stateIndex: 4,
        coordinates: [
          {
            row: 2,
            col: 5,
          },
          {
            row: 1,
            col: 5,
          },
          {
            row: 1,
            col: 4,
          },
          {
            row: 0,
            col: 5,
          },
        ],
      });

      const rotateForth = rotateFn(rotateThird);

      expect(rotateForth).toEqual<Mino>(tMino);
    });

    it("checks I mino", () => {
      const rotateFirst = rotateMinoI(iMino);

      expect(rotateFirst).toEqual<Mino>({
        ...iMino,
        stateIndex: 2,
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
            row: 2,
            col: 4,
          },
          {
            row: 3,
            col: 4,
          },
        ],
      });

      const rotateSecond = rotateMinoI(rotateFirst);

      expect(rotateSecond).toEqual<Mino>({
        ...iMino,
        stateIndex: 3,
        coordinates: [
          {
            row: 1,
            col: 6,
          },
          {
            row: 1,
            col: 5,
          },
          {
            row: 1,
            col: 4,
          },
          {
            row: 1,
            col: 3,
          },
        ],
      });

      const rotateThird = rotateMinoI(rotateSecond);

      expect(rotateThird).toEqual<Mino>({
        ...iMino,
        stateIndex: 4,
        coordinates: [
          {
            row: 3,
            col: 5,
          },
          {
            row: 2,
            col: 5,
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
      });

      const rotateForth = rotateMinoI(rotateThird);

      expect(rotateForth).toEqual<Mino>(iMino);
    });
  });
});
