import express from 'express';
import { db } from './db.js';

const router = express.Router();

router.post('/login', (require, result) => {
    const { login, password } = require.body;

    db.get('SELECT * FROM users WHERE login = ? AND password = ?',
        [login, password], (err, ok) => {
            if (err) {
                result.status(500).json({err: err.message}); // Ловим ошибку
                return;
            } if(ok) {
                result.json({success: true, user: ok}); // Возвращает пользователя при успешной авторизации
            } else {
                result.json({success: false, message: 'Ошибка аунтификации'})
            }
    });
});

router.get('/clients', (require, result) => {
    const personFullName = require.query.full_name;

    db.all('SELECT * FROM clients WHERE responsible_person = ?',
        [personFullName], (err, ok) => {
            if (err) {
                result.status(500).json({ error: err.message }); // Ловим ошибку
                return;
            }
            result.json({ clients: ok }); // Возвращает клиентов
    });
});

router.patch('/change_status', (require, result) =>{
    const { account_number, status } = require.body;

    db.run('UPDATE clients SET status = ? WHERE account_number = ?',
        [status, account_number], err => {
            if (err) {
                result.status(500).json({ error: err.message }); // Ловим ошибку
                return;
            }
            result.json({ success: true });
        });
});

export default router;