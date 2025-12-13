import { Router } from 'express';
import * as order from '../controllers/orders.controller';
import { validate } from '../utils/validator';
import { getOrderByIdValidation } from '../middlewares/orders.validation';
import { createOrderItemValidation } from '../middlewares/order_items.validation';

const router = Router();

router.get('/', order.getAll)
router.get('/:id', validate(getOrderByIdValidation), order.getById);
router.get('/search', order.search);
router.post('/', validate(createOrderItemValidation), order.create)
router.put('/:id', order.update);
router.delete('/:id', order.remove );

export default router;