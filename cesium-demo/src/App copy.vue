<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import '/Users/zuoliang/Documents/cesium/cesium-demo/cesium-demo/node_modules/cesium/Build/Cesium/Widgets/widgets.css'
import * as Cesium from 'cesium'

export default {
  name: 'app',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMGM0M2MzMS02Zjk5LTRmZWYtOTdjNi03ZmJjNDBkOWFhNjEiLCJpZCI6OTE1MDcsImlhdCI6MTY1MTA2OTA1NX0.zCi0nTGSHpsPGKVzulw2r3iJKwM5MN9bILY0WhDkqUA'
      let viewer = new Cesium.Viewer('cesiumContainer')

      let imageryLayers = viewer.imageryLayers

      let googleMap = new Cesium.UrlTemplateImageryProvider({
        url: 'http://www.google.com/maps/vt?lyrs=s@716&x={x}&y={y}&z={z}',
      })

      imageryLayers.addImageryProvider(googleMap)

      // fly
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          114.296063,
          30.55245,
          20000000
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0,
        },
        duration: 10, // fly time 10s
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>