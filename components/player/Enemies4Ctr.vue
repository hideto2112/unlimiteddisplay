<template>
  <div>
    <img class="enemy" v-if="!$store.state.ending" 
    src="@/assets/missile.png" v-for="(enemy, idx) in $store.state.allData.enemies" :key="idx"
    :style="`top: ${enemy.top * unitHeight}px;
    left: ${ enemy.left * unitWidth +170}px;`">

   <img class="explodeEmemy" v-if="$store.state.ending"
    src="@/assets/explode.gif" v-for="(enemy, idx) in $store.state.allData.enemies" :key="idx"
    :style="`top: ${enemy.top * unitHeight}px;
    left: ${ enemy.left * unitWidth +170}px;`">

  </div>
</template>

<script>
export default {
  props:['data'],

  data(){
    const unitWidth = window.innerWidth/100
    const unitHeight = window.innerHeight/100

    return{
      unitWidth,
      unitHeight
    }
  },
}

</script>

<style>
.enemy{
  position: absolute;
  width: 20px;
  height: 5.2px;;
  z-index: 1
}

.explodeEmemy{
  position: absolute;
  width: 40px;
  height: 50px;;
  z-index: 1
}

</style>
