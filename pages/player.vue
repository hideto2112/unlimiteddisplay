<template>

<div class="player">

    <!-- 名前設定 -->
    <div class="name" v-if="input">
      <p class="description">TYPE YOUR NAME</p>
      <input type="text" v-model="name">
      <button class="nameSet" @click="nameSet">OK</button>

      <img class="logo" src="@/assets/logo.png" alt="">
    </div>

    <!-- コンソール部分 -->
    <div class="gameKeys" v-if="keys">
      <div class="playerName" :style="`color:${playerData ? playerData.machine : '#585858'}`">
         {{playerData ? playerData.name : ''}} 
      </div>

      <!-- 残りのライフ -->
      <div class="life" :style="`right:${point * 7}vh;
        background-color:${playerData ? playerData.machine : '#585858'}`"
        v-for="point in (playerData? playerData.life : 5)" :key="point"
        /> 

      <!-- ゲームオーバー処理 -->
      <!-- <div class="gameOver" v-if="playerData.life <= 0"> GAME OVER </div> -->

      <div class="keys">
        <v-touch class="left horizontal" @press="leftInit" @pressup="leftRightEnd"></v-touch>
        <div>
          <v-touch class="up vertical" @press="upInit" @pressup="upDownEnd"></v-touch>
          <v-touch class="down vertical" @press="downInit" @pressup="upDownEnd"></v-touch>
        </div>
        <v-touch class="right horizontal" @press="rightInit" @pressup="leftRightEnd"></v-touch>

        <v-touch class="fire" @press="fireInit" @pressup="fireEnd"></v-touch>
      </div>

      <!-- <div class="keys">
        <img src="@/assets/left.png" class="left horizontal" @mousedown="leftInit" @mouseup="leftRightEnd" />
        <div>
          <img src="@/assets/up.png" class="up vertical" @mousedown="upInit" @mouseup="upDownEnd">
          <img src="@/assets/down.png" class="down vertical" @mousedown="downInit" @mouseup="upDownEnd">
        </div>
        <img src="@/assets/right.png" class="right horizontal" @mousedown="rightInit" @mouseup="leftRightEnd">

        <img src="@/assets/fire.png" class="fire" @mousedown="fireInit" @mouseup="fireEnd">
      </div> -->

      <!-- 以下、ゲーム画面の描画処理 -->
      <OwnMachine :data="playerData ? playerData : false "/>
      <Enemies4Ctr :data="playerData ? playerData : false "/>
      <Bullets4Ctr :data="playerData ? playerData : false "/>
      <Boss4Ctr/>
    </div>

</div>

</template>

<script>
import Vue from 'vue'
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import OwnMachine from "~/components/player/OwnMachine.vue";
import Enemies4Ctr from "~/components/player/Enemies4Ctr.vue";
import Bullets4Ctr from "~/components/player/Bullets4Ctr.vue";
import Boss4Ctr from "~/components/player/Boss4Ctr.vue";

export default {
  components: {
    OwnMachine,
    Enemies4Ctr,
    Bullets4Ctr,
    Boss4Ctr
  },

  async fetch({ store }){
    //fetchではmapActionsは使えないので、name spaceを指定
    await store.dispatch('getAllPlayers')
  },

  data() {
    return {
      input: true,
      keys: false,
      name:'',
      id: 0,
      playerData: {},
    };
  },

  computed: {
    ...mapState([
      'allData',
    ]),

    ...mapGetters([
    ]),
  },

  mounted(){

  },
 
  methods: {
    ...mapMutations([
    ]),

    ...mapActions([
      'setName',
      'up',
      'down',
      'stopMove',
      'left',
      'right',
      'fire',
      'stopFire',
    ]),

    async nameSet(){
      if(!this.name)return
      this.input = false
      this.keys = true
      this.id = await this.setName(this.name)
    },

    upInit() { 
      this.up();
      this.startRender();
    },

    downInit() { 
      this.down();
      this.startRender(); 
    },

    upDownEnd() { 
      this.stopMove();
      this.startRender(); 
    },

    leftInit(){ 
      this.left();
      this.startRender(); 
    },

    rightInit(){ 
      this.right();
      this.startRender(); 
    },
    
    leftRightEnd(){ 
      this.stopMove();
      this.startRender(); 
    },

    fireInit(){ 
      this.fire();
      this.startRender(); 
    },
    
    fireEnd(){ 
      this.stopFire();
      this.startRender(); 
    },

    //レンダリングするための関数を各キーイベントで呼ぶ
    startRender(){
      if(this.allData.players === undefined) return
      const target = this.allData.players.find(p => p.id == this.id)
      this.playerData = target
    }

  }
};
</script>

<style>

/* 全体の設定/ */
body{
  color:grey; 
}

.player{
  width: 100vw;
  height: 100vh;
  text-align: center;
  background:linear-gradient(70deg, #2E2E2E, #1C1C1C);
}

.logo{
  width: 20vw;
  height: auto;
  margin-top: 12vh;
  opacity: 0.5;
}

.gameOver{
  width: 100vw;
  font-size: 50px;
  margin-top: 30px; 
  color:red;
  position: absolute;
  z-index: 11;
}

/* 名前の設定/ */
.name{
  width: 80vw;
  margin: auto;
  padding-top: 20%;
}

.name input{
  width: 80%;
  height: 15vh;
  font-size: 25px;
  background-color: #A4A4A4;
  border: none;
}

.nameSet{
  width: 18%;
  height: 15vh;
  margin-left: 2%;
  font-size: 26px;
  font-weight: bold;
  padding:3%;
  background-color: #A4A4A4;
  border: none;
  color:black;
}

.description{
  font-size: 18px;
  margin-bottom: 3vh;
}


/* キーの設定 */
.playerName{
  position: absolute;
  top: 13vh;
  left: 5vw;
  font-size:24px;
  letter-spacing: 2px;
  z-index: 10;
}



.life{
  position: absolute;
  top: 15vh;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  z-index: 10;
}

.gameKeys{
  width: 90vw;
  height: 80vh;
  position: relative;
  padding-top: 30vh;
  margin: auto;
}

.keys{
  display: flex;
  align-items:center;
  position: absolute;
  z-index: 10;
}

/* 横キー */
.horizontal{
  width: 10vw;
  height: 14vh;
  background-size: cover;
  background-position: center; 
}

/* 縦キー */
.vertical{
  width: 8vw;
  height: 18vh;
  background-size: cover;
  background-position: center;
}

.left{
  background-image: url('../assets/left.png')
}

.right{
  background-image: url('../assets/right.png')
}

.up{
  background-image: url('../assets/up.png');
  margin-bottom: 10vh;
}

.down{
  background-image: url('../assets/down.png');
  margin-bottom: 10vh;
}

.fire{
  width: 15vw;
  height: 27vh;
  background-image: url('../assets/fire.png');
  background-size: cover;
  background-position: center;
  margin-left: 47vw;
}

</style>
