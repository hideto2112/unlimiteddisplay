<template>
    <div>
        <div class="boss" v-if="$store.state.allData.boss.life > 0" :style="`
        top: ${$store.state.allData.boss.top*unitHeight}px;
        left: ${ ( ($store.state.allData.boss.left * $store.state.allData.display) - ($store.state.displayIndex * 100) ) * unitWidth }px;
        background-image:url(${require(`@/assets/dragon.gif`)});
        `"/>

        <img src="@/assets/explode.gif" class="explode" v-if="$store.state.allData.boss.life <= 0" :style="`
        top: ${($store.state.allData.boss.top*unitHeight) +100 }px;
        left: ${ ( ($store.state.allData.boss.left * $store.state.allData.display) - ($store.state.displayIndex * 100) ) * unitWidth }px;
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
    position: fixed;
    width: 683px;
    height: 450px;
    background-size: cover;
    background-position: center; 
}

.explode{
    position: fixed;
    width: 683px;
    height: 762px;
}
</style>
