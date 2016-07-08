# vux+webpack  demo

> vux + webpack

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
####1.0 增加离线缓存
新增离线缓存 当build时才会在dist目录下生成一个main.appcache

dev 是不没有生成main.appcache

####1.1 修改布局
使用子路由来处理

app.vue 入口页面
```
 +index
    -home
    -bbs
    -found
 +article
  -id
```

####1.2 调用APP里的新开View
链接都用  go(url{String},newView{Boolean},Vue) 方法

Vue = this
