const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin"); //每次打包自动清理dist
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"], //入口
  output: {
    path: path.resolve(__dirname, "dist"), //打包后存在的位置
    filename: "main.js", //打包后的文件名
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192 * 100,
            name: "[hash:8].[ext]",
          },
        }, ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyPlugin([
      //为了把public下除了index.html文件外的其余所有，给dist目录下拷贝一份
      {
        from: path.resolve(__dirname, "src/public"),
        to: path.resolve(__dirname, "dist"),
        ignore: ["index.html"],
      },
    ]),
  ],
  mode: "development", //配置启动模式，开发模式还是生产模式

  devServer: {
    port: 8080,
    open: true,
    quiet: true,
  },
  devtool: "cheap-module-eval-source-map",
  resolve: {
    extensions: [".js", ".json", ".vue"], //解决导入省略后缀名称
    alias: {
      //给路径取别名,以后导入vue的时候，默认是在找'vue/dist/vue.esm.js'
      // 'vue$':'vue/dist/vue.esm.js',
      "@": path.resolve(__dirname, "src"), //取别名，让@代替根路径下的src  '/src'
    },
  },
};