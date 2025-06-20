import express from 'express';
import orderModel from '../model/orderModel.js';
import orderComplete from '../model/completeOrder.js';
import orderListModel from '../model/orderListModel.js';
import orderLogModel from '../model/orderLogModel.js';
const router = express.Router();

router.use(express.json());

router.post('/order', orderModel.OrderModel);
router.get('/get-order', orderListModel.OrderListModel);
router.get('/get-order-logs', orderLogModel.OrderLogModel);
router.post('/complete-order', orderComplete.OrderComplete);

export default router;