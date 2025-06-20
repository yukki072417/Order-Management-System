import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { broadcastLatestOrderList } from '../routes/websocket.js'; // 追加
dotenv.config();

const app = express();

app.OrderLogModel = async (req, res) => {

    const db = await mysql.createConnection({
        host: 'db',
        user: process.env.DB_USER || 'root',
        password: process.env.ROOT_PASSWORD || 'ROOT',
        database: 'TICKETSYSTEM'
    });

    try {
        const [results] = await db.query('SELECT * FROM ORDER_LOG');
        await res.send(results)
    }catch(e){

    }
};

export default app;
