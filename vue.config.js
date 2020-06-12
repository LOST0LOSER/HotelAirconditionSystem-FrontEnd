module.exports = {
  transpileDependencies: ["vuetify"],
  
  devServer: {
    open: (function(){
      process.platform === "win32";
      process.arch === "x64";
    })(),
    // open: process.arch === "x64",
    // host: '127.0.0.1',
    // http2:true,
    port: 8080,
    https: false,
    // 设置代理
    proxy: {
      "/api": {
        // 目标 API 地址
        target: "http://localhost:5000/", // 接口的域名
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        },
      },
      // "/": {
      //   target: "http://localhost:5000", // 接口的域名
      //   // 将主机标头的原点更改为目标URL
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/": "/"
      //   }
      // }
    }
  },
  configureWebpack: {
    devtool: "source-map",
  },
  
  lintOnSave: false,

  assetsDir: 'static',

  css: {
    extract: false
  },
}