const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/main.ts', // Путь к твоему TypeScript файлу
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080, // Порт для Vue
    proxy: {
      '/api': {
        target: 'https://majesticgirls.net', // Прокси на продакшен-сервер
        changeOrigin: true,
        secure: false, // Если нужен HTTPS с самоподписанным сертификатом
      },
    },

    headers: {
      'Access-Control-Allow-Origin': '*', // Для поддержки CORS
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/], // Для поддержки TypeScript в .vue
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js', // Для Vue 3
    },
    extensions: ['.ts', '.js', '.vue', '.json'],
  },
  plugins: [
    new VueLoaderPlugin(), // Подключаем плагин для vue-loader
  ],
};
