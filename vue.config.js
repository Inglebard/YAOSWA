module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: '8188',
    allowedHosts: [
      'ns3282947.ip-5-135-176.eu:8188',
      'ns3282947.ip-5-135-176.eu'
    ]
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
