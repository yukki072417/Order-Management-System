import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.OrderModel = (req, res) => {

    const db = mysql.createConnection({
        host: 'db',
        user: process.env.DB_USER || 'root',
        password: process.env.ROOT_PASSWORD || 'ROOT',
        database: 'TICKETSYSTEM'
    });

    db.connect((err) => {
        if (err) {
            console.error('データベースの接続が失敗:', err.stack);
            res.status(500).json({ error: 'Database connection failed' });
            return;
        }
        console.log('データベースが接続されました');
    });

    db.query('SELECT * FROM `ORDERS`', (err, results) => {
        if (err) {
            console.error('Query failed:', err.stack);
            res.status(500).json({ error: 'Query failed' });
            return;
        }
        console.log(results);
        res.status(200).json({ message: 'Response successfully', data: results });
    });

}

export default app;