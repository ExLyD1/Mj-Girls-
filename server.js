const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;  // Порт для вашего Express сервера
const mongoose = require('mongoose');


// Включаем CORS
app.use(cors());
app.use(express.json());

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






// Поиск пользователя по целочисленному ID
app.get('/api/search', async (req, res) => {
  const { id } = req.query;

  // Проверка на целочисленный ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Некорректный ID' });
  }

  try {
    // Получаем доступ к коллекции ankets
    const db = mongoose.connection.db;
    const collection = db.collection('ankets');

    // Ищем анкету по _id
    const result = await collection.findOne({ _id: parseInt(id) });

    // Если анкета не найдена
    if (!result) {
      return res.status(404).json({ success: false, message: 'Анкета не найдена' });
    }

    // Если анкета найдена, но её статус 0
    if (result.status === 0) {
      return res.status(200).json({ success: false, message: 'Анкета не активна' });
    }

    // В остальных случаях возвращаем true
    return res.status(200).json({ success: true, data: result });

  } catch (error) {
    console.error('Ошибка при поиске:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});





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
