import { IOrderRepository } from "../../repository/IOrderRepository";
import { createConnection } from "./connection";

export class MysqlOrderRepository extends IOrderRepository {
    async create(orders) {
        const db = await createConnection();
        try {
            for (const order of orders) {
                await db.query(
                    "INSERT INTO ORDERS (ORDER_NUMBER, PRODUCT_NAME, PRODUCT_QUANTITY, ADD_BEEF, ADD_EGG, ORDER_TIME) VALUES (?, ?, ?, ?, ?, ?)",
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
            const [rows] = await db.query("SELECT * FROM ORDERS");
            const grouped = {};
            for (const row of rows) {
                if (!grouped[row.ORDER_NUMBER]) {
                    grouped[row.ORDER_NUMBER] = {
                        ORDER_NUMBER: row.ORDER_NUMBER,
                        ORDER_CONTENTS: [],
                    };
                }
                grouped[row.ORDER_NUMBER].ORDER_CONTENTS.push({
                    PRODUCT_NAME: row.PRODUCT_NAME,
                    PRODUCT_QUANTITY: row.PRODUCT_QUANTITY,
                    ADD_BEEF: !!row.ADD_BEEF,
                    ADD_EGG: !!row.ADD_EGG,
                    ORDER_TIME: row.ORDER_TIME,
                });
            }
            return Object.values(grouped);
        } finally {
            await db.end();
        }
    }

    async deleteByOrderNumber(orderNumber) {
        const db = await createConnection();
        try {
            await db.query("DELETE FROM ORDERS WHERE ORDER_NUMBER = ?", [orderNumber]);
        } finally {
            await db.end();
        }
    }
}
