import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.OrderModel = async (req, res) => {

    console.log(req.body);

    const db = await mysql.createConnection({
        host: 'db',
        user: process.env.DB_USER || 'root',
        password: process.env.ROOT_PASSWORD || 'ROOT',
        database: 'TICKETSYSTEM'
    });

    try {
        const [results] = await db.query('SELECT * FROM ORDERS');

        const LAST_ORDER_NUMBER = Number(results[0].ORDER_NUMBER) + 1;
        // const ORDER_NUMBER = ()
        console.log(req.body);

        // db.query('INSERT INTO ORDERS (ORDER_NUMBER, PRODUCT_NAME, PRODUCT_QUANTITY, ADD_BEEF, ADD_EGG) VALUES (?, ?, ? ,?, ?)', [LAST_ORDER_NUMBER,])
        console.log(LAST_ORDER_NUMBER);
        
        res.status(200).json(LAST_ORDER_NUMBER);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    } finally {
        db.end();
    }
};

export default app;