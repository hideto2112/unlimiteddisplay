<template>

<div class="app">
    <!-- インデックス登録 -->
    <div class="setting" v-if="displaySet">
        <p>ディスプレイの番号を登録しよう。このPCは左から何番目かな？</p>
        <input class="displaySet" type="number" min="1" v-model="displayIndex">
        <button class="setBtn" @click="set">SET</button>
    </div>

    <!-- メインゲーム画面 -->
    <div class="playGround" v-if="gameDisplay">
        <AllEnemies/>
        <AllPlayers/>
        <AllBullets/>
        <Boss/>
        <GameClear/>
        <Background/>
    </div>
</div>

</template>

<script>
import firebase from 'firebase';
import AllEnemies from "~/components/AllEnemies.vue";
import AllPlayers from "~/components/AllPlayers.vue";
import AllBullets from "~/components/AllBullets.vue";
import Boss from "~/components/Boss.vue";
import GameClear from "~/components/GameClear.vue";
import Background from "~/components/Background.vue";


export default {
components: {
    AllEnemies,
    AllPlayers,
    AllBullets,
    Boss,
    GameClear,
    Background
},

data(){
    return{
        displaySet: true,
        gameDisplay: false,
        displayIndex: 1
    }
},

methods:{
    set(){
        this.displaySet = false
        this.gameDisplay = true
        this.$store.commit('setDisplayIndex', this.displayIndex)
    }
}

}
</script>

<style>
.setting{
  width: 420px;
  margin: auto;
  padding-top: 100px;
  text-align: center;
}

.setting p{
    font-size: 14px;
    color:grey;
    margin-bottom: 10px;
}

.displaySet{
  width: 120px;
  height: 30px;
  font-size: 20px;
  background-color: grey;
  border: none;
  color:white;
}

.setBtn{
  width: 60px;
  height: 30px;
  margin-left: 10px;
  font-size: 21px;
  background-color: grey;
  border: none;
  color:white;
}

.playGround{
  width: 100vw;
  height: 100vh;
  background-color: black;
}
</style>
