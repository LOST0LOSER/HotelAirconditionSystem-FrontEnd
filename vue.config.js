module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  devServer: {
    open: process.platform === 'darwin',
    // host: '127.0.0.1',
    port: 8080,
    https: false,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://localhost:5000', // 接口的域名
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }, 
      }
    },
  },

  configureWebpack: {
    devtool: 'source-map'
  },

  assetsDir: 'static',

  css: {
    extract: false
  }
}