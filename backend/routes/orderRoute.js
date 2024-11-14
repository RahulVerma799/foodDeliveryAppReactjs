import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { listOrders, placeOrder, userOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/Place',authMiddleware,placeOrder)
orderRouter.post('/userOrder',authMiddleware,userOrder)
orderRouter.get('/list',listOrders)

export default orderRouter;