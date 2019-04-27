本项目是`react`的`多页`的`移动端`模板。

基于[Create React App](https://github.com/facebook/create-react-app)初始化，使用[react app rewired](https://github.com/timarney/react-app-rewired)覆盖了部分默认的webpack配置。

集成[JavaScript Standard Style](https://standardjs.com/rules.html) + [Ant Design Mobile](https://mobile.ant.design/index-cn) + [Normalize.css](https://necolas.github.io/normalize.css/)

## 用法

启动项目：`npm start`

打包项目：`npm run build`

>更多细节请查看官方文档：[Create React App](https://github.com/facebook/create-react-app)

## 注意点

* 不要强制`eject`，因为使用了`react app rewired`，`eject`会导致重写失败。
* 构建工具会自动扫描`src/pages/*/index.js`文件作为webpack的`entry`，如果要作为入口，这个`index.js`文件是必须的。
* `code spliting`分出三个`initial`包：`vendor` `common`  `业务包`，可自行调整。
* `rem`方案不做页面缩放，`remUnit`为100，以750设计稿为标准，可自行改动。
* 集成了`Ant Design Mobile`，因为默认px，为了满足整个项目以750为准，在less层面扩大了两倍。
* 更多细节请查看官方文档：[react app rewired](https://github.com/timarney/react-app-rewired)

## 参考

https://segmentfault.com/a/1190000016960824
https://segmentfault.com/a/1190000017858725
https://github.com/timarney/react-app-rewired/blob/master/test/react-app/config-overrides.js
https://github.com/arackaf/customize-cra
https://github.com/frontend9/fe9-library/issues/242
https://webpack.docschina.org/plugins/split-chunks-plugin/