// 重写一些CRA默认的webpack配置
const {
  override,
  fixBabelImports,
  addPostcssPlugins,
  addLessLoader,
  useEslintRc,
} = require('customize-cra');
const path = require('path');
const fs = require('fs');
const globby = require('globby');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const px2rem = require('postcss-px2rem');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const entriesPath = globby.sync([resolveApp('src/pages') + '/*/index.js']) || [];
const appHtml = resolveApp('public/index.html');
const env = process.env.NODE_ENV;

// 用于antd mobile less 编译
// ui库基本 375 的写法，这样直接px才刚好可以
// 设计稿一般 750 这时候需要在less层面把值扩大2倍
// https://segmentfault.com/a/1190000016779099
const theme = {
  'hd': '2px',
  'brand-primary': 'red',
  'color-text-base': '#333'
};

module.exports = {
  webpack: override(
    useEslintRc(resolveApp('./.eslintrc.json')),
    addLessLoader({
      modifyVars: theme,
      javascriptEnabled: true,
    }),
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: true,
    }),
    addPostcssPlugins([px2rem({
      remUnit: 100, // 1rem = 100px
    })]),
    (config) => {
      const isEnvDevelopment = env === 'development';
      const isEnvProduction = env === 'production';
  
      // entry 配置
      const entries = {};
      entriesPath.map(filePath => {
        const temp = filePath.split('/');
        const key = temp[temp.length - 2];
        entries[key] = [
          isEnvDevelopment &&
            require.resolve('react-dev-utils/webpackHotDevClient'),
          filePath,
        ].filter(Boolean);
      });
  
      config.entry = entries;
  
      // output 配置
      config.output.filename = isEnvProduction
          ? 'static/js/[name].[contenthash:8].js'
          : isEnvDevelopment && 'static/js/[name].js';
  
      // htmlWebpackPlugin 配置
      const htmlWebpackPluginInstances = Object.keys(entries).map(name => {
        return new HtmlWebpackPlugin(Object.assign(
          {},
          {
            inject: true,
            template: appHtml,
            filename: `${name}.html`,
            chunks: [name],
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        ));
      });
  
      let plugins = [];
      config.plugins.map(plugin => {
        if (!(config.plugin instanceof HtmlWebpackPlugin)) {
          plugins.push(plugin);
        }
      });
  
      config.plugins = [].concat(plugins, [ ...htmlWebpackPluginInstances ]);
  
  
      // splitChunks 配置
      const splitChunks = {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
          common: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2,
            enforce: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      };
  
      config.optimization.splitChunks = splitChunks;
  
      return config;
    }
  ),
};
