import express from 'express';
import orderModel from '../model/orderModel.js';
import orderListModel from '../model/orderListModel.js';
const router = express.Router();

router.use(express.json());

router.post('/order', orderModel.OrderModel);
router.get('/get-order', orderListModel.OrderListModel);

export default router;