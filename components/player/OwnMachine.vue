<template>
  <div> 
    <div class="ownMachine" v-if="Object.keys(data).length!==0"
    :style="`
    top: ${ data.top * unitHeight }px; 
    left: ${ (data.left * unitWidth) +170 }px;
    background-image: url( ${ require(`@/assets/${data.machine}.png`) } );
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
      unitHeight,
    }
  },

  mounted(){},
}
</script>

<style>
.ownMachine{
  position: fixed;
  background-position: center;
  background-size: cover;
  width: 50px;
  height: 12px;
  z-index: 1;
}
</style>
