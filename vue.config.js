module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },

    publicPath : "/rcl-planner/",

    pluginOptions: {
      quasar: {
        importStrategy: 'kebab',
        rtlSupport: false
      },
      i18n: {
        locale: 'it',
        fallbackLocale: 'it',
        localeDir: 'locales',
        enableLegacy: false,
        runtimeOnly: false,
        compositionOnly: false,
        fullInstall: true
      }
    },

    transpileDependencies: [
      'quasar'
    ]
}
