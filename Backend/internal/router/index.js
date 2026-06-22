import { Router } from "express";
import { orderHandler } from "../handler/orderHandler.js";
import { getOrderListHandler } from "../handler/getOrderListHandler.js";
import { completeOrderHandler } from "../handler/completeOrderHandler.js";
import { getOrderLogHandler } from "../handler/getOrderLogHandler.js";

export function setupRoutes(app, { placeOrderUseCase, getOrderListUseCase, completeOrderUseCase, getOrderLogUseCase, clients }) {
    const router = Router();
    router.post("/order", orderHandler(placeOrderUseCase));
    router.get("/get-order", getOrderListHandler(getOrderListUseCase));
    router.post("/complete-order", completeOrderHandler(completeOrderUseCase));
    router.get("/get-order-logs", getOrderLogHandler(getOrderLogUseCase));
    app.use("/api", router);

    app.ws("/ws/order-list", async (ws, req) => {
        clients.add(ws);
        try {
            const orders = await getOrderListUseCase.execute();
            ws.send(JSON.stringify(orders));
        } catch (e) {
            ws.send(JSON.stringify([]));
        }
        ws.on("close", () => {
            clients.delete(ws);
        });
    });
}
