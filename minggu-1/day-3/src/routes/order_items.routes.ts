import { Router } from 'express';
import * as item from '../controllers/order_items.controller';
import { validate } from '../utils/validator';
import { getOrderByIdValidation } from '../middlewares/orders.validation';
import { createOrderItemValidation } from '../middlewares/order_items.validation';

const router = Router();

router.get('/', item.getAll);
router.get('/:id', validate(getOrderByIdValidation), item.getById);
router.get('/search', item.search);
router.post('/', validate(createOrderItemValidation), item.create);
router.put('/:id', item.update);
router.delete('/:id', item.remove);

export default router;