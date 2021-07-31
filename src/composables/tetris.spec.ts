import {
  attachMino,
  fallDownMino,
  existsValidBoundaryBottom,
  moveMino,
  existsValidBoundarySide,
  clearLines,
} from "./tetris";
import { Mino } from "../types/tetris";

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
});
