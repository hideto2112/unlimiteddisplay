import firebase from 'firebase';

firebase.initializeApp(JSON.parse(process.env.FIREBASE_KEY));

const db = firebase.database();

export const state = () => {
    return {
        player: {
            upDown: 0,
            leftRight: 0,
            fire: false,
            id: 0,
            name:'',
            score: 0,
            life: 5,
            machine:''
        },
        allPlayers:[],
        allData:{},
        displayIndex: 0,
        ending:''
    }
}

// ページ初期化時に一回だけ呼ばれる
export const plugins = [
    (store) => {
        db.ref('allData').on('value', (snapshot) => {
            if(snapshot.val().boss.life >= 0){
                store.commit('setAllData', snapshot.val() || {})
            }else if(snapshot.val().boss.life < 0){
                store.commit('gameClear')
            }
        })
    },
];



export const getters = {
    // gameOver: (state) => (id) => {
    //     if(Object.keys(state.allData).length === 0) return
    //     const target = state.allData.players.find(p => p.id == id)
    //     if(!target)return
    //     if(target.life <= 0){
    //         return 'GAME OVER'
    //     }
    // },
}

export const mutations ={
    setAllData(state, data){
        state.allData = data
    },

    setDisplayIndex(state, index){
        state.displayIndex = +index-1
    },

    setAllPlayers(state, data){
        state.allPlayers = data
    },

    setPlayer(state, info){
        const newPlayer = {...state.player}
        newPlayer.name = info.name
        newPlayer.id = info.id
        const machines = ['blue', 'green', 'orange', 'red', 'yellow',
        'darkviolet', 'brown', 'aqua', 'salmon', 'darkolivegreen', 'lightgreen',
        'deepskyblue', 'peru', 'pink', 'white', 'steelblue']
        newPlayer.machine = machines[info.id % 16]

        state.player = newPlayer
    },

    gameClear(state){
        state.ending = 'GAME CLEAR'
    },

    up(state){
        let newUpDown = "...state.player.upDown" 
        newUpDown = -1
        state.player.upDown  = newUpDown
    },

    down(state){
        let newUpDown = "...state.player.upDown" 
        newUpDown = 1
        state.player.upDown  = newUpDown
    },

    left(state){
        let newLeftRight = "...state.player.leftRight" 
        newLeftRight = -1
        state.player.leftRight  = newLeftRight
    },

    right(state){
        let newLeftRight = "...state.player.leftRight" 
        newLeftRight = 1
        state.player.leftRight  = newLeftRight
    },

    stopMove(state){
        let newUpDown = "...state.player.upDown" 
        newUpDown = 0
        state.player.upDown  = newUpDown

        let newLeftRight = "...state.player.leftRight" 
        newLeftRight = 0
        state.player.leftRight  = newLeftRight
    },

    fire(state){
        let newFire = "...state.player.fire" 
        newFire = true
        state.player.fire  = newFire
    },

    stopFire(state){
        let newFire = "...state.player.fire" 
        newFire = false
        state.player.fire  = newFire
    },
}


export const actions = {
    async getAllPlayers({ commit }) {
        const snapshot = await db.ref('/player').once('value')
        commit('setAllPlayers', snapshot.val() || [])
    },

    async setName({ commit, state }, name) {
        const id = Math.max(...state.allPlayers.map(p => p.id), 0) + 1
        const info = { name, id }
        commit('setPlayer', info)
        await db.ref('player').set([...state.allPlayers, state.player])
        return id
    },

    async up({ commit, state }){
        commit('up')        
        await db.ref('player').update([...state.allPlayers, state.player])
    },

    async down({ commit, state }){
        commit('down')        
        await db.ref('player').update([...state.allPlayers, state.player])
    },

    async stopMove({ commit, state }){
        commit('stopMove')        
        await db.ref('player').update([...state.allPlayers, state.player])
    },

    async left({ commit, state }){
        commit('left')        
        await db.ref('player').update([...state.allPlayers, state.player])
    },

    async right({ commit, state }){
        commit('right')        
        await db.ref('player').update([...state.allPlayers, state.player])
    },

    async fire({ commit, state }){
        commit('fire')        
        await db.ref('player').update([...state.allPlayers, state.player])
    },

    async stopFire({ commit, state }){
        commit('stopFire')        
        await db.ref('player').update([...state.allPlayers, state.player])
    },



}