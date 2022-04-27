// // const {
// //     defineConfig
// // } = require('@vue/cli-service')
// //     // const {
// //     //     CopyPlugIn
// //     // } = require('copy-webpack-plugin')
// // module.exports = defineConfig({
// //     transpileDependencies: true,
// //     // configureWebpack: {
// //     //     plugins: [new CopyPlugIn(
// //     //         [{
// //     //             from: 'node_modules/cesium/Build/Cesium/Assets',
// //     //             to: 'static/Assets'
// //     //         }, {
// //     //             from: 'node_modules/cesium/Build/Cesium/Widgets',
// //     //             to: 'static/widgets'
// //     //         }, {
// //     //             from: 'node_modules/cesium/Build/Cesium/Workers',
// //     //             to: 'static/workers'
// //     //         }, {
// //     //             from: 'src/assets',
// //     //             to: 'assets'
// //     //         }]


// //     //     )]
// //     // }
// // })
// // const path = require('path');
// const CopyPlugIn = require('copy-webpack-plugin');


// // function resolve(dir) {
// //     return path.join(__dirname, dir);
// // }
// module.exports = {
//     // publicPath: process.env.NODE_ENV === 'production' ? '/earth/' : './',
//     // // assertsDir: 'static',
//     lintOnSave: false,
//     transpileDependencies: true,

//     // filenameHashing: false,
//     // productionSourceMap: false,
//     // chainWebpack: (config) => {
//     //     config.plugin('define').tap(args => {
//     //         args[0].CESIUM_BASE_URL = JSON.stringify(process.env.NODE_ENV === 'production' ? 'earth/static' : 'static')
//     //         return args
//     //     })
//     //     config.resolve.alias.set('@', resolve('src'))
//     // },
//     // devServer: {
//     //     overlay: {
//     //         warnings: false,
//     //         errors: false
//     //     }
//     // },
//     configureWebpack: {
//         plugins: [new CopyPlugIn({
//                 patterns: [{
//                     from: 'node_modules/cesium/Build/Cesium/Assets',
//                     to: 'static/Assets'
//                 }, {
//                     from: 'node_modules/cesium/Build/Cesium/Widgets',
//                     to: 'static/widgets'
//                 }, {
//                     from: 'node_modules/cesium/Build/Cesium/Workers',
//                     to: 'static/workers'
//                 }, {
//                     from: 'src/assets',
//                     to: 'assets'
//                 }]
//             }


//         )]
//     }


// }
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    configureWebpack: {
        plugins: [
            // Copy Cesium Assets, Widgets, and Workers to a static directory
            new CopyWebpackPlugin({
                patterns: [{
                        from: "node_modules/cesium/Build/Cesium/Workers",
                        to: "Workers"
                    },
                    {
                        from: "node_modules/cesium/Build/Cesium/ThirdParty",
                        to: "ThirdParty"
                    },
                    {
                        from: "node_modules/cesium/Build/Cesium/Assets",
                        to: "Assets"
                    },
                    {
                        from: "node_modules/cesium/Build/Cesium/Widgets",
                        to: "Widgets"
                    }
                ]
            }),
            new webpack.DefinePlugin({
                // Define relative base path in cesium for loading assets
                CESIUM_BASE_URL: JSON.stringify("")
            })
        ],
        module: {
            // Removes these errors: "Critical dependency: require function is used in a way in which dependencies cannot be statically extracted"
            // https://github.com/AnalyticalGraphicsInc/cesium-webpack-example/issues/6
            unknownContextCritical: false,
            unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/
        }
    }
};