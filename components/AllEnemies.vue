<template>

  <div>
    <img class="enemy" v-if="!$store.state.ending"
    src="@/assets/missile.png" v-for="(enemy, idx) in $store.state.allData.enemies" :key="idx"
    :style="`top: ${(enemy.top * unitHeight) + 12}px;
    left: ${ ( ( (enemy.left * $store.state.allData.display) - ($store.state.displayIndex * 100) ) * unitWidth ) + 100 }px;`">

    <img class="explodeEmemy" v-if="$store.state.ending"
    src="@/assets/explode.gif" v-for="(enemy, idx) in $store.state.allData.enemies" :key="idx"
    :style="`top: ${(enemy.top * unitHeight) + 12}px;
    left: ${ ( ( (enemy.left * $store.state.allData.display) - ($store.state.displayIndex * 100) ) * unitWidth ) + 100 }px;`">
  </div>

</template>

<script>


export default {
  props:[],

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
  width: 50px;
  height: 13px;
}

.explodeEmemy{
  position: absolute;
  width: 100px;
  height: 120px;
}

</style>
