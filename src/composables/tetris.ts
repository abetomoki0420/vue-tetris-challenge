import {ref, computed, onMounted, nextTick} from "vue"
import {squareMino, tMino, jMino, lMino, zMino, sMino, iMino} from "../constants/tetris";

interface Mino {
  type: number,
  coordinates: MinoCoordinate[]
}

interface MinoCoordinate {
  row: number,
  col: number
}

const minos = [
  squareMino, tMino, jMino, lMino, zMino, sMino, iMino
]


const useTetris = () => {
  
  onMounted(() => {
    nextTick(() => {
      document.getElementById('input')?.focus();
    })
  })
  
  const currentMino = ref<Mino>(getRandomMino()  )
  
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
    return attachMino(fields.value, currentMino.value)
  })
  
  const timer = () => {
    setInterval(() => {
      if (existsValidBoundaryBottom(attachedFields.value, currentMino.value)) {
        // ミノを下げる
        currentMino.value = fallDownMino(currentMino.value)
      } else {
        fields.value = attachedFields.value
        currentMino.value = getRandomMino();
      }
    }, 300)
  }
  
  const fall = () => {
    if (existsValidBoundaryBottom(attachedFields.value, currentMino.value)) {
      // ミノを下げる
      currentMino.value = fallDownMino(currentMino.value)
    }
  }
  
  const move = (input: 'l' | 'r') => {
    if (existsValidBoundarySide(fields.value, currentMino.value, input)) {
      currentMino.value = moveMino(currentMino.value, input)
    }
  }
  
  return {
    fields: attachedFields,
    timer,
    move,
    fall
  }
}

export default useTetris;

export const getRandomMino = () => {
  return minos[Math.floor(Math.random() * minos.length)];
}

export const attachMino = (field: number[][], mino: Mino) => {
  const cloneField = [...field]
  
  const attachedField = mino.coordinates.reduce((accum, coordinate) => {
    const {row, col} = coordinate;
    
    const targetRow = accum[row];
    const cloneRow = [...targetRow]
    
    cloneRow.splice(col, 1, mino.type)
    
    accum.splice(row, 1, cloneRow);
    
    return accum;
  }, cloneField)
  
  return attachedField;
}

export const fallDownMino = (mino: Mino): Mino => {
  const fallenCoordinates = mino.coordinates.map(coordinate => {
    return {
      row: coordinate.row + 1,
      col: coordinate.col
    }
  })
  
  return {
    type: mino.type,
    coordinates: fallenCoordinates
  }
}

export const moveMino = (mino: Mino, input: 'l' | 'r'): Mino => {
  const moveCoordinates = mino.coordinates.map(coordinate => {
    return {
      row: coordinate.row,
      col: input === 'l' ? coordinate.col - 1 : coordinate.col + 1
    }
  })
  
  return {
    type: mino.type,
    coordinates: moveCoordinates
  }
}

export const existsValidBoundaryBottom = (fields: number[][], mino: Mino) => {
  const limit = fields.length;
  
  const bottomRow = Math.max(...mino.coordinates.map(coordinate => coordinate.row))
  
  return mino.coordinates
    .filter(coordinate => coordinate.row === bottomRow)
    .map(coordinate => {
      const {row, col} = coordinate;
      
      return row + 1 < limit ? fields[row + 1][col] : -1;
    }).every(cell => cell === 0)
}

export const existsValidBoundarySide = (fields: number[][], mino: Mino, input: 'l' | 'r') => {
  const limit = fields[0].length;
  
  const cols = mino.coordinates.map(coordinate => coordinate.col)
  const leftCol = Math.min(...cols)
  const rightCol = Math.max(...cols)
  
  switch (input) {
    case "l":
      return mino.coordinates
        .filter(coordinate => coordinate.col === leftCol)
        .map(coordinate => {
          const {row, col} = coordinate;
          
          return col - 1 >= 0 ? fields[row][col - 1] : -1;
        }).every(cell => cell === 0)
    case "r":
      return mino.coordinates
        .filter(coordinate => coordinate.col === rightCol)
        .map(coordinate => {
          const {row, col} = coordinate;
          
          return col + 1 < limit ? fields[row][col + 1] : -1;
        }).every(cell => cell === 0)
  }
}
