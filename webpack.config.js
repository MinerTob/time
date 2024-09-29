const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js', // 你的入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // 输出的文件名
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 添加其他加载器和规则
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
};
