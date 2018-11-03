<template>
    <div class="background"
    :style="`
    background-position-x: ${ $store.state.displayIndex * -100 }vw;
    background-size: ${100 * $store.state.allData.display}vw ${100 * $store.state.allData.display}vh;
    `"/>
</template>

<script>
export default {

}
</script>

<style>
.background{
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/background.jpg');
}
</style>
