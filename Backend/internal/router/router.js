import { Router } from "express";
import { orderHandler } from "../handler/orderHandler.js";
import { getOrderListHandler } from "../handler/getOrderListHandler.js";
import { completeOrderHandler } from "../handler/completeOrderHandler.js";
import { getOrderLogHandler } from "../handler/getOrderLogHandler.js";

export function createRouter({ placeOrderUseCase, getOrderListUseCase, completeOrderUseCase, getOrderLogUseCase }) {
    const router = Router();

    router.post("/order", orderHandler(placeOrderUseCase));
    router.get("/get-order", getOrderListHandler(getOrderListUseCase));
    router.post("/complete-order", completeOrderHandler(completeOrderUseCase));
    router.get("/get-order-logs", getOrderLogHandler(getOrderLogUseCase));

    return router;
}
