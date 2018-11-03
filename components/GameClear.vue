<template>
    <div>
        <div class="gameClear" v-if="$store.state.ending" :style="`
        font-size: ${100 * $store.state.allData.display}px
        top: ${ 50 * unitHeight}px;
        left: ${ ( (20 * $store.state.allData.display) - ($store.state.displayIndex * 100) ) * unitWidth }px;
        `">
        {{$store.state.ending}}
        </div>
    </div>
</template>

<script>
export default {
  data(){
    const unitWidth = window.innerWidth/100
    const unitHeight = window.innerHeight/100

    return{
      unitWidth,
      unitHeight,
    }
  },

  methods:{

  }
}
</script>

<style>
.gameClear{
    position: absolute;
    color:olive;
    text-align: center;
}

</style>
