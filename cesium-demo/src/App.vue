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
      let viewer = new Cesium.Viewer('cesiumContainer', {
        scene3DOnly: true,
        selectionIndicator: false,
        baseLayerPicker: false,
      })
      // viewer.imageryLayers.remove(viewer.imageryLayers.get(0))
      viewer.imageryLayers.addImageryProvider(
        new Cesium.IonImageryProvider({ assetId: 3954 })
      )
      viewer.terrainProvider = Cesium.createWorldTerrain({
        requestWaterMask: true, //请求额外的水
        requestVertexNormals: true, //光数据
      })
      viewer.scene.globe.depthTestAgainstTerrain = true
      viewer.scene.globe.enableLighting = true //基于太阳位置的光照

      // 创建初始相机视图
      // Cartesian3 : 一个三维笛卡尔坐标——当它被用作相对于地球中心的位置时，使用地球固定框架
      let initialPositon = new Cesium.Cartesian3.fromDegrees(
        -73.998114468289017509,
        40.674512895646692812,
        2631.082799425431
      )
      // HeadingPitchRoll : 在东北向上的框架中关于局部轴的旋转（弧度）。航向是围绕负Z轴的旋转。俯仰是围绕负Y轴的旋转。滚动是关于正X轴的旋转。
      let initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(
        7.1077496389876024807,
        -31.987223091598949054,
        0.025883251314954971306
      )
      let homeCameraView = {
        destination: initialPositon,
        orientation: {
          heading: initialOrientation.heading,
          pitch: initialOrientation.pitch,
          roll: initialOrientation.roll,
        },
      }
      viewer.scene.camera.setView(homeCameraView) //设置初始视图
      // 添加一些相机飞行动画选项
      homeCameraView.duration = 2.0
      homeCameraView.maximumHeight = 2000
      homeCameraView.pitchAdjustHeight = 2000
      homeCameraView.endTransform = Cesium.Matrix4.IDENTITY
      // 覆盖默认的主页按钮
      viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
        function (e) {
          e.cancel = true
          viewer.scene.camera.flyTo(homeCameraView)
        }
      )
      // 设置时钟和时间轴。
      viewer.clock.shouldAnimate = true // make the animation play when the viewer starts
      viewer.clock.startTime = Cesium.JulianDate.fromIso8601(
        '2022-04-27T22:00:00Z'
      )
      viewer.clock.stopTime = Cesium.JulianDate.fromIso8601(
        '2022-04-27T22:10:00Z'
      )
      viewer.clock.currentTime = Cesium.JulianDate.fromIso8601(
        '2022-04-27T22:20:00Z'
      )
      viewer.clock.multiplier = 2 // sets a speedup
      viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER // tick computation mode
      viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP // loop at the end
      viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime) // set visible range

      var kmlOptions = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true,
      }
      // Load geocache points of interest from a KML file
      // Data from : http://catalog.opendata.city/dataset/pediacities-nyc-neighborhoods/resource/91778048-3c58-449c-a3f9-365ed203e914
      var geocachePromise = Cesium.KmlDataSource.load(
        './Source/SampleData/sampleGeocacheLocations.kml',
        kmlOptions
      )
      // Add geocache billboard entities to scene and style them
      geocachePromise.then(function (dataSource) {
        // Add the new data as entities to the viewer
        viewer.dataSources.add(dataSource)
      })
      // Add geocache billboard entities to scene and style them
      geocachePromise.then(function (dataSource) {
        // Add the new data as entities to the viewer
        viewer.dataSources.add(dataSource)

        // Get the array of entities
        var geocacheEntities = dataSource.entities.values

        for (var i = 0; i < geocacheEntities.length; i++) {
          var entity = geocacheEntities[i]
          if (Cesium.defined(entity.billboard)) {
            // Entity styling code here
          }
        }
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