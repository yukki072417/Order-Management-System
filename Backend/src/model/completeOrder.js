import mysql from 'mysql2/promise'
import express from 'express'

const app = express();

app.OrderComplete = async (req, res) => {
    const content = req.body;
    console.log(req.body);
}

export default app;