import { IOrderLogRepository } from "../../repository/IOrderLogRepository";
import { createConnection } from "./connection";

const INITIAL_ORDER_NUMBER = 101;

export class MysqlOrderLogRepository extends IOrderLogRepository {
    async create(orders) {
        const db = await createConnection();
        try {
            for (const order of orders) {
                await db.query(
                    "INSERT INTO ORDER_LOG (ORDER_NUMBER, PRODUCT_NAME, PRODUCT_QUANTITY, ADD_BEEF, ADD_EGG, ORDER_TIME) VALUES (?, ?, ?, ?, ?, ?)",
                    [order.orderNumber, order.productName, order.productQuantity, order.addBeef, order.addEgg, order.orderTime]
                );
            }
        } finally {
            await db.end();
        }
    }

    async findAll() {
        const db = await createConnection();
        try {
            const [rows] = await db.query("SELECT * FROM ORDER_LOG");
            return rows;
        } finally {
            await db.end();
        }
    }

    async getNextOrderNumber() {
        const db = await createConnection();
        try {
            const [results] = await db.query(
                "SELECT ORDER_NUMBER FROM ORDER_LOG ORDER BY ORDER_NUMBER DESC LIMIT 1"
            );
            if (results.length === 0) return INITIAL_ORDER_NUMBER;
            return Number(results[0].ORDER_NUMBER) + 1;
        } finally {
            await db.end();
        }
    }
}
