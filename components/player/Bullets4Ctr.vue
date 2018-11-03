<template>
  <div>
    <div class="bullets" v-for="(bullet, idx) in $store.state.allData.bullets" 
    v-if="Object.keys(data).length!==0 && data.id === bullet.id" :key="idx"
    :style="`top: ${bullet.top * unitHeight}px;
    left: ${ bullet.left * unitWidth + 170 }px;
    background:${data? data.machine : '#585858'};
    `"/>
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

<style scoped>
.bullets{
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  z-index: 1;
}
</style>
