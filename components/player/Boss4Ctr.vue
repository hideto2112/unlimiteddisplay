<template>
    <div>
        <div class="boss" v-if="$store.state.allData.boss.life > 0" :style="`
        top: ${$store.state.allData.boss.top*unitHeight}px;
        left: ${ $store.state.allData.boss.left * unitWidth }px;
        background-image:url(${require(`@/assets/dragon.gif`)});
        `"/>

        <img src="@/assets/explode.gif" class="explode" v-if="$store.state.allData.boss.life <= 0" :style="`
        top: ${$store.state.allData.boss.top*unitHeight}px;
        left: ${ $store.state.allData.boss.left * unitWidth }px;
        `">

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
.boss{
    position: absolute;
    width: 205px;
    height: 135px;
    background-size: cover;
    background-position: center;
    z-index: 1 
}

.explode{
    position: absolute;
    width: 205px;
    height: 229px;
    z-index: 1
}
</style>
