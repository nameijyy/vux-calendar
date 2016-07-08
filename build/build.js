// https://github.com/shelljs/shelljs
require('shelljs/global')
var fs = require('fs')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')



var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  out(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }))

})

function out(data) {
  var js = data.match(/static\/js\/\S+\.js/)[0];
  var css = data.match(/static\/css\/\S+\.css/)[0];
  var d = (new Date);
  var data2 ='' +
    'CACHE MANIFEST'+'\n'+
    '# '+d.getFullYear()+'-'+d.getMonth()+1 +'-'+d.getDate()+' '+ d.getHours() +':'+ d.getMinutes()+':'+d.getSeconds() +'\n'+
    'CACHE:'+'\n'+
      config.build.paths+'/'+css +'\n'+
      config.build.paths+'/'+js +'\n'+
    'NETWORK:'+'\n'+
    '*';
  fs.writeFile('./dist/main.appcache',data2,'utf8',function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  })
}
