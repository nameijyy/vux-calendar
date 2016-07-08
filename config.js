// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var paths = '/Application/Home/View/Index'


module.exports = {
  build: {
    index: path.resolve(__dirname, 'dist/'+paths+'/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: paths+'/static',
    assetsPublicPath: '',
    productionSourceMap: false,
    paths: paths,
  },
  dev: {
    port: 8080,
    proxyTable: {}
  }
}
