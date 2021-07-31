<template>
  <div id="tetris">
    <div
      class="container"
      @keyup.left="move('l')"
      @keyup.right="move('r')"
      @keyup.down="fall()"
      @keyup.space="spin()"
      @keyup.enter="hold()"
      tabindex="1"
    >
      <div class="holdFields">
        <h2>Hold</h2>
        <div class="row" v-for="row in holdFields">
          <div class="col" v-for="col in row">
            <div class="nextCell" :class="getStyleByType(col)" />
          </div>
        </div>
      </div>
      <div class="fields">
        <div class="row" v-for="row in fields">
          <div class="col" v-for="col in row">
            <div class="cell" :class="getStyleByType(col)" />
          </div>
        </div>
      </div>
      <div class="nextFields">
        <h2>Next</h2>
        <div class="row" v-for="row in nextFields">
          <div class="col" v-for="col in row">
            <div class="nextCell" :class="getStyleByType(col)" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div><strong>move</strong> ... arrow key</div>
      <div><strong>spin</strong> ... space key</div>
      <div><strong>hold</strong> ... enter key</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useTetris from "../composables/tetris";

const getStyleByType = (type: number) => {
  switch (type) {
    case 1: {
      return "yellow";
    }
    case 2: {
      return "green";
    }
    case 3: {
      return "blue";
    }
    case 4: {
      return "orange";
    }
    case 5: {
      return "red";
    }
    case 6: {
      return "purple";
    }
    case 7: {
      return "lightblue";
    }
    default: {
      return "";
    }
  }
};

export default defineComponent({
  setup() {
    const { fields, nextFields, holdFields, start, move, fall, spin, hold } =
      useTetris();

    start(300);

    return {
      fields,
      nextFields,
      holdFields,
      getStyleByType,
      move,
      fall,
      spin,
      hold,
    };
  },
});
</script>

<style>
#tetris {
}

.container {
  display: flex;
  justify-content: center;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  padding: 24px;
  box-sizing: border-box;
}

.container:focus {
  outline: none;
}

.row,
.col {
  display: flex;
}

.nextFields {
  margin-left: 14px;
}

.holdFields {
  margin-right: 14px;
}

.cell,
.nextCell {
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: content-box;
  background: white;
}

.cell {
  width: 32px;
  height: 32px;
}

.nextCell {
  width: 20px;
  height: 20px;
}

.yellow {
  background: yellow;
}

.green {
  background: green;
}

.blue {
  background: blue;
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
