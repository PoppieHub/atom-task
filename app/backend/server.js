import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {initDB} from './src/db.js';
import routes from './src/routes.js';

const app = express();
const PORT = 3000;

app.use(cors()); // Разрешить доступ с любых источников

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Инициализация бд
initDB();

app.use('/api', routes);

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Сервер запущен - http://localhost:${PORT}`);
});