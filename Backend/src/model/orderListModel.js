import mysql from 'mysql2/promise'
import express from 'express'

const app = express();

app.OrderListModel = async (req, res) => {
    const db = await mysql.createConnection({
        host: 'db',
        user: process.env.DB_USER || 'root',
        password: process.env.ROOT_PASSWORD || 'ROOT',
        database: 'TICKETSYSTEM'
    });

    try {
        const [rows] = await db.query('SELECT * FROM ORDERS');
        // ORDER_NUMBERごとにグループ化
        const grouped = {};
        for (const row of rows) {
            if (!grouped[row.ORDER_NUMBER]) {
                grouped[row.ORDER_NUMBER] = {
                    ORDER_NUMBER: row.ORDER_NUMBER,
                    ORDER_CONTENTS: []
                };
            }
            grouped[row.ORDER_NUMBER].ORDER_CONTENTS.push({
                PRODUCT_NAME: row.PRODUCT_NAME,
                PRODUCT_QUANTITY: row.PRODUCT_QUANTITY,
                ADD_EGG: !!row.ADD_EGG,
                ADD_BEEF: !!row.ADD_BEEF,
                ORDER_TIME: row.ORDER_TIME
            });
        }
        // オブジェクトから配列に変換
        const result = Object.values(grouped);
        res.json(result);
    } catch (error) {
        res.json({ 'ERROR': error });
    }finally{
        db.end(); //　アプリが落ちた原因
    }
}

export default app;