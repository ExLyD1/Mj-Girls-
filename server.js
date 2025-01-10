const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;  // Порт для вашего Express сервера
const axios = require('axios');
const mongoose = require('mongoose');
const multer = require('multer');
const FormData = require('form-data');
const backendServerLink = 'http://localhost'
// Включаем CORS
app.use(cors());
app.use(express.json());





const upload = multer({
  storage: multer.memoryStorage(), // Используем memoryStorage, чтобы хранить файл в памяти
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {0
      cb(new Error('Неверный формат файла, допускаются только PDF и изображения'), false);
    }
    }
});

// Настройки Telegram бота
const BOT_TOKEN = '7495422433:AAEjsD32grXV6w1fUuWZSRsrPD6KuiwZ5lA';
const CHAT_ID = 'YOUR_CHAT_ID';


app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { modelId } = req.body;


    const db = mongoose.connection.db;
    const collection = db.collection('dankets'); 
    const document = await collection.findOne({ _id: Number(modelId) });



    const user = document.user;


    const fileType = req.file.mimetype;

    if (fileType.startsWith('image/')) {
      
      const formData = new FormData();
      formData.append('chat_id', user); 
      formData.append('photo', req.file.buffer, req.file.originalname);
      formData.append('caption', `📸 Фото чека, с помощью которого оплатили модель: ${document.name} | ${document._id}`);


      const response = await axios.post('https://api.telegram.org/bot7495422433:AAEjsD32grXV6w1fUuWZSRsrPD6KuiwZ5lA/sendPhoto', formData, );


      return res.status(200).json({ message: 'Изображение успешно отправлено в Telegram', response: response.data });

    } else if (fileType === 'application/pdf') {
      
      const formData = new FormData();
      formData.append('chat_id', user);
      formData.append('document', req.file.buffer, req.file.originalname);
      formData.append('caption', `📄 PDF документ для модели: ${document.name} | ${document._id}`);

      const response = await axios.post(`https://api.telegram.org/bot7495422433:AAEjsD32grXV6w1fUuWZSRsrPD6KuiwZ5lA/sendDocument`, formData);

      return res.status(200).json({ message: 'PDF успешно отправлен в Telegram', response: response.data });

    } else {
      return res.status(400).json({ error: 'Недопустимый формат файла' });
    }

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



// Маршрут для поиска пользователей по городу
app.get('/api/searchByCity', async (req, res) => {
  const { city, skip, limit } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'Не указан город' });
  }

  const skipNumber = parseInt(skip) || 0;
  const limitNumber = parseInt(limit) || 15;

  try {
    const db = mongoose.connection.db;
    const collection = db.collection('dankets');

    const result = await collection
      .find({ city: city })
      .skip(skipNumber)
      .limit(limitNumber)
      .toArray();

    // Если анкеты найдены, отправляем их
    if (result.length > 0) {
      return res.status(200).json({ success: true, data: result });
    }

    // Если нет анкет, возвращаем сообщение, что анкеты закончились
    return res.status(404).json({ success: false, message: 'Пользователи не найдены' });

  } catch (error) {
    console.error('Ошибка при поиске по городу:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});









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
    const collection = db.collection('dankets');

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
  console.log(`Сервер запущен на ${backendServerLink}:${port}`);
});
