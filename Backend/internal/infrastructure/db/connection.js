import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export function createConnection() {
    return mysql.createConnection({
        host: "db",
        user: process.env.DB_USER || "root",
        password: process.env.ROOT_PASSWORD || "ROOT",
        database: "TICKETSYSTEM",
    });
}
