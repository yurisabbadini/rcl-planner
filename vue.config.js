module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },

    publicPath : "/rcl-planner/",

    pluginOptions: {
      quasar: {
        importStrategy: 'kebab',
        rtlSupport: false
      }
    },

    transpileDependencies: [
      'quasar'
    ]
}
