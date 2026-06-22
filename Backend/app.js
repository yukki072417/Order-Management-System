import express from "express";
import cors from "cors";
import expressWs from "express-ws";

import { MysqlOrderRepository } from "./internal/infrastructure/db/MysqlOrderRepository.js";
import { MysqlOrderLogRepository } from "./internal/infrastructure/db/MysqlOrderLogRepository.js";
import { WsBroadcaster } from "./internal/infrastructure/ws/WsBroadcaster.js";

import { PlaceOrderUseCase } from "./internal/usecase/PlaceOrderUseCase.js";
import { GetOrderListUseCase } from "./internal/usecase/GetOrderListUseCase.js";
import { CompleteOrderUseCase } from "./internal/usecase/CompleteOrderUseCase.js";
import { GetOrderLogUseCase } from "./internal/usecase/GetOrderLogUseCase.js";

import { setupRoutes } from "./internal/router/index.js";

const app = express();
const PORT = 3000;

const orderRepository = new MysqlOrderRepository();
const orderLogRepository = new MysqlOrderLogRepository();
const clients = new Set();
const broadcaster = new WsBroadcaster(clients, orderRepository);

const placeOrderUseCase = new PlaceOrderUseCase(orderRepository, orderLogRepository, broadcaster);
const getOrderListUseCase = new GetOrderListUseCase(orderRepository);
const completeOrderUseCase = new CompleteOrderUseCase(orderRepository, broadcaster);
const getOrderLogUseCase = new GetOrderLogUseCase(orderLogRepository);

app.use(cors());
app.use(express.json());
expressWs(app);

setupRoutes(app, { placeOrderUseCase, getOrderListUseCase, completeOrderUseCase, getOrderLogUseCase, clients });

app.listen(PORT, () => {
    console.log("Server launched PORT:" + PORT);
});
