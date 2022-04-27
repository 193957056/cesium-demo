<template lang="">
  <div id="app">
    <div id="cesiumContainer">

    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import * as Cesium from 'cesium'
import 'node_modules/cesium/Source/Widgets/widgets.css'

export default {
  name: 'APP',
  mounted() {
    new Cesium.Viewer('cesiumContainer')
  },
}
</script>
<style lang="">
</style>