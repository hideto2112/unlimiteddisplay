<template>

  <div>
    <div class="bullets" v-for="(bullet, idx) in $store.state.allData.bullets" :key="idx"
    :style="`top: ${ (bullet.top * unitHeight) + 12}px;
    left: ${ ( ( (bullet.left * $store.state.allData.display) - ($store.state.displayIndex * 100) ) * unitWidth ) + 100 }px;
    background-color: ${bullet.color};`"/>
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
.bullets{
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
}

</style>