export type MinoType = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type StateIndex =  1 | 2 | 3 | 4

export interface Mino {
  type: MinoType;
  stateIndex: StateIndex;
  coordinates: MinoCoordinate[];
}

export interface MinoCoordinate {
  row: number;
  col: number;
}
