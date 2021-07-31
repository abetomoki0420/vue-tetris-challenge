export type MinoType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Mino {
  type: MinoType;
  coordinates: MinoCoordinate[];
}

export interface MinoCoordinate {
  row: number;
  col: number;
}
