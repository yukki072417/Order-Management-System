import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.OrderModel = async (req, res) => {
    const body = req.body; // 配列で受け取る

    const now = new Date();
    now.setHours(now.getHours() + 9); // 日本時間
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const mysqlTime = `${hours}:${minutes}:${seconds}`;

    const db = await mysql.createConnection({
        host: 'db',
        user: process.env.DB_USER || 'root',
        password: process.env.ROOT_PASSWORD || 'ROOT',
        database: 'TICKETSYSTEM'
    });

    try {
        // 最新のORDER_NUMBERを取得
        const [results] = await db.query('SELECT ORDER_NUMBER FROM ORDER_LOG ORDER BY ORDER_NUMBER DESC LIMIT 1');
        let LAST_ORDER_NUMBER = 101;
        if (results && results.length > 0) {
            LAST_ORDER_NUMBER = Number(results[0].ORDER_NUMBER) + 1;
        }

        // すべての商品を1つの注文番号で登録
        for (const item of body) {
            const name = item.NAME;
            const quantity = item.ITEM_QUANTITY;
            const beef = item.ADD_BEEF;
            const egg = item.ADD_EGG;

            await db.query(
                'INSERT INTO ORDERS (ORDER_NUMBER, PRODUCT_NAME, PRODUCT_QUANTITY, ADD_BEEF, ADD_EGG, ORDER_TIME) VALUES (?, ?, ?, ?, ?, ?)',
                [LAST_ORDER_NUMBER, name, quantity, beef, egg, mysqlTime]
            );
            await db.query(
                'INSERT INTO ORDER_LOG (ORDER_NUMBER, PRODUCT_NAME, PRODUCT_QUANTITY, ADD_BEEF, ADD_EGG, ORDER_TIME) VALUES (?, ?, ?, ?, ?, ?)',
                [LAST_ORDER_NUMBER, name, quantity, beef, egg, mysqlTime]
            );
        }

        res.status(200).json({ ORDER_NUMBER: LAST_ORDER_NUMBER });
    } catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    } finally {
        db.end();
    }
};

export default app;
