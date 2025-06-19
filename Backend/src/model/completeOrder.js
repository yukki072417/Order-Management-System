import mysql from 'mysql2/promise'
import express from 'express'
import { broadcastLatestOrderList } from '../routes/websocket.js';

const app = express();

//注文完了のリクエストが届いた時に実行される関数。
app.OrderComplete = async (req, res) => {
    const orderNumber = req.body.ORDER_NUMBER;

    const db = await mysql.createConnection({
        host: 'db',
        user: process.env.DB_USER || 'root',
        password: process.env.ROOT_PASSWORD || 'ROOT',
        database: 'TICKETSYSTEM'
    });

    try {
        await db.query('DELETE FROM ORDERS WHERE ORDER_NUMBER = ?', [orderNumber]);
        await broadcastLatestOrderList(); // ←ここで呼ぶ
        res.status(200).json({ result: 'success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await db.end();
    }
}

export default app;