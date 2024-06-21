import sqlite3 from 'sqlite3';
import fs from 'fs';

// Создаем в памяти бд
export const db = new sqlite3.Database(':memory:');

// Выполнение sql файлов
const runSQLFile = (filePath) => {
    const sql = fs.readFileSync(filePath, 'utf-8');

    db.exec(sql, (err) => {
        if (err) {
            console.error(`Ошибка чтения файла - ${filePath}:`, err.message);
        } else {
            console.log(`Успешно выполнены sql скрипт: ${filePath}`);
        }
    });
};

// Инициализация бд
export const initDB = () => {
    runSQLFile('./SQLite/create.sqlite.sql');
    runSQLFile('./SQLite/insert_data.sqlite.sql');
}