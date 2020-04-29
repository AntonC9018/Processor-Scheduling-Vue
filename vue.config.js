module.exports = {
  //...
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Processor-Scheduling-Vue/'
    : '/',
  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
}