<template>

  <div>
    <div class="player"  v-for="(player, idx) in $store.state.allData.players" :key="idx"
    :style="`top: ${player.top * unitHeight}px; 
    left: ${ ( (player.left * $store.state.allData.display) - ($store.state.displayIndex * 100) ) * unitWidth }px;
    background-image:url(${require(`@/assets/${player.machine}.png`)});
    `">
    <p class="machineInfo" :style="`color:${player.machine};`"> {{player.score}} {{player.name}} </p>
    </div>

  </div>

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  props:['index'],

  computed: {
    getMachine(){
      let machines = ['combatB.gif', 'combatG.gif', 'combatO.gif', 'combatR.gif', 'combatY.gif']
      return `@/assets/${machines[Math.floor(Math.random()*5)]}`
    },
  },
  
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
.player{
  position: absolute;
  background-position: center;
  background-size: cover;
  width: 100px;
  height: 24px;
  font-size:15px;
  padding-top: 23px;
}

</style>
