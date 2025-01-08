const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;  // Порт для вашего Express сервера
const mongoose = require('mongoose');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');

// Включаем CORS
app.use(cors());
app.use(express.json());





const upload = multer({
  storage: multer.memoryStorage(), // Используем memoryStorage, чтобы хранить файл в памяти
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Неверный формат файла, допускаются только PDF и изображения'), false);
    }
  }
});

// Настройки Telegram бота
const BOT_TOKEN = '7495422433:AAEjsD32grXV6w1fUuWZSRsrPD6KuiwZ5lA';
const CHAT_ID = 'YOUR_CHAT_ID';

const { ObjectId } = require('mongodb'); // Для работы с ObjectId

app.post('/upload', upload.single('file'), async (req, res) => {
  console.log("тело запроса : ",req.body);
  try {
    // Извлекаем modelId из тела запроса
    

    const { modelId } = req.body;

    if (!modelId) {
      return res.status(400).json({ error: 'Не указан modelId' });
    }

    // Ищем документ в MongoDB
    const db = mongoose.connection.db;
    const collection = db.collection('ankets'); // Замените 'models' на имя вашей коллекции
    const document = await collection.findOne({ _id: Number(modelId) });
    
    

    if (!document) {
      console.error('Документ с таким modelId не найден');
      console.log('айди модели согласно запросу : ', Number(modelId));
      
      return res.status(404).json({ error: 'Документ с таким modelId не найден' });
    }

    // Получаем поле user
    const user = document.user;

    console.log('Найденный пользователь:', user);

    // Здесь можно продолжить обработку данных или просто завершить
    res.status(200).json({ message: 'Пользователь найден', user });

  } catch (error) {
    console.error('Ошибка при обработке запроса:', error.message);
    res.status(500).json({ error: 'Ошибка при обработке запроса', details: error.message });
  }
});





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



const API_ENDPOINT = 'http://217.197.107.144:3000';


// Маршрут для получения списка карт
app.get('/api/cards', async (req, res) => {
    try {
        // Запрос к внешнему API
        const response = await axios.get(`${API_ENDPOINT}/getcardslist`);
        
        // Отправляем данные клиенту
        res.json(response.data);
    } catch (error) {
        console.error('Ошибка при получении списка карт:', error.message);
        res.status(500).json({ error: 'Не удалось получить список карт' });
    }
});



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



    axios.post('https://api.telegram.org/bot7495422433:AAEjsD32grXV6w1fUuWZSRsrPD6KuiwZ5lA/sendMessage', {
      chat_id: result.user,
      text: `Кто-то заинтерисовался твоей анкетой ${result.name} | ${result._id}`
    })
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
