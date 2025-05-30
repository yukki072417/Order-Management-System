import express from 'express';
import orderModel from '../model/orderModel.js';
const router = express.Router();

router.use(express.json());

router.post('/order', orderModel.OrderModel);

export default router;