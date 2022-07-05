module.exports = {
  chainWebpack: config => {
      config.module.rules.delete('eslint');
  },
    devServer: {
      proxy: 'http://10.28.184.222:8981/'
    }
}
