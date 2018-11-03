<template>
  <div class="app">
    <div class="controller">
      <img class="logo" src="@/assets/logo.png" alt="">
      <p>使用するディスプレイの合計数を入力してください</p>

      <div class="console">
        <input @input="numDisplaySet" v-model="display" type="number" min="0">
        <button @click="restart">RESTART GAME</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapState } from 'vuex';

const db = firebase.database()

const defaultDataSet = {
  players: [],
  bullets: [],
  enemies: [],
  display: 0,
  boss: {
    top:20,
    left:100,
    life:100
  }
}

let allDataSet = JSON.parse(JSON.stringify(defaultDataSet))

const fbData = db.ref('allData')
fbData.update(allDataSet)

// プレイヤーの生成
db.ref('player').on('child_changed', (value) => {
  const data = value.val()
  let target
  
  for(let i=0; i<allDataSet.players.length; i++){
    if(allDataSet.players[i].id === data.id) target = allDataSet.players[i]
  }
  
  if(target){
    target.buttonLR = data.leftRight
    target.buttonUD = data.upDown
  } else {
    allDataSet.players.push({
      top: 50,
      left: 10,
      id: data.id,
      buttonLR: data.leftRight,
      buttonUD: data.upDown,
      name: data.name,
      score: data.score,
      life: data.life,
      machine: data.machine
    })
  }
})

// プレイヤーを動かす
function playerMove(){
  for(let i=0; i<allDataSet.players.length; i++){
    let target = allDataSet.players[i]

    target.top += target.buttonUD
    target.left += target.buttonLR

    if(target.top > 100){
      target.top = 100
    }else if(target.top < 0){
      target.top = 0
    }else if(target.left > 100){
      target.left = 100
    }else if(target.left < 0){
      target.left = 0
    }

  }
}

// 弾の生成
let bulletId = 0
db.ref('player').on('child_changed', (value) => {
  const data = value.val()
  let target
  
  for(let i=0; i<allDataSet.players.length; i++){
    if(allDataSet.players[i].id === data.id) target = allDataSet.players[i]
  }

  if(data.fire === true){
    allDataSet.bullets.push({
      top: target.top,
      left: target.left,
      id: target.id,
      color: target.machine
    })
  }
})

// 弾を動かす処理
function bulletMove(){
  for(let i=0; i<allDataSet.bullets.length; i++){
    allDataSet.bullets[i].left += 1
  }
}

// スクリーンから出た弾を削除
function bulletsDelete(){
  let newBulletsArr = []
  for(let i=0; i<allDataSet.bullets.length; i++){
    if(allDataSet.bullets[i].left < 100) newBulletsArr.push(allDataSet.bullets[i])
  }
  allDataSet.bullets = newBulletsArr
}


// 敵の出現
let enemyAppear = function(){
  const percent = Math.floor(Math.random() * 100)
  const randomYposition = Math.floor(Math.random() * 100)

  if(percent > 90){
    allDataSet.enemies.push({
      top: randomYposition,
      left: 100
    })
  }
}

// 敵を動かす
let enemyMove = function(){
  for(let i=0; i<allDataSet.enemies.length; i++){
    allDataSet.enemies[i].left -= 1
  }
}

// スクリーンから出た敵を削除
let enemyDelete = function(){
  let newEnemyArr = []
  for(let i=0; i<allDataSet.enemies.length; i++){
    if(allDataSet.enemies[i].left > 0) newEnemyArr.push(allDataSet.enemies[i])
  }
  allDataSet.enemies = newEnemyArr
}

// 弾と敵の衝突判定 score up
let hitEnemy = function(){
 for(let i=0; i<allDataSet.bullets.length; i++){
   const bullet = allDataSet.bullets[i]
   const player = allDataSet.players.find(p => p.id == bullet.id)

   for(let n=0; n<allDataSet.enemies.length; n++){
     const enemy = allDataSet.enemies[n]
     if( (bullet.left + 2) >= enemy.left && bullet.top <= (enemy.top + 4) && (bullet.top + 2) >= enemy.top ){
       allDataSet.enemies.splice(n, 1)
       allDataSet.bullets.splice(i, 1)
       player.score++
     }
   } //2ループ
 } //1ループ
}

// プレイヤーと敵の衝突判定 life down
let getDamaged = function(){
  for (let i = 0; i < allDataSet.enemies.length; i++) {
    const enemy = allDataSet.enemies[i]

    for(let n=0; n<allDataSet.players.length; n++){
      const player = allDataSet.players[n]
      if ((player.left + 2) >= enemy.left && player.top <= (enemy.top + 4) && (player.top + 2) >= enemy.top) {
        allDataSet.enemies.splice(i, 1);
        player.life--
      }
    }
  }
}


// ボスの出現
const startTime = Date.now()

let bossAppear = function(){
  if(Date.now() - startTime < 60000) return
  allDataSet.boss.left -= 0.1
}


// 弾とボスの当たり判定
let hitBoss = function(){
  for(let i=0; i<allDataSet.bullets.length; i++){
    const bullet = allDataSet.bullets[i]
    const player = allDataSet.players.find(p => p.id == bullet.id)
    const boss = allDataSet.boss
     if( (bullet.left + 2) >= boss.left && bullet.top <= (boss.top + 300) && (bullet.top + 2) >= boss.top ){
       allDataSet.bullets.splice(i, 1)
       allDataSet.boss.life -= 1
       player.score += 2
    }
  }
}



const movement = setInterval(function(){
  fbData.update(allDataSet)
  playerMove()
  bulletMove()
  bulletsDelete()
  enemyAppear()
  enemyMove()
  enemyDelete()
  hitEnemy()
  getDamaged()
  bossAppear()
  hitBoss()
}, 100)


export default {
  data(){
    return{
      display: 1
    }
  },

  computed: {
    ...mapState([
      'allData',
    ]),
  },

  methods: {
    restart(){
      allDataSet = JSON.parse(JSON.stringify(defaultDataSet))
    },

    numDisplaySet(){
      allDataSet.display = this.display
    }
  }
};

</script>

<style>
body{
  background-color: black;
  color:white;
}

.app{
  width: 80%;
  height: 80%;
  margin: auto;
  text-align: center;
}

.controller{
  width: 100%;
  height:100%;
  margin: auto;
  margin-top: 200px; 
}

.logo{
  width: 200px;
  height: auto;
  margin-bottom: 50px;
}

.console{
  margin-top:30px;
}

.console input{
  width: 200px;
  height: 30px;
  font-size: 20px;
  margin-right: 10px;
  border: none;
}

.console button{
  width: 180px;
  height: 30px;
  font-size: 21px;
  border: none;
  color:lightgrey;
  background-color: grey;
}
</style>
