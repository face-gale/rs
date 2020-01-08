// const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  lintOnSave:false,
  //路径前缀
  publicPath: "./",
  // 打包时不生成.map文件 避免看到源码
  productionSourceMap: false,
  devServer: {
    host: "127.0.0.1",
    port: 9601,
    proxy: {
      // changeOrigin:true,//允许跨域
        '/member/*': {
            target: 'http://127.0.0.1:8888',  // 请求本地 需要xboot后台项目
        },
        '/goods/*': {
            target: 'http://127.0.0.1:8888'
        }
    }
  }

  // 部署优化
  // configureWebpack: {
  //     // GZIP压缩
  //     plugins: [
  //         new CompressionPlugin({
  //             test: /\.js$|\.html$|\.css/, // 匹配文件
  //             threshold: 10240 // 对超过10k文件压缩
  //         })
  //     ]
  // }
};
