<template>
  <div class="container"
       @keyup.left="move('l')"
       @keyup.right="move('r')"
       @keyup.down="fall()"
       tabindex="1"
  >
    <div class="fields">
      <div class="row" v-for="row in fields">
        <div class="col" v-for="col in row">
          <div class="cell" :class="getStyleByType(col)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import useTetris from "../composables/tetris";

const getStyleByType = (type: number) => {
  switch (type) {
    case 1 : {
      return "yellow"
    }
    case 2: {
      return "green"
    }
    case 3: {
      return "blue"
    }
    case 4 : {
      return "orange"
    }
    case 5 : {
      return "red"
    }
    case 6 : {
      return "purple"
    }
    case 7: {
      return "lightblue"
    }
    default: {
      return ""
    }
  }
}

export default defineComponent({
  setup() {
    const {fields, timer, move, fall} = useTetris();

    // timer(300)

    return {
      fields,
      getStyleByType,
      move,
      fall
    }
  }
})

</script>

<style>
.container {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.1);
}

.container:focus {
  outline:none;
}

.row,
.col {
  display: flex;
}

.cell {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: content-box;
  background: white;
}

.yellow {
  background: yellow;
}

.green {
  background: green
}

.blue {
  background: blue
}

.orange {
  background: orange;
}

.red {
  background: red;
}

.purple {
  background: purple;
}

.lightblue {
  background: lightblue;
}

</style>
