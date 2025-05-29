import express from 'express';
import mysql from 'mysql2';

const app = express();

app.OrderModel = (req, res) => {

    const db = mysql.createConnection({

    });

}

export default app;