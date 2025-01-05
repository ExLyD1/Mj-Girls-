const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;  // Порт для вашего Express сервера
const mongoose = require('mongoose');


// Включаем CORS
app.use(cors());

// Пример API маршрута
app.get('/api/message', (req, res) => {
  res.json({ message: 'Привет от Express!' });
});

mongoose.connect('mongodb://localhost:27017/webesc', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB подключен успешно!'))
  .catch((error) => console.error('Ошибка подключения к MongoDB:', error));

// Раздаём статические файлы Vue-приложения из папки 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Поддержка маршрутов Vue.js (например, для SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
