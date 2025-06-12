import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.OrderModel = async (req, res) => {

    console.log(req.body);
    const body = req.body[0];

    const name = body.NAME;
    const quantity = body.ITEM_QUANTITY;
    const beef = body.ADD_BEEF;
    const egg = body.ADD_EGG;
    

    //時間の取得
    const now = new Date();
    console.log(now); // 例: 2025-06-11T04:15:00.000Z    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const mysqlTime = `${hours}:${minutes}:${seconds}`;

    console.log(mysqlTime); // 例: "09:03:07"


    
    
    
    console.log(name);

    const db = await mysql.createConnection({
        host: 'db',
        user: process.env.DB_USER || 'root',
        password: process.env.ROOT_PASSWORD || 'ROOT',
        database: 'TICKETSYSTEM'
    });

    try {
        const [results] = await db.query('SELECT * FROM ORDERS');

        let LAST_ORDER_NUMBER = 0;

        if(results == 0){
            LAST_ORDER_NUMBER = 101;
        }
        else{
             LAST_ORDER_NUMBER = Number(results[0].ORDER_NUMBER) + 1;
        }
        
        console.log(req.body);

        db.query('INSERT INTO ORDERS (ORDER_NUMBER, PRODUCT_NAME, PRODUCT_QUANTITY, ADD_BEEF, ADD_EGG, ORDER_TIME) VALUES (?, ?, ? ,?, ?, ?)', [LAST_ORDER_NUMBER, name, quantity, beef, egg, mysqlTime]);
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
